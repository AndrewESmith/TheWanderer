import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useHowToPlaySettings } from '../hooks/use-how-to-play-settings';

// Mock localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};

// Mock console.warn to avoid noise in tests
const mockConsoleWarn = vi.fn();

describe('useHowToPlaySettings', () => {
    beforeEach(() => {
        // Reset all mocks
        vi.clearAllMocks();

        // Mock localStorage
        Object.defineProperty(global, 'localStorage', {
            value: mockLocalStorage,
            writable: true,
        });

        // Mock console.warn
        vi.spyOn(console, 'warn').mockImplementation(mockConsoleWarn);

        // Reset localStorage mock implementations
        mockLocalStorage.getItem.mockReturnValue(null);
        mockLocalStorage.setItem.mockImplementation(() => { });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe('Initial State', () => {
        it('should initialize with default settings when localStorage is empty', () => {
            mockLocalStorage.getItem.mockReturnValue(null);

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.settings).toEqual({
                dontShowAgain: false,
                hasSeenInstructions: false,
            });
        });

        it('should load settings from localStorage when available', () => {
            const storedSettings = {
                dontShowAgain: true,
                hasSeenInstructions: true,
                lastViewedVersion: '1.0.0',
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedSettings));

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.settings).toEqual({
                dontShowAgain: true,
                hasSeenInstructions: true,
            });
        });

        it('should handle corrupted localStorage data gracefully', () => {
            mockLocalStorage.getItem.mockReturnValue('invalid-json');

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.settings).toEqual({
                dontShowAgain: false,
                hasSeenInstructions: false,
            });
            expect(mockConsoleWarn).toHaveBeenCalledWith(
                'Failed to load How to Play settings:',
                expect.any(Error)
            );
        });

        it('should handle localStorage getItem throwing an error', () => {
            mockLocalStorage.getItem.mockImplementation(() => {
                throw new Error('localStorage error');
            });

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.settings).toEqual({
                dontShowAgain: false,
                hasSeenInstructions: false,
            });
            expect(mockConsoleWarn).toHaveBeenCalledWith(
                'Failed to load How to Play settings:',
                expect.any(Error)
            );
        });
    });

    describe('setDontShowAgain', () => {
        it('should update dontShowAgain setting', () => {
            const { result } = renderHook(() => useHowToPlaySettings());

            act(() => {
                result.current.setDontShowAgain(true);
            });

            expect(result.current.settings.dontShowAgain).toBe(true);
        });

        it('should persist dontShowAgain setting to localStorage', () => {
            const { result } = renderHook(() => useHowToPlaySettings());

            act(() => {
                result.current.setDontShowAgain(true);
            });

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'wanderer-how-to-play-settings',
                JSON.stringify({
                    dontShowAgain: true,
                    hasSeenInstructions: false,
                    lastViewedVersion: '1.0.0',
                })
            );
        });

        it('should handle localStorage setItem failures gracefully', () => {
            mockLocalStorage.setItem.mockImplementation(() => {
                throw new Error('localStorage error');
            });

            const { result } = renderHook(() => useHowToPlaySettings());

            act(() => {
                result.current.setDontShowAgain(true);
            });

            expect(result.current.settings.dontShowAgain).toBe(true);
            expect(mockConsoleWarn).toHaveBeenCalledWith(
                'Failed to save How to Play settings:',
                expect.any(Error)
            );
        });
    });

    describe('markAsViewed', () => {
        it('should set hasSeenInstructions to true', () => {
            const { result } = renderHook(() => useHowToPlaySettings());

            act(() => {
                result.current.markAsViewed();
            });

            expect(result.current.settings.hasSeenInstructions).toBe(true);
        });

        it('should persist hasSeenInstructions to localStorage', () => {
            const { result } = renderHook(() => useHowToPlaySettings());

            act(() => {
                result.current.markAsViewed();
            });

            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'wanderer-how-to-play-settings',
                JSON.stringify({
                    dontShowAgain: false,
                    hasSeenInstructions: true,
                    lastViewedVersion: '1.0.0',
                })
            );
        });

        it('should not affect dontShowAgain setting', () => {
            const { result } = renderHook(() => useHowToPlaySettings());

            // First set dontShowAgain to true
            act(() => {
                result.current.setDontShowAgain(true);
            });

            // Then mark as viewed
            act(() => {
                result.current.markAsViewed();
            });

            expect(result.current.settings).toEqual({
                dontShowAgain: true,
                hasSeenInstructions: true,
            });
        });
    });

    describe('shouldShowOnStartup', () => {
        it('should return true for first-time users (default state)', () => {
            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.shouldShowOnStartup()).toBe(true);
        });

        it('should return true when user has not seen instructions', () => {
            const storedSettings = {
                dontShowAgain: false,
                hasSeenInstructions: false,
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedSettings));

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.shouldShowOnStartup()).toBe(true);
        });

        it('should return true when user has seen instructions but not opted out', () => {
            const storedSettings = {
                dontShowAgain: false,
                hasSeenInstructions: true,
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedSettings));

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.shouldShowOnStartup()).toBe(true);
        });

        it('should return false when user has seen instructions and opted out', () => {
            const storedSettings = {
                dontShowAgain: true,
                hasSeenInstructions: true,
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedSettings));

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.shouldShowOnStartup()).toBe(false);
        });

        it('should return true when user opted out but has not seen instructions', () => {
            // This is an edge case that shouldn't normally happen, but we handle it
            const storedSettings = {
                dontShowAgain: true,
                hasSeenInstructions: false,
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedSettings));

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.shouldShowOnStartup()).toBe(true);
        });
    });

    describe('Integration Tests', () => {
        it('should handle complete user workflow: first visit -> mark viewed -> opt out', () => {
            const { result } = renderHook(() => useHowToPlaySettings());

            // Initial state - first visit
            expect(result.current.shouldShowOnStartup()).toBe(true);
            expect(result.current.settings).toEqual({
                dontShowAgain: false,
                hasSeenInstructions: false,
            });

            // User views instructions
            act(() => {
                result.current.markAsViewed();
            });

            expect(result.current.shouldShowOnStartup()).toBe(true); // Still shows because not opted out
            expect(result.current.settings.hasSeenInstructions).toBe(true);

            // User opts out
            act(() => {
                result.current.setDontShowAgain(true);
            });

            expect(result.current.shouldShowOnStartup()).toBe(false);
            expect(result.current.settings).toEqual({
                dontShowAgain: true,
                hasSeenInstructions: true,
            });
        });

        it('should handle user changing their mind about opt-out', () => {
            // Start with user who has opted out
            const storedSettings = {
                dontShowAgain: true,
                hasSeenInstructions: true,
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedSettings));

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.shouldShowOnStartup()).toBe(false);

            // User changes their mind and wants to see popup again
            act(() => {
                result.current.setDontShowAgain(false);
            });

            expect(result.current.shouldShowOnStartup()).toBe(true);
            expect(result.current.settings).toEqual({
                dontShowAgain: false,
                hasSeenInstructions: true,
            });
        });

        it('should maintain settings consistency across multiple hook instances', () => {
            const storedSettings = {
                dontShowAgain: false,
                hasSeenInstructions: true,
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedSettings));

            const { result: result1 } = renderHook(() => useHowToPlaySettings());
            const { result: result2 } = renderHook(() => useHowToPlaySettings());

            expect(result1.current.settings).toEqual(result2.current.settings);
            expect(result1.current.shouldShowOnStartup()).toBe(result2.current.shouldShowOnStartup());
        });
    });

    describe('Type Safety and Edge Cases', () => {
        it('should handle non-boolean values in stored settings', () => {
            const storedSettings = {
                dontShowAgain: 'true', // String instead of boolean
                hasSeenInstructions: 1, // Number instead of boolean
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedSettings));

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.settings).toEqual({
                dontShowAgain: true, // Should be converted to boolean
                hasSeenInstructions: true, // Should be converted to boolean
            });
        });

        it('should handle partial stored settings', () => {
            const storedSettings = {
                dontShowAgain: true,
                // hasSeenInstructions is missing
            };
            mockLocalStorage.getItem.mockReturnValue(JSON.stringify(storedSettings));

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.settings).toEqual({
                dontShowAgain: true,
                hasSeenInstructions: false, // Should use default
            });
        });

        it('should handle empty object in localStorage', () => {
            mockLocalStorage.getItem.mockReturnValue('{}');

            const { result } = renderHook(() => useHowToPlaySettings());

            expect(result.current.settings).toEqual({
                dontShowAgain: false,
                hasSeenInstructions: false,
            });
        });
    });
});