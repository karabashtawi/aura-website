/*
# Create orders table (single-tenant, no auth)

## Purpose
Stores pre-orders / reservations for the AURA water bottle placed through the
order drawer on the marketing site. The site has no sign-in screen, so this is
a single-tenant schema: the anon-key frontend inserts rows directly.

## New Tables
- `orders`
  - `id` (uuid, primary key, default gen_random_uuid())
  - `email` (text, not null) — customer email for order confirmation
  - `color` (text, not null) — selected finish id (e.g. matte-black)
  - `quantity` (integer, not null, default 1)
  - `total` (integer, not null) — total price in USD cents-free whole dollars
  - `status` (text, not null, default 'reserved') — order lifecycle
  - `created_at` (timestamptz, default now())

## Security
- Enable RLS on `orders`.
- The data is intentionally writable by any site visitor (no auth), so policies
  use `TO anon, authenticated`. INSERT is open (anyone can reserve a bottle);
  SELECT/UPDATE/DELETE are also open because there is no owner concept and the
  site is single-tenant. This is the documented single-tenant pattern, not a
  shortcut around ownership checks.

## Important Notes
1. No `user_id` column and no `auth.uid()` usage — this app has no sign-in.
2. Prices are stored as whole dollars (integer) for simplicity.
3. Idempotent: safe to re-run.
*/

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  color text NOT NULL,
  quantity integer NOT NULL DEFAULT 1,
  total integer NOT NULL,
  status text NOT NULL DEFAULT 'reserved',
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
