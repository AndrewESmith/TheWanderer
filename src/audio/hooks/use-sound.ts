import { useCallback, useEffect } from 'react';
import type { UseSoundHook } from '../../Interfaces/IUseSoundHook';
import type { PlaySoundOptions } from '../../Interfaces/ISoundEvent';
import { useAudioContext } from '../context/audio-context';
import { useAudioSettings } from './use-audio-settings';

export function useSound(): UseSoundHook {
    const { audioManager, isLoading, error } = useAudioContext();
    const { globalVolume, categoryVolumes } = useAudioSettings();

    // Sync volume settings with audio manager
    useEffect(() => {
        if (audioManager) {
            audioManager.setGlobalVolume(globalVolume);
            Object.entries(categoryVolumes).forEach(([category, volume]) => {
                audioManager.setCategoryVolume(category, volume);
            });
        }
    }, [audioManager, globalVolume, categoryVolumes]);

    const playSound = useCallback((soundId: string, options?: PlaySoundOptions) => {
        if (!audioManager) {
            console.warn('Audio manager not initialized');
            return;
        }

        try {
            audioManager.playSound(soundId, options);
        } catch (err) {
            console.error(`Failed to play sound ${soundId}:`, err);
        }
    }, [audioManager]);

    const isMuted = audioManager?.isMuted() ?? false;

    const toggleMute = useCallback(() => {
        if (!audioManager) {
            console.warn('Audio manager not initialized');
            return;
        }

        const currentMuted = audioManager.isMuted();
        audioManager.setMuted(!currentMuted);
    }, [audioManager]);

    const stopAllSounds = useCallback(() => {
        if (!audioManager) {
            console.warn('Audio manager not initialized');
            return;
        }

        try {
            audioManager.stopAllSounds();
        } catch (err) {
            console.error('Failed to stop all sounds:', err);
        }
    }, [audioManager]);

    return {
        playSound,
        isMuted,
        toggleMute,
        stopAllSounds,
        isLoading,
        error
    };
}