/*
# Create app_secrets table for storing API keys

1. New Tables
- `app_secrets` — stores sensitive API keys/secrets for edge functions
  - `key` (text, primary key) — the secret name
  - `value` (text, not null) — the secret value
  - `created_at` (timestamptz)
2. Security
- RLS enabled with NO policies — the table is completely locked down.
  Only the service role (used by edge functions) can read/write, bypassing RLS.
  No anon or authenticated access is possible.
*/

CREATE TABLE IF NOT EXISTS app_secrets (
  key text PRIMARY KEY,
  value text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE app_secrets ENABLE ROW LEVEL SECURITY;
