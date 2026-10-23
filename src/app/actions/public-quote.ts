"use server";

import { createHash } from "crypto";
import { getMailAddresses, sendStudioEmail } from "@/lib/email/send";
import { quoteAcceptedAdminMail, quoteAcceptedClientMail } from "@/lib/email/templates";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { getAppBaseUrl } from "@/lib/supabase/env";

export type AcceptResult = { ok: true } | { ok: false; error: string };

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function acceptPublicQuote(formData: FormData): Promise<AcceptResult> {
  const token = asString(formData.get("token"));
  const name = asString(formData.get("name"));
  const email = asString(formData.get("email")).toLowerCase();
  const consent = asString(formData.get("consent"));

  if (!token || !name || !email || consent !== "yes") {
    return { ok: false, error: "fields" };
  }

  const admin = createServiceRoleClient();
  const { data: version } = await admin
    .from("quote_versions")
    .select("id, quote_id, total_cents, deposit_amount_cents, balance_cents, currency, public_token_expires_at, public_token_revoked_at")
    .eq("public_token_hash", hashToken(token))
    .maybeSingle();

  if (!version || version.public_token_revoked_at) {
    return { ok: false, error: "link" };
  }
  if (version.public_token_expires_at && new Date(version.public_token_expires_at) < new Date()) {
    return { ok: false, error: "expired" };
  }

  const { data: quote } = await admin
    .from("quotes")
    .select("id, request_id, customer_id, status")
    .eq("id", version.quote_id)
    .maybeSingle();

  if (!quote || quote.status === "accepted") {
    return { ok: false, error: "accepted" };
  }

  const { error: acceptError } = await admin.from("quote_acceptances").insert({
    quote_id: quote.id,
    version_id: version.id,
    declared_name: name,
    declared_email: email,
    consent_text: "I accept this Serenova quotation and the stated terms.",
  });

  if (acceptError) {
    return { ok: false, error: "save" };
  }

  await admin
    .from("quotes")
    .update({ status: "accepted", accepted_at: new Date().toISOString() })
    .eq("id", quote.id);

  await admin.from("travel_requests").update({ status: "quote_accepted" }).eq("id", quote.request_id);
  await admin.from("travel_request_status_history").insert({
    request_id: quote.request_id,
    from_status: "quote_sent",
    to_status: "quote_accepted",
    note: "Accepted on the client page",
  });

  const { data: booking } = await admin
    .from("bookings")
    .insert({
      request_id: quote.request_id,
      quote_id: quote.id,
      quote_version_id: version.id,
      customer_id: quote.customer_id,
      status: "awaiting_deposit",
      currency: version.currency,
      total_cents: version.total_cents,
      deposit_expected_cents: version.deposit_amount_cents,
      balance_cents: version.balance_cents,
    })
    .select("id")
    .single();

  if (booking) {
    const reference = `SN-DEP-${new Date().getFullYear()}-${booking.id.slice(0, 4).toUpperCase()}`;
    await admin.from("invoices").insert({
      booking_id: booking.id,
      quote_id: quote.id,
      quote_version_id: version.id,
      customer_id: quote.customer_id,
      kind: "deposit",
      reference,
      status: "pending_review",
      currency: version.currency,
      amount_cents: version.deposit_amount_cents,
      quote_total_cents: version.total_cents,
      balance_remaining_cents: version.balance_cents,
    });
    await admin.from("travel_requests").update({ status: "deposit_requested" }).eq("id", quote.request_id);
  }

  const { data: customer } = await admin
    .from("customers")
    .select("first_name, last_name, email, locale")
    .eq("id", quote.customer_id)
    .maybeSingle();
  const locale = customer?.locale === "en" ? "en" : "fr";
  const displayName = name || [customer?.first_name, customer?.last_name].filter(Boolean).join(" ") || email;
  const clientMail = quoteAcceptedClientMail(locale, displayName);
  const adminMail = quoteAcceptedAdminMail(displayName, email, `${getAppBaseUrl()}/admin/invoices`);
  void Promise.all([
    sendStudioEmail({
      to: email,
      subject: clientMail.subject,
      html: clientMail.html,
      text: clientMail.text,
      templateSlug: "quote_accepted",
      locale,
      quoteId: quote.id,
      requestId: quote.request_id,
      customerId: quote.customer_id,
    }),
    sendStudioEmail({
      to: getMailAddresses().notify,
      subject: adminMail.subject,
      html: adminMail.html,
      text: adminMail.text,
      templateSlug: "quote_accepted",
      locale: "fr",
      quoteId: quote.id,
      requestId: quote.request_id,
    }),
  ]);

  return { ok: true };
}
