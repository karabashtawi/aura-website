const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analytics`;

const SESSION_KEY = 'aura_analytics_sid';

function getSessionId(): string {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid =
      Date.now().toString(36) +
      '-' +
      Math.random().toString(36).slice(2, 10) +
      Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

let started = false;

export function initAnalytics() {
  if (started) return;
  started = true;

  const sid = getSessionId();
  let lastPath = '';

  const track = (path: string) => {
    if (path === lastPath) return;
    lastPath = path;
    fetch(`${FUNCTION_URL}?action=track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        session_id: sid,
        path,
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => {});
  };

  track(window.location.pathname);

  // Heartbeat every 30s to keep last_seen fresh for live-user counting.
  setInterval(() => {
    fetch(`${FUNCTION_URL}?action=track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ session_id: sid }),
      keepalive: true,
    }).catch(() => {});
  }, 30000);

  // Track SPA navigation.
  const push = history.pushState;
  history.pushState = function (...args) {
    push.apply(this, args);
    track(window.location.pathname);
  };
  window.addEventListener('popstate', () => track(window.location.pathname));
}

export interface AnalyticsStats {
  unique_visitors: number;
  live_users: number;
  page_views: number;
  views_today: number;
  views_week: number;
  series: { date: string; count: number }[];
  top_pages: { path: string; count: number }[];
}

export async function fetchStats(password: string): Promise<AnalyticsStats> {
  const res = await fetch(`${FUNCTION_URL}?action=stats`, {
    headers: {
      'Content-Type': 'application/json',
      'x-admin-password': password,
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  const data = await res.json();
  return data as AnalyticsStats;
}
