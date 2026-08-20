import { Instagram } from 'lucide-react';
import type { Copy, Lang } from '../i18n';

export function Footer({ copy, lang }: { copy: Copy; lang: Lang }) {
  const fontClass = lang === 'ar' ? 'font-ar' : 'font-en';
  return (
    <footer className="relative border-t border-white/5 bg-ink-950">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 md:py-20">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className={`text-2xl font-extrabold tracking-[0.2em] text-silver-50 ${fontClass}`}>AURA</p>
            <p className={`mt-4 max-w-xs text-silver-400 text-sm leading-relaxed ${fontClass}`}>{copy.footerTagline}</p>
            <p className="mt-5 font-ar text-xl text-aura-gold" dir="rtl" lang="ar">ترطيبٌ متقَن</p>
          </div>
          <div>
            <p className={`text-[11px] tracking-[0.3em] uppercase text-silver-500 mb-4 ${fontClass}`}>
              {lang === 'ar' ? 'روابط' : 'Links'}
            </p>
            <ul className="space-y-2.5">
              {copy.footerLinks.map((l) => (
                <li key={l}>
                  <a href="#" className={`text-sm text-silver-300 hover:text-white transition-colors ${fontClass}`}>{l}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`text-[11px] tracking-[0.3em] uppercase text-silver-500 mb-4 ${fontClass}`}>
              {lang === 'ar' ? 'تواصل معنا' : 'Contact'}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.instagram.com/aurabottles.jo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl glass border border-white/8 hover:border-aura-gold/40 hover:bg-aura-gold/5 transition-all duration-300 group"
              >
                <Instagram size={18} className="text-silver-300 group-hover:text-aura-gold transition-colors" />
                <span className={`text-sm text-silver-200 group-hover:text-white transition-colors font-medium ${fontClass}`}>
                  @aurabottles.jo
                </span>
              </a>
              <a
                href="https://wa.me/962780838423"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-3 rounded-xl glass border border-white/8 hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-300 group"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="text-silver-300 group-hover:text-[#25D366] transition-colors">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className={`text-sm text-silver-200 group-hover:text-white transition-colors font-medium ${fontClass}`}>
                  WhatsApp
                </span>
              </a>
            </div>
            <p className={`text-sm text-silver-500 mt-4 ${fontClass}`}>{lang === 'ar' ? 'الأردن' : 'Jordan'}</p>
          </div>
        </div>

        <div className="divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-silver-500">
          <p className={fontClass}>© 2025 AURA. {copy.footerRights}</p>
          <p className={fontClass}>{lang === 'ar' ? 'صُنع بشغف في الأردن' : 'Crafted with passion in Jordan'}</p>
        </div>
      </div>
    </footer>
  );
}
