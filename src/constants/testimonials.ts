export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'أحمد محمود',
    company: 'Digital Egypt Co.',
    role: 'مدير تسويق رقمي',
    quote: 'icode غيّرت طريقة عملنا بشكل كامل. الموقع اللي طوروه احترافي جداً والسرعة خيالية.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad',
    rating: 5,
  },
  {
    id: '2',
    name: 'فاطمة علي',
    company: 'Smart Store',
    role: 'مالكة متجر إلكتروني',
    quote: 'النطاق كان واضح جداً من البداية والتسليم فعلاً بـ 7 أيام. فريق احترافي جداً.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    rating: 5,
  },
  {
    id: '3',
    name: 'محمد عمر',
    company: 'عيادة طب الأسنان',
    role: 'طبيب أسنان',
    quote: 'نظام الحجز الجديد وفّر الكتير من الوقت والجهد. التطبيق سهل الاستخدام وسريع.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed',
    rating: 5,
  },
  {
    id: '4',
    name: 'ليلى حسن',
    company: 'Branding Lab',
    role: 'مدير مشاريع',
    quote: 'الكود نظيف والتطوير قابل للصيانة. سهل جداً إضافة features جديدة بعدين.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laila',
    rating: 5,
  },
  {
    id: '5',
    name: 'خالد سليم',
    company: 'E-learning Platform',
    role: 'مؤسس Startup',
    quote: 'استشارة icode ساعدتنا نختار الـ tech stack الصح للمشروع. توفير كبير في الوقت والميزانية.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Khaled',
    rating: 5,
  },
  {
    id: '6',
    name: 'نور الدين',
    company: 'Web Agency',
    role: 'مدير شركة برمجة',
    quote: 'الشفافية والالتزام بالمواعيد جعلنا نشتغل معهم في مشاريع متتالية.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Noor',
    rating: 5,
  },
];
