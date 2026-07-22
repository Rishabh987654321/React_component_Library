import { forwardRef, createContext, useContext, useState, useId, type InputHTMLAttributes, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface RadioContextValue {
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

export interface RadioGroupProps extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  legend?: ReactNode;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function RadioGroup({
  className,
  legend,
  name: customName,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled,
  children,
  ...props
}: RadioGroupProps) {
  const generatedName = useId();
  const name = customName || generatedName;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(e.target.value);
    }
    onChange?.(e);
  };

  return (
    <RadioContext.Provider value={{ name, value, onChange: handleChange, disabled }}>
      <fieldset className={cn('flex flex-col gap-2 font-sans border-none p-0 m-0', className)} {...props}>
        {legend && (
          <legend className="text-label-caps font-semibold text-text dark:text-text-dark mb-1">
            {legend}
          </legend>
        )}
        {children}
      </fieldset>
    </RadioContext.Provider>
  );
}

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  description?: ReactNode;
  value: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, value, id: customId, disabled: customDisabled, checked: customChecked, onChange: customOnChange, ...props }, ref) => {
    const context = useContext(RadioContext);
    const generatedId = useId();
    const radioId = customId || generatedId;

    const name = props.name || context?.name;
    const isChecked = customChecked !== undefined ? customChecked : context?.value !== undefined ? context.value === value : props.defaultChecked;
    const isDisabled = customDisabled || context?.disabled;
    const handleChange = customOnChange || context?.onChange;

    return (
      <label
        htmlFor={radioId}
        className={cn(
          'inline-flex items-start gap-3 cursor-pointer select-none font-sans',
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            name={name}
            value={value}
            checked={isChecked}
            disabled={isDisabled}
            onChange={handleChange || (() => {})}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'w-4 h-4 rounded-full border transition-colors flex items-center justify-center ' +
                'border-border bg-surface-lowest ' +
                'peer-checked:border-accent ' +
                'peer-focus-visible:ring-2 peer-focus-visible:ring-accent peer-focus-visible:ring-offset-2 ' +
                'dark:border-border-dark dark:bg-surface-dark-lowest dark:peer-checked:border-accent-dark'
            )}
          >
            <div
              className={cn(
                'w-2 h-2 rounded-full bg-accent dark:bg-accent-dark scale-0 peer-checked:scale-100 transition-transform',
                isChecked && 'scale-100'
              )}
            />
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

Radio.displayName = 'Radio';
