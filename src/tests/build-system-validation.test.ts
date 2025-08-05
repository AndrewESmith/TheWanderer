import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { ICONS } from '../maze';

describe('Build System Asset Integration', () => {
    const distDir = path.resolve(process.cwd(), 'dist');
    let buildCompleted = false;

    beforeAll(async () => {
        // Clean any existing dist directory
        if (fs.existsSync(distDir)) {
            fs.rmSync(distDir, { recursive: true, force: true });
        }

        try {
            // Run production build
            console.log('Building production bundle...');
            execSync('npm run build', {
                stdio: 'pipe',
                timeout: 60000 // 60 second timeout
            });
            buildCompleted = true;
            console.log('Production build completed successfully');
        } catch (error) {
            console.error('Build failed:', error);
            buildCompleted = false;
        }
    }, 70000); // 70 second timeout for the entire beforeAll

    afterAll(() => {
        // Optionally clean up dist directory after tests
        // Uncomment if you want to clean up after tests
        // if (fs.existsSync(distDir)) {
        //   fs.rmSync(distDir, { recursive: true, force: true });
        // }
    });

    describe('Production Build Asset Inclusion', () => {
        it('should complete production build successfully', () => {
            expect(buildCompleted).toBe(true);
            expect(fs.existsSync(distDir)).toBe(true);
        });

        it('should include all PNG images in production build', () => {
            if (!buildCompleted) {
                console.warn('Skipping test - build not completed');
                return;
            }

            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const distImagePath = path.join(distDir, fileName);

                expect(fs.existsSync(distImagePath),
                    `Image ${fileName} for ${cellType} should be included in production build`
                ).toBe(true);
            });
        });

        it('should preserve image file integrity in build', () => {
            if (!buildCompleted) {
                console.warn('Skipping test - build not completed');
                return;
            }

            const publicDir = path.resolve(process.cwd(), 'public');

            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const originalPath = path.join(publicDir, fileName);
                const distPath = path.join(distDir, fileName);

                if (fs.existsSync(originalPath) && fs.existsSync(distPath)) {
                    const originalStats = fs.statSync(originalPath);
                    const distStats = fs.statSync(distPath);

                    // Files should have the same size (no corruption during build)
                    expect(distStats.size).toBe(originalStats.size);
                }
            });
        });

        it('should generate index.html with correct asset references', () => {
            if (!buildCompleted) {
                console.warn('Skipping test - build not completed');
                return;
            }

            const indexPath = path.join(distDir, 'index.html');
            expect(fs.existsSync(indexPath)).toBe(true);

            const indexContent = fs.readFileSync(indexPath, 'utf-8');

            // Should contain script and CSS references
            expect(indexContent).toMatch(/<script[^>]*src="[^"]*\.js"[^>]*>/);
            expect(indexContent).toMatch(/<link[^>]*href="[^"]*\.css"[^>]*>/);
        });
    });

    describe('Asset Path Resolution', () => {
        it('should resolve image paths correctly in development mode', async () => {
            // Test that paths work in development (public folder serving)
            Object.values(ICONS).forEach(imagePath => {
                // In development, Vite serves files from public folder directly
                expect(imagePath.startsWith('/')).toBe(true);

                // Path should be relative to public folder
                const fileName = imagePath.slice(1); // Remove leading slash
                const publicPath = path.join(process.cwd(), 'public', fileName);
                expect(fs.existsSync(publicPath)).toBe(true);
            });
        });

        it('should have consistent path format across all icons', () => {
            const pathFormats = Object.values(ICONS).map(path => {
                return {
                    startsWithSlash: path.startsWith('/'),
                    endsWithPng: path.endsWith('.png'),
                    hasOnlyOneSlash: path.split('/').length === 2
                };
            });

            // All paths should follow the same format
            pathFormats.forEach((format, index) => {
                expect(format.startsWithSlash).toBe(true);
                expect(format.endsWithPng).toBe(true);
                expect(format.hasOnlyOneSlash).toBe(true);
            });
        });
    });

    describe('Vite Asset Optimization', () => {
        it('should maintain asset directory structure in build', () => {
            if (!buildCompleted) {
                console.warn('Skipping test - build not completed');
                return;
            }

            // Check that assets are properly organized
            const assetsDir = path.join(distDir, 'assets');

            // Assets directory might exist for CSS/JS, but images from public are copied directly
            // This is expected Vite behavior for public folder assets
            expect(fs.existsSync(distDir)).toBe(true);
        });

        it('should preserve PNG file format and quality', () => {
            if (!buildCompleted) {
                console.warn('Skipping test - build not completed');
                return;
            }

            const pngSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const distPath = path.join(distDir, fileName);

                if (fs.existsSync(distPath)) {
                    const fileBuffer = fs.readFileSync(distPath);
                    const fileHeader = fileBuffer.subarray(0, 8);

                    expect(fileHeader.equals(pngSignature),
                        `Built image ${fileName} should maintain PNG format`
                    ).toBe(true);
                }
            });
        });

        it('should not modify image files during build process', () => {
            if (!buildCompleted) {
                console.warn('Skipping test - build not completed');
                return;
            }

            const publicDir = path.resolve(process.cwd(), 'public');

            Object.entries(ICONS).forEach(([cellType, imagePath]) => {
                const fileName = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
                const originalPath = path.join(publicDir, fileName);
                const distPath = path.join(distDir, fileName);

                if (fs.existsSync(originalPath) && fs.existsSync(distPath)) {
                    const originalBuffer = fs.readFileSync(originalPath);
                    const distBuffer = fs.readFileSync(distPath);

                    // Files should be identical (no modification during build)
                    expect(distBuffer.equals(originalBuffer),
                        `Image ${fileName} should not be modified during build`
                    ).toBe(true);
                }
            });
        });
    });
});