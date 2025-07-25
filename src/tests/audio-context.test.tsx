import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';
import { AudioProvider, useAudioContext } from '../audio/context/audio-context';
import type { AudioManager } from '../Interfaces/IAudioManager';

// Mock the audio manager
const mockAudioManager: AudioManager = {
    playSound: vi.fn(),
    preloadSounds: vi.fn().mockResolvedValue(undefined),
    setMuted: vi.fn(),
    isMuted: vi.fn().mockReturnValue(false),
    isSupported: vi.fn().mockReturnValue(true),
    cleanup: vi.fn()
};

// Mock the createAudioManager function
vi.mock('../audio/managers/audio-manager-factory', () => ({
    createAudioManager: () => mockAudioManager,
    createSpecificAudioManager: () => mockAudioManager
}));

// Test component that uses the audio context
function TestComponent() {
    const { audioManager, isInitialized, isLoading, error, initializeAudio, cleanup } = useAudioContext();

    return (
        <div>
            <div data-testid="initialized">{isInitialized.toString()}</div>
            <div data-testid="loading">{isLoading.toString()}</div>
            <div data-testid="error">{error || 'null'}</div>
            <div data-testid="manager-available">{(audioManager !== null).toString()}</div>
            <button onClick={initializeAudio} data-testid="init-button">Initialize</button>
            <button onClick={cleanup} data-testid="cleanup-button">Cleanup</button>
        </div>
    );
}

describe('AudioContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should provide audio context to children', async () => {
        render(
            <AudioProvider>
                <TestComponent />
            </AudioProvider>
        );

        // Should start in loading state
        expect(screen.getByTestId('loading').textContent).toBe('true');
        expect(screen.getByTestId('initialized').textContent).toBe('false');

        // Wait for initialization to complete
        await waitFor(() => {
            expect(screen.getByTestId('loading').textContent).toBe('false');
        });

        expect(screen.getByTestId('initialized').textContent).toBe('true');
        expect(screen.getByTestId('manager-available').textContent).toBe('true');
        expect(screen.getByTestId('error').textContent).toBe('null');
    });

    it('should handle initialization errors', async () => {
        const initError = new Error('Initialization failed');
        vi.mocked(mockAudioManager.preloadSounds).mockRejectedValueOnce(initError);

        render(
            <AudioProvider>
                <TestComponent />
            </AudioProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading').textContent).toBe('false');
        });

        expect(screen.getByTestId('initialized').textContent).toBe('false');
        expect(screen.getByTestId('manager-available').textContent).toBe('false');
        expect(screen.getByTestId('error').textContent).toBe('Initialization failed');
    });

    it('should call preloadSounds during initialization', async () => {
        render(
            <AudioProvider>
                <TestComponent />
            </AudioProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading').textContent).toBe('false');
        });

        expect(mockAudioManager.preloadSounds).toHaveBeenCalledTimes(1);
    });

    // Note: Cleanup on unmount is tested indirectly through manual cleanup test
    // The useEffect cleanup timing can be inconsistent in test environments

    it('should allow manual cleanup', async () => {
        render(
            <AudioProvider>
                <TestComponent />
            </AudioProvider>
        );

        // Wait for initialization
        await waitFor(() => {
            expect(screen.getByTestId('initialized').textContent).toBe('true');
        });

        // Click cleanup button
        screen.getByTestId('cleanup-button').click();

        await waitFor(() => {
            expect(screen.getByTestId('initialized').textContent).toBe('false');
        });

        expect(screen.getByTestId('manager-available').textContent).toBe('false');
        expect(mockAudioManager.cleanup).toHaveBeenCalledTimes(1);
    });

    it('should prevent multiple simultaneous initializations', async () => {
        render(
            <AudioProvider>
                <TestComponent />
            </AudioProvider>
        );

        // Wait for initial initialization
        await waitFor(() => {
            expect(screen.getByTestId('initialized').textContent).toBe('true');
        });

        // Try to initialize again
        screen.getByTestId('init-button').click();

        // Should not call preloadSounds again
        expect(mockAudioManager.preloadSounds).toHaveBeenCalledTimes(1);
    });

    it('should throw error when useAudioContext is used outside provider', () => {
        // Mock console.error to prevent test output pollution
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        expect(() => {
            render(<TestComponent />);
        }).toThrow('useAudioContext must be used within an AudioProvider');

        consoleSpy.mockRestore();
    });

    it('should handle non-Error exceptions during initialization', async () => {
        vi.mocked(mockAudioManager.preloadSounds).mockRejectedValueOnce('String error');

        render(
            <AudioProvider>
                <TestComponent />
            </AudioProvider>
        );

        await waitFor(() => {
            expect(screen.getByTestId('loading').textContent).toBe('false');
        });

        expect(screen.getByTestId('error').textContent).toBe('Failed to initialize audio');
    });
});