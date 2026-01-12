import { TestimonialCard } from './ui/TestimonialCard';
import { testimonials } from '../constants/testimonials';
import { Card } from './ui/Card';

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-white dark:bg-secondary-900">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-white mb-6">
            شهادات من عملائنا
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-300">
            إليك ما يقوله الفريق والشركات اللي اشتغلنا معاهم.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              company={testimonial.company}
              role={testimonial.role}
              quote={testimonial.quote}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
