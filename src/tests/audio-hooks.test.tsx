import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { useSound, useAudioSettings, AudioProvider } from '../audio';
import type { AudioManager } from '../Interfaces/IAudioManager';

// Mock the audio manager
const mockAudioManager: AudioManager = {
    playSound: vi.fn(),
    preloadSounds: vi.fn().mockResolvedValue(undefined),
    setMuted: vi.fn(),
    isMuted: vi.fn().mockReturnValue(false),
    isSupported: vi.fn().mockReturnValue(true),
    cleanup: vi.fn(),
    setGlobalVolume: vi.fn(),
    setCategoryVolume: vi.fn(),
    stopAllSounds: vi.fn()
};

// Mock the createAudioManager function
vi.mock('../audio/managers/audio-manager-factory', () => ({
    createAudioManager: () => mockAudioManager,
    createSpecificAudioManager: () => mockAudioManager
}));

// Mock audio utils
vi.mock('../audio/utils/audio-utils', () => ({
    canAutoplay: vi.fn().mockResolvedValue(true)
}));

// Mock localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
    return <AudioProvider>{children}</AudioProvider>;
}

// Helper to create a failing audio manager
function createFailingAudioManager() {
    return {
        ...mockAudioManager,
        preloadSounds: vi.fn().mockRejectedValue(new Error('Failed to initialize'))
    };
}

describe('Audio Hooks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockLocalStorage.getItem.mockReturnValue(null);
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('useSound', () => {
        it('should provide playSound function that calls audio manager', async () => {
            const { result } = renderHook(() => useSound(), {
                wrapper: TestWrapper
            });

            // Wait for audio initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.playSound('test-sound');
            });

            expect(mockAudioManager.playSound).toHaveBeenCalledWith('test-sound', undefined);
        });

        it('should provide playSound function with options', async () => {
            const { result } = renderHook(() => useSound(), {
                wrapper: TestWrapper
            });

            // Wait for audio initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const options = { volume: 0.5, loop: true };

            act(() => {
                result.current.playSound('test-sound', options);
            });

            expect(mockAudioManager.playSound).toHaveBeenCalledWith('test-sound', options);
        });

        it('should return muted state from audio manager', async () => {
            mockAudioManager.isMuted.mockReturnValue(true);

            const { result } = renderHook(() => useSound(), {
                wrapper: TestWrapper
            });

            // Wait for audio initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.isMuted).toBe(true);
        });

        it('should toggle mute state', async () => {
            mockAudioManager.isMuted.mockReturnValue(false);

            const { result } = renderHook(() => useSound(), {
                wrapper: TestWrapper
            });

            // Wait for audio initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.toggleMute();
            });

            expect(mockAudioManager.setMuted).toHaveBeenCalledWith(true);
        });

        it('should handle audio manager not initialized', async () => {
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            // Mock useAudioContext to return null audio manager with proper settings
            const mockUseAudioContext = vi.fn().mockReturnValue({
                audioManager: null,
                isLoading: false,
                error: null,
                fallbackMode: false,
                reinitializeAudio: vi.fn(),
                settings: {
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: { movement: 0.8, collision: 0.9, gameState: 1 }
                },
                setMuted: vi.fn(),
                setGlobalVolume: vi.fn(),
                setCategoryVolume: vi.fn(),
                toggleMute: vi.fn(),
                resetToDefaults: vi.fn()
            });

            vi.doMock('../audio/context/audio-context', () => ({
                useAudioContext: mockUseAudioContext,
                AudioProvider: ({ children }: { children: ReactNode }) => children
            }));

            const { useSound: MockedUseSound } = await import('../audio/hooks/use-sound');

            const { result } = renderHook(() => MockedUseSound());

            // Test that isMuted defaults to false when audio manager is null
            expect(result.current.isMuted).toBe(false);

            act(() => {
                result.current.playSound('test-sound');
            });

            expect(consoleSpy).toHaveBeenCalledWith('Audio manager not initialized');
            consoleSpy.mockRestore();
            vi.doUnmock('../audio/context/audio-context');
        });

        it('should show loading state during initialization', async () => {
            const { result } = renderHook(() => useSound(), {
                wrapper: TestWrapper
            });

            expect(result.current.isLoading).toBe(true);

            // Wait for initialization to complete
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 10));
            });
        });

        it('should handle playSound errors gracefully', async () => {
            mockAudioManager.playSound.mockImplementation(() => {
                throw new Error('Playback failed');
            });

            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

            const { result } = renderHook(() => useSound(), {
                wrapper: TestWrapper
            });

            // Wait for audio initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.playSound('test-sound');
            });

            expect(consoleSpy).toHaveBeenCalledWith('Failed to play sound test-sound:', expect.any(Error));
            consoleSpy.mockRestore();
        });
    });

    describe('useAudioSettings', () => {
        it('should return default volume from config', async () => {
            const { result } = renderHook(() => useAudioSettings(), {
                wrapper: TestWrapper
            });

            // Wait for initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.volume).toBe(0.8); // Default from SOUND_CONFIG
        });

        it('should load volume from localStorage', async () => {
            mockLocalStorage.getItem.mockReturnValue('{"isMuted":false,"globalVolume":0.6,"categoryVolumes":{"movement":0.8,"collision":0.9,"gameState":1}}');

            const { result } = renderHook(() => useAudioSettings(), {
                wrapper: TestWrapper
            });

            // Wait for initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.volume).toBe(0.6);
        });

        it('should handle invalid localStorage volume', async () => {
            mockLocalStorage.getItem.mockReturnValue('invalid');

            const { result } = renderHook(() => useAudioSettings(), {
                wrapper: TestWrapper
            });

            // Wait for initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.volume).toBe(0.8); // Should fall back to default
        });

        it('should set muted state through audio manager', async () => {
            const { result } = renderHook(() => useAudioSettings(), {
                wrapper: TestWrapper
            });

            // Wait for audio initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.setMuted(true);
            });

            expect(mockAudioManager.setMuted).toHaveBeenCalledWith(true);
        });

        it('should set volume and save to localStorage', () => {
            const { result } = renderHook(() => useAudioSettings(), {
                wrapper: TestWrapper
            });

            act(() => {
                result.current.setVolume(0.7);
            });

            expect(result.current.volume).toBe(0.7);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('wanderer-audio-settings', expect.stringContaining('"globalVolume":0.7'));
        });

        it('should clamp volume between 0 and 1', () => {
            const { result } = renderHook(() => useAudioSettings(), {
                wrapper: TestWrapper
            });

            act(() => {
                result.current.setVolume(1.5);
            });

            expect(result.current.volume).toBe(1);

            act(() => {
                result.current.setVolume(-0.5);
            });

            expect(result.current.volume).toBe(0);
        });

        it('should reset to defaults', async () => {
            const { result } = renderHook(() => useAudioSettings(), {
                wrapper: TestWrapper
            });

            // Wait for audio initialization
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.resetToDefaults();
            });

            expect(result.current.volume).toBe(0.8);
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith('wanderer-audio-settings', expect.stringContaining('"isMuted":false'));
        });

        it('should handle localStorage errors gracefully', () => {
            mockLocalStorage.setItem.mockImplementation(() => {
                throw new Error('Storage error');
            });

            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

            const { result } = renderHook(() => useAudioSettings(), {
                wrapper: TestWrapper
            });

            act(() => {
                result.current.setVolume(0.5);
            });

            expect(consoleSpy).toHaveBeenCalledWith('Failed to save audio settings:', expect.any(Error));
            consoleSpy.mockRestore();
        });

        it('should handle audio manager not initialized for setMuted', async () => {
            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
            const mockSetMuted = vi.fn();

            // Mock useAudioContext to return null audio manager with proper settings
            const mockUseAudioContext = vi.fn().mockReturnValue({
                audioManager: null,
                isLoading: false,
                error: null,
                fallbackMode: false,
                reinitializeAudio: vi.fn(),
                settings: {
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: { movement: 0.8, collision: 0.9, gameState: 1 }
                },
                setMuted: mockSetMuted,
                setGlobalVolume: vi.fn(),
                setCategoryVolume: vi.fn(),
                toggleMute: vi.fn(),
                resetToDefaults: vi.fn()
            });

            vi.doMock('../audio/context/audio-context', () => ({
                useAudioContext: mockUseAudioContext,
                AudioProvider: ({ children }: { children: ReactNode }) => children
            }));

            const { useAudioSettings: MockedUseAudioSettings } = await import('../audio/hooks/use-audio-settings');

            const { result } = renderHook(() => MockedUseAudioSettings());

            act(() => {
                result.current.setMuted(true);
            });

            // The setMuted function should be called even when audio manager is null
            expect(mockSetMuted).toHaveBeenCalledWith(true);
            consoleSpy.mockRestore();
            vi.doUnmock('../audio/context/audio-context');
        });
    });
});