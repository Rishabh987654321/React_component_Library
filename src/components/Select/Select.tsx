import { forwardRef, useId, type SelectHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const selectStyles = cva(
  'w-full rounded border bg-surface-lowest text-text transition-colors appearance-none pr-10 focus-ring ' +
    'disabled:opacity-50 disabled:cursor-not-allowed ' +
    'dark:bg-surface-dark-lowest dark:text-text-dark',
  {
    variants: {
      size: {
        sm: 'h-input-h-sm px-3 text-body-md',
        md: 'h-input-h-md px-3.5 text-body-md',
        lg: 'h-input-h-lg px-4 text-body-lg',
      },
      error: {
        true: 'border-danger dark:border-danger-dark',
        false: 'border-border dark:border-border-dark',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    Omit<VariantProps<typeof selectStyles>, 'error'> {
  label?: ReactNode;
  error?: string | boolean;
  helperText?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, size, label, error, helperText, id: customId, disabled, required, children, ...props }, ref) => {
    const generatedId = useId();
    const selectId = customId || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const isError = Boolean(error);
    const errorMessage = typeof error === 'string' ? error : undefined;

    const describedBy = [
      isError && errorMessage ? errorId : null,
      helperText ? helperId : null,
    ]
      .filter(Boolean)
      .join(' ') || undefined;

    return (
      <div className="flex flex-col gap-1.5 w-full font-sans">
        {label && (
          <label htmlFor={selectId} className="text-label-caps text-text font-medium dark:text-text-dark">
            {label}
            {required && <span className="text-danger dark:text-danger-dark ml-1">*</span>}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            aria-invalid={isError || undefined}
            aria-describedby={describedBy}
            className={cn(selectStyles({ size, error: isError }), className)}
            {...props}
          >
            {children}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted dark:text-text-dark-muted">
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
        {isError && errorMessage && (
          <p id={errorId} className="text-body-md text-danger dark:text-danger-dark">
            {errorMessage}
          </p>
        )}
        {!isError && helperText && (
          <p id={helperId} className="text-body-md text-text-muted dark:text-text-dark-muted">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
