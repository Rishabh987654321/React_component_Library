import React, { useState, useId, type ReactNode, cloneElement, isValidElement } from 'react';
import { cn } from '../../utils/cn';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, className, position = 'top' }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const tooltipId = useId();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  };

  const triggerElement = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        'aria-describedby': open ? tooltipId : undefined,
        onMouseEnter: (e: React.MouseEvent) => {
          (children as any).props?.onMouseEnter?.(e);
          handleOpen();
        },
        onMouseLeave: (e: React.MouseEvent) => {
          (children as any).props?.onMouseLeave?.(e);
          handleClose();
        },
        onFocus: (e: React.FocusEvent) => {
          (children as any).props?.onFocus?.(e);
          handleOpen();
        },
        onBlur: (e: React.FocusEvent) => {
          (children as any).props?.onBlur?.(e);
          handleClose();
        },
      })
    : children;

  return (
    <div className="relative inline-block">
      {triggerElement}
      {open && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute z-50 px-2.5 py-1 text-xs font-medium rounded bg-code-bg text-white shadow-md whitespace-nowrap pointer-events-none transition-opacity duration-150',
            positionClasses[position],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
