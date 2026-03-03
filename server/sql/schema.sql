-- SBHS Timetable Admin Persistence
-- This schema stores admin-facing users, system state, and logs.

CREATE TABLE IF NOT EXISTS system_state (
  id INTEGER PRIMARY KEY,
  maintenance BOOLEAN NOT NULL DEFAULT FALSE,
  broadcast_message TEXT NULL,
  broadcast_type TEXT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO system_state (id, maintenance)
VALUES (1, FALSE)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS app_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NULL,
  year TEXT NULL,
  role TEXT NOT NULL DEFAULT 'Student',
  status TEXT NOT NULL DEFAULT 'Active',
  joined TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  timetable JSONB NULL
);

CREATE INDEX IF NOT EXISTS app_users_last_seen_idx ON app_users (last_seen DESC);

CREATE TABLE IF NOT EXISTS logs (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  details TEXT NULL
);

CREATE INDEX IF NOT EXISTS logs_created_at_idx ON logs (created_at DESC);
