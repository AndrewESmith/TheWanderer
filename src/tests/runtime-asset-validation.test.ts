import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ICONS } from '../maze';

// Mock Image constructor for testing
class MockImage {
    src: string = '';
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;

    constructor() {
        // Simulate async loading
        setTimeout(() => {
            if (this.src && this.src.endsWith('.png')) {
                this.onload?.();
            } else {
                this.onerror?.();
            }
        }, 10);
    }
}

describe('Runtime Asset Validation', () => {
    beforeEach(() => {
        // Mock the global Image constructor
        global.Image = MockImage as any;
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Image Loading Behavior', () => {
        it('should create valid Image objects for all icon paths', () => {
            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                const img = new Image();
                img.src = imagePath;

                expect(img.src).toBe(imagePath);
                expect(typeof img.onload).toBe('object'); // null initially
                expect(typeof img.onerror).toBe('object'); // null initially
            });
        });

        it('should handle successful image loading', async () => {
            const loadPromises = Object.entries(ICONS).map(([_cellType, imagePath]) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => reject(new Error(`Failed to load ${imagePath}`));
                    img.src = imagePath;
                });
            });

            // All images should load successfully with mock
            await expect(Promise.all(loadPromises)).resolves.not.toThrow();
        });

        it('should provide fallback handling for failed image loads', async () => {
            const invalidPath = '/nonexistent.jpg'; // Not a PNG, should fail in mock

            const loadPromise = new Promise<boolean>((resolve) => {
                const img = new Image();
                img.onload = () => resolve(true);
                img.onerror = () => resolve(false); // Return false instead of throwing
                img.src = invalidPath;
            });

            const result = await loadPromise;
            expect(result).toBe(false); // Should fail gracefully
        });
    });

    describe('Asset Path Validation', () => {
        it('should have absolute paths for public folder assets', () => {
            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                expect(imagePath.startsWith('/'),
                    `Path for ${cellType} should start with / for absolute reference`
                ).toBe(true);
            });
        });

        it('should have consistent file extensions', () => {
            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                expect(imagePath.toLowerCase().endsWith('.png'),
                    `Path for ${cellType} should end with .png`
                ).toBe(true);
            });
        });

        it('should not have any empty or undefined paths', () => {
            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                expect(imagePath).toBeDefined();
                expect(imagePath).not.toBe('');
                expect(typeof imagePath).toBe('string');
                expect(imagePath.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Development vs Production Path Compatibility', () => {
        it('should work with Vite dev server public folder serving', () => {
            // In development, Vite serves public folder assets directly
            Object.values(ICONS).forEach(imagePath => {
                // Should be absolute path that Vite can serve from public folder
                expect(imagePath.startsWith('/')).toBe(true);
                expect(!imagePath.includes('public/')).toBe(true); // Should not include 'public/' in path
            });
        });

        it('should work with production build asset serving', () => {
            // In production, assets from public folder are copied to dist root
            Object.values(ICONS).forEach(imagePath => {
                // Should be absolute path that works when served from dist root
                expect(imagePath.startsWith('/')).toBe(true);
                expect(imagePath.split('/').length).toBe(2); // Should be /filename.png format
            });
        });

        it('should have paths compatible with both environments', () => {
            // Paths should work in both dev (public folder) and prod (dist root)
            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                // Remove leading slash to get filename
                const filename = imagePath.slice(1);

                // Should be a simple filename without subdirectories
                expect(!filename.includes('/')).toBe(true);
                expect(filename.endsWith('.png')).toBe(true);
                expect(filename.length).toBeGreaterThan(4); // At least 'x.png'
            });
        });
    });

    describe('Asset Preloading Validation', () => {
        it('should support preloading all game assets', async () => {
            const preloadPromises = Object.entries(ICONS).map(([cellType, imagePath]) => {
                return new Promise<{ cellType: string; success: boolean }>((resolve) => {
                    const img = new Image();
                    img.onload = () => resolve({ cellType, success: true });
                    img.onerror = () => resolve({ cellType, success: false });
                    img.src = imagePath;
                });
            });

            const results = await Promise.all(preloadPromises);

            // All assets should preload successfully
            results.forEach(({ cellType, success }) => {
                expect(success, `Asset for ${cellType} should preload successfully`).toBe(true);
            });
        });

        it('should handle concurrent asset loading', async () => {
            const startTime = Date.now();

            // Load all images concurrently
            const loadPromises = Object.values(ICONS).map(imagePath => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => resolve();
                    img.onerror = () => reject(new Error(`Failed to load ${imagePath}`));
                    img.src = imagePath;
                });
            });

            await Promise.all(loadPromises);

            const loadTime = Date.now() - startTime;

            // Should complete within reasonable time (mock loads in 10ms each)
            expect(loadTime).toBeLessThan(1000); // Should be much faster with concurrent loading
        });
    });
});