import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import type { AudioManager } from '../../Interfaces/IAudioManager';
import { createAudioManager, createSpecificAudioManager } from '../managers/audio-manager-factory';
import { canAutoplay } from '../utils/audio-utils';

interface AudioContextState {
    audioManager: AudioManager | null;
    isInitialized: boolean;
    isLoading: boolean;
    error: string | null;
    fallbackMode: boolean;
    autoplayAllowed: boolean;
}

interface AudioContextValue extends AudioContextState {
    initializeAudio: () => Promise<void>;
    cleanup: () => void;
    reinitializeAudio: () => Promise<void>;
    switchToFallback: (type: 'html5' | 'silent') => Promise<void>;
}

const AudioContext = createContext<AudioContextValue | null>(null);

interface AudioProviderProps {
    children: ReactNode;
    initialManagerType?: 'auto' | 'web' | 'html5' | 'silent';
}

export function AudioProvider({ children, initialManagerType = 'auto' }: AudioProviderProps) {
    const [state, setState] = useState<AudioContextState>({
        audioManager: null,
        isInitialized: false,
        isLoading: false,
        error: null,
        fallbackMode: false,
        autoplayAllowed: false
    });

    // Check if autoplay is allowed
    useEffect(() => {
        const checkAutoplay = async () => {
            const allowed = await canAutoplay();
            setState(prev => ({ ...prev, autoplayAllowed: allowed }));
            
            if (!allowed) {
                console.warn('Autoplay not allowed - user interaction will be required to play audio');
            }
        };
        
        checkAutoplay();
    }, []);

    // Listen for audio errors
    useEffect(() => {
        const handleAudioError = (event: CustomEvent) => {
            const { type, error, details } = event.detail;
            
            console.warn(`Audio error event: ${type}`, error, details);
            
            // Update error state
            setState(prev => ({
                ...prev,
                error: `${type}: ${error.message || 'Unknown error'}`
            }));
            
            // Handle critical errors that require fallback
            if (type === 'AUDIO_CONTEXT_ERROR' || type === 'INITIALIZATION_FAILED') {
                switchToFallback('html5');
            }
        };
        
        const handleAudioFallback = (event: CustomEvent) => {
            const { from, to } = event.detail;
            
            console.warn(`Audio fallback event: ${from} -> ${to}`);
            
            // Switch to the appropriate fallback
            if (to === 'HTML5Audio') {
                switchToFallback('html5');
            } else if (to === 'Silent') {
                switchToFallback('silent');
            }
        };
        
        window.addEventListener('audioError', handleAudioError as EventListener);
        window.addEventListener('audioManagerFallback', handleAudioFallback as EventListener);
        
        return () => {
            window.removeEventListener('audioError', handleAudioError as EventListener);
            window.removeEventListener('audioManagerFallback', handleAudioFallback as EventListener);
        };
    }, []);

    const initializeAudio = useCallback(async () => {
        if (state.audioManager || state.isLoading) {
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            let manager: AudioManager;
            
            // Create the appropriate audio manager
            if (initialManagerType === 'auto') {
                manager = createAudioManager();
            } else {
                manager = createSpecificAudioManager(initialManagerType);
            }
            
            // Check if the manager is supported
            if (!manager.isSupported()) {
                console.warn('Selected audio manager not supported, falling back');
                
                // Try HTML5 fallback
                manager = createSpecificAudioManager('html5');
                
                if (!manager.isSupported()) {
                    console.warn('HTML5 audio not supported, falling back to silent mode');
                    manager = createSpecificAudioManager('silent');
                    
                    setState(prev => ({
                        ...prev,
                        fallbackMode: true
                    }));
                }
            }
            
            // Preload sounds with error handling
            try {
                await manager.preloadSounds();
            } catch (preloadError) {
                console.error('Error preloading sounds:', preloadError);
                // Continue with the manager even if preloading fails
            }
            
            setState({
                audioManager: manager,
                isInitialized: true,
                isLoading: false,
                error: null,
                fallbackMode: !manager.isSupported(),
                autoplayAllowed: state.autoplayAllowed
            });
        } catch (error) {
            console.error('Failed to initialize audio:', error);
            
            // Create silent manager as last resort
            const silentManager = createSpecificAudioManager('silent');
            
            setState({
                audioManager: silentManager,
                isInitialized: true,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Failed to initialize audio',
                fallbackMode: true,
                autoplayAllowed: false
            });
        }
    }, [state.audioManager, state.isLoading, state.autoplayAllowed, initialManagerType]);

    const cleanup = useCallback(() => {
        if (state.audioManager) {
            state.audioManager.cleanup();
            setState({
                audioManager: null,
                isInitialized: false,
                isLoading: false,
                error: null,
                fallbackMode: false,
                autoplayAllowed: state.autoplayAllowed
            });
        }
    }, [state.audioManager, state.autoplayAllowed]);

    const reinitializeAudio = useCallback(async () => {
        cleanup();
        await initializeAudio();
    }, [cleanup, initializeAudio]);

    const switchToFallback = useCallback(async (type: 'html5' | 'silent') => {
        if (state.audioManager) {
            // Clean up current manager
            state.audioManager.cleanup();
        }
        
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        
        try {
            const fallbackManager = createSpecificAudioManager(type);
            
            // Try to preload sounds
            try {
                await fallbackManager.preloadSounds();
            } catch (preloadError) {
                console.warn(`Error preloading sounds in ${type} fallback:`, preloadError);
            }
            
            setState({
                audioManager: fallbackManager,
                isInitialized: true,
                isLoading: false,
                error: null,
                fallbackMode: true,
                autoplayAllowed: type === 'silent' ? false : state.autoplayAllowed
            });
            
            console.log(`Switched to ${type} audio manager`);
        } catch (error) {
            console.error(`Failed to switch to ${type} fallback:`, error);
            
            // Last resort: silent mode
            if (type !== 'silent') {
                switchToFallback('silent');
            } else {
                // Create silent manager directly as last resort
                const silentManager = createSpecificAudioManager('silent');
                
                setState({
                    audioManager: silentManager,
                    isInitialized: true,
                    isLoading: false,
                    error: error instanceof Error ? error.message : `Failed to switch to ${type} fallback`,
                    fallbackMode: true,
                    autoplayAllowed: false
                });
            }
        }
    }, [state.audioManager, state.autoplayAllowed]);

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
        cleanup,
        reinitializeAudio,
        switchToFallback
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