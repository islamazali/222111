// src/pages/Portal.tsx (UPGRADED DEMO — جذّاب + ثقة + "كيف نتابع مشروعك الآن" + Funnel + WhatsApp)
// الهدف: صفحة Portal كـ "Preview" احترافي قبل الإطلاق: تقنع + تطمّن + تشرح المتابعة الحالية + CTA واضح
// مميزات:
// - قسم "كيف نتابع مشروعك الآن" (بديل عملي قبل إطلاق البوابة)
// - Timeline واضح + SLA + Deliverables + Approval flow
// - "حزمة الشفافية" (ما الذي سيصلك أسبوعيًا)
// - CTA واتساب موحد + Prefill جاهز
// - GTM dataLayer events
// - بدون وعود مبالغ فيها، لغة عملية

import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  CheckCircle,
  Calendar,
  MessageSquare,
  FileText,
  Upload,
  ArrowLeft,
  Shield,
  Timer,
  Activity,
  ClipboardList,
  FolderOpen,
  Bell,
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

function buildWhatsAppLink(phone: string, lines: string[]) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export function Portal() {
  const WHATSAPP_PHONE = '201507619503';

  const waHref = useMemo(
    () =>
      buildWhatsAppLink(WHATSAPP_PHONE, [
        'عايز متابعة مشروع/تفعيل لوحة العميل.',
        '',
        'اسم العميل/الشركة:',
        'اسم المشروع:',
        'نوع المشروع:',
        'مرحلة المشروع (إن وجدت):',
        'الهدف:',
        'تفاصيل مختصرة:',
        '',
        'مصدر: Portal',
      ]),
    []
  );

  const nowTracking = [
    {
      icon: ClipboardList,
      title: 'لوحة متابعة أسبوعية (Status Report)',
      desc: 'تقرير مختصر وواضح: ما تم + ما القادم + المخاطر + المطلوب منك.',
    },
    {
      icon: FolderOpen,
      title: 'ملفات منظمة (Deliverables Folder)',
      desc: 'كل تسليم في مجلد بتاريخ واضح: تصميم/روابط معاينة/مرفقات/نسخ.',
    },
    {
      icon: CheckCircle,
      title: 'نظام موافقات بسيط',
      desc: 'كل مرحلة لها “معايير قبول” — توافق/تعدّل مرة واحدة بشكل منظم.',
    },
    {
      icon: MessageSquare,
      title: 'قناة تواصل واحدة فقط',
      desc: 'واتساب مخصص للمشروع + رسائل مُعنونة (عشان ما نضيع وقت).',
    },
    {
      icon: Bell,
      title: 'تنبيهات بالمطلوب منك',
      desc: 'نذكّرك بالمحتوى/الموافقات المطلوبة لتسريع التسليم بدون تعطل.',
    },
    {
      icon: Activity,
      title: 'قياس ونتائج (عند اللزوم)',
      desc: 'لو المشروع تسويقي: Tracking أساسي للأزرار والتحويلات حسب النطاق.',
    },
  ];

  const transparencyPack = [
    'رابط معاينة (Staging) دائم للمشروع',
    'قائمة مهام أسبوعية: Done / Doing / Next',
    'ملف “مطلوب من العميل” (محتوى/صور/موافقة) بتاريخ واضح',
    'ملحوظات المخاطر (لو فيه تأخير محتوى أو تغيير نطاق)',
    'لقطة سريعة للنتيجة (Speed/SEO basics) عند التسليم',
  ];

  const timeline = [
    {
      t: 'اليوم 0 — تفعيل المتابعة',
      d: 'نثبت النطاق، نجمع المحتوى، ونحدد خطة تسليم بالمراحل.',
    },
    {
      t: 'أول 48 ساعة',
      d: 'تسليم رابط معاينة + تخطيط الأقسام + أول Progress سريع.',
    },
    {
      t: 'أسبوعيًا',
      d: 'تقرير حالة + تسليم مرحلي + قائمة “المطلوب منك”.',
    },
    {
      t: 'قبل الإطلاق',
      d: 'اختبار + مراجعة نهائية + ضبط Tracking + تسليم Runbook.',
    },
  ];

  const previewFeatures = [
    { icon: Calendar, title: 'المراحل والمواعيد', desc: 'جدول واضح + تسليمات قابلة للقياس.' },
    { icon: FileText, title: 'المستندات', desc: 'نطاق/ملاحظات/تسليمات في مكان واحد.' },
    { icon: Upload, title: 'مشاركة الملفات', desc: 'رفع/تنزيل منظّم حسب المرحلة.' },
    { icon: CheckCircle, title: 'الموافقات', desc: 'اعتماد مرحلي بدل مراجعات عشوائية.' },
    { icon: Shield, title: 'خصوصية وأمان', desc: 'صلاحيات وصول محددة حسب الحاجة.' },
    { icon: Timer, title: 'انضباط في التنفيذ', desc: 'تقليل التشتت = تسليم أسرع.' },
  ];

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      {/* HERO */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Lock className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">لوحة العميل</h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              متابعة شفافة للمشروع — حتى قبل إطلاق البوابة بالكامل.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { source: 'portal_hero_whatsapp' })}
              >
                <Button size="lg" variant="secondary" icon={ArrowLeft}>
                  تفعيل المتابعة على واتساب
                </Button>
              </a>

              <Link
                to="/offer"
                onClick={() => pushDL('nav_click', { source: 'portal_hero', target: '/offer' })}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/90"
                >
                  ابدأ بعرض 7 أيام
                </Button>
              </Link>
            </div>

            <p className="text-sm mt-5 text-white/80">
              ملاحظة: البوابة “قيد الإطلاق” — المتابعة الفعلية شغالة الآن بنفس مستوى التنظيم.
            </p>
          </div>
        </div>
      </section>

      {/* LOCKED AREA CARD */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <Card className="p-10 md:p-12 text-center glass">
            <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-3">منطقة محمية</h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-2">
              الوصول للبوابة سيكون عبر تسجيل دخول.
            </p>
            <p className="text-secondary-600 dark:text-secondary-400 mb-8">
              لو أنت عميل حالي: راسلنا على واتساب لتفعيل المتابعة وإرسال رابط/ملفات المشروع.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { source: 'portal_locked_whatsapp' })}
              >
                <Button size="lg" icon={ArrowLeft}>
                  تواصل الآن
                </Button>
              </a>
              <Link to="/contact" onClick={() => pushDL('nav_click', { source: 'portal_locked', target: '/contact' })}>
                <Button size="lg" variant="outline">
                  أو أرسل رسالة
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* HOW WE TRACK NOW */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              كيف نتابع مشروعك الآن (حتى قبل إطلاق البوابة)
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
              بدل الكلام العام: نظام متابعة واقعي يقلّل التشتت ويمنع ضياع التفاصيل.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nowTracking.map((f, idx) => (
              <Card key={idx} className="p-7" hover>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-300 text-sm leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8 mt-10 glass">
            <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">حزمة الشفافية التي تصلك</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
              {transparencyPack.map((x, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                  <p className="text-secondary-700 dark:text-secondary-300">{x}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              شكل المتابعة عمليًا
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">
              خطوات قصيرة… لكن تمنع فوضى “هتخلص إمتى؟”
            </p>
          </div>

          <div className="space-y-6">
            {timeline.map((step, index) => (
              <Card key={index} className="p-7" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-1">{step.t}</h3>
                    <p className="text-secondary-600 dark:text-secondary-300">{step.d}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDL('lead_click', { source: 'portal_timeline_whatsapp' })}
            >
              <Button size="lg" icon={ArrowLeft}>
                فعّل المتابعة الآن
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* WHAT PORTAL WILL INCLUDE (PREVIEW) */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              ماذا ستضيف البوابة عند إطلاقها؟
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300">
              نفس المتابعة الحالية… لكن داخل لوحة واحدة بصلاحيات.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewFeatures.map((f, idx) => (
              <Card key={idx} className="p-7" hover>
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">{f.title}</h3>
                <p className="text-secondary-600 dark:text-secondary-300 text-sm leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <Card className="p-10 md:p-12 text-center glass">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              تريد طريقة متابعة “شركة كبيرة” بدون تعقيد؟
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8 max-w-3xl mx-auto">
              ارسل تفاصيل مشروعك… ونبدأ نظام متابعة واضح من أول يوم: نطاق + مراحل + تسليمات + موافقات.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { source: 'portal_footer_whatsapp' })}
              >
                <Button size="lg" icon={ArrowLeft}>
                  تواصل واتساب
                </Button>
              </a>

              <Link to="/offer" onClick={() => pushDL('nav_click', { source: 'portal_footer', target: '/offer' })}>
                <Button size="lg" variant="outline">
                  ابدأ بعرض 7 أيام
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}