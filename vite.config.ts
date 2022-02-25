import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { VitePWA } from 'vite-plugin-pwa';
// @ts-ignore
import manifest from './manifest.json';
// @ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    preact(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '',
      filename: 'service-worker.js',
      manifest,
    }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
  },
});
