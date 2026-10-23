-- Allow creating an administrator directly in the Supabase Auth dashboard
-- (email + password, auto-confirm). Role is written to app_metadata only.

alter table public.admin_settings
  add column if not exists bootstrap_email extensions.citext,
  add column if not exists allow_dashboard_admin_provisioning boolean not null default true;

comment on column public.admin_settings.bootstrap_email is
  'Email that is always promoted to admin when created or updated in Auth.';

comment on column public.admin_settings.allow_dashboard_admin_provisioning is
  'When true, a user created in the Auth dashboard with email and password is promoted to admin. Keep public signup disabled while this is true.';

create or replace function private.should_provision_admin(user_row auth.users)
returns boolean
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  settings record;
begin
  select s.bootstrap_email, s.allow_dashboard_admin_provisioning
    into settings
  from public.admin_settings s
  where s.id = 1;

  if coalesce(user_row.raw_app_meta_data ->> 'role', '') = 'admin' then
    return true;
  end if;

  if settings.bootstrap_email is not null
     and user_row.email is not null
     and lower(user_row.email) = lower(settings.bootstrap_email::text) then
    return true;
  end if;

  if coalesce(settings.allow_dashboard_admin_provisioning, false)
     and user_row.email is not null
     and coalesce(user_row.encrypted_password, '') <> '' then
    return true;
  end if;

  return false;
end;
$$;

create or replace function private.prepare_admin_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if private.should_provision_admin(new) then
    new.raw_app_meta_data :=
      coalesce(new.raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb;
  end if;
  return new;
end;
$$;

create or replace function private.sync_admin_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if coalesce(new.raw_app_meta_data ->> 'role', '') = 'admin'
     and new.email is not null then
    insert into public.admin_profiles (id, email, display_name, locale, is_active)
    values (new.id, new.email, split_part(new.email, '@', 1), 'fr', true)
    on conflict (id) do update
      set email = excluded.email,
          is_active = true,
          updated_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists prepare_admin_user on auth.users;
create trigger prepare_admin_user
  before insert or update on auth.users
  for each row
  execute function private.prepare_admin_user();

drop trigger if exists sync_admin_profile on auth.users;
create trigger sync_admin_profile
  after insert or update on auth.users
  for each row
  execute function private.sync_admin_profile();

revoke all on function private.should_provision_admin(auth.users) from public;
revoke all on function private.prepare_admin_user() from public;
revoke all on function private.sync_admin_profile() from public;
