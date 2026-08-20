import { useEffect, useMemo, useState } from 'react';

const SECRET = 'aura2026';

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds, done: diff === 0 };
}

function Unit({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <div className="relative w-[68px] h-[74px] sm:w-[104px] sm:h-[112px] rounded-2xl glass border border-white/10 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-aura-gold/10 to-transparent pointer-events-none" />
        <span className="relative text-3xl sm:text-5xl font-bold silver-text tabular-nums tracking-tight">
          {v}
        </span>
      </div>
      <span className="text-[9px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-silver-400 font-medium">
        {label}
      </span>
    </div>
  );
}

export function ComingSoon({ onUnlock }: { onUnlock: () => void }) {
  const target = useMemo(() => Date.UTC(2026, 7, 22, 23, 0, 0), []);
  const { days, hours, minutes, seconds } = useCountdown(target);
  const [pw, setPw] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [clicks, setClicks] = useState(0);

  const onLogoClick = () => {
    const n = clicks + 1;
    setClicks(n);
    if (n >= 3) {
      setShow(true);
      setClicks(0);
    }
    setTimeout(() => setClicks(0), 600);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === SECRET) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="relative min-h-screen bg-ink-950 text-silver-100 noise flex flex-col items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-aura-gold/10 blur-[140px] animate-pulse-soft" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-aura-gold/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-silver-500/5 blur-[100px]" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="animate-fade-in mb-8 cursor-pointer select-none" onClick={onLogoClick}>
          <img
            src="/aura-logo.png"
            alt="AURA"
            className="w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto animate-float drop-shadow-[0_8px_32px_rgba(201,168,106,0.35)]"
          />
        </div>

        {/* Eyebrow */}
        <p className="animate-fade-in text-[11px] sm:text-xs tracking-[0.4em] uppercase text-aura-gold/80 font-medium mb-4">
          {`Coming Soon · الأردن`}
        </p>

        {/* Headline */}
        <h1 className="animate-fade-in text-4xl sm:text-6xl font-bold silver-text tracking-tight mb-3">
          AURA
        </h1>
        <p className="animate-fade-in text-sm sm:text-base text-silver-400 tracking-widest uppercase mb-10">
          Premium Water Bottle
        </p>

        {/* Countdown */}
        <div className="animate-pop-in grid grid-cols-2 gap-x-4 gap-y-5 sm:flex sm:items-end sm:justify-center sm:gap-5 mb-10">
          <Unit value={days} label="Days · أيام" />
          <Unit value={hours} label="Hours · ساعات" />
          <Unit value={minutes} label="Min · دقائق" />
          <Unit value={seconds} label="Sec · ثواني" />
          <span className="hidden sm:block text-3xl sm:text-4xl text-aura-gold/40 font-light pb-8">:</span>
          <span className="hidden sm:block text-3xl sm:text-4xl text-aura-gold/40 font-light pb-8">:</span>
          <span className="hidden sm:block text-3xl sm:text-4xl text-aura-gold/40 font-light pb-8">:</span>
        </div>

        {/* Arabic teaser line */}
        <p className="animate-fade-in text-base sm:text-lg font-bold leading-relaxed mb-12 max-w-xl gold-text">
          انتظروا الانطلاقة الكبرى لـ AURA في الأردن... الكمية محدودة جداً!
        </p>

        {/* Admin unlock — hidden, triggered by triple-click on logo */}
        <div className="w-full max-w-xs">
          {show && (
            <form
              onSubmit={submit}
              className={`animate-fade-in flex flex-col gap-3 ${shake ? 'animate-[shake_0.5s]' : ''}`}
            >
              <input
                type="password"
                value={pw}
                onChange={(e) => {
                  setPw(e.target.value);
                  setError(false);
                }}
                placeholder="Admin password"
                autoFocus
                className="form-input text-center text-sm tracking-widest"
              />
              {error && (
                <p className="text-xs text-red-400/80 -mt-1">Incorrect password</p>
              )}
              <button type="submit" className="btn-gold rounded-xl px-5 py-2.5 text-sm tracking-widest uppercase">
                Unlock
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
