-- =============================================================
-- Optional seed data - mirrors the current hardcoded content so the
-- dashboard isn't empty. Run AFTER schema.sql, once, in the SQL Editor.
-- Safe to skip if you'd rather start from scratch.
-- =============================================================

insert into public.team_members (name, role, sort_order) values
  ('Bismark Fiifi Tetteh', 'Chairman', 1),
  ('Michael Fosu', 'Vice Chairman (F&A)', 2),
  ('Haygood Newman Gbedzeker', 'General Secretary', 3),
  ('Eyra Arnong', 'Deputy General Secretary', 4),
  ('Christiana Dziedzorm Kwadzoti', 'Treasurer', 5),
  ('Anna Enyonam Awuku', 'Financial Secretary', 6),
  ('Dzidonu Afako', 'Organizer', 7),
  ('Barnabas Ladzaglah', 'Deputy Organizer', 8),
  ('Comfort Akorfa Akpese', 'Women Organizer', 9),
  ('Elizabeth Dziedzorm Bokor', 'Women Organizer', 10),
  ('Francis Ladzaglah', 'Publicity, Information and Education', 11),
  ('Sammy Atani', 'Chief of Staff', 12),
  ('Evelyn Awusi Fosu', 'Marketing/Protocols Manager', 13)
on conflict do nothing;

insert into public.events (title, date_label, location, category, status, description) values
  ('Afenorto Festival', 'August 2026', 'Mepe Traditional Area', 'Cultural', 'Upcoming',
   'The annual Afenorto Festival celebrating the homecoming and heritage of the Mepe people.'),
  ('Annual General Meeting', 'June 15, 2026', 'Mepe Community Centre', 'Community', 'Upcoming',
   'Meeting of all MDA members to discuss the progress and future plans for the community.'),
  ('Inter-School Cultural Quiz', 'July 10, 2026', 'Vitting SHS Hall', 'Educational', 'Upcoming',
   'A competition between local schools to promote cultural awareness and academic excellence.'),
  ('Youth Leadership Workshop', 'May 20, 2026', 'MDA Secretariat', 'Youth', 'Ongoing',
   'Empowering the youth with leadership skills and community development strategies.')
on conflict do nothing;

insert into public.projects (title, category, status, progress, description, lead, budget) values
  ('MDA Office Complex', 'Infrastructure', 'In Progress', 65,
   'Construction of a multi-purpose administrative hub featuring an ICT center, library, and conference hall.',
   'Michael Fosu', 'GHS 150,000'),
  ('Fish Farming Training Farm', 'Agriculture', 'Completed', 100,
   'Establishment of a practical training center for youth to learn modern aquaculture techniques.',
   'Bismark Fiifi Tetteh', 'GHS 45,000'),
  ('Heritage Park & Museum', 'Tourism', 'Planned', 15,
   'A multi-phase project combining a cultural museum, village, and craft markets to preserve Mepe heritage.',
   'Francis Ladzaglah', 'GHS 200,000'),
  ('Scholarship Fund 2026', 'Education', 'In Progress', 40,
   'Fundraising and distribution of financial support for tertiary and technical students.',
   'Anna Enyonam Awuku', 'GHS 30,000'),
  ('Local Business Cooperative', 'Economic', 'In Progress', 80,
   'Creating a bulk buying system and financial training network for local traders.',
   'Christiana Dziedzorm Kwadzoti', 'GHS 10,000')
on conflict do nothing;

insert into public.announcements (title, date_label, category, summary, content, is_official, status) values
  ('Official Announcement of Executive Membership', '1st May 2026', 'Official',
   'The Mepe Development Association formally announces the composition of its newly constituted Executive Committee.',
   'The Mepe Development Association is pleased to formally announce the composition of its newly constituted Executive Committee.',
   true, 'Published')
on conflict do nothing;
