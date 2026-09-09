# CrewFrame Admin

Admin console for the CrewFrame site — leads inbox, and a full CMS for Work,
Crew, Pricing, Testimonials, and FAQ content. React 18 + TypeScript + Vite +
Tailwind, matching the public site's brand system (dark charcoal surface,
orange accent, Barlow Condensed / Inter type).

## Getting started

```bash
cp .env.example .env
# edit .env if your backend runs somewhere other than http://localhost:4000

npm install
npm run dev   # http://localhost:5174
```

Requires the [`crewframe-backend`](../crewframe-backend) API running (see its
own README for setup, including `npm run seed` to create the admin login).

> As with the other CrewFrame projects, `npm install` / `npm run build`
> could not be run in the sandboxed environment this was built in — please
> run them after unzipping and let me know about any compile errors.

## Login

Sign in with the admin account created by the backend's seed script:

- Email: `hello@crewframeagency.com`
- Password: whatever `ADMIN_INITIAL_PASSWORD` was set to in the backend's `.env` (default `CrewFrame#2026`)

Change the password immediately from **Settings** after your first login.

## Structure

Each screen/component lives in its own folder with its `.tsx` and `.css`
side by side, mirroring the `crewframe-app` project:

```
src/
  components/     Sidebar, Topbar, DashboardLayout, Modal, ConfirmDialog,
                   StatCard, StatusBadge, ProtectedRoute, Icons
  pages/           Login, Overview, Leads, Work, Crew, Pricing,
                   Testimonials, Faq, Settings
  lib/             api.ts (fetch client + JWT), AuthContext.tsx
  types/           shared TypeScript interfaces
```

## What each screen does

- **Overview** — lead/content counts and the 5 most recent leads
- **Leads** — filter by status, update status inline, delete, search
- **Work** — CRUD for portfolio items (reels + long-form case studies)
- **Crew** — CRUD for crew profiles, including per-member skill bars
- **Pricing** — CRUD for pricing tiers, including feature lists
- **Testimonials** — CRUD for client quotes
- **FAQ** — CRUD for question/answer pairs
- **Settings** — change the admin password

Right now the public site's **contact form** posts straight into this
backend (`POST /api/leads`), so leads submitted on the live site show up
here immediately. The Work/Crew/Pricing/Testimonials/FAQ sections on the
public site still render from its bundled `src/data/content.ts` — editing
them here updates the database, but wiring the public site to fetch that
content live (with the bundled data as an offline fallback) is a follow-up
step, not yet done. Say the word and I'll wire it up.
