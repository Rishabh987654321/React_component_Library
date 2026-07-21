import { useState, useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface PopoverProps {
  content: ReactNode;
  children: (props: { open: boolean; toggle: () => void }) => ReactNode;
  className?: string;
}

export function Popover({ content, children, className }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = () => setOpen((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-block">
      {children({ open, toggle })}
      {open && (
        <div
          className={cn(
            'absolute top-full mt-2 left-0 z-40 w-72 rounded-lg border border-border bg-surface-lowest p-4 shadow-popover font-sans text-text ' +
            'dark:border-border-dark dark:bg-surface-dark-lowest dark:text-text-dark',
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
