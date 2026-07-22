import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      rollupTypes: true,
    }),
    {
      name: 'generate-css-dts',
      closeBundle() {
        const cssDtsContent = 'declare const styles: string;\nexport default styles;\n';
        fs.writeFileSync(path.resolve(__dirname, 'dist/style.css.d.ts'), cssDtsContent);
        fs.writeFileSync(path.resolve(__dirname, 'dist/styles.css.d.ts'), cssDtsContent);
      },
    },
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactComponentLibrary',
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) return 'style.css';
          return assetInfo.name || '';
        },
      },
    },
    cssCodeSplit: false,
  },
});
