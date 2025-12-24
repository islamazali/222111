// src/pages/Pricing.tsx (UNIFIED WITH /offer — same packs, same messaging, no conflicts)
// الهدف: Pricing يبقى "مرآة" لصفحة Offer (نفس الباقات/الأسعار/المدد/الضمان)
// Funnel-only: /offer + WhatsApp
// Copy-Paste جاهز

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Star, Shield, Zap, Timer, BadgeCheck } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function pushDL(event: string, payload: Record<string, unknown> = {}) {
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({ event, ...payload });
}

type Pack = {
  id: 'basic' | 'pro' | 'business';
  name: string;
  price: string;
  best: boolean;
  subtitle: string;
  eta: string;
  items: string[];
};

export function Pricing() {
  // ===== Funnel config (موحّد مع Offer/Home/Services) =====
  const WHATSAPP_PHONE = '201507619503';

  const WHATSAPP_PREFILL = useMemo(
    () =>
      encodeURIComponent(
        [
          'عايز أبدأ عرض (موقع شغال خلال 7 أيام).',
          '',
          'اسم المشروع:',
          'نوع النشاط (شركة/متجر/عيادة/خدمة):',
          'الهدف (مبيعات/حجز/تعريف):',
          'عدد الصفحات:',
          'هل المحتوى جاهز؟ (نعم/جزئي/لا):',
          'هل لديك دومين/استضافة؟ (نعم/لا):',
          'موعد الإطلاق:',
          'ميزانية تقريبية:',
          'لينكات/مراجع (اختياري):',
          '',
          'مصدر: Pricing',
        ].join('\n')
      ),
    []
  );

  const WHATSAPP_LINK = useMemo(
    () => `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_PREFILL}`,
    [WHATSAPP_PREFILL]
  );

  // ===== Packs (مطابقة لـ Offer.tsx) =====
  // لا تغيّر هنا لو عايز "صفر تضارب". أي تعديل يتم في Offer ثم تنقله هنا حرفيًا.
  const packs: Pack[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'ابدأ من 4,999 جنيه',
      best: false,
      subtitle: 'موقع تعريفي سريع لبدء الظهور',
      eta: '7 أيام',
      items: [
        'صفحة رئيسية + حتى 3 صفحات',
        'تصميم RTL احترافي',
        'CTA واتساب + نموذج تواصل',
        'SEO أساسي (Title/Meta/OG)',
        'تحسين سرعة وصور',
        'تهيئة نشر جاهزة',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 'ابدأ من 12,999 جنيه',
      best: true,
      subtitle: 'تحويل أعلى + قياس النتائج',
      eta: '7–10 أيام',
      items: [
        'صفحة رئيسية + حتى 6 صفحات',
        'تحسين Copy (نصوص بيع) لمسار واضح',
        'تجهيز GTM Events (Leads/Clicks)',
        'تحسين Core Web Vitals',
        'SEO متقدم (هيكلة + داخلي)',
        'جولتان مراجعة ضمن النطاق',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: 'حسب النطاق',
      best: false,
      subtitle: 'قابلية توسع للشركات',
      eta: 'حسب النطاق',
      items: [
        'حتى 12 صفحة',
        'أقسام مخصصة حسب النشاط',
        'تهيئة توسع مستقبلية',
        'تحسينات أمان إضافية',
        'دعم بعد الإطلاق حسب الاتفاق',
      ],
    },
  ];

  const bullets = [
    { icon: Timer, text: 'تسليم خلال 7 أيام (لنطاق واضح)' },
    { icon: Shield, text: 'أمان أساسي + حماية النماذج' },
    { icon: Zap, text: 'أداء عالي + تجربة مستخدم محسّنة' },
    { icon: BadgeCheck, text: 'ضمان مرتبط بالنطاق والموعد' },
  ];

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      {/* HERO */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">الأسعار</h1>

            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              نفس عرض “7 أيام” — نفس الباقات — نفس الشروط. بدون تضارب.
            </p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              {bullets.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center gap-2 bg-white/10 border border-white/15 rounded-2xl py-4"
                >
                  <b.icon className="w-5 h-5" />
                  <span className="font-semibold">{b.text}</span>
                </div>
              ))}
            </div>

            {/* Funnel CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/offer"
                onClick={() => pushDL('nav_click', { target: '/offer', source: 'pricing_hero' })}
              >
                <Button size="lg" icon={ArrowLeft}>
                  افتح عرض 7 أيام
                </Button>
              </Link>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushDL('lead_click', { source: 'pricing_hero', channel: 'whatsapp', target: 'wa' })
                }
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/90"
                >
                  ابدأ على واتساب (فضول)
                </Button>
              </a>
            </div>

            <p className="text-sm mt-5 text-white/80">
              التنفيذ “7 أيام” مرتبط بنطاق واضح + محتوى متوفر. نثبت النطاق قبل البدء.
            </p>
          </div>
        </div>
      </section>

      {/* PACKS (mirror Offer) */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              اختر الباقة
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">
              نطاق واضح = تسليم سريع. كل الطرق تنتهي على واتساب أو صفحة العرض.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packs.map((p) => (
              <Card
                key={p.id}
                className={[
                  'p-8 relative h-full text-right',
                  p.best ? 'ring-2 ring-primary-500 shadow-soft' : '',
                ].join(' ')}
                hover
              >
                {p.best && (
                  <div className="absolute -top-4 right-1/2 translate-x-1/2 px-4 py-1 gradient-primary text-white text-sm font-bold rounded-full flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    الأكثر طلبًا
                  </div>
                )}

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
                      {p.name}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-300">{p.subtitle}</p>
                  </div>

                  <div className="text-left">
                    <div className="text-sm text-secondary-500 dark:text-secondary-400">المدة</div>
                    <div className="font-bold text-secondary-900 dark:text-white">{p.eta}</div>
                  </div>
                </div>

                <div className="text-3xl font-extrabold text-gradient mb-6">{p.price}</div>

                <ul className="space-y-3 mb-8">
                  {p.items.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-secondary-700 dark:text-secondary-200">
                      <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>

                {/* Funnel-only CTA */}
                <div className="grid grid-cols-1 gap-3">
                  <Link
                    to="/offer"
                    onClick={() =>
                      pushDL('nav_click', { target: '/offer', source: 'pricing_pack', pack: p.id })
                    }
                  >
                    <Button className="w-full" icon={ArrowLeft}>
                      افتح عرض 7 أيام
                    </Button>
                  </Link>

                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      pushDL('lead_click', {
                        source: 'pricing_pack',
                        channel: 'whatsapp',
                        target: 'wa',
                        pack: p.id,
                      })
                    }
                  >
                    <Button className="w-full" variant="outline">
                      ابدأ {p.name} على واتساب
                    </Button>
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GUARANTEE STRIP (match Offer language) */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <Card className="p-10 md:p-12 text-center glass">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              الضمان مرتبط بالنطاق
            </h2>
            <p className="text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto leading-relaxed">
              إذا لم نلتزم بموعد التسليم لنفس النطاق المتفق عليه كتابيًا، يتم إلغاء مستحقات نفس المرحلة.
              لا يشمل الضمان توسعات أو تغييرات خارج النطاق بعد اعتماد المتطلبات.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/offer"
                onClick={() => pushDL('nav_click', { target: '/offer', source: 'pricing_guarantee' })}
              >
                <Button size="lg" icon={ArrowLeft}>
                  راجع تفاصيل العرض
                </Button>
              </Link>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushDL('lead_click', { source: 'pricing_guarantee', channel: 'whatsapp', target: 'wa' })
                }
              >
                <Button size="lg" variant="outline">
                  اسألنا على واتساب
                </Button>
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">ابدأ الآن بدون تشتت</h2>
            <p className="text-xl mb-8 text-white/90">
              افتح عرض 7 أيام أو ابدأ رسالة واتساب جاهزة. نفس المسار، نفس القرار.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/offer"
                onClick={() => pushDL('nav_click', { target: '/offer', source: 'pricing_footer' })}
              >
                <Button size="lg" variant="secondary" icon={ArrowLeft}>
                  افتح عرض 7 أيام
                </Button>
              </Link>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushDL('lead_click', { source: 'pricing_footer', channel: 'whatsapp', target: 'wa' })
                }
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/90"
                >
                  ابدأ على واتساب
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
