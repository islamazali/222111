import React from 'react';
import { Card } from './Card';

export interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  icon: Icon,
  title,
  description,
  variant = 'primary',
}) => {
  const variantStyles = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
    secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400',
    accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400',
  };

  return (
    <Card className="p-8 h-full flex flex-col" hover>
      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${variantStyles[variant]}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
        {title}
      </h3>
      <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed flex-grow">
        {description}
      </p>
    </Card>
  );
};
