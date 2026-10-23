-- Turn each public lead into a customer + travel request without exposing CRM to anon.

create or replace function private.as_int(value text)
returns integer
language plpgsql
immutable
set search_path = ''
as $$
begin
  if value is null or btrim(value) = '' then
    return null;
  end if;
  return round(regexp_replace(value, '[^0-9-]', '', 'g')::numeric);
exception
  when others then
    return null;
end;
$$;

create or replace function private.as_budget_cents(value text)
returns bigint
language plpgsql
immutable
set search_path = ''
as $$
declare
  cleaned text;
begin
  if value is null or btrim(value) = '' then
    return null;
  end if;
  cleaned := regexp_replace(value, '[^0-9.,]', '', 'g');
  cleaned := replace(cleaned, ',', '.');
  if cleaned = '' or cleaned = '.' then
    return null;
  end if;
  return round(cleaned::numeric * 100);
exception
  when others then
    return null;
end;
$$;

create or replace function private.as_date(value text)
returns date
language plpgsql
immutable
set search_path = ''
as $$
begin
  if value is null or btrim(value) = '' then
    return null;
  end if;
  return value::date;
exception
  when others then
    return null;
end;
$$;

create or replace function private.ingest_public_lead()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  payload jsonb := coalesce(new.payload, '{}'::jsonb);
  context jsonb := coalesce(new.context, '{}'::jsonb);
  email text := lower(btrim(coalesce(payload ->> 'email', '')));
  locale text := coalesce(new.locale, 'en');
  pref text := nullif(payload ->> 'contactPreference', '');
  currency text := upper(nullif(payload ->> 'budgetCurrency', ''));
  customer_id uuid;
  request_id uuid;
begin
  if email = '' or position('@' in email) = 0 then
    return new;
  end if;

  if locale not in ('en', 'fr') then
    locale := 'en';
  end if;

  if pref is not null and pref not in ('whatsapp', 'email', 'phone') then
    pref := null;
  end if;

  if currency is not null and currency not in ('EUR', 'CHF', 'USD') then
    currency := null;
  end if;

  insert into public.customers (
    email, first_name, last_name, phone, country, locale, contact_preference
  )
  values (
    email,
    coalesce(payload ->> 'firstName', ''),
    coalesce(payload ->> 'lastName', ''),
    nullif(payload ->> 'phone', ''),
    nullif(payload ->> 'country', ''),
    locale,
    pref
  )
  on conflict (email) do update
    set first_name = case
          when excluded.first_name <> '' then excluded.first_name
          else public.customers.first_name
        end,
        last_name = case
          when excluded.last_name <> '' then excluded.last_name
          else public.customers.last_name
        end,
        phone = coalesce(excluded.phone, public.customers.phone),
        country = coalesce(excluded.country, public.customers.country),
        contact_preference = coalesce(excluded.contact_preference, public.customers.contact_preference),
        locale = excluded.locale,
        updated_at = now()
  returning id into customer_id;

  insert into public.travel_requests (
    customer_id,
    lead_id,
    source_form,
    source_page,
    locale,
    status,
    destinations,
    destination,
    trip_type,
    date_from,
    date_to,
    dates_label,
    flexible,
    nights,
    adults,
    children,
    child_ages,
    occasion,
    styles,
    budget_amount_cents,
    budget_currency,
    interests,
    client_notes,
    raw_payload
  )
  values (
    customer_id,
    new.id,
    new.kind,
    new.source_page,
    locale,
    'new_request',
    case
      when jsonb_typeof(payload -> 'destinations') = 'array' then payload -> 'destinations'
      else '[]'::jsonb
    end,
    coalesce(nullif(context ->> 'destination', ''), nullif(payload ->> 'destination', '')),
    coalesce(nullif(payload ->> 'tripType', ''), nullif(context ->> 'package', '')),
    private.as_date(payload ->> 'dateFrom'),
    private.as_date(payload ->> 'dateTo'),
    nullif(payload ->> 'dates', ''),
    case
      when payload ->> 'flexible' in ('yes', 'true') then true
      when payload ->> 'flexible' in ('no', 'false') then false
      else null
    end,
    private.as_int(payload ->> 'nights'),
    private.as_int(payload ->> 'adults'),
    private.as_int(payload ->> 'children'),
    nullif(payload ->> 'childAges', ''),
    nullif(payload ->> 'occasion', ''),
    case
      when jsonb_typeof(payload -> 'styles') = 'array' then payload -> 'styles'
      else '[]'::jsonb
    end,
    private.as_budget_cents(payload ->> 'budget'),
    currency,
    coalesce(nullif(payload ->> 'interests', ''), nullif(payload ->> 'subject', '')),
    coalesce(nullif(payload ->> 'message', ''), nullif(payload ->> 'notes', '')),
    jsonb_build_object('payload', payload, 'context', context)
  )
  returning id into request_id;

  insert into public.travel_request_status_history (request_id, from_status, to_status, note)
  values (request_id, null, 'new_request', 'Public form');

  return new;
end;
$$;

drop trigger if exists ingest_public_lead on public.leads;
create trigger ingest_public_lead
  after insert on public.leads
  for each row
  execute function private.ingest_public_lead();

revoke all on function private.as_int(text) from public;
revoke all on function private.as_budget_cents(text) from public;
revoke all on function private.as_date(text) from public;
revoke all on function private.ingest_public_lead() from public;
