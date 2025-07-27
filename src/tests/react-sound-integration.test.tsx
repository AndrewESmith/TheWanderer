import React from "react";
import {
  render,
  renderHook,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { performance } from "perf_hooks";

// Import React components and hooks
import { AudioProvider, useAudioContext } from "../audio/context/audio-context";
import { useSound } from "../audio/hooks/use-sound";
import { useAudioSettings } from "../audio/hooks/use-audio-settings";
import App from "../App";

// Import types
import type { AudioManager } from "../Interfaces/IAudioManager";
import type { SoundEvent, PlaySoundOptions } from "../Interfaces/ISoundEvent";

// Mock audio manager for React tests
const createMockAudioManager = (): AudioManager => ({
  playSound: vi.fn(),
  preloadSounds: vi.fn().mockResolvedValue(undefined),
  setMuted: vi.fn(),
  isMuted: vi.fn().mockReturnValue(false),
  isSupported: vi.fn().mockReturnValue(true),
  cleanup: vi.fn(),
  stopAllSounds: vi.fn(),
  setGlobalVolume: vi.fn(),
  setCategoryVolume: vi.fn(),
});

// Mock the audio manager factory
let mockAudioManager: AudioManager;
vi.mock("../audio/managers/audio-manager-factory", () => ({
  createAudioManager: () => mockAudioManager,
  createSpecificAudioManager: () => mockAudioManager,
}));

// Mock audio utils
vi.mock("../audio/utils/audio-utils", () => ({
  canAutoplay: vi.fn().mockResolvedValue(true),
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Test wrapper component
function TestWrapper({ children }: { children: React.ReactNode }) {
  return <AudioProvider>{children}</AudioProvider>;
}

describe("React Sound System Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAudioManager = createMockAudioManager();
    mockLocalStorage.getItem.mockReturnValue(null);

    // Mock performance for timing tests
    global.performance = performance;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("2. Integration Tests for React Hooks and Component Interactions", () => {
    describe("useSound Hook Integration", () => {
      it("should integrate with AudioProvider correctly", async () => {
        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        // Wait for audio initialization
        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.playSound).toBeDefined();
        expect(result.current.toggleMute).toBeDefined();
        expect(result.current.stopAllSounds).toBeDefined();
        expect(typeof result.current.isMuted).toBe("boolean");
        expect(typeof result.current.isLoading).toBe("boolean");
      });

      it("should call audio manager methods correctly", async () => {
        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Test playSound
        act(() => {
          result.current.playSound("test-sound", { volume: 0.5 });
        });

        expect(mockAudioManager.playSound).toHaveBeenCalledWith("test-sound", {
          volume: 0.5,
        });

        // Test toggleMute
        act(() => {
          result.current.toggleMute();
        });

        expect(mockAudioManager.setMuted).toHaveBeenCalled();

        // Test stopAllSounds
        act(() => {
          result.current.stopAllSounds();
        });

        expect(mockAudioManager.stopAllSounds).toHaveBeenCalled();
      });

      it("should handle playback errors and track error state", async () => {
        mockAudioManager.playSound = vi.fn().mockImplementation(() => {
          throw new Error("Playback failed");
        });

        const consoleSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Trigger multiple errors for the same sound
        for (let i = 0; i < 4; i++) {
          act(() => {
            result.current.playSound("test-sound");
          });
        }

        expect(consoleSpy).toHaveBeenCalledWith(
          "Failed to play sound test-sound:",
          expect.any(Error)
        );

        // Should track that there are playback errors
        expect(result.current.hasPlaybackErrors).toBe(true);

        consoleSpy.mockRestore();
      });

      it("should reset error counts periodically", async () => {
        mockAudioManager.playSound = vi.fn().mockImplementation(() => {
          throw new Error("Playback failed");
        });

        const consoleSpy = vi
          .spyOn(console, "error")
          .mockImplementation(() => {});

        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Trigger error
        act(() => {
          result.current.playSound("test-sound");
        });

        expect(result.current.hasPlaybackErrors).toBe(true);

        // Use fake timers after initial setup
        vi.useFakeTimers();

        // Fast-forward time to trigger error reset
        act(() => {
          vi.advanceTimersByTime(61000); // 61 seconds
        });

        // Run any pending timers
        act(() => {
          vi.runAllTimers();
        });

        expect(result.current.hasPlaybackErrors).toBe(false);

        vi.useRealTimers();
        consoleSpy.mockRestore();
      });

      it("should sync volume settings with audio manager", async () => {
        const { result } = renderHook(
          () => {
            const sound = useSound();
            const settings = useAudioSettings();
            return { sound, settings };
          },
          {
            wrapper: TestWrapper,
          }
        );

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Change volume settings
        act(() => {
          result.current.settings.setGlobalVolume(0.5);
        });

        expect(mockAudioManager.setGlobalVolume).toHaveBeenCalledWith(0.5);

        // Change category volume
        act(() => {
          result.current.settings.setCategoryVolume("movement", 0.7);
        });

        expect(mockAudioManager.setCategoryVolume).toHaveBeenCalledWith(
          "movement",
          0.7
        );
      });
    });

    describe("useAudioSettings Hook Integration", () => {
      it("should integrate with AudioProvider for settings management", async () => {
        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.isMuted).toBeDefined();
        expect(result.current.globalVolume).toBeDefined();
        expect(result.current.categoryVolumes).toBeDefined();
        expect(result.current.setMuted).toBeDefined();
        expect(result.current.setGlobalVolume).toBeDefined();
        expect(result.current.setCategoryVolume).toBeDefined();
        expect(result.current.resetToDefaults).toBeDefined();
      });

      it("should persist settings to localStorage", async () => {
        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        act(() => {
          result.current.setGlobalVolume(0.6);
        });

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          "wanderer-audio-settings",
          expect.stringContaining('"globalVolume":0.6')
        );

        act(() => {
          result.current.setMuted(true);
        });

        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
          "wanderer-audio-settings",
          expect.stringContaining('"isMuted":true')
        );
      });

      it("should load settings from localStorage on initialization", async () => {
        mockLocalStorage.getItem.mockReturnValue(
          '{"isMuted":true,"globalVolume":0.3,"categoryVolumes":{"movement":0.5}}'
        );

        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.isMuted).toBe(true);
        expect(result.current.globalVolume).toBe(0.3);
        expect(result.current.categoryVolumes.movement).toBe(0.5);
      });

      it("should handle localStorage errors gracefully", async () => {
        mockLocalStorage.getItem.mockImplementation(() => {
          throw new Error("Storage error");
        });

        const consoleSpy = vi
          .spyOn(console, "warn")
          .mockImplementation(() => {});

        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Should use default values
        expect(result.current.globalVolume).toBe(0.8);
        expect(result.current.isMuted).toBe(false);

        consoleSpy.mockRestore();
      });

      it("should validate and clamp volume values", async () => {
        const { result } = renderHook(() => useAudioSettings(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Test volume clamping
        act(() => {
          result.current.setGlobalVolume(1.5);
        });

        expect(result.current.globalVolume).toBe(1);

        act(() => {
          result.current.setGlobalVolume(-0.5);
        });

        expect(result.current.globalVolume).toBe(0);

        act(() => {
          result.current.setCategoryVolume("movement", 2.0);
        });

        expect(result.current.categoryVolumes.movement).toBe(1);
      });
    });

    describe("AudioProvider Context Integration", () => {
      it("should provide audio manager to child components", async () => {
        let contextValue: any;

        function TestComponent() {
          contextValue = useAudioContext();
          return <div>Test</div>;
        }

        render(
          <AudioProvider>
            <TestComponent />
          </AudioProvider>
        );

        await waitFor(() => {
          expect(contextValue.audioManager).toBeDefined();
          expect(contextValue.isLoading).toBeDefined();
          expect(contextValue.error).toBeDefined();
          expect(contextValue.fallbackMode).toBeDefined();
        });
      });

      it("should handle audio manager initialization errors", async () => {
        mockAudioManager.preloadSounds = vi
          .fn()
          .mockRejectedValue(new Error("Init failed"));

        let contextValue: any;

        function TestComponent() {
          contextValue = useAudioContext();
          return <div>Test</div>;
        }

        render(
          <AudioProvider>
            <TestComponent />
          </AudioProvider>
        );

        await waitFor(() => {
          expect(contextValue.error).toBeTruthy();
        });
      });

      it("should provide reinitialize functionality", async () => {
        let contextValue: any;

        function TestComponent() {
          contextValue = useAudioContext();
          return <div>Test</div>;
        }

        render(
          <AudioProvider>
            <TestComponent />
          </AudioProvider>
        );

        await waitFor(() => {
          expect(contextValue.reinitializeAudio).toBeDefined();
          expect(typeof contextValue.reinitializeAudio).toBe("function");
        });

        // Test reinitialize
        await act(async () => {
          await contextValue.reinitializeAudio();
        });

        expect(mockAudioManager.preloadSounds).toHaveBeenCalled();
      });
    });

    describe("Component Integration with Sound System", () => {
      it("should integrate sound system with App component", async () => {
        // Mock URL parameters for test maze
        delete (window as any).location;
        (window as any).location = { search: "" };

        render(<App />);

        await waitFor(() => {
          expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });

        // Should have audio controls
        expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();
        expect(
          screen.getByLabelText("Open audio settings")
        ).toBeInTheDocument();
      });

      it("should trigger sounds on user interactions", async () => {
        delete (window as any).location;
        (window as any).location = { search: "" };

        render(<App />);

        await waitFor(() => {
          expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });

        // Simulate user input
        fireEvent.keyDown(window, { key: "ArrowRight" });

        await waitFor(() => {
          expect(mockAudioManager.playSound).toHaveBeenCalled();
        });
      });

      it("should handle mute toggle in UI", async () => {
        delete (window as any).location;
        (window as any).location = { search: "" };

        render(<App />);

        await waitFor(() => {
          expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();
        });

        const muteButton = screen.getByLabelText("Mute audio");
        fireEvent.click(muteButton);

        await waitFor(() => {
          expect(mockAudioManager.setMuted).toHaveBeenCalled();
        });
      });

      it("should open audio settings dialog", async () => {
        delete (window as any).location;
        (window as any).location = { search: "" };

        render(<App />);

        await waitFor(() => {
          expect(
            screen.getByLabelText("Open audio settings")
          ).toBeInTheDocument();
        });

        const settingsButton = screen.getByLabelText("Open audio settings");
        fireEvent.click(settingsButton);

        await waitFor(() => {
          expect(screen.getByText("Audio Settings")).toBeInTheDocument();
        });
      });

      it("should handle game state changes with sound integration", async () => {
        // Set up test maze with bomb next to player
        delete (window as any).location;
        (window as any).location = { search: "?testMaze=bomb" };

        render(<App />);

        await waitFor(() => {
          expect(screen.getByText(/Score:/)).toBeInTheDocument();
        });

        // Move player into bomb to trigger game end
        fireEvent.keyDown(window, { key: "ArrowRight" });

        await waitFor(() => {
          expect(screen.getByText("Game Over")).toBeInTheDocument();
        });

        // Should have stopped all sounds
        await waitFor(() => {
          expect(mockAudioManager.stopAllSounds).toHaveBeenCalled();
        });
      });
    });

    describe("Performance Integration Tests", () => {
      it("should not block React rendering during audio operations", async () => {
        const startTime = performance.now();

        render(
          <TestWrapper>
            <div data-testid="test-component">Test</div>
          </TestWrapper>
        );

        const renderTime = performance.now() - startTime;

        // Should render quickly even with audio initialization
        expect(renderTime).toBeLessThan(100);
        expect(screen.getByTestId("test-component")).toBeInTheDocument();
      });

      it("should handle rapid hook updates efficiently", async () => {
        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        const startTime = performance.now();

        // Rapidly call playSound
        for (let i = 0; i < 100; i++) {
          act(() => {
            result.current.playSound("test-sound");
          });
        }

        const operationTime = performance.now() - startTime;

        // Should handle rapid calls efficiently
        expect(operationTime).toBeLessThan(100);
        expect(mockAudioManager.playSound).toHaveBeenCalledTimes(100);
      });

      it("should maintain React state consistency during audio operations", async () => {
        const { result } = renderHook(
          () => {
            const sound = useSound();
            const settings = useAudioSettings();
            return { sound, settings };
          },
          {
            wrapper: TestWrapper,
          }
        );

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Perform multiple state changes rapidly
        for (let i = 0; i < 10; i++) {
          act(() => {
            result.current.settings.setGlobalVolume(i / 10);
            result.current.sound.playSound("test-sound");
          });
        }

        // State should be consistent
        expect(result.current.settings.globalVolume).toBe(0.9);
        expect(mockAudioManager.playSound).toHaveBeenCalledTimes(10);
      });
    });

    describe("Error Handling Integration", () => {
      it("should handle audio manager failures gracefully in React context", async () => {
        mockAudioManager.playSound = vi.fn().mockImplementation(() => {
          throw new Error("Audio manager failed");
        });

        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Should not crash React
        expect(() => {
          act(() => {
            result.current.playSound("test-sound");
          });
        }).not.toThrow();
      });

      it("should show error states in UI components", async () => {
        mockAudioManager.preloadSounds = vi
          .fn()
          .mockRejectedValue(new Error("Failed to load"));

        // Mock the context to return error state
        vi.doMock("../audio/context/audio-context", () => ({
          AudioProvider: ({ children }: { children: React.ReactNode }) =>
            children,
          useAudioContext: () => ({
            audioManager: null,
            isLoading: false,
            error: "Failed to load",
            fallbackMode: true,
            reinitializeAudio: vi.fn(),
          }),
        }));

        const { useSound: MockedUseSound } = await import(
          "../audio/hooks/use-sound"
        );

        const { result } = renderHook(() => MockedUseSound());

        expect(result.current.error).toBe("Failed to load");
        expect(result.current.fallbackMode).toBe(true);

        vi.doUnmock("../audio/context/audio-context");
      });

      it("should recover from temporary errors", async () => {
        let shouldFail = true;
        mockAudioManager.playSound = vi.fn().mockImplementation(() => {
          if (shouldFail) {
            throw new Error("Temporary failure");
          }
        });

        const { result } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // First call should fail
        act(() => {
          result.current.playSound("test-sound");
        });

        expect(result.current.hasPlaybackErrors).toBe(true);

        // Fix the error and reset
        shouldFail = false;
        mockAudioManager.playSound = vi.fn();

        act(() => {
          result.current.resetAudioSystem();
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // Should work now
        act(() => {
          result.current.playSound("test-sound");
        });

        expect(mockAudioManager.playSound).toHaveBeenCalledWith(
          "test-sound",
          undefined
        );
      });
    });

    describe("Memory Management Integration", () => {
      it("should cleanup audio resources when components unmount", async () => {
        const { unmount } = renderHook(() => useSound(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        unmount();

        // Should have called cleanup
        expect(mockAudioManager.cleanup).toHaveBeenCalled();
      });

      it("should handle multiple component instances efficiently", async () => {
        const hooks = [];

        // Create multiple hook instances
        for (let i = 0; i < 5; i++) {
          const { result } = renderHook(() => useSound(), {
            wrapper: TestWrapper,
          });
          hooks.push(result);
        }

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        // All hooks should share the same audio manager
        hooks.forEach((hook) => {
          expect(hook.current.playSound).toBeDefined();
        });

        // Should not have created multiple audio managers
        expect(mockAudioManager.preloadSounds).toHaveBeenCalledTimes(1);
      });
    });
  });
});
