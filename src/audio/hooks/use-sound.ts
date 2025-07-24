import { useCallback, useEffect, useState } from 'react';
import type { UseSoundHook } from '../../Interfaces/IUseSoundHook';
import type { PlaySoundOptions } from '../../Interfaces/ISoundEvent';
import { useAudioContext } from '../context/audio-context';
import { useAudioSettings } from './use-audio-settings';

export function useSound(): UseSoundHook {
    const { audioManager, isLoading, error, fallbackMode, reinitializeAudio } = useAudioContext();
    const { globalVolume, categoryVolumes } = useAudioSettings();
    const [playbackErrors, setPlaybackErrors] = useState<Record<string, number>>({});
    const [lastErrorTime, setLastErrorTime] = useState<number>(0);

    // Sync volume settings with audio manager
    useEffect(() => {
        if (audioManager) {
            try {
                audioManager.setGlobalVolume(globalVolume);
                Object.entries(categoryVolumes).forEach(([category, volume]) => {
                    audioManager.setCategoryVolume(category, volume);
                });
            } catch (err) {
                console.warn('Error syncing volume settings:', err);
            }
        }
    }, [audioManager, globalVolume, categoryVolumes]);

    // Listen for audio errors
    useEffect(() => {
        const handleAudioError = (event: CustomEvent) => {
            const { type, error, details } = event.detail;

            // Only handle playback errors here
            if (type === 'PLAYBACK_ERROR' || type === 'SOUND_PLAY_ERROR') {
                try {
                    const soundId = typeof details === 'string' ?
                        details :
                        JSON.parse(details)?.soundId || 'unknown';

                    // Track error count for this sound
                    setPlaybackErrors(prev => ({
                        ...prev,
                        [soundId]: (prev[soundId] || 0) + 1
                    }));

                    setLastErrorTime(Date.now());
                } catch (e) {
                    console.warn('Error parsing audio error details:', e);
                }
            }
        };

        window.addEventListener('audioError', handleAudioError as EventListener);

        return () => {
            window.removeEventListener('audioError', handleAudioError as EventListener);
        };
    }, []);

    // Reset error counts periodically
    useEffect(() => {
        const RESET_INTERVAL = 60000; // 1 minute

        if (lastErrorTime > 0 && Date.now() - lastErrorTime > RESET_INTERVAL) {
            setPlaybackErrors({});
            setLastErrorTime(0);
        }

        const intervalId = setInterval(() => {
            if (lastErrorTime > 0 && Date.now() - lastErrorTime > RESET_INTERVAL) {
                setPlaybackErrors({});
                setLastErrorTime(0);
            }
        }, RESET_INTERVAL);

        return () => clearInterval(intervalId);
    }, [lastErrorTime]);

    const playSound = useCallback((soundId: string, options?: PlaySoundOptions) => {
        if (!audioManager) {
            console.warn('Audio manager not initialized');
            return;
        }

        // Skip if too many errors for this sound
        const errorCount = playbackErrors[soundId] || 0;
        if (errorCount >= 3) {
            console.warn(`Skipping sound ${soundId} due to multiple playback errors`);
            return;
        }

        try {
            audioManager.playSound(soundId, options);
        } catch (err) {
            console.error(`Failed to play sound ${soundId}:`, err);

            // Track error
            setPlaybackErrors(prev => ({
                ...prev,
                [soundId]: (prev[soundId] || 0) + 1
            }));

            setLastErrorTime(Date.now());
        }
    }, [audioManager, playbackErrors]);

    const isMuted = audioManager?.isMuted() ?? false;

    const toggleMute = useCallback(() => {
        if (!audioManager) {
            console.warn('Audio manager not initialized');
            return;
        }

        try {
            const currentMuted = audioManager.isMuted();
            audioManager.setMuted(!currentMuted);
        } catch (err) {
            console.error('Failed to toggle mute:', err);
        }
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

    const resetAudioSystem = useCallback(async () => {
        try {
            // Reset error tracking
            setPlaybackErrors({});
            setLastErrorTime(0);

            // Reinitialize audio system
            await reinitializeAudio();
        } catch (err) {
            console.error('Failed to reset audio system:', err);
        }
    }, [reinitializeAudio]);

    return {
        playSound,
        isMuted,
        toggleMute,
        stopAllSounds,
        isLoading,
        error,
        fallbackMode,
        resetAudioSystem,
        hasPlaybackErrors: Object.keys(playbackErrors).length > 0
    };
}