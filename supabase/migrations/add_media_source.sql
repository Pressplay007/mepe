-- Only Admin → Media/Gallery uploads should appear in the public gallery.
-- Article/event/project images are storage-only and must never use source = 'gallery'.

alter table public.media
  add column if not exists source text;

update public.media
set source = 'article'
where path like 'articles/%';

update public.media
set source = 'event'
where path like 'events/%';

update public.media
set source = 'project'
where path like 'projects/%';

update public.media m
set source = 'article'
from public.articles a
where coalesce(m.source, '') not in ('article', 'event', 'project')
  and (
    m.url = a.image_url
    or a.content like '%' || m.url || '%'
  );

update public.media m
set source = 'event'
from public.events e
where coalesce(m.source, '') not in ('article', 'event', 'project')
  and m.url = e.image_url;

update public.media m
set source = 'project'
from public.projects p
where coalesce(m.source, '') not in ('article', 'event', 'project')
  and m.url = p.image_url;

-- Explicit gallery uploads live under gallery/ and are the only public gallery items.
update public.media
set source = 'gallery'
where path like 'gallery/%';

-- Legacy rows that are not gallery uploads.
update public.media
set source = 'content'
where source is null;

alter table public.media
  alter column source set not null;

create index if not exists media_source_idx on public.media (source);
