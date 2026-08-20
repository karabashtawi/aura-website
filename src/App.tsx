import { useEffect, useState } from 'react';
import { ComingSoon } from './components/ComingSoon';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { LanguageGate } from './components/LanguageGate';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { MagSafe } from './components/MagSafe';
import { Specs } from './components/Specs';
import { Story } from './components/Story';
import { WhoIsItFor } from './components/WhoIsItFor';
import { Checkout } from './components/Checkout';
import { Footer } from './components/Footer';
import { FinalCta } from './components/FinalCta';
import { useLanguage } from './hooks/useLanguage';
import { useScrollReveal, useScrollProgress } from './hooks/useScroll';
import { COPY } from './i18n';
import { initAnalytics } from './lib/analytics';

type Route = 'home' | 'checkout';

function useRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(() =>
    window.location.pathname === '/checkout' ? 'checkout' : 'home'
  );

  useEffect(() => {
    const onPop = () => {
      setRoute(window.location.pathname === '/checkout' ? 'checkout' : 'home');
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = (r: Route) => {
    const path = r === 'checkout' ? '/checkout' : '/';
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      setRoute(r);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  };

  return [route, navigate];
}

function isAdminRoute() {
  return window.location.pathname.startsWith('/admin/analytics');
}

function App() {
  const { lang, choose, change, ready } = useLanguage();
  const [route, navigate] = useRoute();
  useScrollReveal();
  useScrollProgress();

  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('aura_unlocked') === '1'
  );
  const [adminRoute, setAdminRoute] = useState(isAdminRoute());
  const unlock = () => {
    sessionStorage.setItem('aura_unlocked', '1');
    setUnlocked(true);
  };

  useEffect(() => {
    const onPop = () => setAdminRoute(isAdminRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Start analytics tracker on public pages only.
  useEffect(() => {
    if (!adminRoute) initAnalytics();
  }, [adminRoute]);

  useEffect(() => {
    if (!lang) return;
    const t = setTimeout(() => {
      const els = document.querySelectorAll<HTMLElement>('.reveal:not(.in-view)');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      );
      els.forEach((el) => observer.observe(el));
    }, 100);
    return () => clearTimeout(t);
  }, [lang, route]);

  if (adminRoute) {
    return <AnalyticsDashboard onExit={() => {
      window.history.pushState({}, '', '/');
      setAdminRoute(false);
      window.scrollTo({ top: 0 });
    }} />;
  }

  if (!ready) {
    return <div className="min-h-screen bg-ink-950" />;
  }

  if (!unlocked) {
    return <ComingSoon onUnlock={unlock} />;
  }

  if (!lang) {
    return <LanguageGate onChoose={choose} />;
  }

  const copy = COPY[lang];
  const toggleLang = () => change(lang === 'ar' ? 'en' : 'ar');
  const goCheckout = () => navigate('checkout');
  const goHome = () => navigate('home');

  if (route === 'checkout') {
    return (
      <div className="relative min-h-screen bg-ink-950 text-silver-100 noise">
        <div
          id="scroll-progress"
          className="fixed top-0 start-0 z-[120] h-0.5 bg-gradient-to-r from-aura-gold via-aura-gold-light to-aura-gold transition-[width] duration-150 ease-out"
          style={{ width: '0%' }}
        />
        <Nav copy={copy} lang={lang} onOrder={goCheckout} onToggleLang={toggleLang} />
        <main>
          <Checkout copy={copy} lang={lang} onBack={goHome} />
        </main>
        <Footer copy={copy} lang={lang} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-ink-950 text-silver-100 noise">
      <div
        id="scroll-progress"
        className="fixed top-0 start-0 z-[120] h-0.5 bg-gradient-to-r from-aura-gold via-aura-gold-light to-aura-gold transition-[width] duration-150 ease-out"
        style={{ width: '0%' }}
      />

      <Nav copy={copy} lang={lang} onOrder={goCheckout} onToggleLang={toggleLang} />

      <main>
        <Hero copy={copy} lang={lang} onOrder={goCheckout} />
        <Marquee copy={copy} lang={lang} />
        <MagSafe copy={copy} lang={lang} />
        <Specs copy={copy} lang={lang} />
        <Story copy={copy} lang={lang} />
        <WhoIsItFor copy={copy} lang={lang} />
        <FinalCta copy={copy} lang={lang} onOrder={goCheckout} />
      </main>

      <Footer copy={copy} lang={lang} />
    </div>
  );
}

export default App;
