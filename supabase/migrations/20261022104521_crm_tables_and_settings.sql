-- CRM core tables: profiles, customers, travel requests, quote headers.

create table public.admin_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email extensions.citext not null unique,
  display_name text,
  locale text not null default 'fr' check (locale in ('en', 'fr')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default gen_random_uuid(),
  email extensions.citext not null unique,
  first_name text not null default '',
  last_name text not null default '',
  phone text,
  country text,
  locale text not null default 'en' check (locale in ('en', 'fr')),
  contact_preference text check (
    contact_preference is null
    or contact_preference in ('whatsapp', 'email', 'phone')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.travel_requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete restrict,
  lead_id uuid references public.leads (id) on delete set null,
  source_form text not null check (source_form in ('contact', 'planner')),
  source_page text,
  locale text not null default 'en' check (locale in ('en', 'fr')),
  status text not null default 'new_request' check (status in (
    'new_request',
    'under_review',
    'info_required',
    'quote_in_progress',
    'quote_sent',
    'quote_accepted',
    'deposit_requested',
    'deposit_paid',
    'booking_confirmed',
    'trip_completed',
    'quote_declined',
    'request_cancelled',
    'quote_expired',
    'payment_failed',
    'refund_in_progress'
  )),
  destinations jsonb not null default '[]'::jsonb,
  destination text,
  trip_type text,
  date_from date,
  date_to date,
  dates_label text,
  flexible boolean,
  nights integer check (nights is null or nights >= 0),
  adults integer,
  children integer,
  child_ages text,
  occasion text,
  styles jsonb not null default '[]'::jsonb,
  budget_amount_cents bigint check (budget_amount_cents is null or budget_amount_cents >= 0),
  budget_currency text check (budget_currency is null or budget_currency in ('EUR', 'CHF', 'USD')),
  accommodation_type text,
  interests text,
  client_notes text,
  assigned_to uuid references public.admin_profiles (id) on delete set null,
  raw_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index travel_requests_customer_id_idx on public.travel_requests (customer_id);
create index travel_requests_status_idx on public.travel_requests (status);
create index travel_requests_created_at_idx on public.travel_requests (created_at desc);
create index travel_requests_lead_id_idx on public.travel_requests (lead_id);

create table public.travel_request_notes (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.travel_requests (id) on delete cascade,
  author_id uuid references public.admin_profiles (id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

create index travel_request_notes_request_id_idx on public.travel_request_notes (request_id, created_at desc);

create table public.travel_request_status_history (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.travel_requests (id) on delete cascade,
  from_status text,
  to_status text not null,
  actor_id uuid references public.admin_profiles (id) on delete set null,
  note text,
  created_at timestamptz not null default now()
);

create index travel_request_status_history_request_id_idx
  on public.travel_request_status_history (request_id, created_at desc);

create table public.quote_blocks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  locale text not null default 'en' check (locale in ('en', 'fr')),
  destination text,
  description text,
  activities text,
  lodging text,
  meals text,
  inclusions text,
  extras text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.quotes (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique default private.next_quote_reference(),
  request_id uuid not null references public.travel_requests (id) on delete restrict,
  customer_id uuid not null references public.customers (id) on delete restrict,
  current_version_id uuid,
  status text not null default 'draft' check (status in (
    'draft',
    'sent',
    'viewed',
    'accepted',
    'declined',
    'expired',
    'cancelled',
    'superseded'
  )),
  currency text not null default 'EUR' check (currency in ('EUR', 'CHF', 'USD')),
  created_by uuid references public.admin_profiles (id) on delete set null,
  sent_at timestamptz,
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index quotes_request_id_idx on public.quotes (request_id);
create index quotes_customer_id_idx on public.quotes (customer_id);
create index quotes_status_idx on public.quotes (status);
