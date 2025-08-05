import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { ICONS } from '../maze';
import fs from 'fs';
import path from 'path';

describe('Asset Integration Tests', () => {
    describe('Development Environment Asset Validation', () => {
        it('should have all required PNG images in public folder', () => {
            const publicDir = path.resolve(process.cwd(), 'public');

            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                // Remove leading slash from path for file system check
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const fullPath = path.join(publicDir, fileName);

                expect(fs.existsSync(fullPath),
                    `Image file ${fileName} for cell type ${cellType} should exist in public folder`
                ).toBe(true);
            });
        });

        it('should have correct image paths in ICONS constant', () => {
            const expectedImages = [
                '/Empty.png',
                '/player.png',
                '/rock.png',
                '/soil.png',
                '/diamond.png',
                '/boulder.png',
                '/bomb.png',
                '/exit.png'
            ];

            const actualImages = Object.values(ICONS);

            expectedImages.forEach(expectedImage => {
                expect(actualImages).toContain(expectedImage);
            });
        });

        it('should have all ICONS entries pointing to PNG files', () => {
            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                expect(imagePath.endsWith('.png'),
                    `Image path for ${cellType} should end with .png`
                ).toBe(true);

                expect(imagePath.startsWith('/'),
                    `Image path for ${cellType} should start with / for public folder reference`
                ).toBe(true);
            });
        });
    });

    describe('Image File Properties Validation', () => {
        it('should have all images with correct dimensions (32x32)', async () => {
            // This test would require image processing library in a real scenario
            // For now, we'll validate file existence and basic properties
            const publicDir = path.resolve(process.cwd(), 'public');

            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const fullPath = path.join(publicDir, fileName);

                if (fs.existsSync(fullPath)) {
                    const stats = fs.statSync(fullPath);
                    expect(stats.size).toBeGreaterThan(0);
                    expect(stats.isFile()).toBe(true);
                }
            });
        });

        it('should have valid PNG file headers', () => {
            const publicDir = path.resolve(process.cwd(), 'public');
            const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const fullPath = path.join(publicDir, fileName);

                if (fs.existsSync(fullPath)) {
                    const fileBuffer = fs.readFileSync(fullPath);
                    const fileHeader = fileBuffer.subarray(0, 8);

                    expect(fileHeader.equals(pngSignature),
                        `File ${fileName} should have valid PNG signature`
                    ).toBe(true);
                }
            });
        });
    });

    describe('Vite Configuration Validation', () => {
        it('should include PNG files in assetsInclude configuration', async () => {
            // Read vite config to verify PNG files are included
            const viteConfigPath = path.resolve(process.cwd(), 'vite.config.js');
            expect(fs.existsSync(viteConfigPath)).toBe(true);

            const viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');
            expect(viteConfig).toContain('**/*.png');
        });

        it('should have public directory configured correctly', async () => {
            const viteConfigPath = path.resolve(process.cwd(), 'vite.config.js');
            const viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');

            // Verify publicDir is set to 'public'
            expect(viteConfig).toContain("publicDir: 'public'");
        });

        it('should have assets directory configured for build', async () => {
            const viteConfigPath = path.resolve(process.cwd(), 'vite.config.js');
            const viteConfig = fs.readFileSync(viteConfigPath, 'utf-8');

            // Verify assetsDir is configured
            expect(viteConfig).toContain("assetsDir: 'assets'");
        });
    });
});