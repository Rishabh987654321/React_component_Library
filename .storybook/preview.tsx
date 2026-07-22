import type { Preview } from '@storybook/react';
import '../src/index.css';

export const globalTypes = {
  theme: {
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'sun', title: 'Light' },
        { value: 'dark', icon: 'moon', title: 'Dark' },
      ],
      dynamicTitle: true,
    },
  },
};

const preview: Preview = {
  parameters: {
    layout: 'centered',
    docs: {
      story: {
        inline: true,
        height: 'auto',
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F7F9FB' },
        { name: 'dark', value: '#0A0A0A' },
      ],
    },
    chromatic: {
      modes: {
        light: { theme: 'light' },
        dark: { theme: 'dark' },
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      if (typeof document !== 'undefined') {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
        root.setAttribute('data-theme', theme);
      }
      return (
        <div className="p-6 bg-surface dark:bg-surface-dark text-text dark:text-text-dark transition-colors duration-200 flex items-center justify-center w-full min-h-[100px] rounded-lg">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
