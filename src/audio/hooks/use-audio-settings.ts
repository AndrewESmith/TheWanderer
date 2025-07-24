import { useCallback, useEffect, useState } from 'react';
import type { UseAudioSettingsHook } from '../../Interfaces/IUseSoundHook';
import { useAudioContext } from '../context/audio-context';
import { SOUND_CONFIG } from '../config/sound-config';

interface AudioSettings {
    isMuted: boolean;
    globalVolume: number;
    categoryVolumes: Record<string, number>;
}

const DEFAULT_SETTINGS: AudioSettings = {
    isMuted: false,
    globalVolume: SOUND_CONFIG.globalVolume,
    categoryVolumes: Object.fromEntries(
        Object.entries(SOUND_CONFIG.categories).map(([key, category]) => [key, category.volume])
    )
};

const STORAGE_KEY = 'wanderer-audio-settings';

function loadAudioSettings(): AudioSettings {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            // Merge with defaults to handle new settings
            return {
                ...DEFAULT_SETTINGS,
                ...parsed,
                categoryVolumes: {
                    ...DEFAULT_SETTINGS.categoryVolumes,
                    ...parsed.categoryVolumes
                }
            };
        }
    } catch (error) {
        console.warn('Failed to load audio settings:', error);
    }
    return DEFAULT_SETTINGS;
}

function saveAudioSettings(settings: AudioSettings): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (error) {
        console.warn('Failed to save audio settings:', error);
    }
}

export function useAudioSettings(): UseAudioSettingsHook & {
    globalVolume: number;
    categoryVolumes: Record<string, number>;
    setCategoryVolume: (category: string, volume: number) => void;
    setGlobalVolume: (volume: number) => void;
    resetToDefaults: () => void;
} {
    const { audioManager } = useAudioContext();
    const [settings, setSettings] = useState<AudioSettings>(loadAudioSettings);

    // Save settings whenever they change
    useEffect(() => {
        saveAudioSettings(settings);
    }, [settings]);

    // Sync mute state with audio manager
    useEffect(() => {
        if (audioManager) {
            audioManager.setMuted(settings.isMuted);
        }
    }, [audioManager, settings.isMuted]);

    const setMuted = useCallback((muted: boolean) => {
        if (!audioManager) {
            console.warn('Audio manager not initialized');
            return;
        }
        setSettings(prev => ({ ...prev, isMuted: muted }));
    }, [audioManager]);

    const toggleMute = useCallback(() => {
        setSettings(prev => ({ ...prev, isMuted: !prev.isMuted }));
    }, []);

    const setGlobalVolume = useCallback((volume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        setSettings(prev => ({ ...prev, globalVolume: clampedVolume }));
    }, []);

    const setCategoryVolume = useCallback((category: string, volume: number) => {
        const clampedVolume = Math.max(0, Math.min(1, volume));
        setSettings(prev => ({
            ...prev,
            categoryVolumes: {
                ...prev.categoryVolumes,
                [category]: clampedVolume
            }
        }));
    }, []);

    const resetToDefaults = useCallback(() => {
        setSettings(DEFAULT_SETTINGS);
    }, []);

    // Set up keyboard shortcut for mute toggle
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Ctrl/Cmd + M to toggle mute
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'm') {
                event.preventDefault();
                toggleMute();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleMute]);

    return {
        isMuted: settings.isMuted,
        volume: settings.globalVolume,
        globalVolume: settings.globalVolume,
        categoryVolumes: settings.categoryVolumes,
        setMuted,
        setVolume: setGlobalVolume,
        setGlobalVolume,
        setCategoryVolume,
        resetToDefaults
    };
}