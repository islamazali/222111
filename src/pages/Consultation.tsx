// src/pages/Consultation.tsx
// ENTERPRISE-GRADE — فكرة مختلفة: "جلسة تشخيص + Blueprint" بدل "استشارة عامة"
// Funnel قوي: WhatsApp + Supabase + GTM + prefill ذكي + منع حجز عشوائي + تجربة واضحة
//
// الفكرة الجديدة:
// 1) العميل لا “يحجز استشارة”.. العميل “يحجز تشخيص مشروع”
// 2) مخرجات ملموسة: (Scope Snapshot + مخاطر + خطة 7 أيام + تقدير أولي + Next Steps)
// 3) تحويل أعلى: زر واتساب دائم + زر “احجز التشخيص” + شريط ثقة + SLA رد
//
// ملاحظة DB:
// جدول consultations يحتاج أعمدة (اختياري): goal, stage, budget, timeline, source, created_at
// لو مش موجودة: امسحها من payload أو أضفها في Supabase.

import { useMemo, useState, FormEvent } from 'react';
import {
  CheckCircle,
  Calendar,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  FileText,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { TextArea } from '../components/ui/TextArea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { supabase } from '../lib/supabase';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function pushDL(event: string, payload: Record<string, unknown> = {}) {
  if (!window.dataLayer) window.dataLayer = [];
  window.dataLayer.push({ event, ...payload });
}

export function Consultation() {
  // ===== Funnel config =====
  const WHATSAPP_PHONE = '201507619503';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: 'موقع إلكتروني',

    // Funnel fields (جديدة)
    goal: '',
    stage: '',
    budget: '',
    timeline: '',
    preferred_date: '',
    preferred_time: 'صباحاً (9-12)',
    project_description: '',

    // Meta
    source: 'consultation_page',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // ===== Options =====
  const projectTypes = [
    { value: 'موقع إلكتروني', label: 'موقع إلكتروني' },
    { value: 'تطبيق ويب', label: 'تطبيق ويب' },
    { value: 'تطبيق موبايل', label: 'تطبيق موبايل' },
    { value: 'نظام مخصص', label: 'نظام مخصص' },
    { value: 'استشارة معمارية', label: 'استشارة معمارية' },
    { value: 'أخرى', label: 'أخرى' },
  ];

  const goals = [
    { value: '', label: 'اختر الهدف الأساسي' },
    { value: 'زيادة المبيعات', label: 'زيادة المبيعات' },
    { value: 'جمع Leads', label: 'جمع Leads (عملاء محتملين)' },
    { value: 'إطلاق براند', label: 'إطلاق براند وهوية' },
    { value: 'نظام داخلي', label: 'نظام داخلي/بوابة موظفين' },
    { value: 'تحسين أداء/SEO', label: 'تحسين أداء/SEO' },
    { value: 'أمان وامتثال', label: 'أمان وامتثال' },
  ];

  const stages = [
    { value: '', label: 'مرحلة المشروع' },
    { value: 'فكرة', label: 'فكرة' },
    { value: 'قيد التخطيط', label: 'قيد التخطيط' },
    { value: 'عندي تصميم', label: 'عندي تصميم' },
    { value: 'عندي نظام قائم', label: 'عندي نظام قائم وأحتاج تطوير' },
    { value: 'عندي فريق وأحتاج توجيه', label: 'عندي فريق وأحتاج توجيه' },
  ];

  const budgets = [
    { value: '', label: 'ميزانية تقريبية (اختياري)' },
    { value: 'أقل من 5,000 جنيه', label: 'أقل من 5,000 جنيه' },
    { value: '5,000 - 15,000 جنيه', label: '5,000 - 15,000 جنيه' },
    { value: '15,000 - 30,000 جنيه', label: '15,000 - 30,000 جنيه' },
    { value: '30,000 - 70,000 جنيه', label: '30,000 - 70,000 جنيه' },
    { value: 'أكثر من 70,000 جنيه', label: 'أكثر من 70,000 جنيه' },
  ];

  const timelines = [
    { value: '', label: 'موعد الإطلاق' },
    { value: 'خلال أسبوع', label: 'خلال أسبوع' },
    { value: 'خلال 2-3 أسابيع', label: 'خلال 2-3 أسابيع' },
    { value: 'خلال شهر', label: 'خلال شهر' },
    { value: 'خلال 2-3 شهور', label: 'خلال 2-3 شهور' },
    { value: 'غير محدد', label: 'غير محدد' },
  ];

  const timeSlots = [
    { value: 'صباحاً (9-12)', label: 'صباحاً (9-12)' },
    { value: 'ظهراً (12-3)', label: 'ظهراً (12-3)' },
    { value: 'عصراً (3-6)', label: 'عصراً (3-6)' },
    { value: 'مساءً (6-9)', label: 'مساءً (6-9)' },
  ];

  // ===== WhatsApp Prefill (ذكي — يكتب “مخرجات” الجلسة) =====
  const WHATSAPP_PREFILL = useMemo(() => {
    const lines = [
      'عايز أحجز "جلسة تشخيص مشروع" مع icode.',
      'عايز أطلع من الجلسة بـ: نطاق واضح + مخاطر + خطة 7 أيام + تقدير أولي.',
      '',
      `الاسم: ${formData.name || '-'}`,
      `الإيميل: ${formData.email || '-'}`,
      `الهاتف: ${formData.phone || '-'}`,
      `نوع المشروع: ${formData.project_type || '-'}`,
      `الهدف: ${formData.goal || '-'}`,
      `مرحلة المشروع: ${formData.stage || '-'}`,
      `الميزانية: ${formData.budget || '-'}`,
      `موعد الإطلاق: ${formData.timeline || '-'}`,
      `التاريخ المفضل: ${formData.preferred_date || '-'}`,
      `الوقت المفضل: ${formData.preferred_time || '-'}`,
      '',
      'وصف مختصر:',
      formData.project_description || '-',
      '',
      'مهم: لو عندي روابط/تصميم/مرجع هابعته بعد الرسالة.',
    ];
    return encodeURIComponent(lines.join('\n'));
  }, [formData]);

  const WHATSAPP_LINK = useMemo(
    () => `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_PREFILL}`,
    [WHATSAPP_PREFILL]
  );

  // ===== Validation =====
  const todayMin = useMemo(() => new Date().toISOString().split('T')[0], []);

  const canSubmit = useMemo(() => {
    if (!formData.name.trim()) return false;
    if (!formData.email.trim()) return false;
    if (!formData.project_type) return false;
    if (!formData.project_description.trim()) return false;
    // تاريخ اختياري: لو عايزه required خلي السطرين دول true required
    // if (!formData.preferred_date) return false;
    return true;
  }, [formData]);

  // ===== Submit =====
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    pushDL('consultation_submit', {
      source: 'consultation_form',
      project_type: formData.project_type,
      goal: formData.goal,
      stage: formData.stage,
      timeline: formData.timeline,
    });

    try {
      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        created_at: new Date().toISOString(),
      };

      const { error: submitError } = await supabase.from('consultations').insert([payload]);
      if (submitError) throw submitError;

      setSuccess(true);
      pushDL('lead_success', {
        source: 'consultation_form',
        project_type: formData.project_type,
        preferred_time: formData.preferred_time,
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        project_type: 'موقع إلكتروني',
        goal: '',
        stage: '',
        budget: '',
        timeline: '',
        preferred_date: '',
        preferred_time: 'صباحاً (9-12)',
        project_description: '',
        source: 'consultation_page',
      });
    } catch (err) {
      setError('حدث خطأ أثناء حجز الجلسة. جرّب تاني أو احجز مباشرة على واتساب.');
      pushDL('lead_error', { source: 'consultation_form' });
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ===== Content Blocks =====
  const outputs = [
    { icon: FileText, title: 'Scope Snapshot', desc: 'نطاق مختصر (صفحات/Features) + حدود واضحة للاتفاق' },
    { icon: AlertTriangle, title: 'Risk Map', desc: 'أكبر 3 مخاطر في التنفيذ + حلول عملية لتجنبها' },
    { icon: TrendingUp, title: 'خطة 7 أيام', desc: 'خطة تنفيذ أول أسبوع (Milestones + تسليمات قابلة للقياس)' },
    { icon: ShieldCheck, title: 'Baseline للأمان', desc: 'نقاط أمان أساسية + ما يجب عمله قبل الإطلاق' },
  ];

  const whoShouldBook = [
    { title: 'عايز تبدأ صح', description: 'مش عايز تضيع وقت في “كلام عام”، عايز خطة واضحة' },
    { title: 'عايز تسعير عادل', description: 'عايز تعرف السعر بناءً على Scope مش تخمين' },
    { title: 'عايز Funnel يجيب عميل', description: 'مش عايز موقع شكله حلو وبس.. عايزه يبيع' },
    { title: 'عندك نظام قائم', description: 'عايز تشخيص سريع: إيه يتصلّح وإيه يتبني من جديد' },
  ];

  const prep = [
    'اكتب هدف واحد واضح: “مبيعات” أو “Leads” أو “نظام داخلي”',
    'لو عندك مرجع/منافس/تصميم — جهّز الرابط',
    'حدد موعد الإطلاق حتى لو تقريبي',
    'قول الميزانية بصراحة (عشان الحل يكون واقعي)',
  ];

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      {/* HERO — فكرة جديدة */}
      <section className="section-padding gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-60" />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">جلسة تشخيص مشروع — مش استشارة عامة</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              احجز جلسة تشخيص مشروع مجانية
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              هدف الجلسة: تخرج بخلاصة تنفيذ حقيقية — نطاق واضح + مخاطر + خطة 7 أيام + تقدير أولي.
            </p>

            <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center gap-2 bg-white/10 border border-white/15 rounded-2xl py-4">
                <Clock className="w-5 h-5" />
                <span className="font-semibold">45–60 دقيقة</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 border border-white/15 rounded-2xl py-4">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-semibold">Scope + ضمان وضوح</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 border border-white/15 rounded-2xl py-4">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">خطة قابلة للتنفيذ</span>
              </div>
            </div>

            {/* Funnel CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { source: 'consultation_hero', channel: 'whatsapp' })}
              >
                <Button size="lg" variant="secondary" icon={ArrowLeft}>
                  تواصل فوراً على واتساب
                </Button>
              </a>

              <a
                href="#book"
                onClick={() => pushDL('nav_click', { source: 'consultation_hero', target: '#book' })}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/90"
                >
                  احجز من هنا
                </Button>
              </a>
            </div>

            <p className="text-sm mt-5 text-white/80">
              رد خلال 24 ساعة عمل. لو مستعجل: واتساب أسرع.
            </p>
          </div>
        </div>
      </section>

      {/* OUTPUTS — ملموسة */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                مخرجات الجلسة (دي اللي بتخليها “مختلفة”)
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-300">
                مش وعود. دي ملفات/نقاط واضحة هتستلمها كتوجيه.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {outputs.map((x) => (
                <Card key={x.title} className="p-6" hover>
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <x.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">{x.title}</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed">{x.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
                لمن الجلسة؟
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-300">
                لو أنت واحد من دول… الجلسة هتوفر عليك فلوس ووقت.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whoShouldBook.map((x) => (
                <Card key={x.title} className="p-6" hover>
                  <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">{x.title}</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-300 leading-relaxed">{x.description}</p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { source: 'consultation_who', channel: 'whatsapp' })}
              >
                <Button size="lg" icon={ArrowLeft}>
                  اختصر الطريق — واتساب
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BOOK */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT — Prep */}
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                قبل ما تحجز (عشان الجلسة تطلع مفيدة)
              </h2>

              <Card className="p-8 mb-8" gradient>
                <ul className="space-y-4">
                  {prep.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-lg text-secondary-700 dark:text-secondary-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 glass">
                <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck className="w-6 h-6 text-primary-600" />
                  <h4 className="text-lg font-bold text-secondary-900 dark:text-white">مبدأ واضح</h4>
                </div>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                  الجلسة هدفها “قرار” و“خطة” مش دردشة. عشان كده هنركز على Scope ونتيجة قابلة للقياس.
                </p>
              </Card>
            </div>

            {/* RIGHT — Form */}
            <div id="book" className="scroll-mt-28">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                احجز تشخيصك الآن
              </h2>

              {success && (
                <div className="mb-6 p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-xl">
                  <p className="text-success-700 dark:text-success-400 font-semibold">
                    تم استلام طلبك. هنكلمك لتأكيد الموعد وتحديد قناة الجلسة.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-700 dark:text-red-400 font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="الاسم الكامل"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="اكتب اسمك"
                  />

                  <Input
                    label="البريد الإلكتروني"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="example@email.com"
                  />
                </div>

                <Input
                  label="رقم الهاتف (اختياري)"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+20 1X XXX XXXX"
                />

                <Select
                  label="نوع المشروع"
                  required
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                  options={projectTypes}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="الهدف الأساسي"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    options={goals}
                  />

                  <Select
                    label="مرحلة المشروع"
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                    options={stages}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="ميزانية تقريبية (اختياري)"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    options={budgets}
                  />

                  <Select
                    label="موعد الإطلاق"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    options={timelines}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="التاريخ المفضل (اختياري)"
                    type="date"
                    value={formData.preferred_date}
                    onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                    min={todayMin}
                  />

                  <Select
                    label="الوقت المفضل"
                    value={formData.preferred_time}
                    onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                    options={timeSlots}
                  />
                </div>

                <TextArea
                  label="وصف مختصر للمشروع (إجباري)"
                  required
                  value={formData.project_description}
                  onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                  placeholder="اكتب: الهدف + الصفحات/Features + أي مرجع + أهم شرط عندك..."
                  rows={6}
                  hint="أحسن وصف: 5 سطور. كل سطر معلومة. بدون حشو."
                />

                <Button type="submit" size="lg" className="w-full" disabled={loading || !canSubmit} icon={ArrowLeft}>
                  {loading ? 'جاري الإرسال...' : 'احجز جلسة التشخيص'}
                </Button>
              </form>

              {/* WhatsApp fallback */}
              <div className="mt-6">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => pushDL('lead_click', { source: 'consultation_form_whatsapp', channel: 'whatsapp' })}
                >
                  <Button className="w-full" variant="outline" icon={ArrowLeft}>
                    أو احجز مباشرة على واتساب (قالب جاهز)
                  </Button>
                </a>
              </div>

              {/* Trust note */}
              <div className="mt-6 text-sm text-secondary-500 dark:text-secondary-400">
                بالإرسال: أنت توافق على التواصل معك بخصوص الطلب فقط. لا رسائل تسويقية عشوائية.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Funnel */}
      <section className="section-padding gradient-primary text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">لو مستعجل… اختصرها</h2>
            <p className="text-xl mb-8 text-white/90">
              افتح واتساب وابعت التفاصيل. هنحولها لنطاق واضح وخطة تنفيذ.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              onClick={() => pushDL('lead_click', { source: 'consultation_footer', channel: 'whatsapp' })}
            >
              <Button size="lg" variant="secondary" icon={ArrowLeft}>
                تواصل فوراً على واتساب
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
