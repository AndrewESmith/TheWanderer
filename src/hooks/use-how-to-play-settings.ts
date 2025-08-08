import { useState, useCallback, useEffect } from 'react';
import type {
    HowToPlaySettings,
    UseHowToPlaySettingsReturn,
    StoredHowToPlaySettings
} from '../Interfaces/IHowToPlayPopup';

const STORAGE_KEY = 'wanderer-how-to-play-settings';

const DEFAULT_SETTINGS: HowToPlaySettings = {
    dontShowAgain: false,
    hasSeenInstructions: false,
};

/**
 * Load How to Play settings from localStorage with graceful error handling
 */
function loadHowToPlaySettings(): HowToPlaySettings {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed: StoredHowToPlaySettings = JSON.parse(stored);
            // Merge with defaults to handle new settings and ensure proper types
            return {
                ...DEFAULT_SETTINGS,
                dontShowAgain: Boolean(parsed.dontShowAgain),
                hasSeenInstructions: Boolean(parsed.hasSeenInstructions),
            };
        }
    } catch (error) {
        console.warn('Failed to load How to Play settings:', error);
    }
    return DEFAULT_SETTINGS;
}

/**
 * Save How to Play settings to localStorage with graceful error handling
 */
function saveHowToPlaySettings(settings: HowToPlaySettings): void {
    try {
        const toStore: StoredHowToPlaySettings = {
            dontShowAgain: settings.dontShowAgain,
            hasSeenInstructions: settings.hasSeenInstructions,
            lastViewedVersion: '1.0.0', // Version tracking for future content updates
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch (error) {
        console.warn('Failed to save How to Play settings:', error);
    }
}

/**
 * Custom hook for managing How to Play popup settings
 * Provides localStorage persistence with graceful fallback for localStorage failures
 */
export function useHowToPlaySettings(): UseHowToPlaySettingsReturn {
    const [settings, setSettings] = useState<HowToPlaySettings>(() =>
        loadHowToPlaySettings()
    );

    // Save settings to localStorage whenever they change
    useEffect(() => {
        saveHowToPlaySettings(settings);
    }, [settings]);

    /**
     * Update the "Don't show again" preference
     */
    const setDontShowAgain = useCallback((value: boolean) => {
        setSettings(prev => ({
            ...prev,
            dontShowAgain: value,
        }));
    }, []);

    /**
     * Mark instructions as viewed (sets hasSeenInstructions to true)
     */
    const markAsViewed = useCallback(() => {
        setSettings(prev => ({
            ...prev,
            hasSeenInstructions: true,
        }));
    }, []);

    /**
     * Determine if popup should show on app startup
     * Returns true if user hasn't seen instructions OR hasn't opted out
     */
    const shouldShowOnStartup = useCallback((): boolean => {
        return !settings.hasSeenInstructions || !settings.dontShowAgain;
    }, [settings.hasSeenInstructions, settings.dontShowAgain]);

    return {
        settings,
        setDontShowAgain,
        markAsViewed,
        shouldShowOnStartup,
    };
}