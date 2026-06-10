-- =============================================================
-- Mepe Development Association - Admin Dashboard Backend Schema
-- Run this in the Supabase SQL Editor (Dashboard -> SQL -> New query)
-- =============================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";

-- ---------- Enums ----------
do $$ begin
  create type admin_role as enum ('Super Admin', 'Admin', 'Moderator');
exception when duplicate_object then null; end $$;

do $$ begin
  create type admin_status as enum ('Active', 'Inactive');
exception when duplicate_object then null; end $$;

do $$ begin
  create type event_category as enum ('Cultural', 'Educational', 'Community', 'Youth');
exception when duplicate_object then null; end $$;

do $$ begin
  create type event_status as enum ('Upcoming', 'Past', 'Ongoing');
exception when duplicate_object then null; end $$;

do $$ begin
  create type project_status as enum ('In Progress', 'Completed', 'Planned');
exception when duplicate_object then null; end $$;

do $$ begin
  create type announcement_status as enum ('Published', 'Scheduled', 'Draft');
exception when duplicate_object then null; end $$;

-- ---------- Tables ----------

-- Admin profiles. Each row maps 1:1 to a Supabase Auth user (auth.users).
create table if not exists public.admins (
  id          uuid primary key references auth.users (id) on delete cascade,
  name        text not null,
  email       text not null unique,
  role        admin_role not null default 'Moderator',
  status      admin_status not null default 'Active',
  last_login  timestamptz,
  created_at  timestamptz not null default now()
);

create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null,
  image_url   text,
  bio         text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.announcements (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date_label  text not null,
  category    text not null default 'General',
  summary     text not null default '',
  content     text not null default '',
  is_official boolean not null default false,
  status      announcement_status not null default 'Published',
  created_at  timestamptz not null default now()
);

create table if not exists public.articles (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text unique,
  date_label  text not null,
  category    text not null default 'News',
  summary     text not null default '',
  content     text not null default '',
  author      text,
  image_url   text,
  status      announcement_status not null default 'Draft',
  created_at  timestamptz not null default now()
);

create table if not exists public.events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  date_label  text not null,
  location    text not null default '',
  category    event_category not null default 'Community',
  status      event_status not null default 'Upcoming',
  description text not null default '',
  image_url   text,
  created_at  timestamptz not null default now()
);

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  category    text not null default '',
  status      project_status not null default 'Planned',
  progress    int not null default 0 check (progress between 0 and 100),
  description text not null default '',
  lead        text not null default '',
  budget      text,
  image_url   text,
  created_at  timestamptz not null default now()
);

create table if not exists public.media (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  path        text not null,
  url         text not null,
  type        text not null default 'Image',
  size_bytes  bigint not null default 0,
  source      text not null,
  created_at  timestamptz not null default now()
);

create table if not exists public.activity_log (
  id          uuid primary key default gen_random_uuid(),
  type        text not null,
  action      text not null,
  actor       text,
  created_at  timestamptz not null default now()
);

-- ---------- Helper: is the current user an admin? ----------
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where id = auth.uid() and status = 'Active'
  );
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where id = auth.uid() and role = 'Super Admin' and status = 'Active'
  );
$$;

-- ---------- Row Level Security ----------
alter table public.admins        enable row level security;
alter table public.team_members  enable row level security;
alter table public.announcements enable row level security;
alter table public.articles      enable row level security;
alter table public.events        enable row level security;
alter table public.projects      enable row level security;
alter table public.media         enable row level security;
alter table public.activity_log  enable row level security;

-- Public content: anyone can read; only authenticated admins can write.
do $$
declare t text;
begin
  foreach t in array array['team_members','announcements','articles','events','projects','media']
  loop
    execute format('drop policy if exists "%s_public_read" on public.%I;', t, t);
    execute format('create policy "%s_public_read" on public.%I for select using (true);', t, t);

    execute format('drop policy if exists "%s_admin_write" on public.%I;', t, t);
    execute format('create policy "%s_admin_write" on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin());', t, t);
  end loop;
end $$;

-- Admins table: an admin can read all admin rows.
drop policy if exists "admins_read" on public.admins;
create policy "admins_read" on public.admins
  for select to authenticated using (public.is_admin());

-- An admin can update their own profile (name only, enforced in app).
drop policy if exists "admins_update_self" on public.admins;
create policy "admins_update_self" on public.admins
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

-- Super admins can manage all admin rows.
drop policy if exists "admins_super_manage" on public.admins;
create policy "admins_super_manage" on public.admins
  for all to authenticated using (public.is_super_admin()) with check (public.is_super_admin());

-- Activity log: admins can read & insert.
drop policy if exists "activity_read" on public.activity_log;
create policy "activity_read" on public.activity_log
  for select to authenticated using (public.is_admin());

drop policy if exists "activity_insert" on public.activity_log;
create policy "activity_insert" on public.activity_log
  for insert to authenticated with check (public.is_admin());

-- ---------- Storage buckets ----------
insert into storage.buckets (id, name, public)
values ('team-photos', 'team-photos', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Storage policies: public read, authenticated admin write/delete.
do $$
declare b text;
begin
  foreach b in array array['team-photos','media']
  loop
    execute format($f$drop policy if exists "%s_read" on storage.objects;$f$, b);
    execute format($f$create policy "%s_read" on storage.objects for select using (bucket_id = %L);$f$, b, b);

    execute format($f$drop policy if exists "%s_write" on storage.objects;$f$, b);
    execute format($f$create policy "%s_write" on storage.objects for insert to authenticated with check (bucket_id = %L and public.is_admin());$f$, b, b);

    execute format($f$drop policy if exists "%s_update" on storage.objects;$f$, b);
    execute format($f$create policy "%s_update" on storage.objects for update to authenticated using (bucket_id = %L and public.is_admin());$f$, b, b);

    execute format($f$drop policy if exists "%s_delete" on storage.objects;$f$, b);
    execute format($f$create policy "%s_delete" on storage.objects for delete to authenticated using (bucket_id = %L and public.is_admin());$f$, b, b);
  end loop;
end $$;

-- ---------- Auto-create admin profile on first login (optional) ----------
-- When you create an auth user via the dashboard, this trigger creates a
-- matching profile row so they appear in Admin Management immediately.
create or replace function public.handle_new_admin_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.admins (id, name, email, role, status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce((new.raw_user_meta_data->>'role')::admin_role, 'Moderator'),
    'Active'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_admin_user();
