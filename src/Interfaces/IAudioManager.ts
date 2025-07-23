import type { PlaySoundOptions } from './ISoundEvent';

import type { LoadingState, LoadingProgress } from '../audio/managers/asset-loader';

export interface AudioManager {
    playSound: (soundId: string, options?: PlaySoundOptions) => void;
    preloadSounds: () => Promise<void>;
    setMuted: (muted: boolean) => void;
    isMuted: () => boolean;
    isSupported: () => boolean;
    stopAllSounds: () => void;
    cleanup: () => void;
    getLoadingState: () => LoadingState;
    onLoadingProgress: (callback: (progress: LoadingProgress) => void) => () => void;
    getOptimizationReport: () => any;
    setGlobalVolume: (volume: number) => void;
    getGlobalVolume: () => number;
    setCategoryVolume: (category: string, volume: number) => void;
    getCategoryVolume: (category: string) => number;
    getAllCategoryVolumes: () => Record<string, number>;
}

export interface AudioState {
    isInitialized: boolean;
    isMuted: boolean;
    loadedSounds: Set<string>;
    audioContext: AudioContext | null;
    soundBuffers: Map<string, AudioBuffer>;
}

export interface ErrorHandling {
    onLoadError: (soundId: string, error: Error) => void;
    onPlayError: (soundId: string, error: Error) => void;
    fallbackMode: boolean;
    retryAttempts: number;
}