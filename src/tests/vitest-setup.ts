// Vitest setup file
import '@testing-library/jest-dom/vitest';

// Mock CSS imports
vi.mock('*.css', () => ({}));

// Mock color extraction utilities to prevent browser API calls during tests
vi.mock('../utils/colorExtractor', () => ({
    getDominantColor: vi.fn().mockImplementation((imagePath: string) => {
        const fallbackColors: Record<string, string> = {
            '/soil.png': '#a1887f',
            '/rock.png': '#795548'
        };
        return Promise.resolve(fallbackColors[imagePath] || '#666666');
    }),
    extractDominantColor: vi.fn().mockImplementation((imagePath: string) => {
        const fallbackColors: Record<string, string> = {
            '/soil.png': '#a1887f',
            '/rock.png': '#795548'
        };
        return Promise.resolve(fallbackColors[imagePath] || '#666666');
    })
}));

// Reset mocks between tests
beforeEach(() => {
    vi.resetModules();
});

afterEach(() => {
    vi.clearAllMocks();
});