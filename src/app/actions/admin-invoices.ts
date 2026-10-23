"use server";

import { requireAdmin } from "@/lib/admin/session";
import { getMailAddresses, sendStudioEmail } from "@/lib/email/send";
import { depositInvoiceSentMail } from "@/lib/email/templates";
import { createStripeClient, isStripeTestReady, stripeIntegrationId } from "@/lib/stripe/client";
import { getAppBaseUrl, getStudioIntegrations } from "@/lib/supabase/env";
import { formatCents } from "@/lib/admin/requests";

export type SendInvoiceResult = { ok: true; url: string } | { ok: false; error: string };

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function confirmDepositInvoiceSend(formData: FormData): Promise<SendInvoiceResult> {
  const { supabase } = await requireAdmin();
  const invoiceId = asString(formData.get("invoiceId"));
  if (!invoiceId) {
    return { ok: false, error: "invoice" };
  }

  const integrations = getStudioIntegrations();
  if (!integrations.resend) {
    return { ok: false, error: "resend" };
  }
  if (integrations.stripeMode === "live") {
    return { ok: false, error: "live" };
  }
  if (!isStripeTestReady()) {
    return { ok: false, error: "stripe" };
  }
  const { data: invoice } = await supabase
    .from("invoices")
    .select(
      "id, booking_id, quote_id, customer_id, reference, status, currency, amount_cents, kind, customers(first_name, last_name, email, locale), bookings(id, stripe_customer_id)",
    )
    .eq("id", invoiceId)
    .maybeSingle();

  if (!invoice || invoice.kind !== "deposit") {
    return { ok: false, error: "invoice" };
  }
  if (invoice.status === "paid") {
    return { ok: false, error: "paid" };
  }
  if (invoice.status !== "pending_review" && invoice.status !== "sent" && invoice.status !== "failed") {
    return { ok: false, error: "status" };
  }

  const customer = Array.isArray(invoice.customers) ? invoice.customers[0] : invoice.customers;
  const booking = Array.isArray(invoice.bookings) ? invoice.bookings[0] : invoice.bookings;
  const email = customer?.email?.trim().toLowerCase();
  if (!email) {
    return { ok: false, error: "email" };
  }

  const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || email;
  const locale = customer?.locale === "en" ? "en" : "fr";
  const stripe = createStripeClient();
  const base = getAppBaseUrl();

  let stripeCustomerId = booking?.stripe_customer_id ?? undefined;
  if (!stripeCustomerId) {
    const created = await stripe.customers.create({
      email,
      name,
      metadata: {
        serenova_customer_id: invoice.customer_id,
        serenova_invoice_id: invoice.id,
      },
    });
    stripeCustomerId = created.id;
    if (booking?.id) {
      await supabase.from("bookings").update({ stripe_customer_id: stripeCustomerId }).eq("id", booking.id);
    }
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: stripeCustomerId,
    client_reference_id: invoice.id,
    integration_identifier: stripeIntegrationId("deposit"),
    metadata: {
      invoice_id: invoice.id,
      booking_id: invoice.booking_id ?? "",
      quote_id: invoice.quote_id,
      customer_id: invoice.customer_id,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: invoice.currency.toLowerCase(),
          unit_amount: invoice.amount_cents,
          product_data: {
            name: locale === "fr" ? `Acompte Serenova ${invoice.reference}` : `Serenova deposit ${invoice.reference}`,
            description:
              locale === "fr"
                ? "Acompte sur proposition acceptée. La réservation n’est confirmée qu’après paiement."
                : "Deposit on an accepted proposal. The booking is confirmed only after payment.",
          },
        },
      },
    ],
    success_url: `${base}/proposition/paiement/ok`,
    cancel_url: `${base}/proposition/paiement/retour`,
  });

  if (!session.url) {
    return { ok: false, error: "session" };
  }

  const sentAt = new Date().toISOString();
  const { error: updateError } = await supabase
    .from("invoices")
    .update({
      status: "sent",
      stripe_checkout_session_id: session.id,
      hosted_invoice_url: session.url,
      sent_at: sentAt,
      updated_at: sentAt,
    })
    .eq("id", invoice.id);

  if (updateError) {
    return { ok: false, error: "save" };
  }

  const amount = formatCents(invoice.amount_cents, invoice.currency);
  const mail = depositInvoiceSentMail(locale, name, invoice.reference, amount, session.url);
  const sent = await sendStudioEmail({
    to: email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    templateSlug: "deposit_invoice_sent",
    locale,
    invoiceId: invoice.id,
    quoteId: invoice.quote_id,
    customerId: invoice.customer_id,
  });

  if (!sent.ok) {
    return { ok: false, error: "mail" };
  }

  void sendStudioEmail({
    to: getMailAddresses().notify,
    subject: `Lien d’acompte envoyé — ${invoice.reference}`,
    html: `<p>${name} · ${email}</p><p>${amount}</p><p><a href="${session.url}">Lien Stripe</a></p>`,
    text: `${name} <${email}>\n${amount}\n${session.url}`,
    templateSlug: "deposit_invoice_sent",
    locale: "fr",
    invoiceId: invoice.id,
    quoteId: invoice.quote_id,
  });

  return { ok: true, url: session.url };
}
