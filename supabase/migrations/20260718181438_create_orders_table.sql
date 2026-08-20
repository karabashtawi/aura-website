/*
# Create orders table (single-tenant, no auth)

## Purpose
Stores cash-on-delivery orders for the AURA MagSafe water bottle placed through
the checkout form on the marketing site. The site has no sign-in screen, so this
is a single-tenant schema: the anon-key frontend inserts rows directly. Orders
are also mirrored to SheetDB (best-effort); Supabase is the durable source of truth.

## New Tables
- `orders`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `full_name` (text, not null) — customer full name
  - `phone` (text, not null) — Jordanian phone 07XXXXXXXX
  - `city` (text, not null) — delivery city (Arabic or English label)
  - `address` (text, not null) — detailed delivery address
  - `notes` (text, nullable) — optional customer notes
  - `color` (text, not null) — 'white' or 'black'
  - `quantity` (integer, not null, default 1) — 1..25
  - `total` (integer, not null) — total in JOD (whole dinars)
  - `status` (text, not null, default 'pending') — order lifecycle
  - `created_at` (timestamptz, default now())

## Security
- Enable RLS on `orders`.
- The data is intentionally writable by any site visitor (no auth), so policies
  use `TO anon, authenticated`. INSERT is open (anyone can place an order);
  SELECT/UPDATE/DELETE are also open because there is no owner concept and the
  site is single-tenant. This is the documented single-tenant pattern.

## Important Notes
1. No `user_id` column and no `auth.uid()` usage — this app has no sign-in.
2. Prices stored as whole dinars (integer) for simplicity.
3. Idempotent: safe to re-run.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  city text NOT NULL,
  address text NOT NULL,
  notes text,
  color text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  total integer NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE
  TO anon, authenticated USING (true);
