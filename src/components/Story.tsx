import { Quote } from 'lucide-react';
import type { Copy, Lang } from '../i18n';
import { STORY_AR } from '../i18n';

export function Story({ copy, lang }: { copy: Copy; lang: Lang }) {
  const fontClass = lang === 'ar' ? 'font-ar' : 'font-en';
  return (
    <section id="story" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full bg-aura-gold/6 blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <p className={`reveal text-[11px] tracking-[0.4em] uppercase text-aura-gold mb-5 font-semibold ${fontClass}`}>
            {lang === 'ar' ? 'قصتنا' : 'Our Story'}
          </p>
          <h2 className={`reveal reveal-d1 font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-[1.05] silver-text mb-4 ${fontClass}`}>
            {lang === 'ar' ? 'قصتنا' : 'OUR STORY'}
          </h2>
          <p className={`reveal reveal-d2 text-silver-400 text-base ${fontClass}`}>{copy.storySubtitle}</p>
        </div>

        <div className="reveal reveal-d3 glass rounded-3xl p-8 sm:p-12 relative">
          <Quote size={36} className="text-aura-gold/50 mb-6" />
          <p
            className={`font-ar text-lg sm:text-xl leading-[2] text-silver-200 text-right ${lang === 'ar' ? '' : 'lg:text-lg'}`}
            dir="rtl"
            lang="ar"
            style={{ lineHeight: '2.1' }}
          >
            {STORY_AR}
          </p>
          {lang === 'en' && (
            <p className="font-en text-silver-400 text-sm mt-6 pt-6 border-t border-white/5 leading-relaxed">
              The journey of AURA began with a simple idea from a 16-year-old with the ambition to build a brand that represents his generation and deliver a real product that changes daily routine. From his bedroom, he handled every step himself — sourcing factories in China, designing the logo, coding this website, running social media, packaging, and delivery. AURA is not just a water bottle; it is the product of effort, passion, and determination.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
