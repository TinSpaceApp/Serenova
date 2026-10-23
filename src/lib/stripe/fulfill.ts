import "server-only";

import type Stripe from "stripe";
import { getMailAddresses, sendStudioEmail } from "@/lib/email/send";
import { depositPaidAdminMail, paymentConfirmedMail } from "@/lib/email/templates";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { getAppBaseUrl } from "@/lib/supabase/env";
import { formatCents } from "@/lib/admin/requests";

function paymentIntentId(session: Stripe.Checkout.Session) {
  const value = session.payment_intent;
  if (!value) {
    return null;
  }
  return typeof value === "string" ? value : value.id;
}

export async function fulfillPaidCheckoutSession(
  event: Stripe.Event,
  session: Stripe.Checkout.Session,
) {
  if (session.payment_status === "unpaid") {
    return { ok: true, skipped: "unpaid" as const };
  }

  const admin = createServiceRoleClient();
  const invoiceId = session.metadata?.invoice_id;
  const { data: invoice } = invoiceId
    ? await admin.from("invoices").select("*").eq("id", invoiceId).maybeSingle()
    : await admin
        .from("invoices")
        .select("*")
        .eq("stripe_checkout_session_id", session.id)
        .maybeSingle();

  if (!invoice) {
    return { ok: false, error: "invoice" as const };
  }

  if (invoice.status === "paid") {
    return { ok: true, skipped: "already_paid" as const };
  }

  if (session.amount_total !== invoice.amount_cents) {
    return { ok: false, error: "amount" as const };
  }
  if (session.currency && session.currency !== invoice.currency.toLowerCase()) {
    return { ok: false, error: "currency" as const };
  }

  const paidAt = new Date().toISOString();
  const { error: paymentError } = await admin.from("payments").insert({
    invoice_id: invoice.id,
    booking_id: invoice.booking_id,
    provider: "stripe",
    provider_event_id: event.id,
    stripe_payment_intent_id: paymentIntentId(session),
    status: "succeeded",
    amount_cents: invoice.amount_cents,
    currency: invoice.currency,
    paid_at: paidAt,
  });

  if (paymentError && paymentError.code !== "23505") {
    return { ok: false, error: "payment" as const };
  }

  await admin
    .from("invoices")
    .update({
      status: "paid",
      paid_at: paidAt,
      hosted_invoice_url: session.url ?? invoice.hosted_invoice_url,
      updated_at: paidAt,
    })
    .eq("id", invoice.id);

  if (invoice.booking_id) {
    await admin
      .from("bookings")
      .update({
        status: "confirmed",
        deposit_received_cents: invoice.amount_cents,
        stripe_customer_id:
          typeof session.customer === "string" ? session.customer : session.customer?.id ?? null,
        confirmed_at: paidAt,
        updated_at: paidAt,
      })
      .eq("id", invoice.booking_id);
  }

  const { data: quote } = await admin
    .from("quotes")
    .select("id, request_id")
    .eq("id", invoice.quote_id)
    .maybeSingle();

  if (quote?.request_id) {
    await admin.from("travel_requests").update({ status: "booking_confirmed" }).eq("id", quote.request_id);
    await admin.from("travel_request_status_history").insert({
      request_id: quote.request_id,
      from_status: "deposit_requested",
      to_status: "booking_confirmed",
      note: "Deposit paid via Stripe",
    });
  }

  await admin.from("activity_logs").insert({
    actor_type: "webhook",
    entity_type: "invoice",
    entity_id: invoice.id,
    action: "deposit_paid",
    metadata: { event_id: event.id, session_id: session.id },
  });

  const { data: customer } = await admin
    .from("customers")
    .select("first_name, last_name, email, locale")
    .eq("id", invoice.customer_id)
    .maybeSingle();

  const locale = customer?.locale === "en" ? "en" : "fr";
  const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || customer?.email || "";
  const amount = formatCents(invoice.amount_cents, invoice.currency);
  const clientMail = paymentConfirmedMail(locale, name, invoice.reference, amount);
  const adminMail = depositPaidAdminMail(name, customer?.email || "", invoice.reference, amount, `${getAppBaseUrl()}/admin/invoices`);

  void Promise.all([
    customer?.email
      ? sendStudioEmail({
          to: customer.email,
          subject: clientMail.subject,
          html: clientMail.html,
          text: clientMail.text,
          templateSlug: "booking_confirmed",
          locale,
          invoiceId: invoice.id,
          quoteId: invoice.quote_id,
          customerId: invoice.customer_id,
          requestId: quote?.request_id,
        })
      : Promise.resolve(),
    sendStudioEmail({
      to: getMailAddresses().notify,
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
      templateSlug: "payment_confirmed",
      locale: "fr",
      invoiceId: invoice.id,
      quoteId: invoice.quote_id,
      requestId: quote?.request_id,
    }),
  ]);

  return { ok: true as const };
}

export async function markCheckoutFailed(event: Stripe.Event, session: Stripe.Checkout.Session) {
  const admin = createServiceRoleClient();
  const invoiceId = session.metadata?.invoice_id;
  const { data: invoice } = invoiceId
    ? await admin.from("invoices").select("id, booking_id, amount_cents, currency, status").eq("id", invoiceId).maybeSingle()
    : await admin
        .from("invoices")
        .select("id, booking_id, amount_cents, currency, status")
        .eq("stripe_checkout_session_id", session.id)
        .maybeSingle();

  if (!invoice || invoice.status === "paid") {
    return { ok: true as const };
  }

  await admin.from("payments").insert({
    invoice_id: invoice.id,
    booking_id: invoice.booking_id,
    provider: "stripe",
    provider_event_id: event.id,
    stripe_payment_intent_id: paymentIntentId(session),
    status: "failed",
    amount_cents: invoice.amount_cents,
    currency: invoice.currency,
    failure_code: "async_payment_failed",
  });

  await admin
    .from("invoices")
    .update({ status: "failed", updated_at: new Date().toISOString() })
    .eq("id", invoice.id);

  return { ok: true as const };
}
