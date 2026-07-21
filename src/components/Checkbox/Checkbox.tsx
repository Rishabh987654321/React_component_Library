import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, id: customId, disabled, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = customId || generatedId;

    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer select-none font-sans',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            aria-invalid={error || undefined}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-4 h-4 rounded border transition-colors focus-ring flex items-center justify-center ' +
                'border-border bg-surface-lowest text-white ' +
                'peer-checked:bg-accent peer-checked:border-accent ' +
                'peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 ' +
                'dark:border-border-dark dark:bg-surface-dark-lowest dark:peer-checked:bg-accent-dark dark:peer-checked:border-accent-dark',
              error && 'border-danger dark:border-danger-dark'
            )}
          >
            <svg
              className="w-3 h-3 fill-none stroke-current stroke-[2.5] opacity-0 peer-checked:opacity-100 transition-opacity"
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-body-md font-medium text-text dark:text-text-dark">
                {label}
              </span>
            )}
            {description && (
              <span className="text-body-md text-text-muted dark:text-text-dark-muted">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
