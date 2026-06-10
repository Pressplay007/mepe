-- Run in Supabase SQL Editor to add URL slugs to articles.

alter table public.articles add column if not exists slug text;

update public.articles
set slug = regexp_replace(
  regexp_replace(lower(trim(title)), '[^a-z0-9]+', '-', 'g'),
  '(^-|-$)',
  '',
  'g'
)
where slug is null or slug = '';

update public.articles a
set slug = slug || '-' || left(replace(a.id::text, '-', ''), 8)
where a.id in (
  select id from (
    select id, count(*) over (partition by slug) as n
    from public.articles
  ) d where n > 1
);

create unique index if not exists articles_slug_key on public.articles (slug);
