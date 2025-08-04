import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { vi } from "vitest";
import { AudioProvider } from "../context/audio-context";
import { AudioControl } from "../components/AudioControl";
import { SOUND_CONFIG } from "../config/sound-config";

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

// Mock Web Audio API
const mockAudioContext = {
  createGain: vi.fn(() => ({
    connect: vi.fn(),
    gain: {
      setValueAtTime: vi.fn(),
    },
  })),
  createBufferSource: vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    addEventListener: vi.fn(),
    buffer: null,
    loop: false,
  })),
  destination: {},
  currentTime: 0,
  state: "running",
  resume: vi.fn(() => Promise.resolve()),
  close: vi.fn(() => Promise.resolve()),
};

Object.defineProperty(window, "AudioContext", {
  value: vi.fn(() => mockAudioContext),
});

// Mock asset loader
vi.mock("../managers/asset-loader", () => ({
  AssetLoader: vi.fn().mockImplementation(() => ({
    loadAssets: vi.fn(() => Promise.resolve(new Map())),
    onProgress: vi.fn(() => () => {}),
    getLoadingState: vi.fn(() => ({
      isLoading: false,
      loadedCount: 0,
      totalCount: 0,
      failedSounds: [],
      errors: new Map(),
    })),
    cleanup: vi.fn(),
  })),
}));

// Mock audio optimizer
vi.mock("../utils/audio-optimization", () => ({
  AudioOptimizer: vi.fn().mockImplementation(() => ({
    analyzeAudioBuffer: vi.fn(() => ({ recommendations: [] })),
    normalizeAudioBuffer: vi.fn((buffer) => buffer),
    applyFadeInOut: vi.fn((buffer) => buffer),
    getOptimizationReport: vi.fn(() => ({
      totalOriginalSize: 0,
      totalOptimizedSize: 0,
      overallCompressionRatio: 1,
      fileReports: [],
      globalRecommendations: [],
    })),
  })),
}));

describe("Audio Settings Integration", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    vi.clearAllMocks();
  });

  const renderWithProvider = (component: React.ReactElement) => {
    return render(<AudioProvider>{component}</AudioProvider>);
  };

  describe("complete audio settings workflow", () => {
    it("should allow user to control audio settings end-to-end", async () => {
      renderWithProvider(<AudioControl />);

      // Initially should show unmuted state
      expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();

      // Click mute button
      const muteButton = screen.getByLabelText("Mute audio");
      act(() => {
        fireEvent.click(muteButton);
      });

      // Should now show muted state
      await waitFor(() => {
        expect(screen.getByLabelText("Unmute audio")).toBeInTheDocument();
      });

      // Open settings
      const settingsButton = screen.getByLabelText("Open audio settings");
      act(() => {
        fireEvent.click(settingsButton);
      });

      // Settings modal should be open
      expect(screen.getByText("Audio Settings")).toBeInTheDocument();

      // Test that the mute toggle works in the settings modal
      const muteToggle = screen.getByRole("checkbox");

      // Should initially be checked since we muted earlier
      expect(muteToggle).toBeChecked();

      // Toggle mute in the settings modal (this should unmute)
      act(() => {
        fireEvent.click(muteToggle);
      });

      // Now it should be unchecked (unmuted)
      await waitFor(() => {
        expect(muteToggle).not.toBeChecked();
      });

      // Change global volume
      const globalVolumeSlider = screen.getByLabelText(/Master Volume/);
      act(() => {
        fireEvent.change(globalVolumeSlider, { target: { value: "0.5" } });
      });

      // Volume display should update
      expect(screen.getByText("Master Volume: 50%")).toBeInTheDocument();

      // Change category volume
      const movementSlider = screen.getByLabelText(/Movement/);
      act(() => {
        fireEvent.change(movementSlider, { target: { value: "0.3" } });
      });

      // Category volume display should update
      expect(screen.getByText(/Movement: 30%/)).toBeInTheDocument();

      // Close settings
      const closeButton = screen.getByLabelText("Close");
      act(() => {
        fireEvent.click(closeButton);
      });

      // Settings modal should be closed
      expect(screen.queryByText("Audio Settings")).not.toBeInTheDocument();

      // Settings should persist in localStorage
      const stored = JSON.parse(
        mockLocalStorage.getItem("wanderer-audio-settings") || "{}"
      );
      expect(stored.isMuted).toBe(false); // Should be false since we toggled it back to unmuted
      expect(stored.globalVolume).toBe(0.5);
      expect(stored.categoryVolumes.movement).toBe(0.3);
    });

    it("should handle keyboard shortcuts", async () => {
      renderWithProvider(<AudioControl />);

      // Initially unmuted
      expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();

      // Simulate Ctrl+M
      act(() => {
        const event = new KeyboardEvent("keydown", {
          key: "m",
          ctrlKey: true,
        });
        window.dispatchEvent(event);
      });

      // Should be muted now
      await waitFor(() => {
        expect(screen.getByLabelText("Unmute audio")).toBeInTheDocument();
      });

      // Simulate Ctrl+M again
      act(() => {
        const event = new KeyboardEvent("keydown", {
          key: "m",
          ctrlKey: true,
        });
        window.dispatchEvent(event);
      });

      // Should be unmuted again
      await waitFor(() => {
        expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();
      });
    });

    it("should reset settings to defaults", async () => {
      // Set some custom settings first
      const customSettings = {
        isMuted: true,
        globalVolume: 0.3,
        categoryVolumes: {
          movement: 0.2,
          collision: 0.4,
          gameState: 0.6,
        },
      };
      mockLocalStorage.setItem(
        "wanderer-audio-settings",
        JSON.stringify(customSettings)
      );

      renderWithProvider(<AudioControl />);

      // Open settings
      const settingsButton = screen.getByLabelText("Open audio settings");
      act(() => {
        fireEvent.click(settingsButton);
      });

      // Should show custom settings
      expect(screen.getByText("Master Volume: 30%")).toBeInTheDocument();
      expect(screen.getByText(/Movement: 20%/)).toBeInTheDocument();

      // Click reset button
      const resetButton = screen.getByText("Reset to Defaults");
      act(() => {
        fireEvent.click(resetButton);
      });

      // Should show default settings
      expect(
        screen.getByText(
          `Master Volume: ${Math.round(SOUND_CONFIG.globalVolume * 100)}%`
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          `Movement: ${Math.round(
            (SOUND_CONFIG.categories.movement?.volume ?? 0) * 100
          )}%`
        )
      ).toBeInTheDocument();

      // Mute toggle should be unchecked
      const muteToggle = screen.getByRole("checkbox");
      expect(muteToggle).not.toBeChecked();
    });

    it("should disable volume controls when muted", async () => {
      renderWithProvider(<AudioControl />);

      // Open settings
      const settingsButton = screen.getByLabelText("Open audio settings");
      act(() => {
        fireEvent.click(settingsButton);
      });

      // Initially volume controls should be enabled
      const globalVolumeSlider = screen.getByLabelText(/Master Volume/);
      expect(globalVolumeSlider).not.toBeDisabled();

      // Toggle mute - this should enable the mute state
      const muteToggle = screen.getByRole("checkbox");
      act(() => {
        fireEvent.click(muteToggle);
      });

      // Wait for the mute toggle to be checked and volume controls to be disabled
      await waitFor(
        () => {
          expect(muteToggle).toBeChecked();
          expect(globalVolumeSlider).toBeDisabled();
        },
        { timeout: 2000 }
      );

      // All category sliders should be disabled
      Object.keys(SOUND_CONFIG.categories).forEach((categoryKey) => {
        const categorySlider = screen.getByLabelText(
          new RegExp(SOUND_CONFIG.categories[categoryKey]!.name)
        );
        expect(categorySlider).toBeDisabled();
      });
    });
  });

  describe("persistence across sessions", () => {
    it("should load saved settings on initialization", async () => {
      // Set some settings in localStorage
      const savedSettings = {
        isMuted: true,
        globalVolume: 0.6,
        categoryVolumes: {
          movement: 0.4,
          collision: 0.8,
          gameState: 0.9,
        },
      };
      mockLocalStorage.setItem(
        "wanderer-audio-settings",
        JSON.stringify(savedSettings)
      );

      renderWithProvider(<AudioControl />);

      // Should show muted state
      expect(screen.getByLabelText("Unmute audio")).toBeInTheDocument();

      // Open settings to verify volumes
      const settingsButton = screen.getByLabelText("Open audio settings");
      act(() => {
        fireEvent.click(settingsButton);
      });

      // Should show saved volumes
      expect(screen.getByText("Master Volume: 60%")).toBeInTheDocument();
      expect(screen.getByText(/Movement: 40%/)).toBeInTheDocument();
      expect(screen.getByText(/Collision: 80%/)).toBeInTheDocument();
      expect(screen.getByText(/Game State: 90%/)).toBeInTheDocument();

      // Mute toggle should be checked
      const muteToggle = screen.getByRole("checkbox");
      expect(muteToggle).toBeChecked();
    });

    it("should handle corrupted localStorage gracefully", async () => {
      // Set corrupted data in localStorage
      mockLocalStorage.setItem("wanderer-audio-settings", "invalid-json");

      renderWithProvider(<AudioControl />);

      // Should fall back to defaults
      expect(screen.getByLabelText("Mute audio")).toBeInTheDocument();

      // Open settings to verify default volumes
      const settingsButton = screen.getByLabelText("Open audio settings");
      act(() => {
        fireEvent.click(settingsButton);
      });

      expect(
        screen.getByText(
          `Master Volume: ${Math.round(SOUND_CONFIG.globalVolume * 100)}%`
        )
      ).toBeInTheDocument();
    });
  });
});
