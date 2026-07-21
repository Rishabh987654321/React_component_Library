import type { FC, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface PlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export const Placeholder: FC<PlaceholderProps> = ({
  title = '@rishabh/ui Component Library',
  description = 'Phase 0 setup complete. Ready for Phase 1 & Phase 2 components.',
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-6 rounded-lg border border-border bg-surface-lowest dark:bg-surface-dark-lowest dark:border-border-dark shadow-sm text-text dark:text-text-dark font-sans max-w-md',
        className
      )}
      {...props}
    >
      <h3 className="text-headline-sm font-semibold mb-2 text-accent dark:text-accent-dark">
        {title}
      </h3>
      <p className="text-body-md text-text-muted dark:text-text-dark-muted">
        {description}
      </p>
    </div>
  );
};
