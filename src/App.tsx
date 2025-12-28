// src/App.tsx (FULL UPDATED — global redirect to https://icode-app.site + fixes horizontal overflow globally + keeps your routing/SEO)

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { ProgressBar } from './components/layout/ProgressBar';
import { PageTransition } from './components/layout/PageTransition';
import { BackToTop } from './components/layout/BackToTop';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';

import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Pricing } from './pages/Pricing';
import { Portfolio } from './pages/Portfolio';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Consultation } from './pages/Consultation';
import { Terms } from './pages/Terms';
import { Offers } from './pages/Offers';
import { Portal } from './pages/Portal';
import { Offer } from './pages/Offer';

import SEO from './seo';

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: any[]) => void;
  }
}

function pushDL(event: string, payload: Record<string, unknown> = {}) {
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({ event, ...payload });
}

/**
 * ✅ Global redirect (JS) to your canonical domain.
 * - Keeps path/query/hash
 * - Prevents redirect loop (checks origin)
 * - Runs once on mount
 *
 * Problems/limits:
 * - Not a server 301 (SEO not ideal)
 * - If JS disabled, no redirect (rare)
 * - There may be a tiny flash before redirect on slow devices
 */
function useCanonicalRedirect() {
  useEffect(() => {
    const TARGET_ORIGIN = 'https://icode-app.site';

    // If you're already on the target origin, do nothing.
    if (window.location.origin === TARGET_ORIGIN) return;

    // Build full target URL preserving path/query/hash
    const next =
      TARGET_ORIGIN +
      window.location.pathname +
      window.location.search +
      window.location.hash;

    // Replace (no back-button bounce)
    window.location.replace(next);
  }, []);
}

function App() {
  // ✅ Redirect everything (/, /offer, /portal...) to icode-app.site
  useCanonicalRedirect();

  return (
    <ThemeProvider>
      <BrowserRouter>
        <SEO />

        <ScrollToTop />
        <ProgressBar />

        <BackToTop />
        <FloatingWhatsApp
          phone="201507619503"
          prefill={[
            'عايز أبدأ مشروع.',
            '',
            'نوع المشروع:',
            'الميزانية:',
            'موعد الإطلاق:',
            'تفاصيل مختصرة:',
          ].join('\n')}
          position="left"
        />

        {/* ✅ قص أي overflow أفقي من جذر التطبيق */}
        <div className="min-h-screen flex flex-col overflow-x-hidden">
          <Header />

          {/* ✅ قص overflow في main كمان (لو عنصر جوّه بيكسر العرض) */}
          <main className="flex-1 overflow-x-hidden">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/consultation" element={<Consultation />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/offer" element={<Offer />} />
                <Route path="/portal" element={<Portal />} />

                <Route
                  path="*"
                  element={
                    <div className="section-padding">
                      <div className="container-custom text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                          الصفحة غير موجودة
                        </h1>
                        <p className="text-secondary-600 dark:text-secondary-300 mb-6">
                          تحقق من الرابط أو ارجع للرئيسية.
                        </p>
                        <Link
                          to="/"
                          className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold border border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800 transition"
                          onClick={() => pushDL('nav_click', { target: 'home_from_404' })}
                        >
                          رجوع للرئيسية
                        </Link>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </PageTransition>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
