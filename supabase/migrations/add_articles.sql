-- Run in Supabase SQL Editor if articles table does not exist yet.

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

alter table public.articles enable row level security;

drop policy if exists "articles_public_read" on public.articles;
create policy "articles_public_read" on public.articles
  for select using (true);

drop policy if exists "articles_admin_write" on public.articles;
create policy "articles_admin_write" on public.articles
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());
