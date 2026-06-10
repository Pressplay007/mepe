-- Run in Supabase SQL Editor to add featured image support to articles.

alter table public.articles
  add column if not exists image_url text;
