import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Code2,
  Smartphone,
  Server,
  Shield,
  Zap,
  Users,
  Award,
  CheckCircle,
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

type IconType = React.ComponentType<{ className?: string }>;

export function Home() {
  const WHATSAPP_PHONE = '201507619503';
  const WHATSAPP_PREFILL = encodeURIComponent(
    [
      'عايز أبدأ عرض (موقع شغال خلال 7 أيام).',
      '',
      'اسم المشروع:',
      'نوع المشروع (شركة/متجر/عيادة/شخصي):',
      'الهدف (مبيعات/تعريف/حجز):',
      'الصفحات المطلوبة:',
      'هل لديك دومين/استضافة؟',
      'الميزانية المتوقعة:',
      'موعد الإطلاق:',
      '',
      'ملاحظة: ابعت أي لينكات مشابهة تعجبك + شعار/ألوان لو موجودة.',
    ].join('\n')
  );
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_PREFILL}`;

  const services: { icon: IconType; title: string; description: string }[] = [
    { icon: Code2, title: 'تطوير المواقع', description: 'مواقع سريعة، RTL جاهزة، وتجربة مستخدم واضحة' },
    { icon: Smartphone, title: 'تطبيقات الموبايل', description: 'حلول عملية حسب احتياجك (هجين/أصلي) مع خطة إطلاق' },
    { icon: Server, title: 'أنظمة مخصصة', description: 'لوحات تحكم + إدارة بيانات + صلاحيات + تقارير' },
    { icon: Shield, title: 'أمن سيبراني', description: 'مراجعة ثغرات + تحسين إعدادات الحماية الأساسية' },
    { icon: Zap, title: 'أتمتة الأعمال', description: 'سكربتات وعمليات لتقليل الوقت والجهد داخل شركتك' },
    { icon: Users, title: 'استشارات تقنية', description: 'قرار تقني سريع: ما الذي تبنيه؟ وكيف؟ وبأي تكلفة؟' },
  ];

  const solutionExamples: {
    title: string;
    category: string;
    description: string;
    deliverables: string[];
  }[] = [
    {
      title: 'موقع شركة + صفحات خدمات',
      category: 'شركة / مكتب',
      description: 'صفحة رئيسية + خدمات + أعمال + تواصل + واتساب + نموذج طلب عرض',
      deliverables: ['تصميم UI', 'تجهيز RTL', 'سرعة وأداء', 'إعدادات حماية أساسية'],
    },
    {
      title: 'متجر بسيط (MVP)',
      category: 'E-commerce',
      description: 'كتالوج منتجات + سلة + طلبات + لوحة إدارة مبسطة (حسب النطاق)',
      deliverables: ['هيكلة واضحة', 'تجربة شراء سهلة', 'صفحات قانونية', 'تحسين صور/أداء'],
    },
    {
      title: 'نظام حجز للعيادات',
      category: 'عيادة / خدمات',
      description: 'مواعيد + حجز + إشعارات + إدارة مرضى/عملاء (حسب النطاق)',
      deliverables: ['صلاحيات', 'تقارير بسيطة', 'سجل حجوزات', 'واجهة سهلة'],
    },
  ];

  const trustPillars: { icon: IconType; title: string; desc: string }[] = [
    { icon: CheckCircle, title: 'نطاق واضح قبل البدء', desc: 'بنكتب المتطلبات والصفحات والتسليمات بوضوح عشان مفيش مفاجآت.' },
    { icon: Shield, title: 'أساسيات حماية', desc: 'إعدادات أمان أولية: HTTPS، حماية نماذج، تهيئة سياسات مناسبة حسب المشروع.' },
    { icon: Zap, title: 'أداء وتجربة مستخدم', desc: 'أولوية للسرعة وسهولة الاستخدام بدل “زينة” لا تخدم الهدف.' },
    { icon: Award, title: 'كود نظيف', desc: 'هيكلة قابلة للصيانة والتطوير بدل ترقيعات.' },
  ];

  const deliveryIndicators: { value: string; label: string }[] = [
    { value: '7 أيام', label: 'MVP سريع (للعرض المحدد)' },
    { value: 'RTL', label: 'واجهة عربية احترافية' },
    { value: 'أمان', label: 'إعدادات حماية أساسية' },
    { value: 'أداء', label: 'تحسين سرعة وتجربة' },
  ];

  const workProcess: { number: string; title: string; description: string }[] = [
    { number: '01', title: 'تحديد النطاق', description: 'هدف الصفحة + الصفحات المطلوبة + مخرجات واضحة' },
    { number: '02', title: 'تصميم سريع', description: 'شكل عملي يخدم الهدف (مش تجميل فارغ)' },
    { number: '03', title: 'تطوير واختبار', description: 'بناء + مراجعة أداء + إصلاحات قبل التسليم' },
    { number: '04', title: 'إطلاق وتسليم', description: 'نشر + تسليم ملفات/حسابات + نقاط تشغيل واضحة' },
  ];

  const faqs: { q: string; a: string }[] = [
    { q: 'هل “7 أيام” لكل المشاريع؟', a: 'العرض مخصص لموقع/صفحات محددة بنطاق واضح (MVP). المشاريع الكبيرة أو الأنظمة العميقة لها جدول مختلف.' },
    { q: 'إيه المطلوب مني عشان نبدأ؟', a: 'فكرة واضحة + أمثلة مواقع تعجبك + لوجو/ألوان لو موجودة. والباقي بنرتبه معك.' },
    { q: 'هل في ضمان؟', a: 'الضمان مرتبط بالنطاق المكتوب: لو اتفقنا على صفحات/مخرجات ولم تُسلَّم كما هو، يتم التصحيح وفق الاتفاق.' },
    { q: 'هل تقدم استضافة ودومين؟', a: 'نقدر نساعدك في اختيار وتهيئة الدومين والاستضافة، أو نشتغل على حساباتك أنت.' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 gradient-primary opacity-10 bg-noise" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:via-secondary-900/50 dark:to-secondary-900" />

        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-right order-2 lg:order-1">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-900 dark:text-white mb-6 animate-fade-in">
                  نبني <span className="text-gradient">موقعك أو نظامك</span>
                  <br />
                  بنطاق واضح ونتيجة ملموسة
                </h1>

                <p className="text-lg md:text-xl text-secondary-600 dark:text-secondary-300 mb-3 leading-relaxed animate-slide-up">
                  موقع شغال خلال 7 أيام (للعرض المحدد) — بنطاق مكتوب وتسليمات واضحة.
                </p>

                <p className="text-base md:text-lg text-secondary-500 dark:text-secondary-400 mb-8 animate-slide-up animation-delay-200">
                  مناسب للشركات الناشئة، المتاجر، العيادات، وكل مشروع محتاج إطلاق سريع بدون فوضى.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 animate-slide-up animation-delay-400">
                  {[
                    { icon: CheckCircle, text: 'نطاق واضح + موعد تسليم محدد' },
                    { icon: Shield, text: 'أساسيات حماية قبل الإطلاق' },
                    { icon: Zap, text: 'أداء وتجربة مستخدم قبل الزينة' },
                    { icon: Award, text: 'هيكلة قابلة للتوسع والصيانة' },
                  ].map((b, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 justify-center lg:justify-start text-secondary-700 dark:text-secondary-200"
                    >
                      <b.icon className="w-5 h-5 text-primary-600" />
                      <span className="text-sm md:text-base">{b.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animation-delay-400">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="ابدأ على واتساب الآن"
                    onClick={() =>
                      pushDL('lead_click', {
                        channel: 'whatsapp',
                        source: 'home_hero',
                        target: 'wa',
                      })
                    }
                  >
                    <Button size="lg" icon={ArrowLeft}>
                      ابدأ على واتساب الآن
                    </Button>
                  </a>

                  <Link
                    to="/offer"
                    aria-label="عرض 7 أيام"
                    onClick={() =>
                      pushDL('nav_click', {
                        source: 'home_hero',
                        target: '/offer',
                      })
                    }
                  >
                    <Button size="lg" variant="outline">
                      شوف عرض 7 أيام
                    </Button>
                  </Link>
                </div>

                <p className="mt-5 text-sm text-secondary-500 dark:text-secondary-400">
                  ملاحظة: قبل أي تنفيذ، نكتب النطاق والميزانية والتسليمات لتجنب أي لبس.
                </p>
              </div>

              <div className="order-1 lg:order-2 flex items-center justify-center">
                <div className="relative w-full max-w-2xl animate-fade-in animation-delay-400">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 blur-3xl rounded-full" />
                  <img
                    src="/banar.png"
                    alt="icode - واجهتك قدام العالم"
                    className="relative w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
              {deliveryIndicators.map((it, idx) => (
                <Card key={idx} className="p-4 text-center" hover>
                  <div className="text-2xl font-bold text-secondary-900 dark:text-white">{it.value}</div>
                  <div className="text-sm text-secondary-600 dark:text-secondary-300">{it.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              لماذا <span className="text-gradient">icode</span>؟
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 leading-relaxed">
              لأننا نشتغل بمنهجية: نطاق واضح → تنفيذ سريع → تسليم قابل للتطوير. بدون ضبابية ولا وعود عامة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustPillars.map((item, index) => (
              <Card key={index} className="p-8 text-center" hover>
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">{item.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-300">{item.desc}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/offer" onClick={() => pushDL('nav_click', { target: '/offer', source: 'home_whyus' })}>
              <Button size="lg" variant="outline" icon={ArrowLeft}>
                افتح عرض 7 أيام
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">خدماتنا</h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300">
              اختَر ما يناسب احتياجك — أو ابدأ بالعرض السريع ثم نوسع لاحقًا.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8" hover>
                <service.icon className="w-12 h-12 text-primary-600 mb-6" />
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">{service.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" onClick={() => pushDL('nav_click', { target: '/services', source: 'home_services' })}>
              <Button size="lg" variant="outline" icon={ArrowLeft}>
                عرض جميع الخدمات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary-900 text-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">طريقة عملنا</h2>
            <p className="text-xl text-secondary-300">أربع مراحل بسيطة تقلل التشتت وتسرّع التسليم.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workProcess.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6 text-3xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-secondary-300">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/offer" onClick={() => pushDL('nav_click', { target: '/offer', source: 'home_process' })}>
              <Button size="lg" variant="secondary" icon={ArrowLeft}>
                ابدأ بعرض 7 أيام
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
              أمثلة حلول قابلة للتنفيذ
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300">
              نماذج لما يمكن تسليمه حسب النطاق — الهدف إنك تتخيل النتيجة بسرعة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutionExamples.map((item, index) => (
              <Card key={index} className="overflow-hidden" hover>
                <div className="h-40 gradient-primary opacity-20" />
                <div className="p-8">
                  <span className="inline-block px-4 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold mb-4">
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-3">{item.title}</h3>
                  <p className="text-secondary-600 dark:text-secondary-300 mb-6">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.deliverables.map((d) => (
                      <span
                        key={d}
                        className="px-3 py-1 bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 rounded-lg text-sm"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/offer" onClick={() => pushDL('nav_click', { target: '/offer', source: 'home_solution_examples' })}>
              <Button size="lg" variant="outline" icon={ArrowLeft}>
                اختَر العرض المناسب
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">أسئلة سريعة قبل البدء</h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300">إجابات واضحة لتقليل القلق والتردد.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((f, i) => (
              <Card key={i} className="p-8" hover>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">{f.q}</h3>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">{f.a}</p>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/offer" onClick={() => pushDL('nav_click', { target: '/offer', source: 'home_faq' })}>
              <Button size="lg" variant="outline" icon={ArrowLeft}>
                شوف عرض 7 أيام
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <Card className="p-12 md:p-16 text-center" glass>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-6">جاهز نحدد النطاق ونبدأ؟</h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto">
              ابدأ بعرض 7 أيام أو افتح واتساب الآن — ونقفل المتطلبات بوضوح قبل التنفيذ.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                aria-label="ابدأ على واتساب الآن"
                onClick={() =>
                  pushDL('lead_click', {
                    channel: 'whatsapp',
                    source: 'home_footer',
                    target: 'wa',
                  })
                }
              >
                <Button size="lg" icon={ArrowLeft}>
                  ابدأ على واتساب الآن
                </Button>
              </a>

              <Link
                to="/offer"
                aria-label="شوف عرض 7 أيام"
                onClick={() =>
                  pushDL('nav_click', {
                    source: 'home_footer',
                    target: '/offer',
                  })
                }
              >
                <Button size="lg" variant="outline">
                  شوف عرض 7 أيام
                </Button>
              </Link>
            </div>

            <p className="mt-5 text-sm text-secondary-500 dark:text-secondary-400">
              لو عندك دومين بكرة، ممتاز. هنربط وننشر بدون تعقيد.
            </p>
          </Card>
        </div>
      </section>
    </div>
  );
}
