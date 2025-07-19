import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    deps: {
      optimizer: {
        web: {
          include: [/\.css$/]
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
      '*.css': resolve(__dirname, 'tests/mocks/styleMock.js')
    }
  }
});