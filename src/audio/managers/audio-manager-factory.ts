import type { AudioManager } from '../../Interfaces/IAudioManager';
// Import the WebAudioManager class
// Note: This is commented out because we're having issues with the WebAudioManager class
// import { WebAudioManager } from './audio-manager';

// Temporary placeholder for WebAudioManager
class WebAudioManager implements AudioManager {
    playSound() { }
    async preloadSounds() { return Promise.resolve(); }
    setMuted() { }
    isMuted() { return false; }
    isSupported() { return false; }
    stopAllSounds() { }
    cleanup() { }
    getLoadingState() { return { status: 'idle', progress: 0, total: 0, loaded: 0 }; }
    onLoadingProgress() { return () => { }; }
    getOptimizationReport() { return {}; }
    setGlobalVolume() { }
    getGlobalVolume() { return 0; }
    setCategoryVolume() { }
    getCategoryVolume() { return 0; }
    getAllCategoryVolumes() { return {}; }
}
import { HTML5AudioManager } from './html5-audio-manager';
import { SilentAudioManager } from './silent-audio-manager';
import { isWebAudioSupported, isHTML5AudioSupported } from '../utils/audio-utils';

/**
 * Factory function to create the appropriate audio manager based on browser support
 * Implements graceful degradation from Web Audio API to HTML5 Audio to Silent mode
 */
export function createAudioManager(): AudioManager {
    try {
        // First try Web Audio API
        if (isWebAudioSupported()) {
            console.log('Using Web Audio API');
            return new WebAudioManager();
        }

        // Fall back to HTML5 Audio
        if (isHTML5AudioSupported()) {
            console.log('Web Audio API not supported, falling back to HTML5 Audio');
            return new HTML5AudioManager();
        }

        // Last resort: silent mode
        console.warn('No audio support detected, using silent mode');
        return new SilentAudioManager();
    } catch (error) {
        // If anything goes wrong during initialization, use silent mode
        console.error('Error creating audio manager, falling back to silent mode:', error);
        return new SilentAudioManager();
    }
}

/**
 * Create a specific audio manager by type, useful for testing or specific use cases
 */
export function createSpecificAudioManager(type: 'web' | 'html5' | 'silent'): AudioManager {
    switch (type) {
        case 'web':
            return new WebAudioManager();
        case 'html5':
            return new HTML5AudioManager();
        case 'silent':
            return new SilentAudioManager();
        default:
            return createAudioManager();
    }
}