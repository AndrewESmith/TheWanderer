// This file contains setup code for tests
import { vi, beforeEach, afterEach } from 'vitest';

// Vitest globals are already enabled via config

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