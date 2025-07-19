// This is a standalone test runner script
import { createServer } from 'vite';
import { startVitest } from 'vitest/node';
import { resolve } from 'path';

// Clear any global objects that might conflict
if (typeof global !== 'undefined') {
  // Clear any existing test-related globals
  const globalKeys = Object.keys(global);
  for (const key of globalKeys) {
    if (key.includes('test') || key.includes('jest') || key.includes('expect')) {
      try {
        delete global[key];
      } catch (e) {
        // Ignore errors
      }
    }
  }
}

// Start Vitest with a clean configuration
const config = {
  plugins: [],
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
    pool: 'forks',
    isolate: true,
    threads: false,
  },
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src'),
      '*.css': resolve(process.cwd(), 'src/tests/mocks/styleMock.js')
    },
  }
};

// Run Vitest
startVitest('run', config);