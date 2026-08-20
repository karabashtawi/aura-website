import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, x-admin-password",
};

const ADMIN_PASSWORD = "aura2026";
const LIVE_WINDOW_SECONDS = 60;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } }
);

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  const url = new URL(req.url);
  const action = url.searchParams.get("action") ?? (url.pathname.endsWith("/stats") ? "stats" : "track");

  try {
    if (action === "track") {
      if (req.method !== "POST") {
        return new Response(JSON.stringify({ error: "method not allowed" }), {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const body = await req.json().catch(() => ({}));
      const sessionId = String(body.session_id ?? "").slice(0, 64);
      const path = String(body.path ?? "/").slice(0, 200);
      const referrer = body.referrer ? String(body.referrer).slice(0, 300) : null;
      if (!sessionId) {
        return new Response(JSON.stringify({ error: "missing session_id" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Upsert session, update last_seen.
      const { error: upErr } = await supabase
        .from("analytics_sessions")
        .upsert(
          { session_id: sessionId, last_seen: new Date().toISOString() },
          { onConflict: "session_id" }
        );
      if (upErr) {
        return new Response(JSON.stringify({ error: upErr.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Record page view only when a path is provided.
      if (body.path) {
        await supabase.from("analytics_page_views").insert({
          session_id: sessionId,
          path,
          referrer,
        });
      }

      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "stats") {
      const auth = req.headers.get("x-admin-password") ?? "";
      if (auth !== ADMIN_PASSWORD) {
        return new Response(JSON.stringify({ error: "unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const now = new Date();
      const liveSince = new Date(now.getTime() - LIVE_WINDOW_SECONDS * 1000).toISOString();

      const [totalSessions, liveSessions, totalViews, todayViews, weekViews] = await Promise.all([
        supabase.from("analytics_sessions").select("id", { count: "exact", head: true }),
        supabase.from("analytics_sessions").select("id", { count: "exact", head: true }).gte("last_seen", liveSince),
        supabase.from("analytics_page_views").select("id", { count: "exact", head: true }),
        supabase.from("analytics_page_views").select("id", { count: "exact", head: true }).gte("created_at", new Date(now.getTime() - 86400000).toISOString()),
        supabase.from("analytics_page_views").select("id", { count: "exact", head: true }).gte("created_at", new Date(now.getTime() - 7 * 86400000).toISOString()),
      ]);

      // Views per day for last 14 days.
      const { data: series } = await supabase
        .from("analytics_page_views")
        .select("created_at")
        .gte("created_at", new Date(now.getTime() - 14 * 86400000).toISOString())
        .order("created_at", { ascending: true });

      const buckets: Record<string, number> = {};
      for (let i = 13; i >= 0; i--) {
        const d = new Date(now.getTime() - i * 86400000);
        const key = d.toISOString().slice(0, 10);
        buckets[key] = 0;
      }
      (series ?? []).forEach((row: any) => {
        const key = String(row.created_at).slice(0, 10);
        if (key in buckets) buckets[key] += 1;
      });

      // Top pages.
      const { data: topPages } = await supabase
        .from("analytics_page_views")
        .select("path")
        .gte("created_at", new Date(now.getTime() - 7 * 86400000).toISOString());

      const pageCounts: Record<string, number> = {};
      (topPages ?? []).forEach((row: any) => {
        pageCounts[row.path] = (pageCounts[row.path] ?? 0) + 1;
      });
      const topPagesArr = Object.entries(pageCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([path, count]) => ({ path, count }));

      return new Response(
        JSON.stringify({
          unique_visitors: totalSessions.count ?? 0,
          live_users: liveSessions.count ?? 0,
          page_views: totalViews.count ?? 0,
          views_today: todayViews.count ?? 0,
          views_week: weekViews.count ?? 0,
          series: Object.entries(buckets).map(([date, count]) => ({ date, count })),
          top_pages: topPagesArr,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ error: "unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
