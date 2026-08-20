import { useEffect, useRef, useState } from 'react';
import { Activity, ArrowLeft, Eye, Globe2, TrendingUp, Users } from 'lucide-react';
import { fetchStats, type AnalyticsStats } from '../lib/analytics';

const ADMIN_PASSWORD = 'aura2026';
const AUTH_KEY = 'aura_admin_auth';

export function AnalyticsDashboard({ onExit }: { onExit: () => void }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(AUTH_KEY) === '1');
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const timer = useRef<number | null>(null);

  const load = async () => {
    setLoading(true);
    setErr('');
    try {
      const s = await fetchStats(ADMIN_PASSWORD);
      setStats(s);
    } catch (e) {
      setErr(String((e as Error).message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authed) return;
    load();
    timer.current = window.setInterval(load, 5000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1');
      setAuthed(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setAuthed(false);
    setPw('');
  };

  if (!authed) {
    return (
      <div className="relative min-h-screen bg-ink-950 text-silver-100 noise flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-aura-gold/10 blur-[140px] animate-pulse-soft" />
        <div className="relative z-10 w-full max-w-sm">
          <button
            onClick={onExit}
            className="text-xs tracking-[0.2em] uppercase text-silver-500 hover:text-silver-300 transition-colors mb-8 flex items-center gap-2"
          >
            <ArrowLeft size={14} /> Back to site
          </button>
          <h1 className="text-2xl font-bold silver-text mb-1">Analytics</h1>
          <p className="text-sm text-silver-500 mb-8">Enter admin password to continue</p>
          <form onSubmit={submit} className={`flex flex-col gap-3 ${shake ? 'animate-[shake_0.5s]' : ''}`}>
            <input
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              autoFocus
              className="form-input text-center text-sm tracking-widest"
            />
            {error && <p className="text-xs text-red-400/80 -mt-1">Incorrect password</p>}
            <button type="submit" className="btn-gold rounded-xl px-5 py-3 text-sm tracking-widest uppercase">
              Unlock
            </button>
          </form>
        </div>
        <style>{`
          @keyframes shake {
            0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)}
          }
        `}</style>
      </div>
    );
  }

  const maxCount = stats ? Math.max(...stats.series.map((s) => s.count), 1) : 1;

  return (
    <div className="relative min-h-screen bg-ink-950 text-silver-100 noise">
      <div className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-aura-gold/5 blur-[140px]" />

      <header className="relative z-10 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl glass border border-aura-gold/20 flex items-center justify-center">
              <Activity size={18} className="text-aura-gold" />
            </div>
            <div>
              <h1 className="text-base font-bold silver-text leading-none">AURA Analytics</h1>
              <p className="text-[11px] text-silver-500 mt-1">Real-time visitor traffic</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:flex items-center gap-2 text-xs text-silver-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              Live
            </span>
            <button
              onClick={onExit}
              className="text-xs tracking-widest uppercase text-silver-400 hover:text-silver-200 transition-colors"
            >
              Site
            </button>
            <button
              onClick={logout}
              className="text-xs tracking-widest uppercase text-silver-400 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {err && (
          <div className="mb-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {err}
          </div>
        )}

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={<Users size={18} />}
            label="Unique Visitors"
            value={stats?.unique_visitors ?? 0}
            loading={loading && !stats}
            accent
          />
          <StatCard
            icon={<Activity size={18} />}
            label="Live Now"
            value={stats?.live_users ?? 0}
            loading={loading && !stats}
            live
          />
          <StatCard
            icon={<Eye size={18} />}
            label="Page Views"
            value={stats?.page_views ?? 0}
            loading={loading && !stats}
          />
          <StatCard
            icon={<TrendingUp size={18} />}
            label="Views Today"
            value={stats?.views_today ?? 0}
            loading={loading && !stats}
          />
        </div>

        {/* Chart */}
        <div className="glass rounded-2xl border border-white/10 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-silver-300">
              Page Views · Last 14 Days
            </h2>
            <span className="text-xs text-silver-500">{stats?.views_week ?? 0} this week</span>
          </div>
          <div className="flex items-end justify-between gap-1.5 h-44">
            {(stats?.series ?? []).map((s) => (
              <div key={s.date} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="relative w-full flex items-end justify-center h-full">
                  <div
                    className="w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-aura-gold/30 to-aura-gold transition-all duration-500 group-hover:from-aura-gold/50 group-hover:to-aura-gold-light"
                    style={{ height: `${(s.count / maxCount) * 100}%`, minHeight: s.count > 0 ? '4px' : '0' }}
                  />
                  <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-aura-gold font-semibold">
                    {s.count}
                  </div>
                </div>
                <span className="text-[9px] text-silver-600 tabular-nums">{s.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top pages */}
        <div className="glass rounded-2xl border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-5">
            <Globe2 size={16} className="text-aura-gold" />
            <h2 className="text-sm font-semibold tracking-widest uppercase text-silver-300">
              Top Pages · Last 7 Days
            </h2>
          </div>
          {stats && stats.top_pages.length > 0 ? (
            <div className="flex flex-col gap-2">
              {stats.top_pages.map((p) => {
                const pct = Math.round((p.count / (stats.top_pages[0]?.count || 1)) * 100);
                return (
                  <div key={p.path} className="flex items-center gap-3">
                    <span className="text-sm text-silver-200 w-32 sm:w-48 truncate">{p.path}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-aura-gold/40 to-aura-gold transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-silver-400 tabular-nums w-10 text-right">{p.count}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-silver-500">No page views yet.</p>
          )}
        </div>

        <p className="text-center text-[11px] text-silver-600 mt-8">
          Auto-refreshes every 5 seconds · Live window: 60s
        </p>
      </main>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  loading,
  accent,
  live,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  loading: boolean;
  accent?: boolean;
  live?: boolean;
}) {
  return (
    <div className="glass rounded-2xl border border-white/10 p-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-aura-gold/5 to-transparent pointer-events-none" />
      <div className="relative flex items-start justify-between mb-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            accent ? 'bg-aura-gold/15 text-aura-gold' : live ? 'bg-green-400/15 text-green-400' : 'bg-white/5 text-silver-300'
          }`}
        >
          {icon}
        </div>
        {live && (
          <span className="relative flex h-2 w-2 mt-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
          </span>
        )}
      </div>
      <div className="relative">
        <p className="text-3xl font-bold silver-text tabular-nums">{loading ? '—' : value.toLocaleString()}</p>
        <p className="text-[11px] tracking-widest uppercase text-silver-500 mt-1">{label}</p>
      </div>
    </div>
  );
}
