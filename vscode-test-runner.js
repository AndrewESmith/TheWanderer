// This is a special script for VS Code Test Explorer
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { startVitest } from 'vitest/node';

// Clear any existing matchers that might be from Jest
if (typeof global !== 'undefined') {
  // Remove any existing matchers
  if (global.expect && global.expect.extend) {
    const originalExpect = global.expect;
    delete global.expect;
    global.expect = originalExpect;
  }
}

// Explicitly disable any Jest-related globals
if (typeof window !== 'undefined') {
  // @ts-ignore
  delete window.jest;
}

// Run Vitest
const config = defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/vitest-setup.ts'],
    include: ['src/tests/**/*.test.ts', 'src/tests/**/*.test.tsx'],
    exclude: ['**/node_modules/**', '**/dist/**'],
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
      '@': resolve(process.cwd(), 'src'),
      '*.css': resolve(process.cwd(), 'src/tests/mocks/styleMock.js')
    }
  }
});

startVitest('run', config);