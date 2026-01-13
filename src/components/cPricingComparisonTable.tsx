import { Check, X } from 'lucide-react';

interface PricingFeature {
  name: string;
  starter: boolean | string;
  pro: boolean | string;
  business: boolean | string;
}

const features: PricingFeature[] = [
  {
    name: 'عدد الصفحات',
    starter: '3 صفحات',
    pro: '6 صفحات',
    business: '12 صفحة',
  },
  {
    name: 'SEO Optimization',
    starter: false,
    pro: true,
    business: true,
  },
  {
    name: 'Core Web Vitals',
    starter: false,
    pro: true,
    business: true,
  },
  {
    name: 'تحسين الأداء',
    starter: 'الأساسي',
    pro: 'محسّن',
    business: 'متقدم',
  },
  {
    name: 'GTM Events',
    starter: false,
    pro: true,
    business: true,
  },
  {
    name: 'تقارير بسيطة',
    starter: false,
    pro: true,
    business: true,
  },
  {
    name: 'روابط داخلية',
    starter: false,
    pro: true,
    business: true,
  },
  {
    name: 'ضمان الجودة',
    starter: 'النطاق المكتوب',
    pro: 'تصحيح للأخطاء',
    business: 'دعم مستمر',
  },
];

export function PricingComparisonTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-secondary-50 dark:bg-secondary-800/50">
            <th className="px-4 py-3 text-right text-secondary-900 dark:text-white font-semibold">
              الميزة
            </th>
            <th className="px-4 py-3 text-center text-secondary-900 dark:text-white font-semibold">
              Starter
            </th>
            <th className="px-4 py-3 text-center text-secondary-900 dark:text-white font-semibold">
              Pro
            </th>
            <th className="px-4 py-3 text-center text-secondary-900 dark:text-white font-semibold">
              Business
            </th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, idx) => (
            <tr
              key={idx}
              className="border-t border-secondary-200 dark:border-secondary-700 hover:bg-secondary-50 dark:hover:bg-secondary-800/30"
            >
              <td className="px-4 py-3 text-secondary-700 dark:text-secondary-200 font-medium">
                {feature.name}
              </td>
              <td className="px-4 py-3 text-center">
                {typeof feature.starter === 'boolean' ? (
                  feature.starter ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  )
                ) : (
                  <span className="text-sm text-secondary-600 dark:text-secondary-300">
                    {feature.starter}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {typeof feature.pro === 'boolean' ? (
                  feature.pro ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  )
                ) : (
                  <span className="text-sm text-secondary-600 dark:text-secondary-300">
                    {feature.pro}
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-center">
                {typeof feature.business === 'boolean' ? (
                  feature.business ? (
                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-red-500 mx-auto" />
                  )
                ) : (
                  <span className="text-sm text-secondary-600 dark:text-secondary-300">
                    {feature.business}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
