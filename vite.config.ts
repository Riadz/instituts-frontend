import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    // viteComponents({
    //   dirs: ['src/views'],
    //   globalComponentsDeclaration: true,
    //   customComponentResolvers: [PrimeVueResolver()],
    // }),
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
