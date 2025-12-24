import {
  TextareaHTMLAttributes,
  forwardRef,
  useId,
} from 'react';

interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  requiredMark?: boolean;
  maxLengthHint?: boolean; // إظهار عدّاد الحروف
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      hint,
      error,
      required,
      requiredMark = true,
      maxLength,
      maxLengthHint = false,
      className = '',
      id,
      value,
      ...props
    },
    ref
  ) => {
    const autoId = useId();
    const textareaId = id ?? `textarea-${autoId}`;
    const hintId = hint ? `${textareaId}-hint` : undefined;
    const errorId = error ? `${textareaId}-error` : undefined;

    const currentLength =
      typeof value === 'string' ? value.length : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-extrabold text-secondary-900 dark:text-white mb-2"
          >
            {label}
            {required && requiredMark && (
              <span className="text-red-500 ms-1">*</span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={!!error}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          className={[
            'w-full',
            'px-4 py-3',
            'rounded-xl',
            'border',
            'bg-white dark:bg-secondary-900',
            'text-secondary-900 dark:text-white',
            'placeholder:text-secondary-400',
            'shadow-sm',
            'outline-none',
            'transition-all duration-200',
            'resize-none',
            'border-secondary-200/80 dark:border-secondary-700/80',
            'focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20',
            'hover:border-secondary-300/90 dark:hover:border-secondary-600/90',
            'disabled:opacity-60 disabled:cursor-not-allowed',
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : '',
            className,
          ].join(' ')}
          rows={4}
          required={required}
          maxLength={maxLength}
          value={value}
          {...props}
        />

        {/* Hint + counter */}
        {(hint || (maxLengthHint && maxLength)) && !error && (
          <div className="mt-2 flex justify-between text-sm text-secondary-600 dark:text-secondary-300">
            <span id={hintId}>{hint}</span>
            {maxLengthHint && maxLength && (
              <span>
                {currentLength ?? 0}/{maxLength}
              </span>
            )}
          </div>
        )}

        {error && (
          <p
            id={errorId}
            className="mt-2 text-sm font-semibold text-red-500"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
