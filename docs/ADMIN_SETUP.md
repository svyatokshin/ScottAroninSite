# Admin Dashboard Setup

Complete guide for setting up and using the Scott Aronin admin dashboard.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Forgot Password (Auth URLs)](#forgot-password-auth-urls)
4. [Database Migrations](#database-migrations)
5. [Storage Buckets](#storage-buckets)
6. [Create First Admin](#create-first-admin)
7. [Admin Routes and Features](#admin-routes-and-features)
8. [Content Management](#content-management)
9. [Preview and QA](#preview-and-qa)
10. [View as User / Admin Panel Switching](#view-as-user--admin-panel-switching)
11. [Troubleshooting](#troubleshooting)
12. [Security Notes](#security-notes)

---

## Prerequisites

- **Node.js 18+** — For running the Next.js app
- **Supabase account** — [Sign up](https://supabase.com) if needed
- **Supabase project** — Create a new project in the [Supabase Dashboard](https://supabase.com/dashboard)

---

## Environment Variables

Create `.env.local` in the project root with the following variables.

### Required

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Supabase Dashboard → Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key (safe for client) | Supabase Dashboard → Settings → API → Project API keys → anon public |

### Recommended for Admin

| Variable | Description | Where to Find |
|----------|-------------|---------------|
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server-only) | Supabase Dashboard → Settings → API → Project API keys → service_role |

**Important:** The service role key bypasses Row Level Security (RLS). It is used for admin login to read profiles. Without it, you may see "No profile found" or 503 errors at `/admin/login`. **Never expose this key to the client.**

### Optional

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | Contact form email (Resend) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe payments |
| `STRIPE_SECRET_KEY` | Stripe payments |

---

## Forgot Password (Auth URLs)

For forgot-password to work, configure Supabase Auth:

1. **Supabase Dashboard** → **Authentication** → **URL Configuration**
2. Set **Site URL** to your app URL (e.g. `https://yoursite.com` or `http://localhost:3000`)
3. Add these to **Redirect URLs**:
   - `http://localhost:3000/auth/confirm` (local dev)
   - `https://yoursite.com/auth/confirm` (production)
   - `http://localhost:3000/auth/update-password`
   - `https://yoursite.com/auth/update-password`

4. **Authentication** → **Email Templates** → **Reset Password**: Ensure the link uses the confirm route. Example:
   ```
   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/update-password
   ```

---

## Database Migrations

Run migrations in order via **Supabase Dashboard → SQL Editor** (or Supabase CLI).

### Migration Order

| Order | File | Purpose |
|-------|------|---------|
| 1 | `20250203000000_initial_schema.sql` | Core tables: profiles, courses, modules, lessons, blog_posts, course_enrollments |
| 2 | `20250203000001_storage_buckets.sql` | Storage bucket policies |
| 3 | `20250203000002_fix_profiles_rls_recursion.sql` | Fixes profiles RLS infinite recursion |
| 4 | `20250203000003_quizzes_and_course_enhancements.sql` | quiz_questions, quiz_attempts, course enhancements |
| 5 | `20250203000004_add_mixed_media_type.sql` | Adds `mixed` default_media_type for courses |
| 6 | `20250204000000_blog_post_source_links.sql` | source_links column for blog posts |
| 7 | `20250204000001_onboarding.sql` | onboarding_completed_at for profiles |
| 8 | `20250204000002_lesson_progress.sql` | lesson_progress table |
| 9 | `20250204000003_quiz_attempts.sql` | quiz_attempts table |
| 10 | `20250204000004_self_enroll.sql` | self_enroll_enabled for courses |

### How to Run

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → your project
2. Go to **SQL Editor**
3. For each migration file:
   - Open `supabase/migrations/<filename>.sql` in your editor
   - Copy the full SQL content
   - Paste into the SQL Editor
   - Click **Run**
4. Verify tables exist under **Table Editor**

---

## Storage Buckets

The app uses three Supabase Storage buckets. Create them manually if migrations fail (e.g., bucket already exists).

### Bucket Configuration

| Bucket | Public | Max File Size | Allowed MIME Types |
|--------|--------|---------------|--------------------|
| `course-media` | Yes | 50 MB | video/*, audio/* |
| `blog-images` | Yes | 5 MB | image/* |
| `course-images` | Yes | 5 MB | image/* |

### Manual Creation

1. Supabase Dashboard → **Storage**
2. Click **New bucket**
3. Name: `course-media` (or `blog-images`, `course-images`)
4. Enable **Public bucket** for public access
5. Set file size limit and allowed types as above
6. Create bucket

---

## Create First Admin

Admins must have `role = 'admin'` in the `profiles` table. New users get `role = 'user'` by default.

### Method 1: By Email (Recommended)

1. Sign up at `/login` or `/admin/login` with your email
2. In **Supabase → SQL Editor**, run (replace `your-admin@example.com` with your email):

```sql
INSERT INTO public.profiles (id, role, full_name)
SELECT id, 'admin', COALESCE(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', '')
FROM auth.users
WHERE email = 'your-admin@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

3. Sign out and sign in again at `/admin/login`

### Method 2: By User ID

If the profile exists and you only need to set admin:

1. Supabase → **Authentication** → **Users** → copy the user's **User UID**
2. SQL Editor:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id = 'PASTE_USER_UID_HERE';
```

### Method 3: Create Profile and Set Admin (New User)

If the user has no profile row yet:

```sql
INSERT INTO public.profiles (id, role, full_name)
VALUES ('USER_UID_HERE', 'admin', 'Admin Name')
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

---

## Admin Routes and Features

| Route | Description |
|-------|-------------|
| `/admin/login` | Admin login (Supabase Auth) |
| `/admin` | Dashboard — stats, analytics, recent users/enrollments |
| `/admin/modules` | Create and manage modules; assign to courses |
| `/admin/courses` | Course list (published/draft); create new course |
| `/admin/courses/new` | Create new course |
| `/admin/courses/[courseId]/edit` | Edit course details, modules |
| `/admin/courses/[courseId]/lessons` | Manage lessons for a course |
| `/admin/courses/[courseId]/lessons/[moduleId]/lesson/new` | Create new lesson |
| `/admin/courses/[courseId]/lessons/[moduleId]/lesson/[lessonId]/edit` | Edit lesson, manage quiz |
| `/admin/blog` | Blog post list |
| `/admin/blog/new` | Create new blog post |
| `/admin/blog/[postId]/edit` | Edit blog post |
| `/admin/enrollments` | Manage user enrollments |
| `/admin/account` | Admin account settings |

---

## Content Management

### Courses

- **Title, slug, description** — Basic metadata
- **Published** — Draft courses are hidden from users until published
- **Self-enroll enabled** — If true, users can enroll themselves; otherwise, admin must enroll
- **Featured image** — Optional; upload to `course-images` bucket
- **Default media type** — `video`, `audio`, or `mixed` (preset for new lessons)

### Modules

- **Title** — Module name
- **Sort order** — Display order within a course
- **Course** — Assign module to a course

### Lessons

- **Title, slug, content** — Text content
- **Media type** — `video` or `audio` (or none)
- **Media** — Either:
  - **Upload file** — Video (mp4, webm) or audio (mp3, wav) to `course-media`
  - **Paste URL** — Direct media URL or **YouTube URL** (e.g. `https://www.youtube.com/watch?v=...` or `https://youtu.be/...`)
- **Duration** — Optional, in seconds
- **Quiz** — Add multiple choice or true/false questions

### Blog Posts

- **Title, slug, excerpt, content** — Markdown supported
- **Featured image** — Upload to `blog-images`
- **Published** — Draft posts hidden from users
- **Source links** — Array of `{ url, label }` for citations

---

## Preview and QA

Admins can preview draft content as users would see it.

### How to Preview

1. On any **course edit** or **blog edit** page, click **Preview**
2. Opens user-facing page in a new tab with `?preview=true`
3. Draft content is shown (bypasses `published` filter)
4. A sticky **Preview Mode — Draft Content** banner appears
5. Click **Exit Preview** to return to the admin edit page

### Preview Locations

| Admin Page | Preview Button | Opens |
|------------|----------------|-------|
| Course edit | Header | `/courses/[slug]?preview=true` |
| Blog edit | Header | `/blog/[slug]?preview=true` |
| Lesson edit | Header | `/courses/[slug]?preview=true#lesson-[id]` (scrolls to lesson) |

### Preview Shows Exact User Experience

Preview displays the page exactly as a user would see it. Admins must enroll to access lesson media (video, audio, YouTube embeds), same as regular users.

### Security

- Preview only works when the user is authenticated **and** `profiles.role === 'admin'`
- Non-admins with `?preview=true` get normal behavior (published filter applied; drafts return 404)

---

## View as User / Admin Panel Switching

Admins can switch between the admin panel and the user-facing site.

### From Admin Panel → User Site

- In the admin sidebar, click **View as User**
- Opens the homepage (`/`) in the same tab
- Use the site as a regular user would

### From User Site → Admin Panel

- When logged in as an admin, the navbar shows **View Admin Panel**
- Click to go to `/admin`
- Only visible to users with `role = 'admin'`

### Flow

1. Admin in panel → **View as User** → homepage
2. Admin on site → **View Admin Panel** → admin dashboard
3. Non-admins never see **View Admin Panel**

---

## Troubleshooting

### "Your account does not have admin access"

- Ensure `profiles.role = 'admin'` for your user (see [Create First Admin](#create-first-admin))
- Sign out and sign in again at `/admin/login`

### "No profile found for this account"

- Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local` (see [Environment Variables](#environment-variables))
- Or ensure the `profiles` table has a row for your user and RLS allows read

### 503 or RLS errors on admin login

- Add `SUPABASE_SERVICE_ROLE_KEY` to `.env.local`
- Run `20250203000002_fix_profiles_rls_recursion.sql` if not already done

### YouTube video shows black screen

- Ensure `media_path` contains the full YouTube URL (e.g. `https://www.youtube.com/watch?v=VIDEO_ID`)
- Re-save the lesson after pasting the URL
- Supported formats: `youtube.com/watch?v=`, `youtu.be/`, `youtube.com/embed/`

### Storage upload fails

- Verify bucket exists and is public
- Check file size and MIME type match bucket config
- Ensure RLS policies allow insert for authenticated users (or service role)

### Preview shows 404 for draft

- Confirm you are logged in as admin
- Ensure the URL has `?preview=true`
- Check that the course/blog slug exists in the database

---

## Security Notes

- **Service role key** — Server-only; never expose in client code or commit to git
- **Admin routes** — Protected by layout; non-admins redirect to `/admin/login`
- **Preview mode** — Admin-only; requires auth + `role === 'admin'`
- **RLS** — Supabase RLS policies enforce data access; service role bypasses for admin operations
- **Profiles** — Ensure RLS allows admins to read profiles; the fix migration addresses recursion issues
