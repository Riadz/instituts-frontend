import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import viteComponents, { PrimeVueResolver } from 'vite-plugin-components';

export default defineConfig({
  plugins: [
    vue(),
    viteComponents({
      dirs: ['src/views'],
      globalComponentsDeclaration: true,
      customComponentResolvers: [PrimeVueResolver()],
    }),
  ],
  //
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  build: {
    sourcemap: true,
  },
});
