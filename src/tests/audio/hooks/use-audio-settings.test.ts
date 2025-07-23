import { renderHook, act } from '@testing-library/react';
import { useAudioSettings } from '../../../audio/hooks/use-audio-settings';
import { SOUND_CONFIG } from '../../../audio/config/sound-config';
import { vi } from 'vitest';

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
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage
});

// Mock audio context
const mockAudioManager = {
    setMuted: vi.fn(),
    isMuted: vi.fn(() => false),
    setGlobalVolume: vi.fn(),
    getGlobalVolume: vi.fn(() => 0.8),
    setCategoryVolume: vi.fn(),
    getCategoryVolume: vi.fn(() => 1.0),
    getAllCategoryVolumes: vi.fn(() => ({}))
};

// Mock the audio context
vi.mock('../../../audio/context/audio-context', () => ({
    useAudioContext: () => ({
        audioManager: mockAudioManager,
        isLoading: false,
        error: null
    })
}));

describe('useAudioSettings', () => {
    beforeEach(() => {
        mockLocalStorage.clear();
        vi.clearAllMocks();
    });

    describe('initialization', () => {
        it('should initialize with default settings when no stored settings exist', () => {
            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.isMuted).toBe(false);
            expect(result.current.globalVolume).toBe(SOUND_CONFIG.globalVolume);
            expect(result.current.categoryVolumes).toEqual(
                Object.fromEntries(
                    Object.entries(SOUND_CONFIG.categories).map(([key, category]) => [key, category.volume])
                )
            );
        });

        it('should load settings from localStorage when available', () => {
            const storedSettings = {
                isMuted: true,
                globalVolume: 0.5,
                categoryVolumes: {
                    movement: 0.6,
                    collision: 0.7,
                    gameState: 0.8
                }
            };
            mockLocalStorage.setItem('wanderer-audio-settings', JSON.stringify(storedSettings));

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.isMuted).toBe(true);
            expect(result.current.globalVolume).toBe(0.5);
            expect(result.current.categoryVolumes.movement).toBe(0.6);
            expect(result.current.categoryVolumes.collision).toBe(0.7);
            expect(result.current.categoryVolumes.gameState).toBe(0.8);
        });

        it('should handle corrupted localStorage data gracefully', () => {
            mockLocalStorage.setItem('wanderer-audio-settings', 'invalid-json');

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.isMuted).toBe(false);
            expect(result.current.globalVolume).toBe(SOUND_CONFIG.globalVolume);
        });
    });

    describe('mute functionality', () => {
        it('should toggle mute state', () => {
            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.isMuted).toBe(false);

            act(() => {
                result.current.setMuted(true);
            });

            expect(result.current.isMuted).toBe(true);
            expect(mockAudioManager.setMuted).toHaveBeenCalledWith(true);
        });

        it('should persist mute state to localStorage', () => {
            const { result } = renderHook(() => useAudioSettings());

            act(() => {
                result.current.setMuted(true);
            });

            const stored = JSON.parse(mockLocalStorage.getItem('wanderer-audio-settings') || '{}');
            expect(stored.isMuted).toBe(true);
        });
    });

    describe('volume controls', () => {
        it('should set global volume and clamp values', () => {
            const { result } = renderHook(() => useAudioSettings());

            act(() => {
                result.current.setGlobalVolume(1.5); // Above max
            });

            expect(result.current.globalVolume).toBe(1.0);

            act(() => {
                result.current.setGlobalVolume(-0.5); // Below min
            });

            expect(result.current.globalVolume).toBe(0.0);

            act(() => {
                result.current.setGlobalVolume(0.7); // Valid value
            });

            expect(result.current.globalVolume).toBe(0.7);
        });

        it('should set category volume and clamp values', () => {
            const { result } = renderHook(() => useAudioSettings());

            act(() => {
                result.current.setCategoryVolume('movement', 1.5); // Above max
            });

            expect(result.current.categoryVolumes.movement).toBe(1.0);

            act(() => {
                result.current.setCategoryVolume('movement', -0.5); // Below min
            });

            expect(result.current.categoryVolumes.movement).toBe(0.0);

            act(() => {
                result.current.setCategoryVolume('movement', 0.6); // Valid value
            });

            expect(result.current.categoryVolumes.movement).toBe(0.6);
        });

        it('should persist volume changes to localStorage', () => {
            const { result } = renderHook(() => useAudioSettings());

            act(() => {
                result.current.setGlobalVolume(0.5);
                result.current.setCategoryVolume('movement', 0.3);
            });

            const stored = JSON.parse(mockLocalStorage.getItem('wanderer-audio-settings') || '{}');
            expect(stored.globalVolume).toBe(0.5);
            expect(stored.categoryVolumes.movement).toBe(0.3);
        });
    });

    describe('reset functionality', () => {
        it('should reset all settings to defaults', () => {
            const { result } = renderHook(() => useAudioSettings());

            // Change some settings
            act(() => {
                result.current.setMuted(true);
                result.current.setGlobalVolume(0.3);
                result.current.setCategoryVolume('movement', 0.2);
            });

            // Reset to defaults
            act(() => {
                result.current.resetToDefaults();
            });

            expect(result.current.isMuted).toBe(false);
            expect(result.current.globalVolume).toBe(SOUND_CONFIG.globalVolume);
            expect(result.current.categoryVolumes).toEqual(
                Object.fromEntries(
                    Object.entries(SOUND_CONFIG.categories).map(([key, category]) => [key, category.volume])
                )
            );
        });
    });

    describe('keyboard shortcuts', () => {
        it('should toggle mute on Ctrl+M', () => {
            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.isMuted).toBe(false);

            // Simulate Ctrl+M keydown
            const event = new KeyboardEvent('keydown', {
                key: 'm',
                ctrlKey: true
            });

            act(() => {
                window.dispatchEvent(event);
            });

            expect(result.current.isMuted).toBe(true);
        });

        it('should toggle mute on Cmd+M (Mac)', () => {
            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.isMuted).toBe(false);

            // Simulate Cmd+M keydown
            const event = new KeyboardEvent('keydown', {
                key: 'm',
                metaKey: true
            });

            act(() => {
                window.dispatchEvent(event);
            });

            expect(result.current.isMuted).toBe(true);
        });

        it('should not toggle mute on M without modifier keys', () => {
            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.isMuted).toBe(false);

            // Simulate M keydown without modifiers
            const event = new KeyboardEvent('keydown', {
                key: 'm'
            });

            act(() => {
                window.dispatchEvent(event);
            });

            expect(result.current.isMuted).toBe(false);
        });
    });

    describe('localStorage error handling', () => {
        it('should handle localStorage save errors gracefully', () => {
            const originalSetItem = mockLocalStorage.setItem;
            mockLocalStorage.setItem = vi.fn(() => {
                throw new Error('Storage quota exceeded');
            });

            const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => { });

            const { result } = renderHook(() => useAudioSettings());

            act(() => {
                result.current.setMuted(true);
            });

            expect(consoleSpy).toHaveBeenCalledWith('Failed to save audio settings:', expect.any(Error));

            // Restore original function
            mockLocalStorage.setItem = originalSetItem;
            consoleSpy.mockRestore();
        });
    });
});