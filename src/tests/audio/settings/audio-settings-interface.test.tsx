import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ReactNode } from 'react';
import { AudioProvider, useAudioContext } from '../../../audio/context/audio-context';
import type { AudioManager } from '../../../Interfaces/IAudioManager';

// Mock localStorage
const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value;
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
        _getStore: () => ({ ...store }),
        _setStore: (newStore: Record<string, string>) => {
            store = { ...newStore };
        },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

// Mock audio manager
const mockAudioManager: AudioManager = {
    playSound: vi.fn(),
    preloadSounds: vi.fn().mockResolvedValue(undefined),
    setMuted: vi.fn(),
    isMuted: vi.fn().mockReturnValue(false),
    isSupported: vi.fn().mockReturnValue(true),
    cleanup: vi.fn(),
};

// Mock the createAudioManager function
vi.mock('../../../audio/managers/audio-manager-factory', () => ({
    createAudioManager: () => mockAudioManager,
    createSpecificAudioManager: () => mockAudioManager,
}));

// Mock sound config
vi.mock('../../../audio/config/sound-config', () => ({
    SOUND_CONFIG: {
        globalVolume: 0.8,
        categories: {
            movement: { volume: 0.7 },
            collision: { volume: 1.0 },
            gameState: { volume: 0.6 },
        },
    },
}));

// Test wrapper component
function TestWrapper({ children }: { children: ReactNode }) {
    return <AudioProvider>{ children } </AudioProvider>;
}

describe('AudioSettings Interface Extension', () => {
    const STORAGE_KEY = 'wanderer-audio-settings';

    beforeEach(() => {
        vi.clearAllMocks();
        mockLocalStorage.clear();
        vi.mocked(mockAudioManager.preloadSounds).mockResolvedValue(undefined);
        vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);
        vi.mocked(mockAudioManager.isSupported).mockReturnValue(true);
    });

    describe('AudioSettings interface structure', () => {
        it('should include showDebugPanel property in default settings', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.settings).toHaveProperty('showDebugPanel');
            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');
            expect(result.current.settings.showDebugPanel).toBe(false);
        });

        it('should maintain all existing properties in default settings', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const settings = result.current.settings;
            expect(settings).toHaveProperty('isMuted');
            expect(settings).toHaveProperty('globalVolume');
            expect(settings).toHaveProperty('categoryVolumes');
            expect(settings).toHaveProperty('showDebugPanel');

            expect(typeof settings.isMuted).toBe('boolean');
            expect(typeof settings.globalVolume).toBe('number');
            expect(typeof settings.categoryVolumes).toBe('object');
            expect(typeof settings.showDebugPanel).toBe('boolean');
        });

        it('should have correct default values', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const settings = result.current.settings;
            expect(settings.isMuted).toBe(false);
            expect(settings.globalVolume).toBe(0.8);
            expect(settings.showDebugPanel).toBe(false);
            expect(settings.categoryVolumes).toEqual({
                movement: 0.7,
                collision: 1.0,
                gameState: 0.6,
            });
        });
    });

    describe('localStorage integration', () => {
        it('should save showDebugPanel to localStorage', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const stored = mockLocalStorage.getItem(STORAGE_KEY);
            const parsed = JSON.parse(stored!);
            expect(parsed.showDebugPanel).toBe(true);
        });

        it('should load showDebugPanel from localStorage', async () => {
            mockLocalStorage._setStore({
                [STORAGE_KEY]: JSON.stringify({
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: { movement: 0.7 },
                    showDebugPanel: true,
                }),
            });

            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.settings.showDebugPanel).toBe(true);
        });

        it('should handle missing showDebugPanel in stored settings', async () => {
            mockLocalStorage._setStore({
                [STORAGE_KEY]: JSON.stringify({
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: { movement: 0.7 },
                    // showDebugPanel is missing
                }),
            });

            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            // Should default to false
            expect(result.current.settings.showDebugPanel).toBe(false);
        });

        it('should preserve all settings when saving showDebugPanel', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.setMuted(true);
                result.current.setGlobalVolume(0.5);
                result.current.setCategoryVolume('movement', 0.3);
                result.current.setShowDebugPanel(true);
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const stored = mockLocalStorage.getItem(STORAGE_KEY);
            const parsed = JSON.parse(stored!);

            expect(parsed.isMuted).toBe(true);
            expect(parsed.globalVolume).toBe(0.5);
            expect(parsed.categoryVolumes.movement).toBe(0.3);
            expect(parsed.showDebugPanel).toBe(true);
        });
    });

    describe('backward compatibility', () => {
        it('should handle old settings format without showDebugPanel', async () => {
            mockLocalStorage._setStore({
                [STORAGE_KEY]: JSON.stringify({
                    isMuted: true,
                    globalVolume: 0.6,
                    categoryVolumes: { movement: 0.5 },
                }),
            });

            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(result.current.settings.isMuted).toBe(true);
            expect(result.current.settings.globalVolume).toBe(0.6);
            expect(result.current.settings.showDebugPanel).toBe(false); // Should default to false
        });

        it('should handle corrupted showDebugPanel values', async () => {
            const testCases = [
                { stored: 'invalid', expected: true }, // Truthy string
                { stored: null, expected: false },
                { stored: 0, expected: false },
                { stored: 1, expected: true },
                { stored: '', expected: false },
            ];

            for (const { stored, expected } of testCases) {
                mockLocalStorage._setStore({
                    [STORAGE_KEY]: JSON.stringify({
                        isMuted: false,
                        globalVolume: 0.8,
                        categoryVolumes: {},
                        showDebugPanel: stored,
                    }),
                });

                const { result } = renderHook(() => useAudioContext(), {
                    wrapper: TestWrapper,
                });

                await act(async () => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                });

                expect(result.current.settings.showDebugPanel).toBe(expected);
            }
        });

        it('should handle null and undefined showDebugPanel values', async () => {
            const testCases = [
                { showDebugPanel: null, expected: false },
                { showDebugPanel: undefined, expected: false },
                { showDebugPanel: false, expected: false },
                { showDebugPanel: true, expected: true },
            ];

            for (const { showDebugPanel, expected } of testCases) {
                const testSettings: any = {
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: {},
                };

                if (showDebugPanel !== undefined) {
                    testSettings.showDebugPanel = showDebugPanel;
                }

                mockLocalStorage._setStore({
                    [STORAGE_KEY]: JSON.stringify(testSettings),
                });

                const { result } = renderHook(() => useAudioContext(), {
                    wrapper: TestWrapper,
                });

                await act(async () => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                });

                expect(result.current.settings.showDebugPanel).toBe(expected);
            }
        });
    });

    describe('type safety', () => {
        it('should enforce boolean type for showDebugPanel', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');

            act(() => {
                result.current.setShowDebugPanel(false);
            });

            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');
        });

        it('should maintain type consistency across operations', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            // Initial state
            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');

            // After modification
            act(() => {
                result.current.setShowDebugPanel(true);
            });
            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');

            // After serialization/deserialization (localStorage save/load)
            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const stored = mockLocalStorage.getItem(STORAGE_KEY);
            const parsed = JSON.parse(stored!);
            expect(typeof parsed.showDebugPanel).toBe('boolean');
        });
    });

    describe('settings validation', () => {
        it('should validate showDebugPanel as boolean', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            expect(result.current.settings.showDebugPanel).toBe(true);
            expect(typeof result.current.settings.showDebugPanel).toBe('boolean');
        });

        it('should handle edge cases in validation', async () => {
            // Test loading from localStorage with various values
            const edgeCases = [
                { input: 'true', expected: true },
                { input: 'false', expected: false },
                { input: 1, expected: true },
                { input: 0, expected: false },
                { input: null, expected: false },
                { input: undefined, expected: false },
            ];

            for (const { input, expected } of edgeCases) {
                const testSettings: any = {
                    isMuted: false,
                    globalVolume: 0.8,
                    categoryVolumes: {},
                };

                if (input !== undefined) {
                    testSettings.showDebugPanel = input;
                }

                mockLocalStorage._setStore({
                    [STORAGE_KEY]: JSON.stringify(testSettings),
                });

                const { result } = renderHook(() => useAudioContext(), {
                    wrapper: TestWrapper,
                });

                await act(async () => {
                    await new Promise(resolve => setTimeout(resolve, 0));
                });

                expect(result.current.settings.showDebugPanel).toBe(expected);
                expect(typeof result.current.settings.showDebugPanel).toBe('boolean');
            }
        });
    });

    describe('integration with existing settings', () => {
        it('should not interfere with existing settings structure', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const originalSettings = { ...result.current.settings };

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            // All original properties should still exist
            expect(result.current.settings).toHaveProperty('isMuted');
            expect(result.current.settings).toHaveProperty('globalVolume');
            expect(result.current.settings).toHaveProperty('categoryVolumes');

            // New property should be added
            expect(result.current.settings).toHaveProperty('showDebugPanel');

            // Other values should be preserved
            expect(result.current.settings.isMuted).toBe(originalSettings.isMuted);
            expect(result.current.settings.globalVolume).toBe(originalSettings.globalVolume);
        });

        it('should maintain settings immutability patterns', async () => {
            const { result } = renderHook(() => useAudioContext(), {
                wrapper: TestWrapper,
            });

            await act(async () => {
                await new Promise(resolve => setTimeout(resolve, 0));
            });

            const originalSettings = { ...result.current.settings };

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            // Original reference should be different (immutable update)
            expect(result.current.settings).not.toBe(originalSettings);

            // But other properties should have the same values
            expect(result.current.settings.isMuted).toBe(originalSettings.isMuted);
            expect(result.current.settings.globalVolume).toBe(originalSettings.globalVolume);

            // New property should have new value
            expect(result.current.settings.showDebugPanel).toBe(true);
        });
    });
});