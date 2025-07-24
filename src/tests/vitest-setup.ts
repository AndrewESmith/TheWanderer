// Vitest setup file
import '@testing-library/jest-dom/vitest';

// Mock CSS imports
vi.mock('*.css', () => ({}));

// Reset mocks between tests
beforeEach(() => {
    vi.resetModules();
});

afterEach(() => {
    vi.clearAllMocks();
});