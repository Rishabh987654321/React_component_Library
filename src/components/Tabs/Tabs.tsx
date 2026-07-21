import { forwardRef, createContext, useContext, useState, useEffect, useId, type HTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (val: string) => void;
  baseId: string;
  tabs: string[];
  registerTab: (val: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
}

export function Tabs({ className, value, defaultValue, onValueChange, children, ...props }: TabsProps) {
  const [uncontrolledTab, setUncontrolledTab] = useState(defaultValue || '');
  const [tabs, setTabs] = useState<string[]>([]);
  const baseId = useId();

  const activeTab = value !== undefined ? value : uncontrolledTab;

  const setActiveTab = (val: string) => {
    if (value === undefined) {
      setUncontrolledTab(val);
    }
    onValueChange?.(val);
  };

  const registerTab = (val: string) => {
    setTabs((prev) => (prev.includes(val) ? prev : [...prev, val]));
    if (!activeTab && !defaultValue) {
      setActiveTab(val);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, baseId, tabs, registerTab }}>
      <div className={cn('flex flex-col gap-4 font-sans', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export const TabsList = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = useContext(TabsContext);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (!context || !context.tabs.length) return;

      const { tabs, activeTab, setActiveTab } = context;
      const currentIndex = tabs.indexOf(activeTab);
      let nextIndex = currentIndex;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== currentIndex && tabs[nextIndex]) {
        setActiveTab(tabs[nextIndex]);
        const nextTabBtn = document.getElementById(`${context.baseId}-tab-${tabs[nextIndex]}`);
        nextTabBtn?.focus();
      }
    };

    return (
      <div
        ref={ref}
        role="tablist"
        onKeyDown={handleKeyDown}
        className={cn(
          'inline-flex items-center gap-1 rounded-lg bg-surface-subtle p-1 border border-border ' +
            'dark:bg-surface-dark-subtle dark:border-border-dark',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsList.displayName = 'TabsList';

export interface TabsTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsTrigger must be used inside Tabs');

    const { activeTab, setActiveTab, baseId, registerTab } = context;

    useEffect(() => {
      registerTab(value);
    }, [value, registerTab]);

    const isActive = activeTab === value;
    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={tabId}
        aria-selected={isActive}
        aria-controls={panelId}
        tabIndex={isActive ? 0 : -1}
        onClick={() => setActiveTab(value)}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1.5 text-body-md font-medium transition-colors focus-ring',
          isActive
            ? 'bg-surface-lowest text-text shadow-sm dark:bg-surface-dark-lowest dark:text-text-dark font-semibold'
            : 'text-text-muted hover:text-text dark:text-text-dark-muted dark:hover:text-text-dark',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = useContext(TabsContext);
    if (!context) throw new Error('TabsContent must be used inside Tabs');

    const { activeTab, baseId } = context;
    const isActive = activeTab === value;
    const tabId = `${baseId}-tab-${value}`;
    const panelId = `${baseId}-panel-${value}`;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId}
        className={cn('focus-ring rounded p-1 text-text dark:text-text-dark', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';
