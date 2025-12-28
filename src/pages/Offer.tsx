import { useMemo } from 'react';
import {
  ArrowLeft,
  CheckCircle,
  Shield,
  Zap,
  HelpCircle,
  Sparkles,
  BadgeCheck,
  Timer,
  Target,
  FileText,
  Wallet,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

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
  key: 'basic' | 'pro' | 'business';
  name: string;
  price: string;
  best: boolean;
  desc: string;
  who: string;
  items: string[];
  eta: string;
};

export function Offer() {
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
          'ملاحظة: اكتب “عاجل” إذا الموعد قريب جدًا.',
        ].join('\n')
      ),
    []
  );

  const WHATSAPP_LINK = useMemo(
    () => `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_PREFILL}`,
    [WHATSAPP_PREFILL]
  );

  const bullets = [
    { icon: Timer, text: 'تسليم خلال 7 أيام (لنطاق محدد)' },
    { icon: Shield, text: 'أساسيات حماية + حماية النماذج' },
    { icon: Zap, text: 'أداء عالي + تجربة مستخدم واضحة' },
    { icon: BadgeCheck, text: 'اتفاق مكتوب قبل التنفيذ' },
  ];

  const packs: Pack[] = [
    {
      key: 'basic',
      name: 'Starter',
      price: 'ابدأ من 4,999 جنيه',
      best: false,
      desc: 'إطلاق سريع ومظهر احترافي',
      who: 'مناسب لو عايز موقع تعريفي مرتب بسرعة.',
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
      key: 'pro',
      name: 'Pro',
      price: 'ابدأ من 12,999 جنيه',
      best: true,
      desc: 'تحويل أعلى + قياس واضح',
      who: 'مناسب لو هدفك Leads/حجز وعايز Funnel مضبوط.',
      eta: '7–10 أيام',
      items: [
        'صفحة رئيسية + حتى 6 صفحات',
        'تحسين النصوص لمسار واضح (بدون حشو)',
        'تجهيز GTM Events (Leads/Clicks)',
        'تحسين Core Web Vitals',
        'SEO محسّن (هيكلة + روابط داخلية)',
        'جولتان مراجعة ضمن النطاق',
      ],
    },
    {
      key: 'business',
      name: 'Business',
      price: 'حسب النطاق',
      best: false,
      desc: 'للشركات التي تحتاج توسع',
      who: 'مناسب لو عندك أقسام متعددة وخطة نمو.',
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

  const exclusions = [
    'كتابة محتوى طويل بالكامل (نقدر نساعد بصياغة مختصرة داخل النطاق)',
    'متجر كامل بدفع/شحن/مخزون معقد (له نطاق وباقة مختلفة)',
    'أنظمة كبيرة متعددة الأدوار والصلاحيات العميقة (له تحليل مستقل)',
    'تصميم هوية بصرية كاملة (Logo/Brandbook) إن لم تكن موجودة',
  ];

  const faq = [
    {
      q: 'هل فعلاً خلال 7 أيام؟',
      a: 'نعم إذا كان النطاق واضحًا والمحتوى متوفرًا. أي توسعات خارج النطاق تؤثر على المدة.',
    },
    {
      q: 'ما معنى “الاتفاق المكتوب”؟',
      a: 'بنثبت: عدد الصفحات + التسليمات + موعد التسليم + حدود المراجعات قبل بداية التنفيذ.',
    },
    {
      q: 'هل السعر يشمل الدومين والاستضافة؟',
      a: 'السعر للتطوير فقط. نساعدك في اختيار وربط الدومين/الاستضافة حسب اختيارك أو على حسابك.',
    },
    {
      q: 'هل يوجد دعم بعد الإطلاق؟',
      a: 'نعم: دعم تصحيح أخطاء أساسي، ومعه خيارات صيانة شهرية لو حابب.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      {/* HERO */}
      <section className="section-padding section-padding-hero relative">
        <div className="absolute inset-0 bg-radial-spotlight" />
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-semibold text-secondary-700 dark:text-secondary-200">
                عرض التنفيذ السريع
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-secondary-900 dark:text-white">
              موقع شغال خلال <span className="text-gradient">7 أيام</span>
            </h1>

            <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 mb-3 max-w-3xl mx-auto leading-relaxed">
              هدفنا: تطلع قدّام العميل بموقع مرتب + مسار واضح يقود للـ Lead على واتساب.
            </p>

            <p className="text-base md:text-lg text-secondary-500 dark:text-secondary-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              بنثبت النطاق قبل التنفيذ: صفحاتك، التسليمات، والمراجعات — عشان التنفيذ يمشي بسرعة بدون تضييع وقت.
            </p>

            {/* Funnel CTA (WhatsApp only) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  pushDL('lead_click', {
                    channel: 'whatsapp',
                    source: 'offer_hero',
                    target: 'wa',
                  })
                }
              >
                <Button size="lg" icon={ArrowLeft}>
                  ابدأ على واتساب الآن
                </Button>
              </a>
            </div>

            {/* bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-2 justify-center glass p-4 rounded-2xl">
                  <b.icon className="w-5 h-5 text-primary-600" />
                  <span className="text-sm md:text-base text-secondary-800 dark:text-secondary-100">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-secondary-500 dark:text-secondary-400">
              “7 أيام” مرتبطة بنطاق محدد + توفر محتوى مبدئي. نثبت النطاق قبل البدء.
            </p>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-900 dark:text-white">
              اختر الباقة
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">
              كل شيء ينتهي على واتساب: تحديد نطاق → تنفيذ → تسليم.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {packs.map((p) => (
              <Card
                key={p.key}
                className={[
                  'p-8 text-right h-full',
                  p.best ? 'ring-2 ring-primary-500 shadow-soft' : '',
                ].join(' ')}
                hover
              >
                {p.best && (
                  <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold">
                    <BadgeCheck className="w-4 h-4" />
                    الأكثر طلبًا
                  </div>
                )}

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-1">
                      {p.name}
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-300">{p.desc}</p>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-2">{p.who}</p>
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

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    pushDL('lead_click', {
                      channel: 'whatsapp',
                      source: 'offer_package',
                      pack: p.key,
                      target: 'wa',
                    })
                  }
                  className="block"
                >
                  <Button size="lg" icon={ArrowLeft} className="w-full">
                    ابدأ الآن (على واتساب)
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET (Punchy) */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: 'هدف واضح',
                desc: 'نثبت هدف الصفحة: بيع / حجز / تواصل — ونبني المسار عليه.',
              },
              {
                icon: FileText,
                title: 'تسليمات مكتوبة',
                desc: 'صفحات + مخرجات + مراجعات — كل شيء واضح قبل التنفيذ.',
              },
              {
                icon: Wallet,
                title: 'بدون مفاجآت',
                desc: 'أي إضافة خارج النطاق تُسعّر وتُجدول قبل تنفيذها.',
              },
            ].map((x, i) => (
              <Card key={i} className="p-8 text-center" hover>
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <x.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">{x.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-300">{x.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDL('lead_click', { channel: 'whatsapp', source: 'offer_mid', target: 'wa' })}
            >
              <Button size="lg" variant="outline" icon={ArrowLeft}>
                ابعت التفاصيل على واتساب
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* GUARANTEE + REQUIREMENTS */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-10" hover>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-7 h-7 text-primary-600" />
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">الالتزام</h3>
              </div>

              <p className="text-secondary-700 dark:text-secondary-200 leading-relaxed">
                نلتزم بالموعد “لنفس النطاق المكتوب”. لو حصل تأخير من جهتنا بدون سبب متعلق بالمحتوى/المتطلبات،
                يتم تعويض التأخير بخصم أو تمديد دعم حسب المرحلة المتفق عليها.
              </p>

              <div className="mt-6 glass p-5 rounded-2xl">
                <div className="text-sm font-bold text-secondary-900 dark:text-white mb-2">مهم:</div>
                <p className="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed">
                  أي تغييرات أو إضافات بعد اعتماد النطاق تعتبر “خارج النطاق” ويتم الاتفاق عليها قبل التنفيذ.
                </p>
              </div>
            </Card>

            <Card className="p-10" hover>
              <div className="flex items-center gap-3 mb-4">
                <HelpCircle className="w-7 h-7 text-primary-600" />
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">ماذا نحتاج منك؟</h3>
              </div>

              <ul className="space-y-3 text-secondary-700 dark:text-secondary-200">
                {[
                  'اسم النشاط + الهدف الأساسي (مبيعات/حجز/تعريف)',
                  'عدد الصفحات المطلوبة',
                  'شعار/ألوان (إن وجدت)',
                  'محتوى مبدئي (حتى لو نقاط)',
                  '3 مواقع مرجعية تعجبك',
                ].map((x) => (
                  <li key={x} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { channel: 'whatsapp', source: 'offer_requirements', target: 'wa' })}
                className="block mt-8"
              >
                <Button size="lg" variant="outline" className="w-full" icon={ArrowLeft}>
                  ابعت التفاصيل على واتساب
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* EXCLUSIONS */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-900 dark:text-white">
              ما لا يشمله العرض
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">
              شفافية من البداية تمنع سوء فهم لاحقًا.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-4">
            {exclusions.map((x) => (
              <Card key={x} className="p-6" hover>
                <div className="flex items-start gap-3 text-secondary-700 dark:text-secondary-200">
                  <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span>{x}</span>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDL('lead_click', { channel: 'whatsapp', source: 'offer_exclusions', target: 'wa' })}
            >
              <Button size="lg" icon={ArrowLeft}>
                ابدأ على واتساب الآن
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-secondary-900 dark:text-white">أسئلة شائعة</h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">إجابات مباشرة.</p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6">
            {faq.map((f) => (
              <Card key={f.q} className="p-8" hover>
                <h3 className="text-xl font-bold mb-3 text-secondary-900 dark:text-white">{f.q}</h3>
                <p className="text-secondary-700 dark:text-secondary-200 leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDL('lead_click', { channel: 'whatsapp', source: 'offer_footer', target: 'wa' })}
            >
              <Button size="lg" icon={ArrowLeft}>
                ابدأ على واتساب الآن
              </Button>
            </a>

            <p className="mt-4 text-sm text-secondary-500 dark:text-secondary-400">
              الرد خلال ساعات العمل. لو عاجل: اكتب “عاجل” في أول الرسالة.
            </p>
          </div>
        </div>
      </section>

      {/* STRIP */}
      <section className="py-10">
        <div className="container-custom">
          <Card className="p-6 glass">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
              <div className="flex items-center gap-3">
                <Timer className="w-5 h-5 text-primary-600" />
                <span className="font-semibold text-secondary-900 dark:text-white">
                  جاهز؟ ابعت التفاصيل ونقفل النطاق ونبدأ.
                </span>
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { channel: 'whatsapp', source: 'offer_strip', target: 'wa' })}
              >
                <Button icon={ArrowLeft}>ابدأ على واتساب</Button>
              </a>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
