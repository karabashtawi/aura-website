import { ArrowDown, Sparkles } from 'lucide-react';
import type { Copy, Lang } from '../i18n';
import { Bottle } from './Bottle';

interface Props {
  copy: Copy;
  lang: Lang;
  onOrder: () => void;
}

export function Hero({ copy, lang, onOrder }: Props) {
  const fontClass = lang === 'ar' ? 'font-ar' : 'font-en';
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      {/* Ambient backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-ink-950 to-ink-950" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-aura-gold/10 blur-[150px]" />
        <div className="absolute bottom-0 left-10 w-[420px] h-[420px] rounded-full bg-silver-500/5 blur-[120px]" />
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

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-12 gap-10 items-center">
        {/* Copy */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass mb-7 animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <Sparkles size={13} className="text-aura-gold" />
            <span className={`text-[11px] tracking-[0.2em] uppercase text-silver-300 font-semibold ${fontClass}`}>{copy.heroBadge}</span>
          </div>

          <h1 className={`${fontClass} font-extrabold leading-[0.95] tracking-tight animate-fade-up`} style={{ animationDelay: '0.2s', opacity: 0 }}>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] silver-text">{copy.heroTitle1}</span>
            <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] gold-text">{copy.heroTitle2}</span>
          </h1>

          <p className={`mt-7 max-w-md text-base sm:text-lg text-silver-300 leading-relaxed animate-fade-up ${fontClass}`} style={{ animationDelay: '0.42s', opacity: 0 }}>
            {copy.heroDesc}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
            <button onClick={onOrder} className={`btn-gold px-8 py-4 rounded-full text-sm tracking-wide ${fontClass}`}>
              {copy.heroCta}
            </button>
            <a href="#magsafe" className={`btn-outline px-7 py-4 rounded-full text-sm font-medium tracking-wide inline-flex items-center gap-2 ${fontClass}`}>
              {lang === 'ar' ? 'اكتشف الميزة' : 'Discover MagSafe'}
              <ArrowDown size={15} />
            </a>
          </div>
        </div>

        {/* Bottle visual — real product photos */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center relative">
          <div className="relative flex items-end justify-center gap-10 sm:gap-16">
            {/* Glow */}
            <div className="absolute inset-0 -m-16 rounded-full bg-aura-gold/10 blur-[100px] animate-pulse-soft pointer-events-none" />

            {/* Black bottle — larger, front */}
            <div className="relative animate-fade-in flex items-end justify-center z-10" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <Bottle
                color="black"
                className="relative w-[200px] sm:w-[250px] lg:w-[290px] h-auto animate-float"
                style={{ filter: 'drop-shadow(0 10px 40px rgba(201,168,106,0.35))' }}
              />
            </div>

            {/* White bottle — slightly smaller, offset back */}
            <div className="relative animate-fade-in flex items-end justify-center" style={{ animationDelay: '0.5s', opacity: 0 }}>
              <Bottle
                color="white"
                className="w-[165px] sm:w-[205px] lg:w-[235px] h-auto animate-float"
                style={{ animationDelay: '0.4s', filter: 'drop-shadow(0 10px 40px rgba(201,168,106,0.35))' }}
              />
            </div>

            {/* Floating spec chips */}
            <div className="absolute -left-4 top-16 glass rounded-xl px-3.5 py-2.5 hidden sm:block animate-fade-in" style={{ animationDelay: '0.9s', opacity: 0 }}>
              <p className="text-[10px] tracking-[0.2em] uppercase text-silver-400">MagSafe</p>
              <p className="text-sm font-semibold text-silver-50">1.2L</p>
            </div>
            <div className="absolute -right-2 bottom-24 glass rounded-xl px-3.5 py-2.5 hidden sm:block animate-fade-in" style={{ animationDelay: '1.05s', opacity: 0 }}>
              <p className="text-[10px] tracking-[0.2em] uppercase text-silver-400">12h</p>
              <p className="text-sm font-semibold text-silver-50">{lang === 'ar' ? 'برودة' : 'Cold'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-silver-500 animate-fade-in" style={{ animationDelay: '1.2s', opacity: 0 }}>
        <span className={`text-[10px] tracking-[0.4em] uppercase ${fontClass}`}>{copy.heroScroll}</span>
        <div className="w-px h-10 bg-gradient-to-b from-silver-500/60 to-transparent" />
      </div>
    </section>
  );
}
