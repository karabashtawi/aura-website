import { useEffect, useState } from 'react';
import type { Lang } from '../i18n';

const STORAGE_KEY = 'aura-lang';

export function useLanguage() {
  const [lang, setLang] = useState<Lang | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === 'en' || saved === 'ar') {
      setLang(saved);
    }
    setReady(true);
  }, []);

  const choose = (l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLang(l);
  };

  const change = (l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLang(l);
  };

  useEffect(() => {
    if (!lang) return;
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  return { lang, choose, change, ready };
}
