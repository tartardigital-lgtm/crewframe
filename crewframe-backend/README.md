# CrewFrame Backend

Node.js + Express + TypeScript + MongoDB API powering the CrewFrame admin panel and public site.

## Stack

- Express 4 (TypeScript, ESM)
- MongoDB via Mongoose
- JWT auth (`jsonwebtoken`) + bcrypt password hashing
- `express-rate-limit` on the public leads endpoint

## Getting started

```bash
cp .env.example .env
# edit .env — at minimum set MONGODB_URI and a real JWT_SECRET

npm install
npm run seed   # creates the admin account + sample content (only if empty)
npm run dev    # starts the API on http://localhost:4000
```

> This project was generated in a sandboxed environment without access to the
> npm registry, so `npm install` / `npm run build` could not be executed or
> verified here. Please run them yourself after unzipping and let me know if
> anything fails to compile — happy to fix it immediately.

### Environment variables (`.env`)

| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB connection string, e.g. `mongodb://127.0.0.1:27017/crewframe` or an Atlas URI |
| `JWT_SECRET` | Long random string used to sign admin session tokens — **change this** |
| `JWT_EXPIRES_IN` | Token lifetime, e.g. `7d` |
| `PORT` | API port (default `4000`) |
| `CORS_ORIGINS` | Comma-separated list of allowed frontend origins |
| `ADMIN_EMAIL` | Login email for the seeded admin account (`hello@crewframeagency.com`) |
| `ADMIN_INITIAL_PASSWORD` | Initial password for that account — **log in and change it immediately** via Settings in the admin panel |

No SMTP/email-sending is configured. `ADMIN_EMAIL` is used only as the admin
login identity (and as the "From" address shown on the public site) — leads
submitted through the contact form are stored in MongoDB and reviewed from
the admin panel's Leads inbox, not emailed out. If you want email
notifications later, add an SMTP provider (Postmark, Resend, SES, etc.) and
a `sendMail` call in `src/routes/leads.routes.ts`.

## Scripts

- `npm run dev` — start with hot reload (`tsx watch`)
- `npm run build` — type-check and compile to `dist/`
- `npm start` — run the compiled build
- `npm run seed` — idempotently create the admin account and seed sample content

## API overview

All routes are prefixed with `/api`.

### Auth

- `POST /auth/login` `{ email, password }` → `{ token, admin }`
- `GET /auth/me` (auth) → current admin
- `POST /auth/change-password` (auth) `{ currentPassword, newPassword }`

### Leads (contact form)

- `POST /leads` **public** — `{ firstName, lastName, email, trade?, message? }`, rate-limited to 20 req/15min
- `GET /leads?status=new|contacted|won|archived` (auth)
- `PATCH /leads/:id` (auth) `{ status }`
- `DELETE /leads/:id` (auth)

### Content (CMS) — same shape for each resource

`GET /` and `GET /:id` are public (used by the live site); `POST /`, `PUT /:id`, `DELETE /:id` require an admin token.

- `/work` — portfolio / Work section items
- `/crew` — crew member profiles
- `/pricing` — pricing plans
- `/testimonials` — client testimonials
- `/faq` — FAQ entries

### Dashboard

- `GET /dashboard/stats` (auth) → counts + 5 most recent leads

Send the admin token as `Authorization: Bearer <token>` on protected routes.

## Notes

- The seed script only inserts sample content into empty collections, so
  running it again after you've added real content is safe and won't
  duplicate anything.
- Image fields (`img`, `avatar`) are plain string URLs. There's no file
  upload endpoint yet — paste a hosted image URL (e.g. from S3, Cloudinary,
  or your own CDN) when creating or editing content in the admin panel.
