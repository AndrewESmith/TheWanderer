/**
 * Utility for extracting dominant colors from images
 */

interface ColorData {
    r: number;
    g: number;
    b: number;
    count: number;
}

/**
 * Extract the dominant color from an image
 */
export function extractDominantColor(imagePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
        // Check if we're in a browser environment
        if (typeof window === 'undefined' || typeof document === 'undefined') {
            // Return fallback color for server-side or test environments
            const fallbackColors: Record<string, string> = {
                '/soil.png': '#a1887f',
                '/rock.png': '#795548'
            };
            const fallback = fallbackColors[imagePath] || '#666666';
            resolve(fallback);
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                const colorMap = new Map<string, ColorData>();

                // Sample every 8th pixel for better performance
                for (let i = 0; i < data.length; i += 32) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const alpha = data[i + 3];

                    // Skip if any color component is undefined or transparent
                    if (r === undefined || g === undefined || b === undefined || alpha === undefined || alpha < 128) continue;

                    // Group similar colors (reduce precision for better clustering)
                    const key = `${Math.floor(r / 16) * 16},${Math.floor(g / 16) * 16},${Math.floor(b / 16) * 16}`;

                    if (colorMap.has(key)) {
                        colorMap.get(key)!.count++;
                    } else {
                        colorMap.set(key, { r, g, b, count: 1 });
                    }
                }

                // Find the most common color
                let dominantColor = { r: 128, g: 128, b: 128, count: 0 };
                for (const color of colorMap.values()) {
                    if (color.count > dominantColor.count) {
                        dominantColor = color;
                    }
                }

                resolve(`rgb(${dominantColor.r}, ${dominantColor.g}, ${dominantColor.b})`);
            } catch (error) {
                reject(error);
            }
        };

        img.onerror = () => {
            reject(new Error(`Failed to load image: ${imagePath}`));
        };

        img.src = imagePath;
    });
}

/**
 * Cache for dominant colors to avoid recomputation
 */
const colorCache = new Map<string, string>();

/**
 * Get dominant color with caching
 */
export async function getDominantColor(imagePath: string): Promise<string> {
    if (colorCache.has(imagePath)) {
        return colorCache.get(imagePath)!;
    }

    try {
        const color = await extractDominantColor(imagePath);
        colorCache.set(imagePath, color);
        return color;
    } catch (error) {
        // Fallback to default colors if extraction fails
        const fallbackColors: Record<string, string> = {
            '/soil.png': '#a1887f',
            '/rock.png': '#795548'
        };

        const fallback = fallbackColors[imagePath] || '#666666';
        colorCache.set(imagePath, fallback);
        return fallback;
    }
}