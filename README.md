# Scott Aronin Site

**Scott Aronin – Holistic Wellness Coach** — A Next.js marketing and contact site for mind–body wellness coaching, fitness, nutrition, and meditation.

## Project Overview

Official website for **Scott Aronin**, offering personalized online wellness coaching: mind–body practices (meditation, tai chi, qigong), fitness and conditioning, and food/nutrition guidance. Content is static (no CMS); the site includes services, pricing, research, and a contact flow backed by `/api/contact`.

### Features

- **Pages:** Home (hero, about, wellness journey cards), About, Services, Pricing, Research, Contact
- **Contact:** Client-side form with `/api/contact` (Resend) for sending messages
- **UI/UX:** Tailwind CSS, Framer Motion, responsive layout, shared Navbar
- **Integrations:** Stripe (payments), Supabase (backend/auth), Resend (email)

### Tech Stack

| Layer     | Stack |
|----------|--------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| Language  | TypeScript |
| Styling   | Tailwind CSS |
| Animation | Framer Motion |
| Icons     | react-icons |
| Payments  | Stripe (`@stripe/stripe-js`, `stripe`) |
| Backend   | Supabase (`@supabase/supabase-js`), Resend |

### Project Structure

```
src/
├── app/              # App Router pages and API routes
│   ├── about/        # About page
│   ├── api/contact/  # Contact form API route
│   ├── contact/      # Contact page
│   ├── pricing/      # Pricing page
│   ├── research/     # Research page
│   ├── services/     # Services page
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/       # Reusable UI (animations, forms, layout, pages)
├── data/             # Static content (static-content.tsx)
├── types/            # TypeScript types
└── assets/           # Images and global CSS
```

### Documentation

- [docs/BRAND_COLORS.md](docs/BRAND_COLORS.md) — Brand colors and design tokens
- [docs/UX_REVIEW.md](docs/UX_REVIEW.md) — UX review and recommendations

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Environment

Create a `.env.local` in the project root for local development:

```env
# Required for contact form
RESEND_API_KEY=re_xxxx
```

Add Stripe and Supabase keys if using those features.

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit `src/app/page.tsx` to see live updates.

### Scripts

| Command        | Description           |
|----------------|-----------------------|
| `npm run dev`  | Start dev server      |
| `npm run build`| Production build      |
| `npm run start`| Start production server |
| `npm run lint` | Run ESLint            |
| `npm run typecheck` | TypeScript check (no emit) |

## Deploy

Deploy on [Vercel](https://vercel.com) or any Node.js host. Set `RESEND_API_KEY` (and Stripe/Supabase vars if used) in the environment.

- [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying)
