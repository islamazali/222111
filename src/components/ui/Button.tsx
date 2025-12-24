// src/components/ui/Button.tsx (FULL UPDATED — no hover jitter, RTL-safe, fixed dimensions)

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ElementType;
  iconPosition?: 'start' | 'end';
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'end',
  className,
  children,
  type = 'button',
  ...rest
}: Props) {
  const base =
    // ✅ ثبات أبعاد + منع التقطيع
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold ' +
    'whitespace-nowrap select-none ' +
    'outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-secondary-900 ' +
    // ✅ انتقالات ألوان/ظل فقط (بدون translate/scale)
    'transition-colors transition-shadow duration-200 ' +
    'disabled:opacity-60 disabled:cursor-not-allowed ' +
    // ✅ ثبّت الحدود دائماً (مهم جداً لمنع jitter)
    'border border-transparent';

  const sizes: Record<ButtonSize, string> = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-11 px-5 text-base',
    lg: 'h-12 px-6 text-base',
  };

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-primary-600 text-white shadow-sm ' +
      'hover:bg-primary-700 hover:shadow-md ' +
      'active:bg-primary-800',
    secondary:
      'bg-secondary-800 text-white shadow-sm ' +
      'hover:bg-secondary-700 hover:shadow-md ' +
      'active:bg-secondary-900',
    outline:
      // ✅ border ثابت قبل وبعد hover + لا تغيير padding
      'bg-transparent text-primary-700 dark:text-primary-300 ' +
      'border-primary-600/80 dark:border-primary-400/70 ' +
      'hover:bg-primary-50 dark:hover:bg-primary-900/20 ' +
      'hover:shadow-sm active:bg-primary-100/60 dark:active:bg-primary-900/30',
    ghost:
      'bg-transparent text-secondary-800 dark:text-secondary-200 ' +
      'hover:bg-secondary-100 dark:hover:bg-secondary-800/60 ' +
      'active:bg-secondary-200 dark:active:bg-secondary-800',
  };

  const iconNode = Icon ? (
    <span className="inline-flex items-center justify-center w-5 h-5 shrink-0">
      <Icon className="w-5 h-5" />
    </span>
  ) : null;

  // RTL: افتراضياً الأيقونة "end" في العربية تبقى يسار النص (شكل زر سهم ← مناسب)
  const content =
    iconNode && iconPosition === 'start' ? (
      <>
        {iconNode}
        <span>{children}</span>
      </>
    ) : iconNode && iconPosition === 'end' ? (
      <>
        <span>{children}</span>
        {iconNode}
      </>
    ) : (
      <span>{children}</span>
    );

  return (
    <button
      type={type}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {content}
    </button>
  );
}
