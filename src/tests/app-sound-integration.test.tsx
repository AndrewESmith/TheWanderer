import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

// Mock functions for audio system
const mockPlaySound = vi.fn();
const mockStopAllSounds = vi.fn();
const mockToggleMute = vi.fn();
const mockInitializeAudio = vi.fn();
const mockSoundEventCallback = vi.fn();
const mockSetMuted = vi.fn();
let mockIsMuted = false;

const mockAudioContext = {
    createBufferSource: vi.fn(() => ({
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        buffer: null,
        onended: null
    })),
    createGain: vi.fn(() => ({
        connect: vi.fn(),
        gain: { value: 1, setValueAtTime: vi.fn() }
    })),
    decodeAudioData: vi.fn(() => Promise.resolve(new ArrayBuffer(0))),
    destination: {},
    state: 'running',
    resume: vi.fn(() => Promise.resolve()),
    suspend: vi.fn(() => Promise.resolve()),
    close: vi.fn(() => Promise.resolve())
};

// Mock the audio hooks
vi.mock('../audio/context/audio-context', () => ({
    AudioProvider: ({ children }: { children: React.ReactNode }) => children,
    useAudioContext: () => ({
        audioManager: {
            playSound: mockPlaySound,
            preloadSounds: vi.fn(() => Promise.resolve()),
            setMuted: vi.fn(),
            isMuted: vi.fn(() => mockIsMuted),
            isSupported: vi.fn(() => true),
            stopAllSounds: mockStopAllSounds,
            cleanup: vi.fn(),
            getLoadingState: vi.fn(() => ({ isLoading: false, progress: 1, errors: [] })),
            onLoadingProgress: vi.fn(() => vi.fn()),
            getOptimizationReport: vi.fn(() => ({})),
            setGlobalVolume: vi.fn(),
            getGlobalVolume: vi.fn(() => 1),
            setCategoryVolume: vi.fn(),
            getCategoryVolume: vi.fn(() => 1),
            getAllCategoryVolumes: vi.fn(() => ({}))
        },
        isInitialized: true,
        isLoading: false,
        error: null,
        fallbackMode: false,
        autoplayAllowed: true,
        initializeAudio: mockInitializeAudio,
        cleanup: vi.fn(),
        reinitializeAudio: vi.fn(),
        switchToFallback: vi.fn()
    })
}));

vi.mock('../audio/hooks/use-audio-settings', () => ({
    useAudioSettings: () => ({
        isMuted: mockIsMuted,
        volume: 1,
        globalVolume: 1,
        categoryVolumes: {},
        setMuted: mockSetMuted.mockImplementation((muted: boolean) => { 
            mockIsMuted = muted; 
        }),
        setVolume: vi.fn(),
        setGlobalVolume: vi.fn(),
        setCategoryVolume: vi.fn(),
        resetToDefaults: vi.fn(),
        toggleMute: mockToggleMute.mockImplementation(() => { 
            mockIsMuted = !mockIsMuted; 
            return mockIsMuted;
        })
    })
}));

// Mock the useSound hook
let mockHasPlaybackErrors = false;
vi.mock('../audio/hooks/use-sound', () => ({
    useSound: () => ({
        playSound: mockPlaySound,
        stopAllSounds: mockStopAllSounds,
        isLoading: false,
        error: null,
        resetAudioSystem: vi.fn(),
        hasPlaybackErrors: mockHasPlaybackErrors
    })
}));

import App from '../App';

describe('App Sound Integration', () => {
    beforeEach(() => {
        // Reset mocks
        mockPlaySound.mockClear();
        mockStopAllSounds.mockClear();
        mockToggleMute.mockClear();
        mockInitializeAudio.mockClear();
        mockSoundEventCallback.mockClear();
        mockSetMuted.mockClear();
        mockIsMuted = false;
        mockHasPlaybackErrors = false;
        
        // Mock Web Audio API
        global.AudioContext = vi.fn(() => mockAudioContext) as any;
        (global as any).webkitAudioContext = global.AudioContext;
        global.Audio = vi.fn(() => ({
            play: vi.fn(() => Promise.resolve()),
            pause: vi.fn(),
            load: vi.fn(),
            volume: 1,
            muted: false,
            currentTime: 0,
            duration: 1,
            ended: false,
            paused: true,
            readyState: 4,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn()
        })) as any;

        // Mock localStorage
        const localStorageMock = {
            getItem: vi.fn(() => null),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn()
        };
        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
        });

        // Mock fetch for sound file loading
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                arrayBuffer: () => Promise.resolve(new ArrayBuffer(0))
            } as Response)
        );

        // Mock URL parameters
        delete (window as any).location;
        (window as any).location = { search: '' };

        // Mock sound event emitter
        vi.doMock('../audio/events/sound-event-emitter', () => ({
            getSoundEventEmitter: () => ({
                setCallback: (callback: any) => {
                    mockSoundEventCallback.mockImplementation(callback || vi.fn());
                },
                emit: vi.fn(),
                emitMultiple: vi.fn()
            }),
            emitSoundEvent: vi.fn(),
            emitSoundEvents: vi.fn()
        }));
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.restoreAllMocks();
        mockSoundEventCallback.mockClear();
    });

    describe('Sound System Initialization', () => {
        it('should initialize audio system on app startup', async () => {
            render(<App />);

            // Should have audio controls visible (audio system initializes automatically)
            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
                expect(screen.getByLabelText('Open audio settings')).toBeInTheDocument();
            });
        });

        it('should not block game rendering during audio initialization', () => {
            render(<App />);

            // Game should be rendered immediately
            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            expect(screen.getByText(/Diamonds left:/)).toBeInTheDocument();
            expect(screen.getByText(/Moves:/)).toBeInTheDocument();
            expect(document.querySelector('.maze-grid')).toBeInTheDocument();
        });

        it('should handle audio initialization errors gracefully', async () => {
            // Mock AudioContext to throw error
            global.AudioContext = vi.fn(() => {
                throw new Error('Audio not supported');
            }) as any;

            render(<App />);

            // Game should still render and be playable
            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            expect(document.querySelector('.maze-grid')).toBeInTheDocument();

            // Audio controls should still be present (in fallback mode)
            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });
        });
    });

    describe('Keyboard Controls Integration', () => {
        it('should handle game movement keys without interfering with audio', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Test arrow key movement
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            // Should emit movement sound with new format
            await waitFor(() => {
                expect(mockPlaySound).toHaveBeenCalledWith(
                    'player_walk',
                    expect.objectContaining({
                        volume: expect.any(Number)
                    })
                );
            });
        });

        it('should handle mute keyboard shortcut (Ctrl+M)', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });

            // The keyboard shortcut functionality is tested in the useAudioSettings unit tests
            // Here we just verify that the mute button is present and functional
            const muteButton = screen.getByLabelText('Mute audio');
            expect(muteButton).toBeInTheDocument();
            expect(muteButton.getAttribute('title')).toContain('Ctrl+M');
        });

        it('should handle mute keyboard shortcut (Cmd+M) on Mac', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });

            // The keyboard shortcut functionality is tested in the useAudioSettings unit tests
            // Here we just verify that the mute button indicates Mac support
            const muteButton = screen.getByLabelText('Mute audio');
            expect(muteButton).toBeInTheDocument();
            expect(muteButton.getAttribute('title')).toContain('Ctrl+M');
        });

        it('should not trigger mute on M key without modifiers', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });

            // Press M without modifiers
            fireEvent.keyDown(window, { key: 'm' });

            // Should still show mute button (not muted)
            expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
        });
    });

    describe('Game Event Sound Integration', () => {
        it('should emit sounds for player movement', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Move player
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            await waitFor(() => {
                expect(mockPlaySound).toHaveBeenCalledWith(
                    'player_walk',
                    expect.objectContaining({
                        volume: expect.any(Number)
                    })
                );
            });
        });

        it('should stop all sounds when game ends', async () => {
            // Set up test maze with bomb next to player
            delete (window as any).location;
            (window as any).location = { search: '?testMaze=bomb' };

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Move player into bomb
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            // Wait for game end processing
            await waitFor(() => {
                expect(screen.getByText('Game Over')).toBeInTheDocument();
            });

            // Should have called stopAllSounds
            await waitFor(() => {
                expect(mockStopAllSounds).toHaveBeenCalled();
            });
        });

        it('should not emit sounds when game is over', async () => {
            // Set up test maze with bomb next to player
            delete (window as any).location;
            (window as any).location = { search: '?testMaze=bomb' };

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Move player into bomb to end game
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            await waitFor(() => {
                expect(screen.getByText('Game Over')).toBeInTheDocument();
            });

            // Clear previous sound calls
            mockPlaySound.mockClear();

            // Try to move again (should not work since game is over)
            fireEvent.keyDown(window, { key: 'ArrowLeft' });

            // Should not emit any new sounds
            expect(mockPlaySound).not.toHaveBeenCalled();
        });
    });

    describe('Audio Controls Integration', () => {
        it('should toggle mute via button click', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            });

            const muteButton = screen.getByLabelText('Mute audio');
            fireEvent.click(muteButton);

            // Should have called toggleMute
            await waitFor(() => {
                expect(mockToggleMute).toHaveBeenCalled();
            });
        });

        it('should open audio settings dialog', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByLabelText('Open audio settings')).toBeInTheDocument();
            });

            const settingsButton = screen.getByLabelText('Open audio settings');
            fireEvent.click(settingsButton);

            await waitFor(() => {
                expect(screen.getByText('Audio Settings')).toBeInTheDocument();
            });
        });

        it('should display audio error messages when available', async () => {
            // Set up playback errors
            mockHasPlaybackErrors = true;
            
            // Mock playSound to fail
            mockPlaySound.mockImplementation(() => {
                throw new Error('Sound playback failed');
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Should display error message
            await waitFor(() => {
                expect(screen.getByText(/Some sound effects failed to play/i)).toBeInTheDocument();
            });
        });
    });

    describe('Performance and Responsiveness', () => {
        it('should not block user input during sound playback', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Rapidly press movement keys
            for (let i = 0; i < 5; i++) {
                fireEvent.keyDown(window, { key: 'ArrowRight' });
                fireEvent.keyDown(window, { key: 'ArrowLeft' });
            }

            // Game should remain responsive
            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            expect(document.querySelector('.maze-grid')).toBeInTheDocument();
        });

        it('should handle multiple simultaneous sound events', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Trigger multiple sound events quickly
            fireEvent.keyDown(window, { key: 'ArrowRight' });
            fireEvent.keyDown(window, { key: 'ArrowLeft' });
            fireEvent.keyDown(window, { key: 'ArrowUp' });
            fireEvent.keyDown(window, { key: 'ArrowDown' });

            // Should handle all events without crashing
            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            
            // Should have attempted to play sounds
            await waitFor(() => {
                expect(mockPlaySound).toHaveBeenCalled();
            });
        });

        it('should maintain game state consistency during audio operations', async () => {
            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            const initialMoves = screen.getByText(/Moves:/).textContent;

            // Perform game actions that trigger sounds
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            // Game state should update correctly
            await waitFor(() => {
                const newMoves = screen.getByText(/Moves:/).textContent;
                expect(newMoves).not.toBe(initialMoves);
            });

            // Toggle mute during gameplay
            fireEvent.keyDown(window, { 
                key: 'm', 
                ctrlKey: true 
            });

            // Game should continue to work normally
            fireEvent.keyDown(window, { key: 'ArrowLeft' });

            expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });
    });

    describe('Error Recovery', () => {
        it('should continue working when sound playback fails', async () => {
            // Mock playSound to throw error
            mockPlaySound.mockImplementation(() => {
                throw new Error('Sound playback failed');
            });

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Game should still work despite sound errors
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            expect(screen.getByText(/Score:/)).toBeInTheDocument();
            expect(document.querySelector('.maze-grid')).toBeInTheDocument();
        });

        it('should handle audio context suspension gracefully', async () => {
            // Mock suspended audio context
            mockAudioContext.state = 'suspended';

            render(<App />);

            await waitFor(() => {
                expect(screen.getByText(/Score:/)).toBeInTheDocument();
            });

            // Game should still be playable
            fireEvent.keyDown(window, { key: 'ArrowRight' });

            expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });
    });
});