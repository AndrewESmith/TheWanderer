import type { PlaySoundOptions } from './ISoundEvent';

export interface UseSoundHook {
    playSound: (soundId: string, options?: PlaySoundOptions) => void;
    isMuted: boolean;
    toggleMute: () => void;
    stopAllSounds: () => void;
    isLoading: boolean;
    error: string | null;
    fallbackMode: boolean;
    resetAudioSystem: () => Promise<void>;
    hasPlaybackErrors: boolean;
}

export interface UseAudioSettingsHook {
    isMuted: boolean;
    volume: number;
    setMuted: (muted: boolean) => void;
    setVolume: (volume: number) => void;
    resetToDefaults: () => void;
}