// This file contains setup code for tests

// Clear any existing matchers that might be from Jest
if (typeof global !== 'undefined') {
  // Remove any existing matchers
  if (global.expect && global.expect.extend) {
    const originalExpect = global.expect;
    delete global.expect;
    global.expect = originalExpect;
  }
}

// Mock CSS imports
vi.mock('*.css', () => ({}));
vi.mock('../src/maze.css', () => ({}));

// Explicitly disable any Jest-related globals
if (typeof window !== 'undefined') {
  // @ts-ignore
  delete window.jest;
}

// Ensure we're using Vitest's globals
import { expect, vi } from 'vitest';
global.expect = expect;
global.vi = vi;