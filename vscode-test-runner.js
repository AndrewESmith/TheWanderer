// This is a special script for VS Code Test Explorer
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { createServer } from 'vite';
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

// Start Vitest with a clean configuration
const config = defineConfig({
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
      '*.css': resolve(process.cwd(), 'tests/mocks/styleMock.js')
    }
  }
});

// Run Vitest
startVitest('run', config);