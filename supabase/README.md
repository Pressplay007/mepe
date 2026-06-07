# MDA Admin Dashboard — Supabase Backend

This folder contains everything needed to power the admin dashboard with
[Supabase](https://supabase.com) (Postgres database + Auth + file storage).

The React app talks directly to Supabase from the browser using the `anon`
key. Security is enforced by **Row Level Security (RLS)** — the public site can
read content, but only authenticated admins can change it.

```
supabase/
├── schema.sql                  # tables, RLS policies, storage buckets, triggers
├── seed.sql                    # optional starter content (current team/events/etc.)
└── functions/create-admin/     # edge function to securely create admin logins
```

## 1. Create a Supabase project

1. Go to <https://supabase.com> and create a free project.
2. Wait for it to finish provisioning.

## 2. Run the schema

1. In the Supabase dashboard, open **SQL Editor → New query**.
2. Paste the contents of `schema.sql` and click **Run**.
3. (Optional) Do the same with `seed.sql` to load the current content.

This creates all tables, RLS policies, the `team-photos` and `media` storage
buckets, and a trigger that gives every new auth user an admin profile.

## 3. Add the frontend environment variables

1. In Supabase: **Project Settings → API**.
2. Copy the **Project URL** and the **anon / public** key.
3. In the project root, copy `.env.example` to `.env.local` and fill them in:

```bash
cp .env.example .env.local
```

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

4. Restart `npm run dev`.

> On Vercel/Netlify, add these same two variables in the project's
> Environment Variables settings (no `.env.local` is deployed).

## 4. Create the first admin (Super Admin)

The very first admin must be created from the Supabase dashboard:

1. **Authentication → Users → Add user** → enter an email + password
   (tick "Auto Confirm User").
2. The `on_auth_user_created` trigger automatically adds a profile row in the
   `admins` table with the role `Moderator`.
3. Promote them to Super Admin once — in **SQL Editor**, run:

```sql
update public.admins set role = 'Super Admin' where email = 'you@mepemda.org';
```

You can now sign in at `/admin/login`.

## 5. (Optional) Enable "Add Administrator" from the UI

Creating new login accounts from the browser requires the service-role key,
which must never be exposed. That work is done by the `create-admin` edge
function. To enable the **Add Administrator** button:

```bash
npm install -g supabase          # if you don't have the CLI
supabase login
supabase link --project-ref <your-project-ref>
supabase functions deploy create-admin
```

`SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` are
injected into the function automatically by Supabase.

Until the function is deployed, you can still add admins via the dashboard
(step 4) — they'll appear in Admin Management automatically.

## Notes & limitations

- **Deactivating vs. deleting admins:** the UI deletes the admin *profile*
  (revoking dashboard access via RLS). Fully removing the underlying login
  account is done from the Supabase dashboard.
- **Each admin manages their own email/password** from the Settings page.
- **Public website pages** still read from the bundled files in `src/data/`.
  Wiring those pages to read live Supabase data is the natural next step — the
  service layer in `src/services/` already returns the same shapes, so the
  public pages can call e.g. `listTeam()` / `listEvents()` directly.
