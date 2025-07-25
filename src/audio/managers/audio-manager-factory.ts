import type { AudioManager } from '../../Interfaces/IAudioManager';
import { WebAudioManager } from './audio-manager';
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
            try {
                const manager = new WebAudioManager();
                // Check if the manager initialized successfully
                if (manager.isSupported()) {
                    return manager;
                } else {
                    console.warn('WebAudioManager created but not supported, falling back');
                    // Clean up the failed manager
                    manager.cleanup();
                }
            } catch (webAudioError) {
                console.error('Error creating WebAudioManager:', webAudioError);
            }
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