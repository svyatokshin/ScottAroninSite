# Scott Aronin Site

**Scott Aronin – Holistic Wellness Coach** — A Next.js marketing and learning platform for mind–body wellness coaching, fitness, nutrition, and meditation. Includes courses, blog, and admin dashboard.

## Project Overview

Official website for **Scott Aronin**, offering personalized online wellness coaching: mind–body practices (meditation, tai chi, qigong), fitness and conditioning, and food/nutrition guidance. Content is managed via Supabase; the site includes marketing pages, courses with lessons and quizzes, a blog, and an admin dashboard.

### Features

**Public Pages**

- **Home** — Hero, about section, wellness journey cards
- **About** — Bio and mission
- **Services** — Service offerings
- **Pricing** — Plans and pricing
- **Research** — Evidence-based findings and visual data
- **Contact** — Form with `/api/contact` (Resend)
- **Blog** — Post list and individual posts (Markdown, featured images, source links)
- **Courses** — Course catalog and premium-gated course detail

**Authenticated User Flow**

- **Login / Sign up** — Supabase Auth at `/login`
- **Onboarding** — First-time welcome wizard at `/onboarding`
- **Dashboard** — Enrolled courses, progress bars, “Continue where you left off”
- **Premium Access** — Stripe checkout + customer portal with subscription-gated course access

**Course Experience**

- Courses, modules, lessons (text + optional video/audio or YouTube embeds)
- Lesson progress tracking
- Per-lesson quizzes (multiple choice, true/false)
- Quiz attempts stored for analytics
- Premium subscription unlock for full lesson content

**Admin Dashboard** (`/admin/login` → `/admin`)

- Analytics and stats
- **Blog** — Create, edit posts; upload images
- **Courses** — CRUD courses, modules, lessons; manage quizzes
- **Enrollments** — Manage user enrollments
- **Modules** — Module management
- **Preview** — Preview draft courses/blog as users see them (admin-only QA)
- **View as User** — Switch to user-facing site from admin sidebar
- **View Admin Panel** — Switch back to admin (visible in navbar for admins only)

**Integrations**

- **Supabase** — Auth, database, storage (course-media, blog-images, course-images)
- **Resend** — Contact form email
- **Stripe** — Payments (dependencies present)

### Tech Stack

| Layer     | Stack |
|-----------|-------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| Language  | TypeScript |
| Styling   | Tailwind CSS |
| Animation | Framer Motion |
| Icons     | react-icons |
| Markdown  | react-markdown |
| Payments  | Stripe (`@stripe/stripe-js`, `stripe`) |
| Backend   | Supabase (`@supabase/supabase-js`, `@supabase/ssr`) |
| Email     | Resend |

### Database (Supabase)

- **profiles** — Role (admin/user), onboarding_completed_at
- **courses** — Title, slug, description, published, featured_image_path, default_media_type
- **modules** — Course modules with sort_order
- **lessons** — Title, content, media_type (video/audio), media_path, duration_sec
- **quiz_questions** — Per-lesson questions (multiple_choice, true_false)
- **quiz_attempts** — User responses for analytics
- **blog_posts** — Title, slug, content (Markdown), featured_image_path, source_links
- **course_enrollments** — User–course enrollment
- **lesson_progress** — Per-user lesson completion
- **user_subscriptions** — Stripe subscription state by user

### Storage Buckets

- **course-media** — Video/audio (50MB)
- **blog-images** — Post images (5MB)
- **course-images** — Course featured images (5MB)

### Project Structure

```
src/
├── app/
│   ├── about/           # About page
│   ├── actions/         # Server actions (blog, courses, enrollments, lessonProgress, onboarding, quizzes)
│   ├── admin/           # Admin dashboard (login, blog, courses, enrollments, modules)
│   ├── api/             # API routes
│   │   ├── auth/admin-login/
│   │   ├── blog-images/
│   │   ├── contact/
│   │   ├── course-images/
│   │   └── course-media/
│   ├── blog/            # Blog list + [slug]
│   ├── contact/         # Contact page
│   ├── courses/         # Course catalog + [slug]
│   ├── dashboard/       # User dashboard (enrolled courses, progress)
│   ├── login/           # User sign in / sign up
│   ├── onboarding/      # First-time user wizard
│   ├── pricing/         # Pricing page
│   ├── research/        # Research page
│   ├── services/        # Services page
│   ├── layout.tsx
│   └── page.tsx         # Home
├── components/          # UI (admin, animations, blog, courses, forms, layout, pages)
├── data/                # Static content (static-content.tsx)
├── lib/supabase/        # Supabase client, server, middleware
├── types/               # TypeScript types
└── assets/              # Global CSS, images
```

### Documentation

- [docs/ADMIN_SETUP.md](docs/ADMIN_SETUP.md) — Admin setup (detailed: env, migrations, first admin, preview, troubleshooting)
- [docs/BRAND_COLORS.md](docs/BRAND_COLORS.md) — Brand colors and design tokens
- [docs/UX_REVIEW.md](docs/UX_REVIEW.md) — UX review and recommendations

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Environment

Create `.env.local` in the project root:

```env
# Supabase (required for auth, DB, storage)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx

# Admin login (avoids RLS/503)
SUPABASE_SERVICE_ROLE_KEY=eyJxxx

# Master login (optional, bypasses Supabase auth for admin)
MASTER_EMAIL=master@yourdomain.com
MASTER_PASSWORD=your-secure-password

# Contact form
RESEND_API_KEY=re_xxxx

# Stripe (if using payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_SECRET_KEY=sk_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PREMIUM_PRICE_ID=price_xxx
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Database Migrations

Run migrations in Supabase SQL Editor or via Supabase CLI:

1. `supabase/migrations/20250203000000_initial_schema.sql`
2. `supabase/migrations/20250203000001_storage_buckets.sql`
3. `supabase/migrations/20250203000002_fix_profiles_rls_recursion.sql`
4. `supabase/migrations/20250203000003_quizzes_and_course_enhancements.sql`
5. `supabase/migrations/20250203000004_add_mixed_media_type.sql`
6. `supabase/migrations/20250204000000_blog_post_source_links.sql`
7. `supabase/migrations/20250204000001_onboarding.sql`
8. `supabase/migrations/20250204000002_lesson_progress.sql`
9. `supabase/migrations/20250204000003_quiz_attempts.sql`
10. `supabase/migrations/20250204000004_self_enroll.sql`
11. `supabase/migrations/20260512000000_stripe_subscriptions.sql`
12. `supabase/migrations/20260512000001_disable_self_enroll.sql`

See [docs/ADMIN_SETUP.md](docs/ADMIN_SETUP.md) for admin setup, first-admin creation, storage, and troubleshooting.

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command          | Description                |
|------------------|----------------------------|
| `npm run dev`    | Start dev server           |
| `npm run build`  | Production build           |
| `npm run start`  | Start production server    |
| `npm run lint`   | Run ESLint                 |
| `npm run typecheck` | TypeScript check (no emit) |

## Deploy

Deploy on [Vercel](https://vercel.com) or any Node.js host. Set environment variables for Supabase, Resend, and optionally Stripe.

- [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
