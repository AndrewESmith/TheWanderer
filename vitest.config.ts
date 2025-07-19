import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    deps: {
      inline: [/\.css$/],
    },
    // Prevent conflicts with Jest
    pool: 'forks',
    isolate: true,
  },
  resolve: {
    alias: {
      '*.css': resolve(__dirname, 'tests/mocks/styleMock.js')
    }
  }
});