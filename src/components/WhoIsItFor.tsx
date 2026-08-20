import { Dumbbell, Heart, Footprints, Sun, GraduationCap, Gift } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Copy, Lang } from '../i18n';

const ICON_MAP: Record<string, LucideIcon> = {
  dumbbell: Dumbbell,
  heart: Heart,
  footprints: Footprints,
  sun: Sun,
  graduation: GraduationCap,
  gift: Gift,
};

export function WhoIsItFor({ copy, lang }: { copy: Copy; lang: Lang }) {
  const fontClass = lang === 'ar' ? 'font-ar' : 'font-en';
  return (
    <section id="for" className="relative py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-14 md:mb-16">
          <p className={`reveal text-[11px] tracking-[0.4em] uppercase text-aura-gold mb-5 font-semibold ${fontClass}`}>
            {copy.forSubtitle}
          </p>
          <h2 className={`reveal reveal-d1 font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] silver-text ${fontClass}`}>
            {copy.forTitle}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {copy.forCards.map((card, i) => {
            const Icon = ICON_MAP[card.icon] || Gift;
            return (
              <article
                key={i}
                className={`reveal reveal-d${(i % 3) + 1} glass rounded-2xl p-7 group transition-all duration-500 hover:border-aura-gold/30 hover:-translate-y-1`}
              >
                <div className="w-12 h-12 rounded-xl glass-sm flex items-center justify-center mb-5 group-hover:border-aura-gold/40 transition-colors">
                  <Icon size={20} className="text-silver-100 group-hover:text-aura-gold transition-colors" strokeWidth={1.6} />
                </div>
                <h3 className={`text-lg font-semibold text-silver-50 mb-3 ${fontClass}`}>{card.title}</h3>
                <p className={`text-sm text-silver-300 leading-relaxed ${fontClass}`}>{card.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
