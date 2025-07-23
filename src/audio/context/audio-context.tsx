import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import type { AudioManager } from '../../Interfaces/IAudioManager';
import { createAudioManager } from '../managers/audio-manager';

interface AudioContextState {
    audioManager: AudioManager | null;
    isInitialized: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AudioContextValue extends AudioContextState {
    initializeAudio: () => Promise<void>;
    cleanup: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

interface AudioProviderProps {
    children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
    const [state, setState] = useState<AudioContextState>({
        audioManager: null,
        isInitialized: false,
        isLoading: false,
        error: null
    });

    const initializeAudio = useCallback(async () => {
        if (state.audioManager || state.isLoading) {
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const manager = createAudioManager();
            
            // Preload sounds
            await manager.preloadSounds();
            
            setState({
                audioManager: manager,
                isInitialized: true,
                isLoading: false,
                error: null
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to initialize audio';
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: errorMessage
            }));
        }
    }, [state.audioManager, state.isLoading]);

    const cleanup = useCallback(() => {
        if (state.audioManager) {
            state.audioManager.cleanup();
            setState({
                audioManager: null,
                isInitialized: false,
                isLoading: false,
                error: null
            });
        }
    }, [state.audioManager]);

    // Initialize audio on mount
    useEffect(() => {
        initializeAudio();

        // Cleanup on unmount
        return () => {
            cleanup();
        };
    }, []);

    const contextValue: AudioContextValue = {
        ...state,
        initializeAudio,
        cleanup
    };

    return (
        <AudioContext.Provider value={contextValue}>
            {children}
        </AudioContext.Provider>
    );
}

export function useAudioContext(): AudioContextValue {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudioContext must be used within an AudioProvider');
    }
    return context;
}