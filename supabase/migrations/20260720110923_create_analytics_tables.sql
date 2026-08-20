/*
# Create analytics tables (single-tenant, no auth)

## Purpose
Lightweight first-party analytics for the AURA marketing site. Tracks page views,
unique visitor sessions, and live active users. The frontend writes events
anonymously via an edge function (service-role key) which bypasses RLS, so the
anon-key client never reads analytics data directly.

## New Tables
- `analytics_sessions`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `session_id` (text, unique, not null) — random per-browser session id
  - `created_at` (timestamptz, default now()) — first-seen timestamp
  - `last_seen` (timestamptz, default now()) — updated on every heartbeat
- `analytics_page_views`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `session_id` (text, not null) — visitor session id
  - `path` (text, not null) — page path viewed
  - `referrer` (text, nullable) — document.referrer
  - `created_at` (timestamptz, default now())

## Indexes
- `analytics_sessions_last_seen_idx` on `analytics_sessions(last_seen)` — live-user queries
- `analytics_page_views_created_at_idx` on `analytics_page_views(created_at)` — time-series queries

## Security
- RLS enabled on both tables.
- INSERT open to `anon, authenticated` (the edge function tracks via service role,
  but anon insert is kept open for direct-client fallback).
- SELECT denied to anon (analytics data is admin-only); the dashboard edge function
  reads with the service role key which bypasses RLS.

## Important Notes
1. No `user_id` — no sign-in on this site.
2. `last_seen` is updated by the edge function on each heartbeat to compute live users.
3. Idempotent: safe to re-run.
*/

CREATE TABLE IF NOT EXISTS analytics_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_seen timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS analytics_page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  path text NOT NULL,
  referrer text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS analytics_sessions_last_seen_idx
  ON analytics_sessions (last_seen);

CREATE INDEX IF NOT EXISTS analytics_page_views_created_at_idx
  ON analytics_page_views (created_at);

ALTER TABLE analytics_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_page_views ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_analytics_sessions" ON analytics_sessions;
CREATE POLICY "anon_insert_analytics_sessions" ON analytics_sessions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_insert_analytics_page_views" ON analytics_page_views;
CREATE POLICY "anon_insert_analytics_page_views" ON analytics_page_views FOR INSERT
  TO anon, authenticated WITH CHECK (true);