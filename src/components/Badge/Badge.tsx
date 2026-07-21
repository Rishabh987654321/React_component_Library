import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeStyles = cva(
  'inline-flex items-center font-medium rounded-full transition-colors font-sans',
  {
    variants: {
      variant: {
        default: 'bg-surface-muted text-text dark:bg-surface-dark-muted dark:text-text-dark',
        primary: 'bg-accent-subtle text-accent dark:bg-accent-dark-subtle dark:text-accent-dark',
        success: 'bg-success-bg text-success dark:bg-opacity-20',
        warning: 'bg-warning-bg text-warning dark:bg-opacity-20',
        danger: 'bg-danger-bg text-danger dark:bg-danger-bg-dark dark:text-danger-dark',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-label-caps',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStyles> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span ref={ref} className={cn(badgeStyles({ variant, size }), className)} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
