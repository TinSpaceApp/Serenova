-- Least-privilege grants and RLS. Anonymous clients may only insert a contact/planner lead.

grant usage on schema public to anon, authenticated, service_role;

alter default privileges for role postgres in schema public
  revoke select, insert, update, delete on tables from anon, authenticated;

alter default privileges for role postgres in schema public
  revoke execute on functions from anon, authenticated, public;

alter default privileges for role postgres in schema public
  revoke usage, select on sequences from anon, authenticated;

revoke all on all tables in schema public from anon, authenticated, public;
revoke all on all sequences in schema public from anon, authenticated, public;
revoke all on all functions in schema public from anon, authenticated, public;

grant insert on table public.leads to anon;

grant select, insert, update, delete on table
  public.admin_profiles,
  public.customers,
  public.travel_requests,
  public.travel_request_notes,
  public.travel_request_status_history,
  public.quote_blocks,
  public.quotes,
  public.quote_versions,
  public.quote_days,
  public.quote_line_items,
  public.bookings,
  public.invoices,
  public.payments,
  public.email_templates,
  public.email_messages,
  public.documents,
  public.admin_settings,
  public.leads
to authenticated;

grant select, insert on table
  public.quote_acceptances,
  public.activity_logs
to authenticated;

grant select on table public.webhook_events to authenticated;

grant usage, select on sequence public.quote_reference_seq to authenticated, service_role;

grant select, insert, update, delete on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;

do $$
declare
  t text;
begin
  foreach t in array array[
    'leads',
    'admin_profiles',
    'customers',
    'travel_requests',
    'travel_request_notes',
    'travel_request_status_history',
    'quote_blocks',
    'quotes',
    'quote_versions',
    'quote_days',
    'quote_line_items',
    'quote_acceptances',
    'bookings',
    'invoices',
    'payments',
    'email_templates',
    'email_messages',
    'documents',
    'activity_logs',
    'webhook_events',
    'admin_settings'
  ]
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('alter table public.%I force row level security', t);
  end loop;
end $$;

create policy leads_insert_public
on public.leads
for insert
to anon
with check (kind in ('contact', 'planner') and payload is not null);

do $$
declare
  t text;
begin
  foreach t in array array[
    'leads',
    'admin_profiles',
    'customers',
    'travel_requests',
    'travel_request_notes',
    'travel_request_status_history',
    'quote_blocks',
    'quotes',
    'quote_versions',
    'quote_days',
    'quote_line_items',
    'bookings',
    'invoices',
    'payments',
    'email_templates',
    'email_messages',
    'documents'
  ]
  loop
    execute format(
      'create policy admin_all on public.%I
         for all
         to authenticated
         using ((select private.is_admin()))
         with check ((select private.is_admin()))',
      t
    );
  end loop;
end $$;

create policy admin_select_settings
on public.admin_settings
for select
to authenticated
using ((select private.is_admin()));

create policy admin_update_settings
on public.admin_settings
for update
to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

create policy admin_select_acceptances
on public.quote_acceptances
for select
to authenticated
using ((select private.is_admin()));

create policy admin_insert_acceptances
on public.quote_acceptances
for insert
to authenticated
with check ((select private.is_admin()));

create policy admin_select_activity
on public.activity_logs
for select
to authenticated
using ((select private.is_admin()));

create policy admin_insert_activity
on public.activity_logs
for insert
to authenticated
with check ((select private.is_admin()));

create policy admin_select_webhooks
on public.webhook_events
for select
to authenticated
using ((select private.is_admin()));

create policy documents_admin_read
on storage.objects
for select
to authenticated
using (bucket_id = 'serenova-documents' and (select private.is_admin()));

create policy documents_admin_insert
on storage.objects
for insert
to authenticated
with check (bucket_id = 'serenova-documents' and (select private.is_admin()));

create policy documents_admin_update
on storage.objects
for update
to authenticated
using (bucket_id = 'serenova-documents' and (select private.is_admin()))
with check (bucket_id = 'serenova-documents' and (select private.is_admin()));

create policy documents_admin_delete
on storage.objects
for delete
to authenticated
using (bucket_id = 'serenova-documents' and (select private.is_admin()));
