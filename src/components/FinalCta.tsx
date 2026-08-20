import { ShoppingBag } from 'lucide-react';
import type { Copy, Lang } from '../i18n';

export function FinalCta({
  copy, lang, onOrder,
}: { copy: Copy; lang: Lang; onOrder: () => void }) {
  const fontClass = lang === 'ar' ? 'font-ar' : 'font-en';
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-aura-gold/10 blur-[140px]" />
      </div>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <h2 className={`reveal font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] silver-text mb-5 ${fontClass}`}>
          {lang === 'ar' ? 'جاهز للترطيب؟' : 'Ready to hydrate?'}
        </h2>
        <p className={`reveal reveal-d1 text-silver-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10 ${fontClass}`}>
          {lang === 'ar'
            ? 'احصل على مطرة AURA MagSafe اليوم. دفع عند الاستلام، وتوصيل لكل الأردن.'
            : 'Get your AURA MagSafe bottle today. Cash on delivery, shipped across Jordan.'}
        </p>
        <button
          onClick={onOrder}
          className={`reveal reveal-d2 btn-gold inline-flex items-center gap-3 px-14 py-6 rounded-full text-lg font-bold tracking-wide shadow-[0_20px_60px_-15px_rgba(212,175,55,0.55)] hover:shadow-[0_25px_70px_-10px_rgba(212,175,55,0.7)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 ${fontClass}`}
        >
          <ShoppingBag size={22} strokeWidth={2.2} />
          {copy.navOrder}
        </button>
      </div>
    </section>
  );
}
