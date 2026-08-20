import type { Copy, Lang } from '../i18n';

export function Marquee({ copy, lang }: { copy: Copy; lang: Lang }) {
  const fontClass = lang === 'ar' ? 'font-ar' : 'font-en';
  const items = copy.marquee;
  return (
    <div className="relative border-y border-white/5 bg-ink-900/60 py-5 overflow-hidden">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-6 px-6">
            <span className={`text-xs tracking-[0.2em] uppercase text-silver-400 font-medium whitespace-nowrap ${fontClass}`}>{item}</span>
            <span className="text-aura-gold text-[8px]">◆</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-950 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-950 to-transparent pointer-events-none" />
    </div>
  );
}
