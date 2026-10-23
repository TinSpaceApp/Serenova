-- Advisor fixes: immutable search_path on the updated_at trigger, plus FK covering indexes.

create or replace function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create index if not exists activity_logs_actor_id_idx on public.activity_logs (actor_id);
create index if not exists admin_settings_updated_by_idx on public.admin_settings (updated_by);
create index if not exists bookings_customer_id_idx on public.bookings (customer_id);
create index if not exists bookings_quote_id_idx on public.bookings (quote_id);
create index if not exists documents_invoice_id_idx on public.documents (invoice_id);
create index if not exists documents_quote_id_idx on public.documents (quote_id);
create index if not exists documents_quote_version_id_idx on public.documents (quote_version_id);
create index if not exists documents_request_id_idx on public.documents (request_id);
create index if not exists email_messages_customer_id_idx on public.email_messages (customer_id);
create index if not exists email_messages_invoice_id_idx on public.email_messages (invoice_id);
create index if not exists email_messages_quote_id_idx on public.email_messages (quote_id);
create index if not exists invoices_customer_id_idx on public.invoices (customer_id);
create index if not exists invoices_quote_id_idx on public.invoices (quote_id);
create index if not exists payments_booking_id_idx on public.payments (booking_id);
create index if not exists quotes_created_by_idx on public.quotes (created_by);
create index if not exists quotes_current_version_id_idx on public.quotes (current_version_id);
create index if not exists travel_request_notes_author_id_idx on public.travel_request_notes (author_id);
create index if not exists travel_request_status_history_actor_id_idx on public.travel_request_status_history (actor_id);
create index if not exists travel_requests_assigned_to_idx on public.travel_requests (assigned_to);
