-- Quote versions, bookings, invoices, payments, mail, audit, settings seed.

create table public.quote_versions (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes (id) on delete cascade,
  version_number integer not null check (version_number > 0),
  title text not null,
  destination text,
  date_from date,
  date_to date,
  duration_nights integer check (duration_nights is null or duration_nights >= 0),
  travellers_adults integer,
  travellers_children integer,
  currency text not null check (currency in ('EUR', 'CHF', 'USD')),
  subtotal_cents bigint not null default 0,
  tax_cents bigint not null default 0,
  total_cents bigint not null default 0 check (total_cents >= 0),
  tax_enabled boolean not null default false,
  tax_label text,
  tax_rate_bps integer not null default 0 check (tax_rate_bps >= 0),
  deposit_type text not null default 'percent' check (deposit_type in ('percent', 'fixed')),
  deposit_percent numeric(5, 2) check (deposit_percent is null or (deposit_percent >= 0 and deposit_percent <= 100)),
  deposit_amount_cents bigint not null default 0 check (deposit_amount_cents >= 0),
  deposit_due_at date,
  balance_cents bigint not null default 0 check (balance_cents >= 0),
  includes text,
  excludes text,
  booking_terms text,
  cancellation_terms text,
  payment_terms text,
  practical_info text,
  issued_at date,
  valid_until date,
  public_token_hash text unique,
  public_token_expires_at timestamptz,
  public_token_revoked_at timestamptz,
  locked_at timestamptz,
  pdf_storage_path text,
  created_at timestamptz not null default now(),
  unique (quote_id, version_number)
);

create index quote_versions_quote_id_idx on public.quote_versions (quote_id);

alter table public.quotes
  add constraint quotes_current_version_id_fkey
  foreign key (current_version_id)
  references public.quote_versions (id)
  on delete set null;

create table public.quote_days (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.quote_versions (id) on delete cascade,
  day_number integer not null check (day_number > 0),
  title text not null,
  destination text,
  description text,
  activities text,
  lodging text,
  meals text,
  inclusions text,
  extras text,
  sort_order integer not null default 0,
  unique (version_id, day_number)
);

create index quote_days_version_id_idx on public.quote_days (version_id, sort_order);

create table public.quote_line_items (
  id uuid primary key default gen_random_uuid(),
  version_id uuid not null references public.quote_versions (id) on delete cascade,
  kind text not null check (kind in (
    'lodging',
    'transport',
    'guide',
    'park_fees',
    'activity',
    'transfer',
    'other',
    'discount'
  )),
  description text not null,
  quantity numeric(10, 2) not null default 1 check (quantity >= 0),
  unit_amount_cents bigint not null default 0,
  amount_cents bigint not null default 0,
  sort_order integer not null default 0
);

create index quote_line_items_version_id_idx on public.quote_line_items (version_id, sort_order);

create table public.quote_acceptances (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid not null references public.quotes (id) on delete restrict,
  version_id uuid not null references public.quote_versions (id) on delete restrict,
  accepted_at timestamptz not null default now(),
  declared_name text not null,
  declared_email extensions.citext not null,
  terms_version text,
  consent_text text not null,
  ip_hash bytea,
  user_agent text,
  created_at timestamptz not null default now()
);

create index quote_acceptances_quote_id_idx on public.quote_acceptances (quote_id);
create unique index quote_acceptances_version_id_uidx on public.quote_acceptances (version_id);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.travel_requests (id) on delete restrict,
  quote_id uuid not null references public.quotes (id) on delete restrict,
  quote_version_id uuid not null references public.quote_versions (id) on delete restrict,
  customer_id uuid not null references public.customers (id) on delete restrict,
  status text not null default 'awaiting_deposit' check (status in (
    'awaiting_deposit',
    'deposit_paid',
    'confirmed',
    'completed',
    'cancelled',
    'refund_in_progress'
  )),
  currency text not null check (currency in ('EUR', 'CHF', 'USD')),
  total_cents bigint not null check (total_cents >= 0),
  deposit_expected_cents bigint not null check (deposit_expected_cents >= 0),
  deposit_received_cents bigint not null default 0 check (deposit_received_cents >= 0),
  balance_cents bigint not null check (balance_cents >= 0),
  balance_due_at date,
  stripe_customer_id text,
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (quote_version_id)
);

create index bookings_request_id_idx on public.bookings (request_id);
create index bookings_status_idx on public.bookings (status);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings (id) on delete restrict,
  quote_id uuid not null references public.quotes (id) on delete restrict,
  quote_version_id uuid not null references public.quote_versions (id) on delete restrict,
  customer_id uuid not null references public.customers (id) on delete restrict,
  kind text not null check (kind in ('deposit', 'balance')),
  reference text not null unique,
  status text not null default 'draft' check (status in (
    'draft',
    'pending_review',
    'sent',
    'paid',
    'void',
    'failed'
  )),
  currency text not null check (currency in ('EUR', 'CHF', 'USD')),
  amount_cents bigint not null check (amount_cents >= 0),
  quote_total_cents bigint not null check (quote_total_cents >= 0),
  balance_remaining_cents bigint not null check (balance_remaining_cents >= 0),
  due_at date,
  stripe_invoice_id text unique,
  hosted_invoice_url text,
  invoice_pdf_url text,
  sent_at timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (quote_version_id, kind)
);

create index invoices_status_idx on public.invoices (status);
create index invoices_booking_id_idx on public.invoices (booking_id);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices (id) on delete restrict,
  booking_id uuid references public.bookings (id) on delete restrict,
  provider text not null default 'stripe' check (provider in ('stripe')),
  provider_event_id text,
  stripe_payment_intent_id text,
  stripe_charge_id text,
  status text not null check (status in (
    'pending',
    'succeeded',
    'failed',
    'refunded',
    'canceled'
  )),
  amount_cents bigint not null check (amount_cents >= 0),
  currency text not null check (currency in ('EUR', 'CHF', 'USD')),
  paid_at timestamptz,
  failure_code text,
  created_at timestamptz not null default now(),
  unique (provider, provider_event_id)
);

create index payments_invoice_id_idx on public.payments (invoice_id);
create index payments_status_idx on public.payments (status);

create table public.email_templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null check (slug in (
    'request_received',
    'new_request_admin',
    'info_request',
    'quote_sent',
    'quote_reminder',
    'quote_accepted',
    'deposit_invoice_sent',
    'payment_reminder',
    'payment_confirmed',
    'booking_confirmed',
    'quote_expired',
    'quote_new_version'
  )),
  locale text not null check (locale in ('en', 'fr')),
  subject text not null,
  preview_text text,
  body_html text,
  body_text text,
  approved boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (slug, locale)
);

create table public.email_messages (
  id uuid primary key default gen_random_uuid(),
  template_slug text,
  locale text check (locale is null or locale in ('en', 'fr')),
  to_email extensions.citext not null,
  reply_to text,
  request_id uuid references public.travel_requests (id) on delete set null,
  quote_id uuid references public.quotes (id) on delete set null,
  invoice_id uuid references public.invoices (id) on delete set null,
  customer_id uuid references public.customers (id) on delete set null,
  resend_id text unique,
  status text not null default 'queued' check (status in (
    'queued',
    'submitted',
    'sent',
    'delivered',
    'bounced',
    'complained',
    'failed'
  )),
  error text,
  sent_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now()
);

create index email_messages_request_id_idx on public.email_messages (request_id);
create index email_messages_status_idx on public.email_messages (status);
create index email_messages_created_at_idx on public.email_messages (created_at desc);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.travel_requests (id) on delete set null,
  quote_id uuid references public.quotes (id) on delete set null,
  quote_version_id uuid references public.quote_versions (id) on delete set null,
  invoice_id uuid references public.invoices (id) on delete set null,
  kind text not null check (kind in ('quote_pdf', 'invoice_pdf', 'receipt', 'other')),
  bucket_id text not null default 'serenova-documents',
  storage_path text not null,
  filename text not null,
  created_at timestamptz not null default now(),
  unique (bucket_id, storage_path)
);

create table public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.admin_profiles (id) on delete set null,
  actor_type text not null check (actor_type in ('admin', 'system', 'customer', 'webhook')),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index activity_logs_entity_idx on public.activity_logs (entity_type, entity_id, created_at desc);
create index activity_logs_created_at_idx on public.activity_logs (created_at desc);

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('stripe', 'resend')),
  provider_event_id text not null,
  event_type text not null,
  processed_at timestamptz,
  error text,
  payload jsonb,
  created_at timestamptz not null default now(),
  unique (provider, provider_event_id)
);

create table public.admin_settings (
  id smallint primary key default 1 check (id = 1),
  legal_name text,
  trading_name text not null default 'Serenova',
  address_line1 text,
  address_line2 text,
  postal_code text,
  city text,
  country text,
  contact_email text,
  contact_phone text,
  default_currency text not null default 'EUR' check (default_currency in ('EUR', 'CHF', 'USD')),
  allowed_currencies text[] not null default array['EUR', 'CHF', 'USD']::text[],
  default_deposit_percent numeric(5, 2) not null default 30.00
    check (default_deposit_percent >= 0 and default_deposit_percent <= 100),
  default_quote_validity_days integer not null default 14 check (default_quote_validity_days > 0),
  default_payment_due_days integer not null default 14 check (default_payment_due_days > 0),
  tax_enabled boolean not null default false,
  tax_label text,
  tax_rate_bps integer not null default 0 check (tax_rate_bps >= 0),
  includes_default text,
  excludes_default text,
  booking_terms text,
  cancellation_terms text,
  payment_terms text,
  practical_info text,
  auto_prepare_deposit_invoice boolean not null default true,
  require_admin_send_deposit_invoice boolean not null default true,
  auto_reminders_enabled boolean not null default false,
  from_name text not null default 'Serenova',
  reply_to_email text,
  notification_email text,
  data_retention_days integer check (data_retention_days is null or data_retention_days > 0),
  updated_by uuid references public.admin_profiles (id) on delete set null,
  updated_at timestamptz not null default now()
);

do $$
declare
  t text;
begin
  foreach t in array array[
    'admin_profiles',
    'customers',
    'travel_requests',
    'quote_blocks',
    'quotes',
    'bookings',
    'invoices',
    'email_templates',
    'admin_settings'
  ]
  loop
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function private.set_updated_at()',
      t
    );
  end loop;
end $$;

insert into public.admin_settings (
  id,
  trading_name,
  city,
  country,
  default_currency,
  allowed_currencies,
  default_deposit_percent,
  default_quote_validity_days,
  default_payment_due_days,
  tax_enabled,
  tax_rate_bps,
  auto_prepare_deposit_invoice,
  require_admin_send_deposit_invoice,
  auto_reminders_enabled,
  from_name
) values (
  1,
  'Serenova',
  'Lausanne',
  'Switzerland',
  'EUR',
  array['EUR', 'CHF', 'USD']::text[],
  30.00,
  14,
  14,
  false,
  0,
  true,
  true,
  false,
  'Serenova'
);

insert into public.email_templates (slug, locale, subject, approved)
select slug, locale, subject, false
from (
  values
    ('request_received', 'en', 'We received your travel request'),
    ('request_received', 'fr', 'Nous avons bien reçu votre demande'),
    ('new_request_admin', 'en', 'New travel request'),
    ('new_request_admin', 'fr', 'Nouvelle demande de voyage'),
    ('info_request', 'en', 'A few details to continue your journey'),
    ('info_request', 'fr', 'Quelques précisions pour poursuivre votre voyage'),
    ('quote_sent', 'en', 'Your Serenova proposal'),
    ('quote_sent', 'fr', 'Votre proposition Serenova'),
    ('quote_reminder', 'en', 'Your proposal is still waiting'),
    ('quote_reminder', 'fr', 'Votre proposition est toujours en attente'),
    ('quote_accepted', 'en', 'Thank you — your proposal is accepted'),
    ('quote_accepted', 'fr', 'Merci — votre proposition est acceptée'),
    ('deposit_invoice_sent', 'en', 'Your deposit invoice'),
    ('deposit_invoice_sent', 'fr', 'Votre facture d’acompte'),
    ('payment_reminder', 'en', 'Reminder: your deposit is still due'),
    ('payment_reminder', 'fr', 'Rappel : votre acompte est en attente'),
    ('payment_confirmed', 'en', 'Payment received'),
    ('payment_confirmed', 'fr', 'Paiement reçu'),
    ('booking_confirmed', 'en', 'Your safari is confirmed'),
    ('booking_confirmed', 'fr', 'Votre safari est confirmé'),
    ('quote_expired', 'en', 'Your proposal has expired'),
    ('quote_expired', 'fr', 'Votre proposition a expiré'),
    ('quote_new_version', 'en', 'An updated proposal is ready'),
    ('quote_new_version', 'fr', 'Une nouvelle version de votre proposition est prête')
) as templates(slug, locale, subject);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'serenova-documents',
  'serenova-documents',
  false,
  20971520,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do nothing;

comment on table public.leads is 'Immutable archive of original public form submissions.';
comment on table public.travel_requests is 'CRM dossier created from a public lead or by an administrator.';
comment on table public.admin_settings is 'Singleton commercial configuration. Defaults are 30% deposit, 14-day validity, EUR.';
comment on function private.is_admin() is 'Authorization helper. Reads app_metadata.role only — never user_metadata.';
