/**
 * Asset resolver utility for handling sound file paths in different environments
 */

/**
 * Resolve asset path for the current environment
 */
export function resolveAssetPath(path: string): string {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;

    // In Vite, public assets are served from the root
    return `/${cleanPath}`;
}

/**
 * Check if an asset exists by attempting to fetch it
 */
export async function checkAssetExists(path: string): Promise<boolean> {
    try {
        const response = await fetch(path, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Get alternative paths for an asset (for fallback purposes)
 */
export function getAlternativePaths(originalPath: string): string[] {
    const alternatives: string[] = [originalPath];

    // Try without leading slash
    if (originalPath.startsWith('/')) {
        alternatives.push(originalPath.slice(1));
    }

    // Try with leading slash
    if (!originalPath.startsWith('/')) {
        alternatives.push(`/${originalPath}`);
    }

    // Try with explicit public prefix (for debugging)
    if (!originalPath.includes('/public/')) {
        const withPublic = originalPath.startsWith('/')
            ? `/public${originalPath}`
            : `/public/${originalPath}`;
        alternatives.push(withPublic);
    }

    return alternatives;
}

/**
 * Validate and resolve asset paths with fallback options
 */
export async function validateAndResolveAsset(path: string): Promise<string | null> {
    const alternatives = getAlternativePaths(resolveAssetPath(path));

    for (const altPath of alternatives) {
        if (await checkAssetExists(altPath)) {
            console.log(`[AssetResolver] Found asset at: ${altPath}`);
            return altPath;
        }
    }

    console.error(`[AssetResolver] Asset not found at any of these paths:`, alternatives);
    return null;
}