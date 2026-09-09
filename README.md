# CrewFrame — running everything together

This `package.json` sits at the root of the workspace, alongside the three
project folders:

```
chrewframe/
  package.json        ← this file
  crewframe-backend/
  crewframe-app/
  crewframe-admin/
```

## One-time setup

```bash
npm install                # installs "concurrently" here at the root
npm run install:all        # installs dependencies inside all 3 projects

cp crewframe-backend/.env.example crewframe-backend/.env
cp crewframe-app/.env.example crewframe-app/.env
cp crewframe-admin/.env.example crewframe-admin/.env
# edit crewframe-backend/.env — set MONGODB_URI and a real JWT_SECRET

npm run seed                # creates the admin login + sample content
```

## Every time you want to work on it

```bash
npm run dev
```

This starts all three at once, in one terminal, with colored/labeled output:

- **backend** (blue) → `http://localhost:4000`
- **site** (green) → `http://localhost:5173`
- **admin** (magenta) → `http://localhost:5174`

Stop all three together with `Ctrl+C`.

## Visiting `/admin` from the main site

The main site now redirects `http://localhost:5173/admin` straight to the
admin panel (which itself sends you to its login page if you're not signed
in yet). This is controlled by `VITE_ADMIN_URL` in `crewframe-app/.env` —
update it if you ever deploy the admin panel somewhere other than
`http://localhost:5174` (e.g. a subdomain like `admin.crewframeagency.com`
in production).
