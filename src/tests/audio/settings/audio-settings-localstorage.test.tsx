import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { ReactNode } from "react";
import {
  AudioProvider,
  useAudioContext,
} from "../../../audio/context/audio-context";
import type { AudioManager } from "../../../Interfaces/IAudioManager";

// Mock localStorage with detailed tracking
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  const mockSetItem = vi.fn((key: string, value: string) => {
    store[key] = value;
  });

  const mockGetItem = vi.fn((key: string) => {
    return store[key] || null;
  });

  const mockRemoveItem = vi.fn((key: string) => {
    delete store[key];
  });

  const mockClear = vi.fn(() => {
    store = {};
  });

  return {
    getItem: mockGetItem,
    setItem: mockSetItem,
    removeItem: mockRemoveItem,
    clear: mockClear,
    // Helper to access internal store
    _getStore: () => store,
    _setStore: (newStore: Record<string, string>) => {
      store = { ...newStore };
    },
  };
})();

Object.defineProperty(window, "localStorage", {
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
vi.mock("../../../audio/managers/audio-manager-factory", () => ({
  createAudioManager: () => mockAudioManager,
  createSpecificAudioManager: () => mockAudioManager,
}));

// Mock sound config
vi.mock("../../../audio/config/sound-config", () => ({
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
  return <AudioProvider>{children} </AudioProvider>;
}

describe("Audio Settings localStorage Persistence - Debug Panel", () => {
  const STORAGE_KEY = "wanderer-audio-settings";

  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    mockLocalStorage._setStore({});

    // Reset localStorage mocks to their original implementations
    mockLocalStorage.getItem.mockImplementation((key: string) => {
      const store = mockLocalStorage._getStore();
      return store[key] || null;
    });
    mockLocalStorage.setItem.mockImplementation(
      (key: string, value: string) => {
        const store = mockLocalStorage._getStore();
        store[key] = value;
      }
    );

    vi.mocked(mockAudioManager.preloadSounds).mockResolvedValue(undefined);
    vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);
    vi.mocked(mockAudioManager.isSupported).mockReturnValue(true);
  });

  describe("saving debug panel visibility preference", () => {
    it("should save showDebugPanel to localStorage when set to true", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      // Wait for localStorage save
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.stringContaining('"showDebugPanel":true')
      );

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should save showDebugPanel to localStorage when set to false", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // First set to true, then to false
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(false);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.showDebugPanel).toBe(false);
    });

    it("should persist debug panel preference alongside other settings", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.5);
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.globalVolume).toBe(0.5);
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should update localStorage on each debug panel change", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Clear previous calls
      mockLocalStorage.setItem.mockClear();

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);

      act(() => {
        result.current.setShowDebugPanel(false);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(2);
    });
  });

  describe("loading debug panel visibility preference", () => {
    it("should restore showDebugPanel from localStorage on initialization", async () => {
      // Pre-populate localStorage
      mockLocalStorage._setStore({
        [STORAGE_KEY]: JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          showDebugPanel: true,
        }),
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should default to false when no preference exists in localStorage", async () => {
      // Empty localStorage
      mockLocalStorage._setStore({});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should default to false when showDebugPanel is missing from stored settings", async () => {
      // Settings without showDebugPanel
      mockLocalStorage._setStore({
        [STORAGE_KEY]: JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          // showDebugPanel is missing
        }),
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should handle corrupted showDebugPanel values gracefully", async () => {
      const testCases = [
        { stored: true, expected: true },
        { stored: false, expected: false },
        { stored: "true", expected: true }, // String "true" is truthy
        { stored: "false", expected: false }, // String "false" should be converted to false
        { stored: 1, expected: true },
        { stored: 0, expected: false },
        { stored: null, expected: false },
        { stored: "invalid", expected: true }, // Truthy string
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
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(expected);
      }
    });

    it("should handle completely corrupted localStorage data", async () => {
      mockLocalStorage._setStore({
        [STORAGE_KEY]: "invalid-json-data",
      });

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should fall back to default
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("cross-session persistence", () => {
    it("should persist debug panel preference across browser sessions", async () => {
      // First session - set preference
      {
        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        act(() => {
          result.current.setShowDebugPanel(true);
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });
      }

      // Simulate new session - create new component instance
      {
        const { result } = renderHook(() => useAudioContext(), {
          wrapper: TestWrapper,
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(true);
      }
    });

    it("should maintain preference through multiple setting changes", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Multiple changes
      const changes = [true, false, true, false, true];

      for (const value of changes) {
        act(() => {
          result.current.setShowDebugPanel(value);
        });

        await act(async () => {
          await new Promise((resolve) => setTimeout(resolve, 0));
        });

        expect(result.current.settings.showDebugPanel).toBe(value);

        const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
        expect(savedData.showDebugPanel).toBe(value);
      }
    });
  });

  describe("localStorage error handling", () => {
    it("should handle localStorage save errors gracefully", async () => {
      // Mock localStorage.setItem to throw an error
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("Storage quota exceeded");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should not throw error
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // State should still be updated even if save fails
      expect(result.current.settings.showDebugPanel).toBe(true);

      consoleSpy.mockRestore();
    });

    it("should handle localStorage load errors gracefully", async () => {
      // Mock localStorage.getItem to throw an error
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("Storage access denied");
      });

      const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should fall back to defaults
      expect(result.current.settings.showDebugPanel).toBe(false);

      consoleSpy.mockRestore();
    });
  });

  describe("storage key consistency", () => {
    it("should use the correct storage key for debug panel settings", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEY,
        expect.any(String)
      );
    });

    it("should not create separate storage entries for debug panel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setMuted(true);
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should only have one storage key
      const store = mockLocalStorage._getStore();
      const keys = Object.keys(store);
      expect(keys).toHaveLength(1);
      expect(keys[0]).toBe(STORAGE_KEY);

      // Both settings should be in the same entry
      const savedData = JSON.parse(store[STORAGE_KEY]);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.showDebugPanel).toBe(true);
    });
  });

  describe("data integrity", () => {
    it("should maintain data type consistency in localStorage", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(typeof savedData.showDebugPanel).toBe("boolean");
      expect(savedData.showDebugPanel).toBe(true);
    });

    it("should preserve other settings when updating debug panel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Set initial values
      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.3);
        result.current.setCategoryVolume("movement", 0.5);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Change only debug panel
      act(() => {
        result.current.setShowDebugPanel(true);
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const savedData = JSON.parse(mockLocalStorage._getStore()[STORAGE_KEY]);
      expect(savedData.isMuted).toBe(true);
      expect(savedData.globalVolume).toBe(0.3);
      expect(savedData.categoryVolumes.movement).toBe(0.5);
      expect(savedData.showDebugPanel).toBe(true);
    });
  });
});
