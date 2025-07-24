import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/vitest-setup.ts'],
    include: ['src/tests/**/*.test.ts', 'src/tests/**/*.test.tsx', 'src/audio/__tests__/**/*.test.ts', 'src/audio/__tests__/**/*.test.tsx'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    deps: {
      optimizer: {
        web: {
          include: ['.*\\.css$']
        }
      }
    },
    // Use a completely isolated environment for better test stability
    pool: 'forks',
    isolate: true,
    threads: false,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '*.css': resolve(__dirname, 'src/tests/mocks/styleMock.js')
    },
  },
});