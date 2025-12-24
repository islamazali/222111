import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://ico.bolt.host';
const SITE_NAME = 'ICODE';

type Meta = { title: string; description: string; canonical: string };

const ROUTES: Record<string, Meta> = {
  '/': {
    title: 'حلول برمجية احترافية بالذكاء الاصطناعي',
    description:
      'ICODE شركة برمجة تقدم حلولًا احترافية تعتمد على الذكاء الاصطناعي لبناء مواقع وأنظمة سريعة ودقيقة بأقل أخطاء ممكنة.',
    canonical: `${BASE_URL}/`,
  },
  '/services': {
    title: 'الخدمات | تطوير مواقع وأنظمة بالذكاء الاصطناعي',
    description:
      'تطوير مواقع وتطبيقات وأنظمة مخصصة باستخدام الذكاء الاصطناعي لتقليل الأخطاء وتسريع التنفيذ ورفع الكفاءة.',
    canonical: `${BASE_URL}/services`,
  },
  '/pricing': {
    title: 'الأسعار | باقات مرنة للمشاريع البرمجية',
    description:
      'باقات وأسعار مرنة لتطوير المواقع والأنظمة الذكية. اختر الخطة المناسبة لمرحلتك وميزانيتك.',
    canonical: `${BASE_URL}/pricing`,
  },
  '/portfolio': {
    title: 'الأعمال | نماذج مشاريع برمجية احترافية',
    description:
      'نماذج من أعمال ICODE في تطوير المواقع والأنظمة باستخدام تقنيات حديثة ومعايير أداء قوية.',
    canonical: `${BASE_URL}/portfolio`,
  },
  '/about': {
    title: 'من نحن | فريق برمجة يعتمد على الذكاء الاصطناعي',
    description:
      'ICODE فريق متخصص في بناء حلول برمجية ذكية تقلّل الأخطاء وتسرّع تنفيذ المشاريع وتزيد جودة المنتج.',
    canonical: `${BASE_URL}/about`,
  },
  '/contact': {
    title: 'تواصل | ابدأ مشروعك مع ICODE',
    description:
      'تواصل مع ICODE لبدء مشروعك أو طلب استشارة تقنية احترافية وتحويل فكرتك إلى نظام يعمل.',
    canonical: `${BASE_URL}/contact`,
  },
  '/consultation': {
    title: 'احجز استشارة | خطة تنفيذ دقيقة وسريعة',
    description:
      'احجز استشارة لتحديد المتطلبات وبناء خطة تنفيذ واضحة بأقل وقت وأعلى جودة.',
    canonical: `${BASE_URL}/consultation`,
  },
};

const FALLBACK: Meta = {
  title: 'حلول برمجية احترافية',
  description:
    'ICODE تقدم تطوير مواقع وأنظمة وحلول برمجية تعتمد على الذكاء الاصطناعي لتقليل الأخطاء وتسريع التنفيذ.',
  canonical: `${BASE_URL}/`,
};

function normalizePath(p: string) {
  if (p.length > 1 && p.endsWith('/')) return p.slice(0, -1);
  return p;
}

export default function SEO() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  // يراقب تغيّر المسار حتى لو Router داخلي
  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPop);

    // patch بسيط لالتقاط pushState/replaceState
    const _push = history.pushState;
    const _replace = history.replaceState;

    history.pushState = function (...args) {
      _push.apply(history, args as any);
      onPop();
    } as any;

    history.replaceState = function (...args) {
      _replace.apply(history, args as any);
      onPop();
    } as any;

    return () => {
      window.removeEventListener('popstate', onPop);
      history.pushState = _push as any;
      history.replaceState = _replace as any;
    };
  }, []);

  const meta = useMemo(() => ROUTES[path] ?? FALLBACK, [path]);
  const fullTitle = `${meta.title} | ${SITE_NAME}`;

  useEffect(() => {
    document.documentElement.setAttribute('lang', 'ar');
    document.documentElement.setAttribute('dir', 'rtl');
  }, []);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={meta.canonical} />

      <meta
        name="robots"
        content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={meta.description} />

      <meta name="theme-color" content="#0ea5e9" />
    </Helmet>
  );
}
