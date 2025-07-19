import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    deps: {
      inline: [/\.css$/],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '*.css': resolve(__dirname, 'tests/mocks/styleMock.js')
    },
  },
});