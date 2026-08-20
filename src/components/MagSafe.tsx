import { Magnet, Smartphone, Check } from 'lucide-react';
import type { Copy, Lang } from '../i18n';
import { Bottle } from './Bottle';

export function MagSafe({ copy, lang }: { copy: Copy; lang: Lang }) {
  const fontClass = lang === 'ar' ? 'font-ar' : 'font-en';
  const points = [copy.magPoint1, copy.magPoint2, copy.magPoint3];

  return (
    <section id="magsafe" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-aura-gold/6 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-16 items-center">
        {/* Visual */}
        <div className="relative flex justify-center order-2 lg:order-1">
          <div className="relative">
            <div className="absolute inset-0 -m-12 rounded-full bg-aura-gold/8 blur-[90px]" />
            {/* Phone mockup magnetically attached */}
            <div className="relative flex flex-col items-center">
              <Bottle color="black" className="w-[220px] sm:w-[280px] h-auto" />
              {/* Phone hovering on top with magnetic field lines */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-28 h-44 rounded-2xl glass-sm border border-white/15 rotate-[8deg] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-aura-gold/10 to-transparent" />
                <div className="relative text-center px-3">
                  <Smartphone size={28} className="text-silver-200 mx-auto mb-2" strokeWidth={1.4} />
                  <div className="w-10 h-10 mx-auto rounded-full border-2 border-aura-gold/60 flex items-center justify-center">
                    <Magnet size={16} className="text-aura-gold" />
                  </div>
                </div>
              </div>
              {/* Magnetic field arcs */}
              <svg className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-24 opacity-50" viewBox="0 0 200 100" fill="none">
                <ellipse cx="100" cy="50" rx="80" ry="40" stroke="#c9a86a" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6" />
                <ellipse cx="100" cy="50" rx="60" ry="28" stroke="#c9a86a" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <p className={`reveal text-[11px] tracking-[0.4em] uppercase text-aura-gold mb-5 font-semibold ${fontClass}`}>
            {lang === 'ar' ? 'الميزة الرئيسية' : 'Hero Feature'}
          </p>
          <h2 className={`reveal reveal-d1 font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] silver-text mb-6 ${fontClass}`}>
            {copy.magTitle}
          </h2>
          <p className={`reveal reveal-d2 text-silver-300 text-base sm:text-lg leading-relaxed max-w-lg mb-8 ${fontClass}`}>
            {copy.magDesc}
          </p>
          <ul className="space-y-4">
            {points.map((p, i) => (
              <li key={i} className={`reveal reveal-d${i + 3} flex items-start gap-3 ${fontClass}`}>
                <span className="mt-0.5 w-6 h-6 rounded-full glass-sm flex items-center justify-center shrink-0">
                  <Check size={13} className="text-aura-gold" strokeWidth={2.5} />
                </span>
                <span className="text-silver-200 text-sm sm:text-base">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
