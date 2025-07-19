import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// This is a special configuration file for VS Code Test Explorer
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/vitest-setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    deps: {
      optimizer: {
        web: {
          include: ['.*\\.css$']
        }
      }
    },
    // Use a completely isolated environment
    pool: 'forks',
    isolate: true,
    threads: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
      '*.css': resolve(__dirname, '../src/tests/mocks/styleMock.js')
    },
  }
});