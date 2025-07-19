// This is a special script for VS Code Test Explorer
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { startVitest } from 'vitest/node';

// Run Vitest
const config = defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/playwrighttests/vitest-setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
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
      '*.css': resolve(process.cwd(), 'src/playwrighttests/mocks/styleMock.js')
    }
  }
});

startVitest('run', config);