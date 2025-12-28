import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glass?: boolean;
  hover?: boolean;
  gradient?: boolean;
}

export function Card({ children, className = '', glass = false, hover = true, gradient = false }: CardProps) {
  const baseStyles = 'rounded-2xl transition-all duration-300';
  const glassStyles = glass ? 'glass' : 'bg-white dark:bg-secondary-800 border border-secondary-200 dark:border-secondary-700';
  const hoverStyles = hover ? 'hover-lift hover-glow cursor-pointer' : '';
  const gradientStyles = gradient ? 'bg-gradient-to-br from-white to-primary-50 dark:from-secondary-800 dark:to-secondary-900' : '';

  return (
    <div className={`${baseStyles} ${glassStyles} ${hoverStyles} ${gradientStyles} ${className}`}>
      {children}
    </div>
  );
}
