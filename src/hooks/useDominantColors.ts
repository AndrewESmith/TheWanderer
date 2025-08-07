import { useState, useEffect } from 'react';
import { getDominantColor } from '../utils/colorExtractor';
import { ICONS } from '../maze';

/**
 * Hook to manage dominant colors for specific cell types
 */
export function useDominantColors() {
    // Start with fallback colors immediately so game doesn't block
    const [dominantColors, setDominantColors] = useState<Record<string, string>>({
        soil: '#a1887f',
        rock: '#795548'
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadDominantColors = async () => {
            try {
                // Skip color extraction in test environment
                if (typeof window === 'undefined' || process.env.NODE_ENV === 'test') {
                    setDominantColors({
                        soil: '#a1887f',
                        rock: '#795548'
                    });
                    setIsLoading(false);
                    return;
                }

                // Only extract colors for soil and rock
                const colorsToExtract = ['soil', 'rock'] as const;

                // Add timeout to prevent blocking
                const colorPromises = colorsToExtract.map(async (cellType) => {
                    const imagePath = ICONS[cellType];
                    return Promise.race([
                        getDominantColor(imagePath).then(color => ({ cellType, color })),
                        new Promise<{ cellType: typeof cellType, color: string }>((_, reject) =>
                            setTimeout(() => reject(new Error('Timeout')), 2000)
                        )
                    ]);
                });

                const results = await Promise.allSettled(colorPromises);

                const colorMap: Record<string, string> = {
                    // Keep existing fallback colors as base
                    soil: '#a1887f',
                    rock: '#795548'
                };

                // Update with successfully extracted colors
                results.forEach((result) => {
                    if (result.status === 'fulfilled') {
                        const { cellType, color } = result.value;
                        colorMap[cellType] = color;
                    }
                });

                setDominantColors(colorMap);
                console.log('✅ Dominant colors extracted:', colorMap);
            } catch (error) {
                console.warn('Failed to extract dominant colors:', error);
                // Set fallback colors
                setDominantColors({
                    soil: '#a1887f',
                    rock: '#795548'
                });
            } finally {
                setIsLoading(false);
            }
        };

        loadDominantColors();
    }, []);

    return { dominantColors, isLoading };
}