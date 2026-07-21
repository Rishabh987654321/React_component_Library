import type { SVGAttributes, FC } from 'react';
import { cn } from '../../utils/cn';

export interface SpinnerProps extends SVGAttributes<SVGElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const Spinner: FC<SpinnerProps> = ({ size = 'md', label = 'Loading...', className, 'aria-hidden': ariaHidden, ...props }) => {
  const dimension = size === 'sm' ? 14 : size === 'lg' ? 20 : 16;

  const isStandalone = !ariaHidden;

  return (
    <span className="inline-flex items-center gap-2" role={isStandalone ? 'status' : undefined}>
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden={ariaHidden ?? true}
        className={cn('animate-spin', className)}
        {...props}
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {isStandalone && label && <span className="sr-only">{label}</span>}
    </span>
  );
};
