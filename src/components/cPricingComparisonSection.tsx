'use client';

import { cPricingComparisonTable } from './cPricingComparisonTable';

export const cPricingComparisonSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-secondary-50 dark:from-dark-900 dark:to-dark-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
            مقارنة خطط التسعير
          </h2>
          <p className="text-lg text-secondary-600 dark:text-secondary-300 max-w-2xl mx-auto">
            اختر الخطة المناسبة لاحتياجات عملك. يمكنك الترقية أو التنزيل في أي وقت.
          </p>
        </div>

        <div className="flex justify-center">
          <cPricingComparisonTable />
        </div>

        <div className="mt-12 text-center">
          <p className="text-secondary-600 dark:text-secondary-300 mb-6">
            هل تحتاج إلى خطة مخصصة؟
          </p>
          <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
            تواصل معنا
          </button>
        </div>
      </div>
    </section>
  );
};
