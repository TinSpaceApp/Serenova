import "server-only";

import { createHash } from "crypto";
import { createServiceRoleClient } from "@/lib/supabase/admin";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

type PublicCustomer = {
  first_name: string;
  last_name: string;
  email: string;
  locale: string;
};

type PublicQuoteRow = {
  id: string;
  status: string;
  reference: string;
  customers: PublicCustomer | PublicCustomer[] | null;
};

export type PublicQuoteLocale = "en" | "fr";

export async function getPublicQuote(token: string) {
  const clean = token.trim();
  if (!clean) {
    return null;
  }

  const admin = createServiceRoleClient();
  const { data: version } = await admin
    .from("quote_versions")
    .select(
      "id, quote_id, title, destination, date_from, date_to, duration_nights, travellers_adults, travellers_children, currency, subtotal_cents, total_cents, deposit_percent, deposit_amount_cents, balance_cents, includes, excludes, practical_info, booking_terms, cancellation_terms, payment_terms, valid_until, public_token_expires_at, public_token_revoked_at, quotes!quote_versions_quote_id_fkey(id, status, reference, customers(first_name, last_name, email, locale))",
    )
    .eq("public_token_hash", hashToken(clean))
    .maybeSingle();

  if (!version || version.public_token_revoked_at) {
    return null;
  }

  const quoteRaw = version.quotes as PublicQuoteRow | PublicQuoteRow[] | null;
  const quote = Array.isArray(quoteRaw) ? quoteRaw[0] : quoteRaw;
  if (!quote) {
    return null;
  }

  const customerRaw = quote.customers;
  const customer = Array.isArray(customerRaw) ? customerRaw[0] : customerRaw;
  const locale: PublicQuoteLocale = customer?.locale === "fr" ? "fr" : "en";
  const expired = Boolean(
    version.public_token_expires_at && new Date(version.public_token_expires_at) < new Date(),
  );

  const { data: items } = await admin
    .from("quote_line_items")
    .select("kind, description, quantity, unit_amount_cents, amount_cents, sort_order")
    .eq("version_id", version.id)
    .order("sort_order", { ascending: true });

  return {
    token: clean,
    expired,
    accepted: quote.status === "accepted",
    locale,
    customer,
    quote,
    version,
    items: items ?? [],
  };
}
