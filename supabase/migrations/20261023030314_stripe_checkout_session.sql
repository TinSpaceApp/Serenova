-- Store the Stripe Checkout Session used to collect a deposit.
-- Booking confirmation still happens only from the signed webhook.

alter table public.invoices
  add column if not exists stripe_checkout_session_id text;

create unique index if not exists invoices_stripe_checkout_session_id_uidx
  on public.invoices (stripe_checkout_session_id)
  where stripe_checkout_session_id is not null;

create index if not exists invoices_stripe_checkout_session_id_idx
  on public.invoices (stripe_checkout_session_id);
