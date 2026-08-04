-- Source of truth for the D1 schema. Apply with:
--   npm run d1:schema
-- (wrangler d1 execute needs the real database_id in wrangler.toml first —
-- see the TODO there.)

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference_num TEXT UNIQUE NOT NULL,
  town TEXT,
  niche TEXT,
  client_name TEXT,
  client_phone TEXT,
  client_email TEXT,
  damage_details TEXT,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS analytics_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  town TEXT,
  niche TEXT,
  device_type TEXT,
  viewed_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Backs the email-a-login-link dashboard auth (src/access.js). token_hash is
-- SHA-256 of the raw token — the raw value only ever exists in the emailed
-- link, never at rest.
CREATE TABLE IF NOT EXISTS dashboard_tokens (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  token_hash TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at INTEGER,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_views_town_niche ON analytics_views(town, niche);
CREATE INDEX IF NOT EXISTS idx_dashboard_tokens_expires_at ON dashboard_tokens(expires_at);
