import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

export interface ThemeContextValue {
  theme: Theme;
  preference: ThemePreference;
  setPreference: (pref: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'ui-theme-preference';

function getSystemTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(preference: ThemePreference): Theme {
  return preference === 'system' ? getSystemTheme() : preference;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultPreference?: ThemePreference;
}

export function ThemeProvider({ children, defaultPreference = 'system' }: ThemeProviderProps) {
  const [preference, setPreferenceState] = useState<ThemePreference>(() => {
    if (typeof window === 'undefined') return defaultPreference;
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    return stored ?? defaultPreference;
  });

  const [theme, setTheme] = useState<Theme>(() => resolveTheme(preference));

  const setPreference = useCallback((pref: ThemePreference) => {
    setPreferenceState(pref);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, pref);
    }
  }, []);

  // Re-resolve whenever preference changes
  useEffect(() => {
    setTheme(resolveTheme(preference));
  }, [preference]);

  // React to OS-level changes if preference is 'system'
  useEffect(() => {
    if (preference !== 'system' || typeof window === 'undefined') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => setTheme(getSystemTheme());
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [preference]);

  // Apply class and data-theme to document.documentElement
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
