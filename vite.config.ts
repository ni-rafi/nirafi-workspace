import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@fix-webm-duration/fix': resolve(__dirname, './src/shared/mocks/fixWebmDuration.ts')
    }
  }
});
