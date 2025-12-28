import { useMemo, useState, FormEvent } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Send,
  ArrowLeft,
  ShieldCheck,
  Timer,
  CheckCircle2,
  Sparkles,
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

export function Contact() {
  const WHATSAPP_PHONE = '201507619503';
  const WHATSAPP_PREFILL = useMemo(
    () =>
      encodeURIComponent(
        [
          'عايز أبدأ مشروع مع icode.',
          '',
          'نوع المشروع:',
          'الهدف:',
          'الميزانية:',
          'موعد الإطلاق:',
          'تفاصيل مختصرة:',
        ].join('\n')
      ),
    []
  );
  const WHATSAPP_LINK = useMemo(
    () => `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_PREFILL}`,
    [WHATSAPP_PREFILL]
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project_type: 'موقع إلكتروني',
    budget: '',
    message: '',
    // تحسين Funnel:
    goal: '',
    launch_timeline: '',
    contact_channel: 'واتساب',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const projectTypes = [
    { value: 'موقع إلكتروني', label: 'موقع إلكتروني' },
    { value: 'تطبيق ويب', label: 'تطبيق ويب' },
    { value: 'تطبيق موبايل', label: 'تطبيق موبايل' },
    { value: 'نظام مخصص', label: 'نظام مخصص' },
    { value: 'استشارة تقنية', label: 'استشارة تقنية' },
    { value: 'أخرى', label: 'أخرى' },
  ];

  // توحيد العملة لمصر (لو عايز ريال رجّعها)
  const budgetRanges = [
    { value: '', label: 'اختر الميزانية التقريبية' },
    { value: 'أقل من 5,000 جنيه', label: 'أقل من 5,000 جنيه' },
    { value: '5,000 - 15,000 جنيه', label: '5,000 - 15,000 جنيه' },
    { value: '15,000 - 30,000 جنيه', label: '15,000 - 30,000 جنيه' },
    { value: '30,000 - 70,000 جنيه', label: '30,000 - 70,000 جنيه' },
    { value: 'أكثر من 70,000 جنيه', label: 'أكثر من 70,000 جنيه' },
  ];

  const goals = [
    { value: '', label: 'اختر الهدف الأساسي' },
    { value: 'زيادة المبيعات', label: 'زيادة المبيعات' },
    { value: 'جمع Leads', label: 'جمع Leads (عملاء محتملين)' },
    { value: 'إطلاق براند', label: 'إطلاق براند وهوية' },
    { value: 'بوابة/نظام داخلي', label: 'بوابة/نظام داخلي' },
    { value: 'تحسين تجربة/سرعة', label: 'تحسين تجربة/سرعة' },
    { value: 'أمان وامتثال', label: 'أمان وامتثال' },
  ];

  const launchTimeline = [
    { value: '', label: 'موعد الإطلاق المستهدف' },
    { value: 'خلال أسبوع', label: 'خلال أسبوع' },
    { value: 'خلال 2-3 أسابيع', label: 'خلال 2-3 أسابيع' },
    { value: 'خلال شهر', label: 'خلال شهر' },
    { value: 'خلال 2-3 شهور', label: 'خلال 2-3 شهور' },
    { value: 'غير محدد', label: 'غير محدد' },
  ];

  const contactChannels = [
    { value: 'واتساب', label: 'واتساب (الأسرع)' },
    { value: 'بريد إلكتروني', label: 'بريد إلكتروني' },
  ];

  const canSubmit = useMemo(() => {
    if (!formData.name.trim()) return false;
    if (!formData.email.trim()) return false;
    if (!formData.project_type) return false;
    if (!formData.message.trim()) return false;
    return true;
  }, [formData]);

  const buildWhatsAppWithDetails = () => {
    const extra = encodeURIComponent(
      [
        '',
        '----------------',
        `الاسم: ${formData.name || '-'}`,
        `الإيميل: ${formData.email || '-'}`,
        `نوع المشروع: ${formData.project_type || '-'}`,
        `الهدف: ${formData.goal || '-'}`,
        `الميزانية: ${formData.budget || '-'}`,
        `موعد الإطلاق: ${formData.launch_timeline || '-'}`,
        `القناة المفضلة: ${formData.contact_channel || '-'}`,
        '',
        `التفاصيل:`,
        `${formData.message || '-'}`,
      ].join('\n')
    );

    // بدل ما نضاعف ?text مرتين:
    return `https://wa.me/${WHATSAPP_PHONE}?text=${WHATSAPP_PREFILL}${extra}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    pushDL('lead_submit', { source: 'contact_form', stage: 'submit_attempt' });

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        project_type: formData.project_type,
        budget: formData.budget || null,
        message: formData.message.trim(),
        goal: formData.goal || null,
        launch_timeline: formData.launch_timeline || null,
        contact_channel: formData.contact_channel || 'واتساب',
        created_at: new Date().toISOString(),
      };

      const { error: submitError } = await supabase.from('contacts').insert([payload]);
      if (submitError) throw submitError;

      pushDL('lead_submit', { source: 'contact_form', stage: 'submit_success' });

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        project_type: 'موقع إلكتروني',
        budget: '',
        message: '',
        goal: '',
        launch_timeline: '',
        contact_channel: 'واتساب',
      });
    } catch (err) {
      pushDL('lead_submit', { source: 'contact_form', stage: 'submit_error' });
      setError('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      label: 'واتساب',
      value: '+20 150 761 9503',
      href: WHATSAPP_LINK,
    },
    {
      icon: MapPin,
      label: 'الموقع',
      value: 'القاهرة، مصر',
      href: '#',
    },
  ];

  // لا تحط روابط عامة لأنها تقلل الثقة. خلّيها placeholders أو احذفها لحد ما تحط روابطك الحقيقية.
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      {/* HERO (Conversion-first) */}
      <section className="section-padding gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-60" />
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">رد سريع + نطاق واضح + تنفيذ منظم</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">تواصل معنا</h1>
            <p className="text-xl md:text-2xl leading-relaxed text-white/90">
              لو هدفك موقع/تطبيق يجيب عميل فعلي… اكتب التفاصيل. وإحنا هنرد بخطة واضحة، مش كلام عام.
            </p>

            {/* Trust chips */}
            <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-center gap-2 bg-white/10 border border-white/15 rounded-2xl py-4">
                <Timer className="w-5 h-5" />
                <span className="font-semibold">رد خلال 24 ساعة</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 border border-white/15 rounded-2xl py-4">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-semibold">وضوح نطاق + ضمان</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-white/10 border border-white/15 rounded-2xl py-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">تنفيذ قابل للقياس</span>
              </div>
            </div>

            {/* Primary CTA: WhatsApp */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { source: 'contact_hero', channel: 'whatsapp' })}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  icon={ArrowLeft}
                >
                  تواصل واتساب الآن
                </Button>
              </a>

              <a
                href="#form"
                onClick={() => pushDL('nav_click', { source: 'contact_hero', target: '#form' })}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/70 text-white bg-white/10 hover:bg-white/20 hover:text-white hover:border-white/90"
                >
                  اكتب التفاصيل هنا
                </Button>
              </a>
            </div>

            <p className="text-sm mt-5 text-white/80">
              نصيحة: اكتب “الهدف + الميزانية + موعد الإطلاق” عشان الرد يطلع دقيق.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* FORM */}
            <div id="form" className="scroll-mt-28">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                    اكتب طلبك بشكل ذكي
                  </h2>
                  <p className="text-lg text-secondary-600 dark:text-secondary-300">
                    كل ما كتبت تفاصيل أوضح، كل ما العرض والخطة يكونوا أدق وأسرع.
                  </p>
                </div>
              </div>

              {/* Status */}
              {success && (
                <div className="mb-6 p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-xl">
                  <p className="text-success-700 dark:text-success-400 font-semibold">
                    تم إرسال رسالتك بنجاح. هنرد عليك بخطة ونطاق مبدئي قريبًا.
                  </p>

                  <div className="mt-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => pushDL('lead_click', { source: 'contact_success', channel: 'whatsapp' })}
                    >
                      <Button variant="outline">لو مستعجل: واتساب الآن</Button>
                    </a>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                  <p className="text-red-700 dark:text-red-400 font-semibold">{error}</p>
                </div>
              )}

              {/* Mini-proof + CTA to WhatsApp with filled details */}
              <Card className="p-6 mb-6 glass">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary-900 dark:text-white mb-1">
                        أسرع طريق لرد “محترف”
                      </p>
                      <p className="text-sm text-secondary-600 dark:text-secondary-300">
                        اكتب البيانات الأساسية تحت… أو افتح واتساب وهيتجهز لك قالب جاهز.
                      </p>
                    </div>
                  </div>

                  <a
                    href={buildWhatsAppWithDetails()}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => pushDL('lead_click', { source: 'contact_form_box', channel: 'whatsapp_prefilled' })}
                  >
                    <Button variant="outline" icon={ArrowLeft}>
                      واتساب بالقالب
                    </Button>
                  </a>
                </div>
              </Card>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="نوع المشروع"
                    required
                    value={formData.project_type}
                    onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
                    options={projectTypes}
                  />

                  <Select
                    label="الهدف الأساسي"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    options={goals}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select
                    label="موعد الإطلاق"
                    value={formData.launch_timeline}
                    onChange={(e) => setFormData({ ...formData, launch_timeline: e.target.value })}
                    options={launchTimeline}
                  />

                  <Select
                    label="الميزانية التقريبية (اختياري)"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    options={budgetRanges}
                  />
                </div>

                <Select
                  label="أفضل طريقة للرد"
                  value={formData.contact_channel}
                  onChange={(e) => setFormData({ ...formData, contact_channel: e.target.value })}
                  options={contactChannels}
                />

                <TextArea
                  label="وصف مختصر (مهم)"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="مثال: عايز موقع خدمات + صفحة أسعار + صفحة أعمال + نموذج Leads يتسجل في قاعدة بيانات + تتبع GTM..."
                  rows={6}
                  hint="اكتب 5 سطور: المشكلة، الهدف، الجمهور، صفحات/Features مهمة، موعد الإطلاق."
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={loading || !canSubmit}
                  icon={Send}
                >
                  {loading ? 'جاري الإرسال...' : 'إرسال (مع حفظ البيانات)'}
                </Button>

                <p className="text-sm text-secondary-500 dark:text-secondary-400 text-center">
                  بالضغط على إرسال أنت توافق على التواصل معك بخصوص طلبك فقط. لا سبام.
                </p>
              </form>
            </div>

            {/* RIGHT COLUMN */}
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-2">
                طرق تواصل مباشرة
              </h2>
              <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-8">
                لو محتاج رد أسرع: واتساب أفضل قناة.
              </p>

              <div className="space-y-6 mb-10">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="p-6" hover>
                    <a
                      href={info.href}
                      className="flex items-center gap-4 group"
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      onClick={() =>
                        pushDL('lead_click', {
                          source: 'contact_info',
                          label: info.label,
                          href: info.href,
                        })
                      }
                    >
                      <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <info.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-1">
                          {info.label}
                        </p>
                        <p className="text-lg font-semibold text-secondary-900 dark:text-white">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  </Card>
                ))}
              </div>

              {/* Trust cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6" hover>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Timer className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">
                        وقت الاستجابة
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                        نرد خلال 24 ساعة في أيام العمل. ولو مستعجل: واتساب فوري.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6" hover>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">
                        وضوح قبل التنفيذ
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                        بنحدد نطاق + تسليمات + مواعيد. بدون كلام مطاط.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social (optional) */}
              <div className="mt-10">
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-5">
                  تابعنا (اختياري)
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-14 h-14 rounded-xl bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center hover:bg-primary-600 dark:hover:bg-primary-600 text-secondary-700 dark:text-secondary-300 hover:text-white transition-all hover:scale-110"
                      aria-label={social.label}
                      onClick={() => pushDL('social_click', { source: 'contact', label: social.label })}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>

                <p className="text-sm text-secondary-500 dark:text-secondary-400 mt-3">
                  ملاحظة: الأفضل تربط حساباتك الحقيقية فقط.
                </p>
              </div>

              {/* Strong CTA box */}
              <Card className="p-8 mt-12 glass">
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                  عايز رد “جاهز قرار”؟
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed mb-6">
                  ابعت 4 نقاط: (نوع المشروع) + (الهدف) + (الميزانية) + (موعد الإطلاق). هنرجع لك بخطة مبدئية ونطاق.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => pushDL('lead_click', { source: 'contact_cta_box', channel: 'whatsapp' })}
                    className="flex-1"
                  >
                    <Button className="w-full" icon={ArrowLeft}>
                      واتساب الآن
                    </Button>
                  </a>

                  <a
                    href="#form"
                    onClick={() => pushDL('nav_click', { source: 'contact_cta_box', target: '#form' })}
                    className="flex-1"
                  >
                    <Button className="w-full" variant="outline">
                      اكتب هنا
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (focused + conversion) */}
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              أسئلة سريعة
            </h2>
            <p className="text-lg text-secondary-600 dark:text-secondary-300 mb-10">
              إجابات مختصرة تساعدك تقرر بسرعة.
            </p>

            <div className="space-y-6 text-right">
              {[
                {
                  q: 'كم يستغرق تنفيذ موقع إلكتروني؟',
                  a: 'حسب النطاق. غالبًا: من 7 أيام (لو نطاق واضح) إلى 2–6 أسابيع للمواقع الكبيرة.',
                },
                {
                  q: 'هل يوجد ضمان بعد التسليم؟',
                  a: 'نعم. الضمان يغطي إصلاح الأخطاء البرمجية ضمن النطاق حسب الباقة.',
                },
                {
                  q: 'هل يمكن البدء بدون تفاصيل كاملة؟',
                  a: 'نقدر نبدأ بجلسة تحديد نطاق قصيرة، أو رسالتين واتساب بالحد الأدنى من المعلومات.',
                },
              ].map((faq, index) => (
                <Card key={index} className="p-6" hover>
                  <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-300">{faq.a}</p>
                </Card>
              ))}
            </div>

            <div className="mt-10">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                onClick={() => pushDL('lead_click', { source: 'contact_faq_footer', channel: 'whatsapp' })}
              >
                <Button size="lg" icon={ArrowLeft}>
                  خليك عملي — واتساب الآن
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
