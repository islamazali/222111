// src/pages/About.tsx (FULL REWRITE — "العقل قبل اللسان" + ثقة حقيقية + Funnel-only)
// التغيير هنا: كتابة قوية واقعية تقلّل الملل وتزود الثقة بدون مبالغة
// نفس المكونات: Card + Button + lucide + GTM + WhatsApp موحّد
// Copy-Paste جاهز

import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Shield,
  Zap,
  Users,
  TrendingUp,
  ArrowLeft,
  CheckCircle,
  BadgeCheck,
  Timer,
  MessageCircle,
} from 'lucide-react';
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

export function About() {
  // ===== Funnel config (موحّد) =====
  const WHATSAPP_PHONE = '201507619503';
  const WHATSAPP_PREFILL = encodeURIComponent(
    [
      'عايز أعرف تفاصيل أكتر عن خدماتكم.',
      '',
      'نوع المشروع:',
      'الهدف (مبيعات/حجز/تعريف):',
      'الميزانية:',
      'موعد الإطلاق:',
      'هل المحتوى جاهز؟ (نعم/جزئي/لا):',
      'عدد الصفحات/الأقسام:',
      'تفاصيل مختصرة:',
    ].join('\n')
  );
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_PREFILL}`;

  const proof = [
    {
      icon: Timer,
      title: 'موعد واضح',
      desc: 'نشتغل بوقت محدد وتسليمات محددة. مفيش “هنشوف”.',
    },
    {
      icon: Shield,
      title: 'نطاق مكتوب',
      desc: 'قبل ما نبدأ: نثبت الـ Scope عشان مفيش مفاجآت ولا شد وجذب.',
    },
    {
      icon: TrendingUp,
      title: 'هدف واحد',
      desc: 'الموقع مش للمنظر. يا Lead يا حجز يا بيع — وإلا يبقى ضوضاء.',
    },
    {
      icon: BadgeCheck,
      title: 'جودة قابلة للصيانة',
      desc: 'كود نظيف ومعايير واضحة عشان الموقع يفضل شغال ويتطور بسهولة.',
    },
  ];

  const values = [
    {
      title: 'الوضوح قبل الحماس',
      points: [
        'بنقول ينفع وإمتى… ومينفعش وإمتى.',
        'لو المشروع محتاج وقت أكتر: بنصرّح قبل ما تبدأ تدفع.',
      ],
    },
    {
      title: 'النتيجة قبل الشكل',
      points: [
        'نرتب الصفحة على مسار قرار العميل.',
        'CTA واضح: واتساب/عرض 7 أيام. بدون تشتيت.',
      ],
    },
    {
      title: 'الالتزام قبل الوعود',
      points: [
        'تسليمات على مراحل.',
        'مراجعات ضمن النطاق المتفق عليه.',
      ],
    },
  ];

  const methodology = [
    {
      phase: '1) فهم الهدف',
      desc: 'نسألك سؤالين صح: عايز إيه يحصل للزائر؟ (يتواصل/يحجز/يشتري).',
    },
    {
      phase: '2) تثبيت النطاق',
      desc: 'نكتب الـ Scope: صفحات، أقسام، محتوى، Integrations. ده اللي عليه الضمان.',
    },
    {
      phase: '3) بناء Funnel',
      desc: 'نرتّب الصفحة زي طريق مختصر: من الفضول → ثقة → قرار → تواصل.',
    },
    {
      phase: '4) أداء + أمان أساسي',
      desc: 'سرعة تحميل + حماية النماذج + إعدادات أساسية تقلل المخاطر.',
    },
    {
      phase: '5) إطلاق + قياس',
      desc: 'نركّب Events لقياس الضغطات والـ Leads عشان تعرف الحقيقة بالأرقام.',
    },
  ];

  const faqs = [
    {
      q: 'أنا خايف أدفع وبعدين ألاقي كلام كتير ونتيجة قليلة.',
      a: 'ده بالضبط سبب إننا بنقفل النطاق كتابة الأول. لو النطاق واضح: التنفيذ واضح. لو مش واضح: بنقولك قبل ما تبدأ.',
    },
    {
      q: 'ليه بتضغطوا على واتساب؟',
      a: 'لأن أسرع تحويل في السوق المحلي هو واتساب. هدفنا Lead حقيقي مش “زيارة”.',
    },
    {
      q: 'هل “7 أيام” حقيقي؟',
      a: 'حقيقي لنطاق محدد ومحتوى متوفر. أي توسع كبير = وقت أكبر. وده بيتقال قبل البداية مش بعد الدفع.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      {/* HERO */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 mb-6">
              <Target className="w-4 h-4" />
              <span className="text-sm font-semibold">من نحن — بشكل يفهمه العقل</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              إحنا مش بنبني “موقع”… إحنا بنبني <span className="text-white/90">نتيجة</span>
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              لو الزائر دخل ومفهمش في 5 ثواني “إنت مين وبتحل إيه” هيمشي.  
              شغلنا: نخلي القرار أسهل من التفكير.
            </p>

            {/* Funnel CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/offer"
                onClick={() => pushDL('nav_click', { target: '/offer', source: 'about_hero' })}
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
                  pushDL('lead_click', { source: 'about_hero', channel: 'whatsapp', target: 'wa' })
                }
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/90"
                >
                  ابعت “فضول” على واتساب
                </Button>
              </a>
            </div>

            <p className="mt-5 text-sm text-white/80">
              لو عندك فكرة مش واضحة… ده الطبيعي. ابعت بس “فضول” وهنبعتلك أسئلة قصيرة تخلّص الصورة.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK PROOF */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              4 نقاط… لو موجودين ترتاح
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">
              لأن اللي بيكسب ثقة العميل: وضوح + التزام + نتيجة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proof.map((p) => (
              <Card key={p.title} className="p-7" hover>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION + VISION (بلهجة واضحة) */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-10" hover>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">رسالتنا</h2>
              </div>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                نخلي مشروعك “مفهوم” قبل ما يبقى “جميل”.  
                نرتّب الكلام، نثبت النطاق، ونطلع بموقع يجيب تواصل حقيقي — مش مجرد زيارة.
              </p>
            </Card>

            <Card className="p-10" hover>
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">رؤيتنا</h2>
              </div>
              <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                نبقى الاختيار اللي العميل يرجعله… لأن التجربة كانت واضحة ومريحة ونتيجتها ملموسة.  
                الثقة عندنا مش شعار. الثقة عندنا نظام شغل.
              </p>
            </Card>
          </div>

          {/* Mid CTA */}
          <div className="text-center mt-10">
            <Link
              to="/offer"
              onClick={() => pushDL('nav_click', { target: '/offer', source: 'about_mid' })}
            >
              <Button size="lg" variant="outline" icon={ArrowLeft}>
                شوف تفاصيل عرض 7 أيام
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* VALUES (أقوى وأقصر) */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              مبادئنا (على الأرض)
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">
              كلام بسيط… بس لو اتطبق يفرق.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="p-8" hover>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">{v.title}</h3>
                <ul className="space-y-3">
                  {v.points.map((x) => (
                    <li key={x} className="flex items-start gap-2 text-secondary-700 dark:text-secondary-200">
                      <CheckCircle className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{x}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* METHODOLOGY (مباشر وسريع) */}
      <section className="section-padding bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">بنمشي إزاي؟</h2>
            <p className="text-lg text-secondary-300">5 خطوات… مفيهاش لف.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-5">
            {methodology.map((m, i) => (
              <div
                key={m.phase}
                className="flex items-start gap-5 p-6 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{m.phase}</h3>
                  <p className="text-secondary-300 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                pushDL('lead_click', { source: 'about_method', channel: 'whatsapp', target: 'wa' })
              }
            >
              <Button size="lg" variant="secondary" icon={ArrowLeft}>
                ابدأ بسؤال واحد على واتساب
              </Button>
            </a>
            <p className="mt-4 text-sm text-secondary-300">
              اكتب: “أنا محتاج موقع… ودي فكرتي” — وخلاص.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ (قصير وواقعي) */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-3">
              أسئلة بتتقال في دماغ العميل
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">إجابات مباشرة.</p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-6">
            {faqs.map((f) => (
              <Card key={f.q} className="p-8" hover>
                <h3 className="text-xl font-bold mb-2 text-secondary-900 dark:text-white">{f.q}</h3>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>

          {/* FINAL CTA */}
          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/offer"
                onClick={() => pushDL('nav_click', { target: '/offer', source: 'about_footer' })}
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
                  pushDL('lead_click', { source: 'about_footer', channel: 'whatsapp', target: 'wa' })
                }
              >
                <Button size="lg" variant="outline" icon={MessageCircle}>
                  تواصل الآن
                </Button>
              </a>
            </div>

            <p className="mt-4 text-sm text-secondary-500 dark:text-secondary-400">
              عايزها سريعة؟ اكتب “عاجل” أول الرسالة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
