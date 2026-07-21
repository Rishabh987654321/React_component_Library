import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const alertStyles = cva(
  'p-4 rounded-lg border flex gap-3 text-body-md font-sans transition-colors',
  {
    variants: {
      variant: {
        info: 'bg-accent-subtle border-accent/20 text-text dark:bg-accent-dark-subtle dark:text-text-dark',
        success: 'bg-success-bg border-success/30 text-text dark:bg-opacity-20 dark:text-text-dark',
        warning: 'bg-warning-bg border-warning/30 text-text dark:bg-opacity-20 dark:text-text-dark',
        danger: 'bg-danger-bg border-danger/30 text-text dark:bg-danger-bg-dark/30 dark:text-text-dark',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof alertStyles> {
  title?: ReactNode;
  onClose?: () => void;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, onClose, children, ...props }, ref) => {
    const role = variant === 'danger' ? 'alert' : 'status';

    return (
      <div
        ref={ref}
        role={role}
        className={cn(alertStyles({ variant }), className)}
        {...props}
      >
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-1 text-headline-sm text-current">{title}</h4>}
          <div>{children}</div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close alert"
            className="text-text-muted hover:text-text dark:text-text-dark-muted dark:hover:text-text-dark p-1 focus-ring rounded"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
