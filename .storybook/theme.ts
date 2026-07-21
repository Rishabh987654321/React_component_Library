import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: '@rishabh/ui Design System',
  brandUrl: 'https://github.com/rishabh/ui',

  colorPrimary: '#3B82F6',
  colorSecondary: '#3B82F6',

  appBg: '#F7F9FB',
  appContentBg: '#FFFFFF',
  appBorderColor: '#C6C6CD',
  appBorderRadius: 4,

  fontBase: '"Inter", ui-sans-serif, system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, monospace',

  textColor: '#191C1E',
  textInverseColor: '#EFF1F3',

  barTextColor: '#45464D',
  barSelectedColor: '#3B82F6',
  barBg: '#F2F4F6',
});
