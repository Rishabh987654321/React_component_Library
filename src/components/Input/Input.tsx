import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputStyles = cva(
  'w-full rounded border bg-surface-lowest text-text transition-colors ' +
    'placeholder:text-text-muted focus-ring ' +
    'disabled:opacity-50 disabled:cursor-not-allowed ' +
    'dark:bg-surface-dark-lowest dark:text-text-dark dark:placeholder:text-text-dark-muted',
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

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    Omit<VariantProps<typeof inputStyles>, 'error'> {
  label?: ReactNode;
  error?: string | boolean;
  helperText?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, label, error, helperText, id: customId, disabled, required, ...props }, ref) => {
    const generatedId = useId();
    const inputId = customId || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

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
          <label htmlFor={inputId} className="text-label-caps text-text font-medium dark:text-text-dark">
            {label}
            {required && <span className="text-danger dark:text-danger-dark ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={isError || undefined}
          aria-describedby={describedBy}
          className={cn(inputStyles({ size, error: isError }), className)}
          {...props}
        />
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

Input.displayName = 'Input';
