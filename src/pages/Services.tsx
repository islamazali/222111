import { Link } from 'react-router-dom';
import {
  Code2,
  Smartphone,
  Server,
  Shield,
  Zap,
  Users,
  CheckCircle,
  ArrowLeft,
  Target,
  Timer,
  BadgeCheck,
  Sparkles,
  AlertTriangle,
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

type IconType = React.ComponentType<{ className?: string }>;

function buildWhatsAppLink(phone: string, baseMessage: string, extraLines: string[] = []) {
  const text = [baseMessage, '', ...extraLines].join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function Services() {
  const WHATSAPP_PHONE = '201507619503';

  const BASE_WA = [
    'عايز أبدأ مع icode.',
    '',
    'اسم المشروع:',
    'نوع النشاط:',
    'الهدف (مبيعات/حجز/نظام):',
    'موعد الإطلاق:',
    'الميزانية:',
    'تفاصيل مختصرة:',
  ].join('\n');

  const services: {
    id: string;
    icon: IconType;
    title: string;
    oneLiner: string;
    outcome: string;
    deliverables: string[];
    fit: string;
    time: string;
    risk: string;
  }[] = [
    {
      id: 'websites',
      icon: Code2,
      title: 'تطوير المواقع',
      oneLiner: 'موقع “يبيع” بدل موقع “يتفرجوا عليه”.',
      outcome: 'صفحات واضحة + CTA واتساب + تجربة سريعة = تحويل أعلى.',
      deliverables: [
        'هيكلة صفحات واضحة (Home + Services/Offer + Contact)',
        'CTA واتساب + نموذج تواصل',
        'تحسين سرعة وصور + أساسيات SEO',
        'RTL جاهز + تجربة موبايل ممتازة',
      ],
      fit: 'لو عميلك لازم يفهمك بسرعة ويضغط تواصل.',
      time: '7 أيام لنطاق محدد (عرض سريع)',
      risk: 'بدون محتوى مبدئي = يتأخر التسليم.',
    },
    {
      id: 'apps',
      icon: Smartphone,
      title: 'تطبيقات الويب/الموبايل',
      oneLiner: 'لو منتجك SaaS أو Dashboard… لازم يبقى “سهل” قبل ما يبقى “جامد”.',
      outcome: 'MVP عملي يشتغل ويقيس الاستخدام بدل تطوير طويل بدون نتيجة.',
      deliverables: [
        'تخطيط MVP: شاشات أساسية فقط',
        'Authentication + Roles حسب الحاجة',
        'ربط API/Database + لوحات بيانات',
        'Events قياس (Clicks/Leads/Usage) حسب نطاق المشروع',
      ],
      fit: 'لو عندك فكرة منتج وتحتاج نسخة أولى قابلة للتجربة.',
      time: 'حسب النطاق (MVP سريع ممكن 2–4 أسابيع)',
      risk: 'عدم وضوح الفيتشرز = تضخم نطاق.',
    },
    {
      id: 'systems',
      icon: Server,
      title: 'أنظمة مخصصة',
      oneLiner: 'بدل Excel والفوضى… نظام يشيل الضغط من الإدارة.',
      outcome: 'إدارة بيانات + صلاحيات + تقارير = تشغيل ثابت وتقليل أخطاء.',
      deliverables: [
        'لوحة تحكم + CRUD + صلاحيات',
        'تقارير بسيطة قابلة للتطوير',
        'هيكلة بيانات قابلة للتوسع',
        'توثيق تشغيل مختصر للمسؤول',
      ],
      fit: 'لو عندك عملية تشغيل يومية محتاجة تنظيم.',
      time: 'حسب النطاق (غالبًا 3–6 أسابيع)',
      risk: 'المتطلبات التشغيلية لازم تتكتب من البداية.',
    },
    {
      id: 'security',
      icon: Shield,
      title: 'أمن سيبراني (مراجعة/اختبار)',
      oneLiner: 'أفضل وقت لاكتشاف الثغرات: قبل ما يكتشفها غيرك.',
      outcome: 'تقرير واضح + إصلاحات عملية = تقليل مخاطر وتعطل.',
      deliverables: [
        'فحص إعدادات + سطح هجوم أساسي',
        'مراجعة نقاط ضعف شائعة (OWASP) حسب النطاق',
        'تقرير قابل للتنفيذ + أولويات',
        'جلسة شرح مختصرة للإصلاح',
      ],
      fit: 'لو عندك موقع/نظام شغال وعايز تقلل المخاطر.',
      time: 'من 2 إلى 7 أيام حسب النطاق',
      risk: 'الوصول/البيئة الاختبارية لازم تكون متاحة.',
    },
    {
      id: 'automation',
      icon: Zap,
      title: 'أتمتة وسكربتات',
      oneLiner: 'لو فيه شغل بتعمله كل يوم… غالبًا ينفع يتعمل آليًا.',
      outcome: 'توفير وقت + تقليل أخطاء + تسليم قابل للصيانة.',
      deliverables: [
        'تحليل العملية المتكررة',
        'سكريبت/أداة تشغيل واضحة',
        'Logs + أخطاء مفهومة',
        'توثيق تشغيل مختصر',
      ],
      fit: 'لو فريقك بيضيع وقت في مهام روتينية.',
      time: 'من يومين إلى أسبوعين',
      risk: 'لازم تكون العملية ثابتة ومفهومة.',
    },
    {
      id: 'consulting',
      icon: Users,
      title: 'استشارة تقنية',
      oneLiner: 'لو محتار: ماذا تبني؟ وكيف؟ وبكم؟',
      outcome: 'قرار واضح يقلل خسارة وقت وفلوس.',
      deliverables: [
        'خطة MVP واقعية',
        'اختيار تقنيات مناسب',
        'تقدير نطاق/مدة/تكلفة',
        'تحذير من المخاطر والالتفاف عليها',
      ],
      fit: 'لو عايز تمشي صح من أول مرة.',
      time: 'جلسة 30–60 دقيقة',
      risk: 'لازم ترسل الفكرة/الملفات قبلها.',
    },
  ];

  const goalCards: { id: string; icon: IconType; title: string; desc: string; waExtra: string[] }[] = [
    {
      id: 'goal_sales',
      icon: Target,
      title: 'عايز مبيعات/عملاء',
      desc: 'موقع قصير وواضح + CTA واتساب + عرض 7 أيام.',
      waExtra: ['الهدف: مبيعات/عملاء', 'أهم خدمة/منتج:', 'هل عندك عرض حالي؟'],
    },
    {
      id: 'goal_booking',
      icon: Timer,
      title: 'عايز حجز/مواعيد',
      desc: 'صفحة حجز واضحة + واتساب + نموذج بيانات.',
      waExtra: ['الهدف: حجز/مواعيد', 'نوع الخدمة:', 'عدد الحجوزات المتوقع يوميًا:'],
    },
    {
      id: 'goal_system',
      icon: BadgeCheck,
      title: 'عايز نظام إدارة',
      desc: 'بدل Excel: لوحة تحكم + صلاحيات + تقارير.',
      waExtra: ['الهدف: نظام إدارة', 'المستخدمين المتوقعين:', 'أهم 3 عمليات يومية:'],
    },
  ];

  const heroWhatsApp = buildWhatsAppLink(WHATSAPP_PHONE, BASE_WA, ['مصدر: صفحة الخدمات']);

  return (
    <div className="min-h-screen pt-20">
      {/* HERO */}
      <section className="section-padding gradient-primary text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white/90">اختَر الهدف… وخلي التنفيذ يمشي</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
              مش “خدمات”… دي <span className="underline decoration-white/40">نتائج</span> تُسلَّم
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed text-white/90 mb-8">
              لو عندك فضول بس: اضغط واتساب واكتب “فضول” — هنرد عليك بسؤالين ويبان المناسب فورًا.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={heroWhatsApp}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { source: 'services_hero', channel: 'whatsapp', target: 'wa' })}
              >
                <Button size="lg" className="bg-white text-secondary-900 hover:bg-white/90" icon={ArrowLeft}>
                  افتح واتساب الآن (بدون تفكير)
                </Button>
              </a>

              <Link
                to="/offer"
                onClick={() => pushDL('nav_click', { source: 'services_hero', target: '/offer' })}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/35 text-white hover:bg-white/10 hover:border-white/60"
                >
                  شوف عرض 7 أيام
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-white/85 text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>ممنوع الوعود العامة. كل شيء بنكتبه: نطاق + تسليمات + موعد.</span>
            </div>
          </div>
        </div>
      </section>

      {/* GOAL PICKER (Kills boredom + pushes curiosity click) */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-3">
              اختر هدفك في 10 ثواني
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">
              بدل ما تقرأ صفحة طويلة… اختَر هدفك وخد أقصر طريق لنتيجة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {goalCards.map((g) => {
              const wa = buildWhatsAppLink(WHATSAPP_PHONE, BASE_WA, [...g.waExtra, `مصدر: Services goal - ${g.id}`]);
              return (
                <Card key={g.id} className="p-8 text-center" hover>
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <g.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">{g.title}</h3>
                  <p className="text-secondary-600 dark:text-secondary-300 mb-6">{g.desc}</p>

                  <a
                    href={wa}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => pushDL('lead_click', { source: 'services_goal', channel: 'whatsapp', target: 'wa', goal: g.id })}
                    className="block"
                  >
                    <Button className="w-full" icon={ArrowLeft}>
                      افتح واتساب
                    </Button>
                  </a>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES LIST (Now: Problem → Outcome → Deliverables → Time → CTA) */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((s) => {
              const wa = buildWhatsAppLink(WHATSAPP_PHONE, BASE_WA, [
                `الخدمة المطلوبة: ${s.title}`,
                `الهدف: ${s.oneLiner}`,
                '—',
                'أرسل: نشاطك + هدفك + عدد الصفحات/المستخدمين + موعد الإطلاق.',
                `مصدر: Services - ${s.id}`,
              ]);

              return (
                <div key={s.id} id={s.id} className="scroll-mt-28" aria-label={s.title}>
                  <Card className="overflow-hidden" hover={false}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="p-8 md:p-12">
                        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6">
                          <s.icon className="w-8 h-8 text-white" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-3">
                          {s.title}
                        </h2>

                        <p className="text-lg text-secondary-700 dark:text-secondary-200 font-semibold mb-4">
                          {s.oneLiner}
                        </p>

                        <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed mb-6">
                          {s.outcome}
                        </p>

                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">هتستلم إيه؟</h3>
                          <ul className="space-y-3">
                            {s.deliverables.map((d) => (
                              <li key={d} className="flex items-start gap-3">
                                <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-0.5" />
                                <span className="text-secondary-700 dark:text-secondary-300">{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                          <a
                            href={wa}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() =>
                              pushDL('lead_click', {
                                source: `services_${s.id}`,
                                channel: 'whatsapp',
                                target: 'wa',
                                service: s.id,
                              })
                            }
                          >
                            <Button icon={ArrowLeft}>اطلب الآن على واتساب</Button>
                          </a>

                          <Link
                            to="/offer"
                            onClick={() => pushDL('nav_click', { source: `services_${s.id}`, target: '/offer' })}
                          >
                            <Button variant="outline">عرض 7 أيام</Button>
                          </Link>

                          <Link
                            to="/contact"
                            onClick={() => pushDL('nav_click', { source: `services_${s.id}`, target: '/contact' })}
                          >
                            <Button variant="outline">اطلب عرض سعر</Button>
                          </Link>
                        </div>
                      </div>

                      <div className="p-8 md:p-12 bg-secondary-50 dark:bg-secondary-800 flex flex-col justify-center">
                        <div className="mb-6">
                          <div className="text-sm text-secondary-500 dark:text-secondary-400 mb-1">مناسبة لـ</div>
                          <div className="font-bold text-secondary-900 dark:text-white">{s.fit}</div>
                        </div>

                        <div className="mb-6 p-6 gradient-primary rounded-2xl text-white">
                          <div className="text-sm text-white/80 mb-2">المدة التقريبية</div>
                          <div className="text-xl font-bold">{s.time}</div>
                        </div>

                        <div className="glass p-6 rounded-2xl">
                          <div className="text-sm font-bold text-secondary-900 dark:text-white mb-2">ملاحظة مهمة</div>
                          <p className="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed">{s.risk}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 text-center" glass>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-6">
                ما تقرأش أكتر… خُد أقصر طريق
              </h2>
              <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8">
                اكتب “فضول” على واتساب — هنرد بسؤالين: هدفك؟ وموعد الإطلاق؟ والباقي يتحدد فورًا.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={buildWhatsAppLink(WHATSAPP_PHONE, BASE_WA, ['فضول', 'مصدر: Services final'])}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => pushDL('lead_click', { source: 'services_final', channel: 'whatsapp', target: 'wa' })}
                >
                  <Button size="lg" icon={ArrowLeft}>
                    افتح واتساب الآن
                  </Button>
                </a>

                <Link to="/offer" onClick={() => pushDL('nav_click', { source: 'services_final', target: '/offer' })}>
                  <Button size="lg" variant="outline">
                    شوف عرض 7 أيام
                  </Button>
                </Link>

                <Link to="/contact" onClick={() => pushDL('nav_click', { source: 'services_final', target: '/contact' })}>
                  <Button size="lg" variant="outline">
                    تواصل معنا
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
