import type { Meta, StoryObj } from '@storybook/react';
import { Placeholder } from './Placeholder';
import { ThemeProvider, useTheme } from '../../theme';

const meta: Meta<typeof Placeholder> = {
  title: 'Overview/Placeholder',
  component: Placeholder,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'React Component Library',
    description: 'Phase 1 setup complete. ThemeProvider and useTheme hook ready.',
  },
};

function ThemeToggleControls() {
  const { theme, preference, setPreference } = useTheme();

  return (
    <div className="space-y-4 max-w-md p-6 rounded-lg border border-border bg-surface-lowest dark:bg-surface-dark-lowest dark:border-border-dark shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-body-md font-semibold text-text dark:text-text-dark">Current Theme:</span>
        <span className="px-2 py-1 text-label-caps rounded bg-accent-subtle dark:bg-accent-dark-subtle text-accent dark:text-accent-dark">
          {theme.toUpperCase()} (Pref: {preference})
        </span>
      </div>
      <div className="flex gap-2">
        {(['light', 'dark', 'system'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setPreference(mode)}
            className={`px-3 py-1.5 text-body-md rounded transition-colors focus-ring ${
              preference === mode
                ? 'bg-accent text-white dark:bg-accent-dark dark:text-surface-dark font-medium'
                : 'bg-surface-muted dark:bg-surface-dark-muted text-text dark:text-text-dark hover:bg-surface-high dark:hover:bg-surface-dark-high'
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export const ThemeProviderDemo: Story = {
  render: () => (
    <ThemeProvider>
      <ThemeToggleControls />
    </ThemeProvider>
  ),
};
