import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  company: string;
  role: string;
  quote: string;
  image?: string;
  rating?: number;
}

export function TestimonialCard({
  name,
  company,
  role,
  quote,
  image,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 border border-secondary-100 dark:border-secondary-700">
      {/* Rating stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-secondary-700 dark:text-secondary-200 text-lg mb-6 leading-relaxed italic">
        "{quote}"
      </p>

      {/* Author info */}
      <div className="flex items-center gap-4 pt-6 border-t border-secondary-100 dark:border-secondary-700">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <p className="font-semibold text-secondary-900 dark:text-white">{name}</p>
          <p className="text-sm text-secondary-500 dark:text-secondary-400">
            {role} at {company}
          </p>
        </div>
      </div>
    </div>
  );
}
