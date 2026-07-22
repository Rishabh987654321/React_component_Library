import type { StorybookConfig } from '@storybook/react-vite';
import type { PluginOption } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },

  async viteFinal(config) {
    // Cast to any[] before flattening — Vite's PluginOption type is
    // deeply recursive (plugin | plugin[] | Promise<plugin> | falsy,
    // nested arbitrarily), which makes TS's flat(Infinity) inference
    // blow up. Runtime behavior is unaffected; this is purely to satisfy
    // the type checker.
    const flatPlugins = ((config.plugins ?? []) as any[]).flat(Infinity);

    config.plugins = flatPlugins.filter((plugin) => {
      if (!plugin || typeof plugin !== 'object') return true;
      const name = (plugin as any).name;
      return name !== 'vite:dts' && name !== 'generate-css-dts';
    }) as PluginOption[];

    return config;
  },
};

export default config;