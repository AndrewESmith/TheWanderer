// This file contains setup code for tests
import { expect, vi, beforeEach, afterEach } from 'vitest';

// Ensure we're using Vitest's globals
global.expect = expect;
global.vi = vi;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

// Mock CSS imports
vi.mock('*.css', () => ({}));
vi.mock('../maze.css', () => ({}));

// Reset mocks between tests
beforeEach(() => {
    vi.resetModules();
});

afterEach(() => {
    vi.clearAllMocks();
});