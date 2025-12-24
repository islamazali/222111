// Header.tsx (UPDATED) — إضافة "لوحة العميل" للهيدر (Desktop + Mobile)

import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Code2, PhoneCall, ArrowLeft, Lock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function pushDL(event: string, payload: Record<string, unknown> = {}) {
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({ event, ...payload });
}

function buildWhatsAppLink(phone: string, lines: string[]) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const waPhone = '201507619503';
  const waHref = useMemo(
    () =>
      buildWhatsAppLink(waPhone, [
        'فضول — عايز أعرف أنسب حل.',
        '',
        'اسم المشروع:',
        'نوع النشاط:',
        'الهدف (مبيعات/حجز/نظام):',
        'موعد الإطلاق:',
        'ميزانية تقريبية:',
        'تفاصيل مختصرة:',
        '',
        'مصدر: Header',
      ]),
    []
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true } as any);
    return () => window.removeEventListener('scroll', handleScroll as any);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : prev || '';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const navigation = useMemo(
    () => [
      { name: 'الرئيسية', href: '/' },
      { name: 'عرض 7 أيام', href: '/offer' },
      { name: 'الخدمات', href: '/services' },
      { name: 'لوحة العميل', href: '/portal', icon: Lock },
      { name: 'تواصل', href: '/contact' },
    ],
    []
  );

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className={[
        'fixed top-0 right-0 left-0 z-50',
        'transition-all duration-300',
        scrolled
          ? 'bg-white/80 dark:bg-secondary-900/80 backdrop-blur border-b border-black/5 dark:border-white/10 shadow'
          : 'bg-white/60 dark:bg-secondary-900/60 backdrop-blur border-b border-black/5 dark:border-white/10',
      ].join(' ')}
    >
      <nav className="container-custom" aria-label="التنقل الرئيسي">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group" aria-label="الذهاب للرئيسية">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gradient">icode</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              const active = isActive(item.href);
              const Icon = (item as any).icon as any;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => pushDL('nav_click', { source: 'header_desktop', target: item.href })}
                  className={[
                    'text-base font-semibold transition-colors inline-flex items-center gap-2',
                    active
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400',
                  ].join(' ')}
                >
                  {Icon ? <Icon className="w-4 h-4" /> : null}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
              aria-label="تبديل الوضع"
              type="button"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <Link
              to="/offer"
              onClick={() => pushDL('nav_click', { source: 'header_desktop', target: '/offer' })}
            >
              <Button variant="outline" icon={ArrowLeft}>
                عرض 7 أيام
              </Button>
            </Link>

            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDL('lead_click', { source: 'header_desktop', channel: 'whatsapp', target: 'wa' })}
            >
              <Button icon={PhoneCall}>واتساب الآن</Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors"
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="lg:hidden relative z-50 bg-white/95 dark:bg-secondary-900/95 backdrop-blur border-t border-black/5 dark:border-white/10"
            role="dialog"
            aria-modal="true"
            aria-label="قائمة الهاتف"
          >
            <div className="container-custom py-6">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  const Icon = (item as any).icon as any;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        pushDL('nav_click', { source: 'header_mobile_menu', target: item.href });
                      }}
                      aria-current={active ? 'page' : undefined}
                      className={[
                        'text-lg font-semibold py-2 rounded-lg px-2 transition-colors flex items-center gap-2',
                        active
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50/60 dark:bg-secondary-800/60'
                          : 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-800/60',
                      ].join(' ')}
                    >
                      {Icon ? <Icon className="w-5 h-5" /> : null}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                <div className="flex items-center justify-between pt-4 border-t border-secondary-200 dark:border-secondary-700">
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 text-secondary-700 dark:text-secondary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    type="button"
                  >
                    {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <span>{theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}</span>
                  </button>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => pushDL('lead_click', { source: 'header_mobile_menu', channel: 'whatsapp', target: 'wa' })}
                  >
                    <Button variant="outline">واتساب</Button>
                  </a>
                </div>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => pushDL('lead_click', { source: 'header_mobile_menu_primary', channel: 'whatsapp', target: 'wa' })}
                >
                  <Button className="w-full" icon={PhoneCall}>
                    واتساب الآن
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}