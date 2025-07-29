import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAudioSettings } from '../../../audio/hooks/use-audio-settings';

// Mock the audio context
const mockAudioContext = {
    settings: {
        isMuted: false,
        globalVolume: 0.8,
        categoryVolumes: {
            movement: 0.7,
            collision: 1.0,
            gameState: 0.6,
        },
        showDebugPanel: false,
    },
    setMuted: vi.fn(),
    setGlobalVolume: vi.fn(),
    setCategoryVolume: vi.fn(),
    toggleMute: vi.fn(),
    resetToDefaults: vi.fn(),
    setShowDebugPanel: vi.fn(),
};

vi.mock('../../../audio/context/audio-context', () => ({
    useAudioContext: () => mockAudioContext,
}));

describe('useAudioSettings Hook - Debug Panel Properties', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Reset mock settings
        mockAudioContext.settings = {
            isMuted: false,
            globalVolume: 0.8,
            categoryVolumes: {
                movement: 0.7,
                collision: 1.0,
                gameState: 0.6,
            },
            showDebugPanel: false,
        };
    });

    describe('showDebugPanel property', () => {
        it('should return showDebugPanel from settings', () => {
            mockAudioContext.settings.showDebugPanel = true;

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.showDebugPanel).toBe(true);
        });

        it('should return false when showDebugPanel is false', () => {
            mockAudioContext.settings.showDebugPanel = false;

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.showDebugPanel).toBe(false);
        });

        it('should handle undefined showDebugPanel gracefully', () => {
            mockAudioContext.settings.showDebugPanel = undefined as any;

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.showDebugPanel).toBeUndefined();
        });

        it('should handle null showDebugPanel gracefully', () => {
            mockAudioContext.settings.showDebugPanel = null as any;

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.showDebugPanel).toBeNull();
        });
    });

    describe('setShowDebugPanel function', () => {
        it('should provide setShowDebugPanel function', () => {
            const { result } = renderHook(() => useAudioSettings());

            expect(typeof result.current.setShowDebugPanel).toBe('function');
        });

        it('should call context setShowDebugPanel when invoked', () => {
            const { result } = renderHook(() => useAudioSettings());

            act(() => {
                result.current.setShowDebugPanel(true);
            });

            expect(mockAudioContext.setShowDebugPanel).toHaveBeenCalledWith(true);
        });

        it('should call context setShowDebugPanel with false', () => {
            const { result } = renderHook(() => useAudioSettings());

            act(() => {
                result.current.setShowDebugPanel(false);
            });

            expect(mockAudioContext.setShowDebugPanel).toHaveBeenCalledWith(false);
        });

        it('should be the same function reference from context', () => {
            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.setShowDebugPanel).toBe(mockAudioContext.setShowDebugPanel);
        });
    });

    describe('integration with other hook properties', () => {
        it('should return all expected properties including debug panel', () => {
            const { result } = renderHook(() => useAudioSettings());

            // Existing properties
            expect(result.current).toHaveProperty('isMuted');
            expect(result.current).toHaveProperty('volume');
            expect(result.current).toHaveProperty('globalVolume');
            expect(result.current).toHaveProperty('categoryVolumes');
            expect(result.current).toHaveProperty('setMuted');
            expect(result.current).toHaveProperty('setVolume');
            expect(result.current).toHaveProperty('setGlobalVolume');
            expect(result.current).toHaveProperty('setCategoryVolume');
            expect(result.current).toHaveProperty('toggleMute');
            expect(result.current).toHaveProperty('resetToDefaults');

            // New debug panel properties
            expect(result.current).toHaveProperty('showDebugPanel');
            expect(result.current).toHaveProperty('setShowDebugPanel');
        });

        it('should not affect other properties when debug panel properties are accessed', () => {
            const { result } = renderHook(() => useAudioSettings());

            const originalMuted = result.current.isMuted;
            const originalVolume = result.current.globalVolume;

            // Access debug panel properties
            const debugPanel = result.current.showDebugPanel;
            const setDebugPanel = result.current.setShowDebugPanel;

            // Other properties should remain unchanged
            expect(result.current.isMuted).toBe(originalMuted);
            expect(result.current.globalVolume).toBe(originalVolume);
            expect(typeof debugPanel).toBe('boolean');
            expect(typeof setDebugPanel).toBe('function');
        });

        it('should work alongside other hook functions', () => {
            const { result } = renderHook(() => useAudioSettings());

            act(() => {
                result.current.setMuted(true);
                result.current.setGlobalVolume(0.5);
                result.current.setShowDebugPanel(true);
            });

            expect(mockAudioContext.setMuted).toHaveBeenCalledWith(true);
            expect(mockAudioContext.setGlobalVolume).toHaveBeenCalledWith(0.5);
            expect(mockAudioContext.setShowDebugPanel).toHaveBeenCalledWith(true);
        });
    });

    describe('defensive programming', () => {
        it('should handle undefined settings gracefully', () => {
            mockAudioContext.settings = undefined as any;

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.showDebugPanel).toBe(false);
            expect(typeof result.current.setShowDebugPanel).toBe('function');
        });

        it('should handle null settings gracefully', () => {
            mockAudioContext.settings = null as any;

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.showDebugPanel).toBe(false);
            expect(typeof result.current.setShowDebugPanel).toBe('function');
        });

        it('should provide safe defaults when settings are missing', () => {
            mockAudioContext.settings = {} as any;

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.showDebugPanel).toBeUndefined();
            expect(result.current.isMuted).toBeUndefined();
            expect(result.current.globalVolume).toBeUndefined();
            expect(result.current.categoryVolumes).toBeUndefined();
        });

        it('should handle missing context functions gracefully', () => {
            mockAudioContext.setShowDebugPanel = undefined as any;

            const { result } = renderHook(() => useAudioSettings());

            expect(result.current.setShowDebugPanel).toBeUndefined();
        });
    });

    describe('type consistency', () => {
        it('should return the raw value from settings', () => {
            // Test with various values - the hook returns raw values
            const testValues = [true, false, 1, 0, 'true', '', null, undefined];

            testValues.forEach((value) => {
                mockAudioContext.settings.showDebugPanel = value as any;

                const { result } = renderHook(() => useAudioSettings());

                expect(result.current.showDebugPanel).toBe(value);
            });
        });

        it('should return truthy values as-is', () => {
            const truthyValues = [true, 1, 'true', 'yes', {}, []];

            truthyValues.forEach((value) => {
                mockAudioContext.settings.showDebugPanel = value as any;

                const { result } = renderHook(() => useAudioSettings());

                expect(result.current.showDebugPanel).toBe(value);
            });
        });

        it('should return falsy values as-is', () => {
            const falsyValues = [false, 0, '', null, undefined, NaN];

            falsyValues.forEach((value) => {
                mockAudioContext.settings.showDebugPanel = value as any;

                const { result } = renderHook(() => useAudioSettings());

                if (Number.isNaN(value)) {
                    expect(Number.isNaN(result.current.showDebugPanel)).toBe(true);
                } else {
                    expect(result.current.showDebugPanel).toBe(value);
                }
            });
        });
    });

    describe('function stability', () => {
        it('should return stable function references', () => {
            const { result, rerender } = renderHook(() => useAudioSettings());

            const firstSetShowDebugPanel = result.current.setShowDebugPanel;

            rerender();

            const secondSetShowDebugPanel = result.current.setShowDebugPanel;

            expect(firstSetShowDebugPanel).toBe(secondSetShowDebugPanel);
        });

        it('should maintain function reference across state changes', () => {
            const { result } = renderHook(() => useAudioSettings());

            const originalSetShowDebugPanel = result.current.setShowDebugPanel;

            // Change some state
            mockAudioContext.settings.showDebugPanel = true;

            const { result: newResult } = renderHook(() => useAudioSettings());

            expect(newResult.current.setShowDebugPanel).toBe(originalSetShowDebugPanel);
        });
    });
});