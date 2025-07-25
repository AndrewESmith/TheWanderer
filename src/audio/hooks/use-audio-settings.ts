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

    return {
        isMuted: settings.isMuted,
        volume: settings.globalVolume,
        globalVolume: settings.globalVolume,
        categoryVolumes: settings.categoryVolumes,
        setMuted,
        setVolume: setGlobalVolume,
        setGlobalVolume,
        setCategoryVolume,
        toggleMute,
        resetToDefaults
    };
}