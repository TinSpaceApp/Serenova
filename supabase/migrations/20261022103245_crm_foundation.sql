-- Serenova CRM foundation.
-- Additive only: no DROP TABLE / DROP COLUMN. Compatible with an existing empty `leads` table.

create extension if not exists citext with schema extensions;

create schema if not exists private;

revoke all on schema private from public;
grant usage on schema private to postgres, service_role, authenticated;

create or replace function private.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    auth.uid() is not null
    and coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

revoke all on function private.is_admin() from public;
grant execute on function private.is_admin() to authenticated, service_role;

create sequence if not exists public.quote_reference_seq;

create or replace function private.next_quote_reference()
returns text
language sql
security definer
set search_path = ''
as $$
  select 'SN-'
    || to_char(timezone('utc', now()), 'YYYY')
    || '-'
    || lpad(nextval('public.quote_reference_seq')::text, 4, '0');
$$;

revoke all on function private.next_quote_reference() from public;
grant execute on function private.next_quote_reference() to authenticated, service_role;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  context jsonb,
  payload jsonb not null default '{}'::jsonb,
  locale text,
  source_page text,
  created_at timestamptz not null default now(),
  constraint leads_kind_check check (kind in ('contact', 'planner')),
  constraint leads_locale_check check (locale is null or locale in ('en', 'fr'))
);

alter table public.leads add column if not exists context jsonb;
alter table public.leads add column if not exists payload jsonb;
alter table public.leads add column if not exists locale text;
alter table public.leads add column if not exists source_page text;
alter table public.leads add column if not exists created_at timestamptz default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'leads_locale_check'
      and conrelid = 'public.leads'::regclass
  ) then
    alter table public.leads
      add constraint leads_locale_check
      check (locale is null or locale in ('en', 'fr'));
  end if;
end $$;

drop policy if exists anyone_can_submit_a_lead on public.leads;

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_kind_idx on public.leads (kind);
