# Postgres setup (admin + logs)

The server persists **admin users**, **system state (maintenance/broadcast)**, and **logs** to Postgres when `POSTGRES_URL` (or `DATABASE_URL`) is set.

## Local setup

1. Create a Postgres database and copy its connection string.
2. In `server/.env` set:
   - `ADMIN_PASSWORD=...`
   - `POSTGRES_URL=postgres://...`
3. Install deps:
   - `cd server`
   - `npm install`
4. Apply schema:
   - `npm run db:init`
5. Start:
   - `npm run dev`

## Vercel setup

1. Add a Postgres provider (Vercel Postgres / Neon / Supabase / etc).
2. In the **server** project’s Environment Variables, set:
   - `ADMIN_PASSWORD`
   - `POSTGRES_URL` (or `DATABASE_URL`)

On Vercel, the server will auto-create tables on first request (it runs the schema automatically via `server/db.js`). You can also run `npm run db:init` locally against the same URL to pre-create them.

## Notes

- If `POSTGRES_URL`/`DATABASE_URL` is **not** set, the server falls back to in-memory storage (useful for quick local dev), but **Vercel cold starts will wipe it**.
- Logs are returned as the latest 100 entries from the database.
