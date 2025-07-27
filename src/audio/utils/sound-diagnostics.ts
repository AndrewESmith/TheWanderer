/**
 * Sound system diagnostics utility
 */

import { SOUND_ASSETS } from '../config/sound-config';
import { validateAndResolveAsset } from './asset-resolver';

export interface DiagnosticResult {
    soundId: string;
    originalPath: string;
    resolvedPath: string | null;
    accessible: boolean;
    error?: string;
}

/**
 * Run diagnostics on all sound assets
 */
export async function runSoundDiagnostics(): Promise<DiagnosticResult[]> {
    const results: DiagnosticResult[] = [];

    console.log('[SoundDiagnostics] Starting sound asset diagnostics...');

    for (const [soundId, asset] of Object.entries(SOUND_ASSETS)) {
        const originalPath = asset.src[0]; // Use first source

        if (!originalPath) {
            results.push({
                soundId,
                originalPath: 'N/A',
                resolvedPath: null,
                accessible: false,
                error: 'No source path defined'
            });
            continue;
        }

        try {
            const resolvedPath = await validateAndResolveAsset(originalPath);

            results.push({
                soundId,
                originalPath,
                resolvedPath,
                accessible: resolvedPath !== null,
                error: resolvedPath ? undefined : 'Asset not accessible'
            });
        } catch (error) {
            results.push({
                soundId,
                originalPath,
                resolvedPath: null,
                accessible: false,
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    // Log results
    console.log('[SoundDiagnostics] Results:');
    results.forEach(result => {
        const status = result.accessible ? '✅' : '❌';
        console.log(`${status} ${result.soundId}: ${result.originalPath} -> ${result.resolvedPath || 'FAILED'}`);
        if (result.error) {
            console.log(`   Error: ${result.error}`);
        }
    });

    const successCount = results.filter(r => r.accessible).length;
    console.log(`[SoundDiagnostics] Summary: ${successCount}/${results.length} assets accessible`);

    return results;
}

/**
 * Test a single sound asset
 */
export async function testSoundAsset(soundId: string): Promise<DiagnosticResult | null> {
    const asset = SOUND_ASSETS[soundId];
    if (!asset) {
        console.error(`[SoundDiagnostics] Sound asset not found: ${soundId}`);
        return null;
    }

    const originalPath = asset.src[0];
    if (!originalPath) {
        return {
            soundId,
            originalPath: 'N/A',
            resolvedPath: null,
            accessible: false,
            error: 'No source path defined'
        };
    }

    try {
        const resolvedPath = await validateAndResolveAsset(originalPath);
        return {
            soundId,
            originalPath,
            resolvedPath,
            accessible: resolvedPath !== null,
            error: resolvedPath ? undefined : 'Asset not accessible'
        };
    } catch (error) {
        return {
            soundId,
            originalPath,
            resolvedPath: null,
            accessible: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

/**
 * Add diagnostics to window for debugging
 */
if (typeof window !== 'undefined') {
    (window as any).soundDiagnostics = {
        runAll: runSoundDiagnostics,
        testAsset: testSoundAsset
    };
}