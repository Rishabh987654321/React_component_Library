import { forwardRef, useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const toastStyles = cva(
  'p-4 rounded-lg border shadow-popover flex gap-3 text-body-md font-sans transition-all duration-200',
  {
    variants: {
      variant: {
        info: 'bg-surface-lowest border-border text-text dark:bg-surface-dark-lowest dark:border-border-dark dark:text-text-dark',
        success: 'bg-surface-lowest border-success text-text dark:bg-surface-dark-lowest dark:text-text-dark',
        danger: 'bg-surface-lowest border-danger text-text dark:bg-surface-dark-lowest dark:text-text-dark',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

export interface ToastProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof toastStyles> {
  title?: ReactNode;
  duration?: number; // duration in ms (default 5000)
  onDismiss?: () => void;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, duration = 5000, onDismiss, children, ...props }, ref) => {
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number>(Date.now());
    const remainingRef = useRef<number>(duration);

    const startTimer = () => {
      if (!onDismiss || remainingRef.current <= 0) return;
      startTimeRef.current = Date.now();
      timerRef.current = setTimeout(() => {
        onDismiss();
      }, remainingRef.current);
    };

    const pauseTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        remainingRef.current -= Date.now() - startTimeRef.current;
      }
    };

    useEffect(() => {
      startTimer();
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    return (
      <div
        ref={ref}
        role="status"
        onMouseEnter={pauseTimer}
        onMouseLeave={startTimer}
        onFocus={pauseTimer}
        onBlur={startTimer}
        className={cn(toastStyles({ variant }), className)}
        {...props}
      >
        <div className="flex-1">
          {title && <h5 className="font-semibold mb-0.5 text-text dark:text-text-dark">{title}</h5>}
          <div className="text-text-muted dark:text-text-dark-muted">{children}</div>
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            aria-label="Dismiss toast"
            className="text-text-muted hover:text-text dark:text-text-dark-muted dark:hover:text-text-dark p-1 focus-ring rounded self-start"
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

Toast.displayName = 'Toast';
