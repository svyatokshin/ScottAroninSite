# Admin Dashboard Setup

## Prerequisites

1. **Supabase project** with the provided URL and key in `.env.local`
2. **Migrations** run in Supabase (SQL Editor or CLI)
3. **Optional but recommended:** add the service role key so admin login can read the profile (avoids RLS/503 errors):

```bash
# In .env.local (server-only; do not expose to client)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Get it from Supabase Dashboard → **Settings** → **API** → **Project API keys** → **service_role** (secret).

## Run Migrations

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → SQL Editor
2. Run `supabase/migrations/20250203000000_initial_schema.sql`
3. Run `supabase/migrations/20250203000001_storage_buckets.sql`
4. Run `supabase/migrations/20250203000002_fix_profiles_rls_recursion.sql` (fixes "infinite recursion" in profiles RLS)

## Create First Admin

If you see **"Your account does not have admin access"** or **"No profile found for this account"** at `/admin/login`, run the SQL below. It creates a profile if missing and sets `role = 'admin'` for that user.

### Ensure profile and set admin (recommended)

In **Supabase** → **SQL Editor**, run (replace `your-admin@example.com` with your login email):

```sql
INSERT INTO public.profiles (id, role, full_name)
SELECT id, 'admin', COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', '')
FROM auth.users
WHERE email = 'your-admin@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

Then sign in again at `/admin/login`.

### Alternative: by user ID only

If the profile row already exists and you only need to set admin:

1. **Authentication** → **Users** → copy the user’s **User UID**
2. SQL Editor:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id = 'PASTE_USER_UID_HERE';
```

## Storage Buckets

If the storage migration fails (e.g., bucket already exists), create buckets manually in Supabase Dashboard → Storage:

- **course-media**: Public, 50MB limit, allowed: video/*, audio/*
- **blog-images**: Public, 5MB limit, allowed: image/*

## Routes

- **Admin:** `/admin` (login at `/admin/login`)
- **Blog:** `/blog`
- **Courses:** `/courses`
- **User login/signup:** `/login`
