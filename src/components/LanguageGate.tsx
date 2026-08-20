import { useState } from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import type { Lang } from '../i18n';
import { COPY } from '../i18n';

interface Props {
  onChoose: (lang: Lang) => void;
}

export function LanguageGate({ onChoose }: Props) {
  const [hovered, setHovered] = useState<Lang | null>(null);
  const c = COPY.en; // gate uses neutral labels until a choice is made

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-950 animate-fade-in">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-aura-gold/10 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-silver-500/5 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6 text-center animate-gate-in">
        {/* Logo mark */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass mb-8">
          <Globe size={26} className="text-aura-gold" strokeWidth={1.6} />
        </div>

        <p className="text-[11px] tracking-[0.4em] uppercase text-aura-gold mb-4 font-semibold">AURA</p>
        <h1 className="font-en text-4xl sm:text-5xl font-extrabold silver-text mb-3">{c.gateTitle}</h1>
        <p className="text-silver-400 text-sm sm:text-base mb-12">{c.gateSubtitle}</p>

        {/* Choice cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-lg mx-auto">
          <button
            onMouseEnter={() => setHovered('ar')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChoose('ar')}
            className={`group relative rounded-2xl p-8 sm:p-10 border transition-all duration-500 overflow-hidden ${
              hovered === 'ar'
                ? 'border-aura-gold/60 bg-aura-gold/5 scale-[1.02]'
                : 'border-white/10 glass'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aura-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <p className="font-ar text-4xl sm:text-5xl font-extrabold text-silver-50 mb-2" dir="rtl">العربية</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-silver-500">Arabic · RTL</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-aura-gold text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                دخول <ArrowRight size={12} className="rotate-180" />
              </div>
            </div>
          </button>

          <button
            onMouseEnter={() => setHovered('en')}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onChoose('en')}
            className={`group relative rounded-2xl p-8 sm:p-10 border transition-all duration-500 overflow-hidden ${
              hovered === 'en'
                ? 'border-aura-gold/60 bg-aura-gold/5 scale-[1.02]'
                : 'border-white/10 glass'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-aura-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <p className="font-en text-4xl sm:text-5xl font-extrabold text-silver-50 mb-2">English</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-silver-500">English · LTR</p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-aura-gold text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Enter <ArrowRight size={12} />
              </div>
            </div>
          </button>
        </div>

        <p className="mt-10 text-[11px] tracking-[0.3em] uppercase text-silver-600">
          Your choice will be remembered
        </p>
      </div>
    </div>
  );
}
