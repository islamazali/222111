// src/components/layout/Footer.tsx
// FINAL — Enterprise footer (high contrast + trust + conversions + no wash-out)

import { Link } from 'react-router-dom';
import {
  Code2,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  ShieldCheck,
  Timer,
  BadgeCheck,
  Sparkles,
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Funnel
  const waPhone = '201507619503';
  const waText = encodeURIComponent(
    [
      'مرحبًا، عايز أبدأ مشروع مع icode.',
      '',
      'نوع المشروع:',
      'الهدف (مبيعات/حجز/تعريف):',
      'الميزانية:',
      'موعد الإطلاق:',
      'روابط/مراجع (اختياري):',
      'تفاصيل مختصرة:',
    ].join('\n')
  );
  const waHref = `https://wa.me/${waPhone}?text=${waText}`;

  const email = 'icode.contact@gmail.com'; // غيّره لإيميلك الرسمي عند جاهزيته
  const mailHref = `mailto:${email}?subject=${encodeURIComponent('استفسار عن خدمات icode')}`;

  const services = [
    { name: 'تطوير المواقع', href: '/services#websites' },
    { name: 'تطوير التطبيقات', href: '/services#apps' },
    { name: 'الأنظمة المخصصة', href: '/services#systems' },
    { name: 'الأمن السيبراني', href: '/services#security' },
    { name: 'الأتمتة والسكربتات', href: '/services#automation' },
    { name: 'الاستشارات التقنية', href: '/services#consulting' },
  ];

  const company = [
    { name: 'من نحن', href: '/about' },
    { name: 'الأعمال', href: '/portfolio' },
    { name: 'الأسعار', href: '/pricing' },
    { name: 'الشروط والأحكام', href: '/terms' },
  ];

  const quick = [
    { name: 'افتح عرض 7 أيام', href: '/offer' },
    { name: 'احجز استشارة', href: '/consultation' },
    { name: 'اطلب عرض سعر', href: '/contact' },
  ];

  return (
    <footer className="relative bg-secondary-900 text-white overflow-hidden isolate">
      {/* subtle top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

      {/* soft background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-primary-500/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[420px] h-[420px] rounded-full bg-primary-400/10 blur-3xl" />
      </div>

      <div className="container-custom section-padding pb-24 relative z-10">
        {/* TOP CTA STRIP */}
        <div className="mb-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 md:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-3">
                <Sparkles className="w-4 h-4 text-primary-300" />
                <span className="text-sm font-semibold text-white/90">جاهز تبدأ؟</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
                خلّي مشروعك يطلع للنور بسرعة وبجودة “تعيش”
              </h3>
              <p className="mt-2 text-white/80 max-w-2xl">
                إمّا تفتح عرض 7 أيام بنطاق واضح… أو تراسلنا على واتساب ونحدد المطلوب في دقائق.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  to="/offer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold gradient-primary hover-glow transition-all"
                  aria-label="افتح عرض 7 أيام"
                >
                  افتح عرض 7 أيام
                  <ArrowLeft className="w-4 h-4" />
                </Link>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold border border-white/20 bg-white/10 hover:bg-white/15 transition-all"
                  aria-label="تواصل على واتساب"
                >
                  واتساب الآن
                  <ArrowLeft className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* trust chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto">
              {[
                { icon: Timer, t: 'مواعيد واضحة' },
                { icon: ShieldCheck, t: 'أمان أساسي' },
                { icon: BadgeCheck, t: 'تسليم قابل للقياس' },
              ].map((x) => (
                <div
                  key={x.t}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <x.icon className="w-5 h-5 text-primary-300" />
                  <span className="text-sm font-semibold text-white/85">{x.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          {/* Brand + Contacts */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5 group" aria-label="الذهاب للرئيسية">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-extrabold">icode</span>
            </Link>

            <p className="text-white/80 leading-relaxed mb-6">
              نبني مواقع وتطبيقات وأنظمة “تشتغل” وتجيب نتيجة: سرعة، أمان، وتجربة تسويق واضحة تقود للـ Lead.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-2 text-white/80">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-white/70" />
                <span>القاهرة، مصر</span>
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-primary-300 transition-colors"
                aria-label="تواصل واتساب"
              >
                <Phone className="w-5 h-5 flex-shrink-0 text-white/70" />
                <span dir="ltr" className="font-semibold">
                  +20 150 761 9503
                </span>
              </a>

              <a
                href={mailHref}
                className="flex items-center gap-2 text-white/80 hover:text-primary-300 transition-colors"
                aria-label="راسلنا عبر البريد"
              >
                <Mail className="w-5 h-5 flex-shrink-0 text-white/70" />
                <span dir="ltr" className="font-semibold">
                  {email}
                </span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl font-bold bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                aria-label="واتساب"
              >
                واتساب
              </a>

              <Link
                to="/consultation"
                className="px-4 py-2.5 rounded-xl font-bold gradient-primary hover-glow transition-all"
                aria-label="احجز استشارة"
              >
                احجز استشارة
              </Link>
            </div>

            <p className="mt-4 text-sm text-white/60">
              الرد خلال ساعات العمل. لو عاجل: اكتب “عاجل” أول الرسالة.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-extrabold mb-5">الخدمات</h3>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-white/75 hover:text-primary-300 transition-colors font-semibold"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-extrabold mb-5">الشركة</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-white/75 hover:text-primary-300 transition-colors font-semibold"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="w-5 h-5 text-primary-300" />
                <span className="font-extrabold">مبدأنا</span>
              </div>
              <p className="text-white/75 text-sm leading-relaxed">
                نطاق واضح + تسليم قابل للقياس + شفافية في التغيير… عشان حق الطرفين يكون محفوظ.
              </p>
            </div>
          </div>

          {/* Quick + Mini Form */}
          <div>
            <h3 className="text-lg font-extrabold mb-5">روابط سريعة</h3>
            <ul className="space-y-3 mb-8">
              {quick.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-white/75 hover:text-primary-300 transition-colors font-semibold"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-extrabold text-white mb-2">عايز نرد عليك أسرع؟</div>
              <p className="text-white/70 text-sm mb-4">
                ابعت رسالة واتساب ببياناتك ونرجعلك بأقرب خطوة.
              </p>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-extrabold bg-white/10 border border-white/15 hover:bg-white/15 transition-all"
                aria-label="ابدأ على واتساب"
              >
                ابدأ على واتساب
                <ArrowLeft className="w-4 h-4" />
              </a>

              <div className="mt-4 text-xs text-white/55">
                بالضغط أنت توافق على التواصل بخصوص خدمتك فقط.
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-14 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-white/70">
            <p className="text-center md:text-right font-semibold">
              جميع الحقوق محفوظة © icode {currentYear}
            </p>
            <p className="text-center md:text-left text-sm">
              تنفيذ منتجات رقمية باعتمادية عالية — Funnel + Performance + Security.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
