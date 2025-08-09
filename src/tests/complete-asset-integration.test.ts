import { describe, it, expect } from 'vitest';
import { ICONS } from '../maze';
import fs from 'fs';
import path from 'path';

describe('Complete Asset Integration Validation', () => {
    describe('End-to-End Asset Pipeline', () => {
        it('should have complete asset pipeline from source to production', () => {
            const publicDir = path.resolve(process.cwd(), 'public');
            const distDir = path.resolve(process.cwd(), 'dist');

            // Verify source assets exist
            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const sourcePath = path.join(publicDir, fileName);

                expect(fs.existsSync(sourcePath),
                    `Source asset ${fileName} should exist in public folder`
                ).toBe(true);

                // If dist exists (after build), verify production assets
                if (fs.existsSync(distDir)) {
                    const distPath = path.join(distDir, fileName);
                    expect(fs.existsSync(distPath),
                        `Production asset ${fileName} should exist in dist folder`
                    ).toBe(true);
                }
            });
        });

        it('should maintain asset integrity throughout pipeline', () => {
            const publicDir = path.resolve(process.cwd(), 'public');
            const distDir = path.resolve(process.cwd(), 'dist');

            if (!fs.existsSync(distDir)) {
                console.warn('Dist directory not found, skipping production integrity check');
                return;
            }

            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const sourcePath = path.join(publicDir, fileName);
                const distPath = path.join(distDir, fileName);

                if (fs.existsSync(sourcePath) && fs.existsSync(distPath)) {
                    const sourceBuffer = fs.readFileSync(sourcePath);
                    const distBuffer = fs.readFileSync(distPath);

                    expect(distBuffer.equals(sourceBuffer),
                        `Asset ${fileName} should maintain integrity from source to production`
                    ).toBe(true);
                }
            });
        });
    });

    describe('Asset Requirements Compliance', () => {
        it('should meet Requirement 5.1: PNG images included in distribution bundle', () => {
            const distDir = path.resolve(process.cwd(), 'dist');

            if (!fs.existsSync(distDir)) {
                console.warn('Dist directory not found, build may not have been run');
                return;
            }

            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const distPath = path.join(distDir, fileName);

                expect(fs.existsSync(distPath),
                    `Requirement 5.1: ${fileName} should be included in distribution bundle`
                ).toBe(true);
            });
        });

        it('should meet Requirement 5.2: Image paths resolve correctly in production', () => {
            const distDir = path.resolve(process.cwd(), 'dist');

            if (!fs.existsSync(distDir)) {
                console.warn('Dist directory not found, skipping production path validation');
                return;
            }

            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                // In production, paths should resolve to files in dist root
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const productionPath = path.join(distDir, fileName);

                expect(fs.existsSync(productionPath),
                    `Requirement 5.2: Path ${imagePath} should resolve correctly in production`
                ).toBe(true);
            });
        });

        it('should meet Requirement 5.3: Vite properly handles and optimizes assets', () => {
            const viteConfigPath = path.resolve(process.cwd(), 'vite.config.js');
            const viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');

            // Verify Vite configuration includes PNG assets
            expect(viteConfig).toContain('**/*.png');
            expect(viteConfig).toContain("publicDir: 'public'");
            expect(viteConfig).toContain("assetsDir: 'assets'");

            // Verify assets are handled correctly
            const distDir = path.resolve(process.cwd(), 'dist');
            if (fs.existsSync(distDir)) {
                Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                    const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                    const distPath = path.join(distDir, fileName);

                    if (fs.existsSync(distPath)) {
                        const stats = fs.statSync(distPath);
                        expect(stats.size).toBeGreaterThan(0);

                        // Verify PNG format is preserved
                        const buffer = fs.readFileSync(distPath);
                        const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
                        const fileHeader = buffer.subarray(0, 8);

                        expect(fileHeader.equals(pngSignature),
                            `Requirement 5.3: ${fileName} should maintain PNG format after Vite processing`
                        ).toBe(true);
                    }
                });
            }
        });
    });

    describe('Cross-Environment Compatibility', () => {
        it('should work in development environment', () => {
            const publicDir = path.resolve(process.cwd(), 'public');

            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                // Development: Vite serves from public folder
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const devPath = path.join(publicDir, fileName);

                expect(fs.existsSync(devPath),
                    `Asset ${fileName} should be accessible in development environment`
                ).toBe(true);
            });
        });

        it('should work in production environment', () => {
            const distDir = path.resolve(process.cwd(), 'dist');

            if (!fs.existsSync(distDir)) {
                console.warn('Production build not found, skipping production environment test');
                return;
            }

            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                // Production: Assets copied to dist root
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const prodPath = path.join(distDir, fileName);

                expect(fs.existsSync(prodPath),
                    `Asset ${fileName} should be accessible in production environment`
                ).toBe(true);
            });
        });

        it('should have consistent path format for both environments', () => {
            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                // Paths should work in both dev (public/) and prod (dist/) environments
                expect(imagePath.startsWith('/'),
                    `Path for ${cellType} should start with / for absolute reference`
                ).toBe(true);

                expect(imagePath.endsWith('.png'),
                    `Path for ${cellType} should end with .png`
                ).toBe(true);

                // Should be simple filename without subdirectories
                const fileName = imagePath.slice(1);
                expect(!fileName.includes('/'),
                    `Path for ${cellType} should not contain subdirectories`
                ).toBe(true);
            });
        });
    });

    describe('Asset Quality and Standards', () => {
        it('should have all required game assets', () => {
            const requiredAssets = [
                'empty', 'player', 'rock', 'soil',
                'diamond', 'boulder', 'bomb', 'exit'
            ];

            const availableAssets = Object.keys(ICONS);

            requiredAssets.forEach(asset => {
                expect(availableAssets).toContain(asset);
            });
        });

        it('should have no missing or broken asset references', () => {
            const publicDir = path.resolve(process.cwd(), 'public');

            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                expect(imagePath).toBeDefined();
                expect(imagePath).not.toBe('');
                expect(typeof imagePath).toBe('string');

                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const fullPath = path.join(publicDir, fileName);

                expect(fs.existsSync(fullPath),
                    `Asset reference for ${cellType} should point to existing file`
                ).toBe(true);
            });
        });

        it('should maintain consistent asset naming convention', () => {
            Object.entries(ICONS).forEach(([_cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

                // Should follow naming convention: .png extension and valid filename
                expect(fileName.endsWith('.png')).toBe(true);
                expect(fileName.length).toBeGreaterThan(4); // At least 'x.png'
                expect(fileName).not.toContain(' '); // No spaces in filename
                expect(fileName).not.toContain('..'); // No double dots

                // Should be a valid filename (letters, numbers, dots, hyphens, underscores)
                expect(fileName).toMatch(/^[a-zA-Z0-9._-]+$/);
            });
        });
    });
});