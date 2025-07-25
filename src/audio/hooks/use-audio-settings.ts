import type { UseAudioSettingsHook } from '../../Interfaces/IUseSoundHook';
import { useAudioContext } from '../context/audio-context';

export function useAudioSettings(): UseAudioSettingsHook & {
    globalVolume: number;
    categoryVolumes: Record<string, number>;
    setCategoryVolume: (category: string, volume: number) => void;
    setGlobalVolume: (volume: number) => void;
    toggleMute: () => void;
    resetToDefaults: () => void;
} {
    const {
        settings,
        setMuted,
        setGlobalVolume,
        setCategoryVolume,
        toggleMute,
        resetToDefaults
    } = useAudioContext();

    // Defensive programming: ensure settings is always defined
    const safeSettings = settings || {
        isMuted: false,
        globalVolume: 0.8,
        categoryVolumes: {}
    };

    return {
        isMuted: safeSettings.isMuted,
        volume: safeSettings.globalVolume,
        globalVolume: safeSettings.globalVolume,
        categoryVolumes: safeSettings.categoryVolumes,
        setMuted,
        setVolume: setGlobalVolume,
        setGlobalVolume,
        setCategoryVolume,
        toggleMute,
        resetToDefaults
    };
}