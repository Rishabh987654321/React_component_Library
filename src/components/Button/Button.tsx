import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Spinner } from '../Spinner';

const buttonStyles = cva(
  'inline-flex items-center justify-center gap-2 rounded font-medium ' +
    'transition-colors duration-150 focus-ring ' +
    'disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-white hover:bg-accent-hover dark:bg-accent-dark dark:text-surface-dark dark:hover:bg-accent-hover',
        secondary: 'border border-border-strong text-text hover:bg-surface-muted dark:border-border-dark-strong dark:text-text-dark dark:hover:bg-surface-dark-muted',
        ghost: 'text-text hover:bg-surface-muted dark:text-text-dark dark:hover:bg-surface-dark-muted',
        danger: 'bg-danger text-white hover:opacity-90 dark:bg-danger-dark dark:text-surface-dark',
      },
      size: {
        sm: 'h-btn-h-sm px-btn-px-sm text-body-md',
        md: 'h-btn-h-md px-btn-px-md text-body-md',
        lg: 'h-btn-h-lg px-btn-px-lg text-body-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  /** Visual variant style of the button */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Size of the button component */
  size?: 'sm' | 'md' | 'lg';
  /** Indicates whether the button is in a loading state, disabling interaction and showing a spinner */
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading && <Spinner size={size ?? 'md'} aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
