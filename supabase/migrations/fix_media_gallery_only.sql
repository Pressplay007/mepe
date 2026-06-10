-- Run this if non-gallery images still appear in the gallery.
-- (Usually caused by the earlier migration defaulting every row to source = 'gallery'.)

update public.media set source = 'article' where path like 'articles/%';
update public.media set source = 'event'   where path like 'events/%';
update public.media set source = 'project' where path like 'projects/%';

update public.media m
set source = 'article'
from public.articles a
where m.url = a.image_url or a.content like '%' || m.url || '%';

update public.media m
set source = 'event'
from public.events e
where m.url = e.image_url;

update public.media m
set source = 'project'
from public.projects p
where m.url = p.image_url;

update public.media set source = 'gallery' where path like 'gallery/%';

update public.media
set source = 'content'
where source = 'gallery' and path not like 'gallery/%';
