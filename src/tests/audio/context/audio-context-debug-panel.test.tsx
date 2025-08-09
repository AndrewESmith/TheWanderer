import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import type{ ReactNode } from "react";
import {
  AudioProvider,
  useAudioContext,
} from "../../../audio/context/audio-context";
import type { AudioManager } from "../../../Interfaces/IAudioManager";

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
  stopAllSounds: vi.fn(),
  cleanup: vi.fn(),
  getLoadingState: vi.fn(() => ({
    isLoading: false,
    loadedCount: 0,
    totalCount: 0,
    failedSounds: [],
    errors: new Map(),
  })),
  onLoadingProgress: vi.fn(() => vi.fn()),
  getOptimizationReport: vi.fn(() => ({})),
  setGlobalVolume: vi.fn(),
  getGlobalVolume: vi.fn(() => 1),
  setCategoryVolume: vi.fn(),
  getCategoryVolume: vi.fn(() => 1),
  getAllCategoryVolumes: vi.fn(() => ({})),
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
  return <AudioProvider>{children}</AudioProvider>;
}

describe("AudioContext Debug Panel State Management", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    vi.mocked(mockAudioManager.preloadSounds).mockResolvedValue(undefined);
    vi.mocked(mockAudioManager.isMuted).mockReturnValue(false);
    vi.mocked(mockAudioManager.isSupported).mockReturnValue(true);
  });

  describe("default settings", () => {
    it("should initialize with showDebugPanel set to false by default", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      // Wait for initialization
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should include showDebugPanel in default settings structure", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const settings = result.current.settings;
      expect(settings).toHaveProperty("showDebugPanel");
      expect(typeof settings.showDebugPanel).toBe("boolean");
    });
  });

  describe("setShowDebugPanel function", () => {
    it("should provide setShowDebugPanel function in context", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(typeof result.current.setShowDebugPanel).toBe("function");
    });

    it("should update showDebugPanel state when called", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(false);

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should toggle showDebugPanel state correctly", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Start with false
      expect(result.current.settings.showDebugPanel).toBe(false);

      // Set to true
      act(() => {
        result.current.setShowDebugPanel(true);
      });
      expect(result.current.settings.showDebugPanel).toBe(true);

      // Set back to false
      act(() => {
        result.current.setShowDebugPanel(false);
      });
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("localStorage persistence", () => {
    it("should save showDebugPanel to localStorage when changed", async () => {
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

      const savedSettings = JSON.parse(
        mockLocalStorage.getItem("wanderer-audio-settings") || "{}"
      );
      expect(savedSettings.showDebugPanel).toBe(true);
    });

    it("should load showDebugPanel from localStorage on initialization", async () => {
      // Pre-populate localStorage
      mockLocalStorage.setItem(
        "wanderer-audio-settings",
        JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          showDebugPanel: true,
        })
      );

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should handle missing showDebugPanel in stored settings gracefully", async () => {
      // Store settings without showDebugPanel
      mockLocalStorage.setItem(
        "wanderer-audio-settings",
        JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
        })
      );

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should default to false
      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should handle corrupted localStorage data gracefully", async () => {
      mockLocalStorage.setItem("wanderer-audio-settings", "invalid-json");

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should use default value
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("resetToDefaults function", () => {
    it("should reset showDebugPanel to false when resetToDefaults is called", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Set to true first
      act(() => {
        result.current.setShowDebugPanel(true);
      });
      expect(result.current.settings.showDebugPanel).toBe(true);

      // Reset to defaults
      act(() => {
        result.current.resetToDefaults();
      });

      expect(result.current.settings.showDebugPanel).toBe(false);
    });

    it("should reset all settings including showDebugPanel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Change multiple settings
      act(() => {
        result.current.setMuted(true);
        result.current.setGlobalVolume(0.3);
        result.current.setShowDebugPanel(true);
      });

      expect(result.current.settings.isMuted).toBe(true);
      expect(result.current.settings.globalVolume).toBe(0.3);
      expect(result.current.settings.showDebugPanel).toBe(true);

      // Reset to defaults
      act(() => {
        result.current.resetToDefaults();
      });

      expect(result.current.settings.isMuted).toBe(false);
      expect(result.current.settings.globalVolume).toBe(0.8);
      expect(result.current.settings.showDebugPanel).toBe(false);
    });
  });

  describe("type safety", () => {
    it("should enforce boolean type for showDebugPanel", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // TypeScript should enforce boolean type
      act(() => {
        result.current.setShowDebugPanel(true);
      });
      expect(typeof result.current.settings.showDebugPanel).toBe("boolean");

      act(() => {
        result.current.setShowDebugPanel(false);
      });
      expect(typeof result.current.settings.showDebugPanel).toBe("boolean");
    });

    it("should handle truthy/falsy values correctly", async () => {
      // Test with localStorage containing non-boolean values
      mockLocalStorage.setItem(
        "wanderer-audio-settings",
        JSON.stringify({
          isMuted: false,
          globalVolume: 0.8,
          categoryVolumes: {},
          showDebugPanel: "true", // String instead of boolean
        })
      );

      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      // Should be converted to boolean
      expect(result.current.settings.showDebugPanel).toBe(true);
      expect(typeof result.current.settings.showDebugPanel).toBe("boolean");
    });
  });

  describe("integration with other settings", () => {
    it("should not affect other settings when showDebugPanel is changed", async () => {
      const { result } = renderHook(() => useAudioContext(), {
        wrapper: TestWrapper,
      });

      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      const originalMuted = result.current.settings.isMuted;
      const originalVolume = result.current.settings.globalVolume;

      act(() => {
        result.current.setShowDebugPanel(true);
      });

      expect(result.current.settings.isMuted).toBe(originalMuted);
      expect(result.current.settings.globalVolume).toBe(originalVolume);
      expect(result.current.settings.showDebugPanel).toBe(true);
    });

    it("should persist all settings together", async () => {
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

      const savedSettings = JSON.parse(
        mockLocalStorage.getItem("wanderer-audio-settings") || "{}"
      );
      expect(savedSettings.isMuted).toBe(true);
      expect(savedSettings.globalVolume).toBe(0.5);
      expect(savedSettings.showDebugPanel).toBe(true);
    });
  });
});
