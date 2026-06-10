-- Run in Supabase SQL Editor to add project cover images.

alter table public.projects
  add column if not exists image_url text;
