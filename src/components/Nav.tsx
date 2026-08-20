import { useEffect, useState } from 'react';
import { ShoppingBag, Menu, X, Globe } from 'lucide-react';
import type { Lang, Copy } from '../i18n';

interface Props {
  copy: Copy;
  lang: Lang;
  onOrder: () => void;
  onToggleLang: () => void;
}

export function Nav({ copy, lang, onOrder, onToggleLang }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: copy.navStory, href: '#story' },
    { label: copy.navFor, href: '#for' },
    { label: copy.navSpecs, href: '#specs' },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-500 ${
        scrolled ? 'bg-ink-950/85 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className={`text-xl font-extrabold tracking-[0.2em] text-silver-50 group-hover:text-white transition-colors ${lang === 'ar' ? 'font-ar' : 'font-en'}`}>
            AURA
          </span>
        </a>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm text-silver-300 hover:text-white transition-colors duration-300 relative after:absolute after:bottom-[-6px] after:start-0 after:h-px after:w-0 hover:after:w-full after:bg-aura-gold after:transition-all after:duration-400 ${lang === 'ar' ? 'font-ar' : 'font-en'}`}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onToggleLang}
            className="p-2.5 rounded-full text-silver-300 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-1.5"
            aria-label="Switch language"
          >
            <Globe size={16} />
            <span className="text-xs font-semibold hidden sm:inline">{lang === 'ar' ? 'EN' : 'ع'}</span>
          </button>
          <button
            onClick={onOrder}
            className={`btn-gold inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm ${lang === 'ar' ? 'font-ar' : 'font-en'}`}
          >
            <ShoppingBag size={15} strokeWidth={2.2} />
            <span className="hidden sm:inline">{copy.navOrder}</span>
          </button>
          <button
            className="md:hidden p-2 text-silver-200"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ${open ? 'max-h-72' : 'max-h-0'}`}>
        <div className="px-5 pb-6 pt-2 flex flex-col gap-1 bg-ink-950/95 backdrop-blur-xl border-b border-white/5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-3 text-silver-200 hover:text-white border-b border-white/5 text-sm ${lang === 'ar' ? 'font-ar' : 'font-en'}`}
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
