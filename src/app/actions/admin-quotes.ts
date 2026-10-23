"use server";

import { createHash, randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/session";
import { sendStudioEmail } from "@/lib/email/send";
import { quoteSentMail } from "@/lib/email/templates";
import { getAppBaseUrl } from "@/lib/supabase/env";

export type QuoteResult =
  | { ok: true }
  | { ok: true; url: string }
  | { ok: false; error: string };

function asString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function moneyToCents(value: string) {
  const cleaned = value.replace(/[^\d.,-]/g, "").replace(",", ".");
  if (!cleaned) {
    return 0;
  }
  return Math.round(Number(cleaned) * 100);
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createQuoteFromRequest(formData: FormData) {
  const { supabase, profile } = await requireAdmin();
  const requestId = asString(formData.get("requestId"));
  if (!requestId) {
    redirect("/admin/requests");
  }

  const { data: request } = await supabase
    .from("travel_requests")
    .select("id, customer_id, destination, date_from, date_to, nights, adults, children, status")
    .eq("id", requestId)
    .maybeSingle();

  if (!request) {
    redirect("/admin/requests");
  }

  const { data: settings } = await supabase
    .from("admin_settings")
    .select(
      "default_currency, default_deposit_percent, default_quote_validity_days, includes_default, excludes_default, practical_info, booking_terms, cancellation_terms, payment_terms",
    )
    .eq("id", 1)
    .maybeSingle();

  const currency = settings?.default_currency ?? "EUR";
  const depositPercent = Number(settings?.default_deposit_percent ?? 30);
  const validityDays = settings?.default_quote_validity_days ?? 14;

  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .insert({
      request_id: request.id,
      customer_id: request.customer_id,
      status: "draft",
      currency,
      created_by: profile.id,
    })
    .select("id")
    .single();

  if (quoteError || !quote) {
    redirect(`/admin/requests/${requestId}`);
  }

  const issued = new Date();
  const validUntil = new Date(issued);
  validUntil.setDate(validUntil.getDate() + validityDays);

  const { data: version, error: versionError } = await supabase
    .from("quote_versions")
    .insert({
      quote_id: quote.id,
      version_number: 1,
      title: "Safari Serenova",
      destination: request.destination,
      date_from: request.date_from,
      date_to: request.date_to,
      duration_nights: request.nights,
      travellers_adults: request.adults,
      travellers_children: request.children,
      currency,
      deposit_type: "percent",
      deposit_percent: depositPercent,
      includes: settings?.includes_default,
      excludes: settings?.excludes_default,
      practical_info: settings?.practical_info,
      booking_terms: settings?.booking_terms,
      cancellation_terms: settings?.cancellation_terms,
      payment_terms: settings?.payment_terms,
      issued_at: issued.toISOString().slice(0, 10),
      valid_until: validUntil.toISOString().slice(0, 10),
    })
    .select("id")
    .single();

  if (!versionError && version) {
    await supabase.from("quotes").update({ current_version_id: version.id }).eq("id", quote.id);
  }

  await supabase
    .from("travel_requests")
    .update({ status: "quote_in_progress", assigned_to: profile.id })
    .eq("id", requestId);

  await supabase.from("travel_request_status_history").insert({
    request_id: requestId,
    from_status: request.status,
    to_status: "quote_in_progress",
    actor_id: profile.id,
    note: "Quote draft created",
  });

  redirect(`/admin/quotes/${quote.id}`);
}

export async function saveQuoteDraft(formData: FormData): Promise<QuoteResult> {
  const { supabase } = await requireAdmin();
  const quoteId = asString(formData.get("quoteId"));
  const versionId = asString(formData.get("versionId"));
  if (!quoteId || !versionId) {
    return { ok: false, error: "missing" };
  }

  const kinds = formData.getAll("itemKind").map(String);
  const descriptions = formData.getAll("itemDescription").map(String);
  const quantities = formData.getAll("itemQuantity").map(String);
  const units = formData.getAll("itemUnit").map(String);

  const items = kinds
    .map((kind, index) => {
      const description = descriptions[index]?.trim() ?? "";
      const quantity = Number(quantities[index] || "1") || 1;
      const unitAmount = moneyToCents(units[index] ?? "");
      return {
        version_id: versionId,
        kind: kind || "other",
        description,
        quantity,
        unit_amount_cents: unitAmount,
        amount_cents: Math.round(quantity * unitAmount),
        sort_order: index,
      };
    })
    .filter((item) => item.description);

  const subtotal = items.reduce((sum, item) => sum + item.amount_cents, 0);
  const depositPercent = Number(asString(formData.get("depositPercent")) || "30");
  const depositAmount = Math.round((subtotal * depositPercent) / 100);

  const { error: versionError } = await supabase
    .from("quote_versions")
    .update({
      title: asString(formData.get("title")) || "Safari Serenova",
      destination: asString(formData.get("destination")) || null,
      date_from: asString(formData.get("dateFrom")) || null,
      date_to: asString(formData.get("dateTo")) || null,
      includes: asString(formData.get("includes")) || null,
      excludes: asString(formData.get("excludes")) || null,
      practical_info: asString(formData.get("practicalInfo")) || null,
      deposit_percent: depositPercent,
      deposit_amount_cents: depositAmount,
      subtotal_cents: subtotal,
      total_cents: subtotal,
      balance_cents: subtotal - depositAmount,
      valid_until: asString(formData.get("validUntil")) || null,
    })
    .eq("id", versionId);

  if (versionError) {
    return { ok: false, error: "save" };
  }

  await supabase.from("quote_line_items").delete().eq("version_id", versionId);
  if (items.length) {
    const { error: itemsError } = await supabase.from("quote_line_items").insert(items);
    if (itemsError) {
      return { ok: false, error: "save" };
    }
  }

  revalidatePath(`/admin/quotes/${quoteId}`);
  return { ok: true };
}

export async function prepareQuoteLink(formData: FormData): Promise<QuoteResult> {
  const { supabase, profile } = await requireAdmin();
  const quoteId = asString(formData.get("quoteId"));
  const versionId = asString(formData.get("versionId"));
  if (!quoteId || !versionId) {
    return { ok: false, error: "missing" };
  }

  const saved = await saveQuoteDraft(formData);
  if (!saved.ok) {
    return saved;
  }

  const token = randomBytes(32).toString("base64url");
  const { data: quote } = await supabase
    .from("quotes")
    .select("request_id")
    .eq("id", quoteId)
    .maybeSingle();

  const { error } = await supabase
    .from("quote_versions")
    .update({
      public_token_hash: hashToken(token),
      public_token_expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      public_token_revoked_at: null,
    })
    .eq("id", versionId);

  if (error) {
    return { ok: false, error: "save" };
  }

  await supabase.from("quotes").update({ status: "sent", sent_at: new Date().toISOString() }).eq("id", quoteId);

  if (quote?.request_id) {
    await supabase.from("travel_requests").update({ status: "quote_sent", assigned_to: profile.id }).eq("id", quote.request_id);
    await supabase.from("travel_request_status_history").insert({
      request_id: quote.request_id,
      from_status: "quote_in_progress",
      to_status: "quote_sent",
      actor_id: profile.id,
      note: "Client link prepared",
    });
  }

  revalidatePath(`/admin/quotes/${quoteId}`);
  revalidatePath("/admin/quotes");
  return { ok: true, url: `${getAppBaseUrl()}/proposition/${token}` };
}

export async function sendQuoteByEmail(formData: FormData): Promise<QuoteResult> {
  const { supabase } = await requireAdmin();
  const prepared = await prepareQuoteLink(formData);
  if (!prepared.ok || !("url" in prepared) || !prepared.url) {
    return prepared;
  }

  const quoteId = asString(formData.get("quoteId"));
  const { data: quote } = await supabase
    .from("quotes")
    .select("id, customers(first_name, last_name, email, locale)")
    .eq("id", quoteId)
    .maybeSingle();

  const customer = Array.isArray(quote?.customers) ? quote?.customers[0] : quote?.customers;
  const email = customer?.email?.trim();
  if (!email) {
    return { ok: false, error: "email" };
  }

  const locale = customer.locale === "en" ? "en" : "fr";
  const name = [customer.first_name, customer.last_name].filter(Boolean).join(" ") || email;
  const mail = quoteSentMail(locale, name, prepared.url);
  const sent = await sendStudioEmail({
    to: email,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
    templateSlug: "quote_sent",
    locale,
    quoteId,
    customerId: undefined,
  });

  if (!sent.ok) {
    return { ok: false, error: "email" };
  }

  return { ok: true, url: prepared.url };
}
