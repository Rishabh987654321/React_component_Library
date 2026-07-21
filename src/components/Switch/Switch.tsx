import { forwardRef, useState, useId, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  label?: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      disabled,
      id: customId,
      'aria-labelledby': customAriaLabelledBy,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const switchId = customId || generatedId;
    const labelId = `${switchId}-label`;

    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
    const isChecked = controlledChecked !== undefined ? controlledChecked : uncontrolledChecked;

    const handleClick = () => {
      if (disabled) return;
      const nextChecked = !isChecked;
      if (controlledChecked === undefined) {
        setUncontrolledChecked(nextChecked);
      }
      onChange?.(nextChecked);
    };

    return (
      <div
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer select-none font-sans',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        onClick={handleClick}
      >
        <button
          ref={ref}
          type="button"
          role="switch"
          id={switchId}
          aria-checked={isChecked}
          aria-labelledby={label ? labelId : customAriaLabelledBy}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className={cn(
            'relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-ring',
            isChecked
              ? 'bg-accent dark:bg-accent-dark'
              : 'bg-surface-high dark:bg-surface-dark-high'
          )}
          {...props}
        >
          <span
            className={cn(
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white dark:bg-surface-dark-lowest shadow-sm transform transition duration-200 ease-in-out',
              isChecked ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </button>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span id={labelId} className="text-body-md font-medium text-text dark:text-text-dark">
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
      </div>
    );
  }
);

Switch.displayName = 'Switch';
