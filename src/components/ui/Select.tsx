import { SelectHTMLAttributes, forwardRef, useId } from 'react';

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  requiredMark?: boolean;
  placeholder?: string; // يظهر كـ option أولي
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      hint,
      error,
      required,
      requiredMark = true,
      placeholder = 'اختر...',
      options,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const selectId = id ?? `select-${autoId}`;
    const hintId = hint ? `${selectId}-hint` : undefined;
    const errorId = error ? `${selectId}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-extrabold text-secondary-900 dark:text-white mb-2"
          >
            {label}
            {required && requiredMark ? (
              <span className="text-red-500 ms-1" aria-hidden="true">
                *
              </span>
            ) : null}
          </label>
        )}

        <div className="relative">
          {/* chevron */}
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary-500 dark:text-secondary-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          <select
            ref={ref}
            id={selectId}
            aria-invalid={!!error}
            aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
            className={[
              'w-full appearance-none',
              'px-4 py-3 rounded-xl',
              'border bg-white dark:bg-secondary-900',
              'text-secondary-900 dark:text-white',
              'shadow-sm',
              'outline-none transition-all duration-200',
              'border-secondary-200/80 dark:border-secondary-700/80',
              'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20',
              'hover:border-secondary-300/90 dark:hover:border-secondary-600/90',
              'disabled:opacity-60 disabled:cursor-not-allowed',
              // leave space for chevron on the left (RTL)
              'pl-12',
              error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : '',
              className,
            ].join(' ')}
            required={required}
            {...props}
          >
            {/* Placeholder */}
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}

            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {hint && !error && (
          <p id={hintId} className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="mt-2 text-sm font-semibold text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
