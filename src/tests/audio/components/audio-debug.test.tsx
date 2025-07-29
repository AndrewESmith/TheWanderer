import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AudioDebug } from "../../../audio/components/audio-debug";

// Mock the hooks
const mockUseSound = {
  playSound: vi.fn(),
  isLoading: false,
  error: null,
  fallbackMode: false,
};

const mockUseAudioContext = {
  audioManager: {
    state: {
      audioContext: { state: "running" },
      loadedSounds: new Set(["MOVE", "COLLECT_DIAMOND"]),
    },
  },
  isInitialized: true,
};

const mockUseAudioSettings = {
  showDebugPanel: true,
};

vi.mock("../../../audio/hooks/use-sound", () => ({
  useSound: () => mockUseSound,
}));

vi.mock("../../../audio/context/audio-context", () => ({
  useAudioContext: () => mockUseAudioContext,
}));

vi.mock("../../../audio/hooks/use-audio-settings", () => ({
  useAudioSettings: () => mockUseAudioSettings,
}));

vi.mock("../../../audio/config/sound-config", () => ({
  SOUND_IDS: {
    MOVE: "MOVE",
    COLLECT_DIAMOND: "COLLECT_DIAMOND",
    BOMB_EXPLODE: "BOMB_EXPLODE",
  },
}));

// Mock process.env.NODE_ENV
const originalEnv = process.env.NODE_ENV;

describe("AudioDebug Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to development mode
    process.env.NODE_ENV = "development";
    mockUseAudioSettings.showDebugPanel = true;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe("conditional rendering based on settings", () => {
    it("should render debug panel when in development mode and showDebugPanel is true", () => {
      process.env.NODE_ENV = "development";
      mockUseAudioSettings.showDebugPanel = true;

      render(<AudioDebug />);

      expect(screen.getByText("Audio Debug Panel")).toBeInTheDocument();
      expect(screen.getByText("Status:")).toBeInTheDocument();
      expect(screen.getByText("Test Sounds:")).toBeInTheDocument();
    });

    it("should not render debug panel when showDebugPanel is false", () => {
      process.env.NODE_ENV = "development";
      mockUseAudioSettings.showDebugPanel = false;

      const { container } = render(<AudioDebug />);

      expect(container.firstChild).toBeNull();
    });

    it("should not render debug panel in production mode even when showDebugPanel is true", () => {
      process.env.NODE_ENV = "production";
      mockUseAudioSettings.showDebugPanel = true;

      const { container } = render(<AudioDebug />);

      expect(container.firstChild).toBeNull();
    });

    it("should not render debug panel in production mode when showDebugPanel is false", () => {
      process.env.NODE_ENV = "production";
      mockUseAudioSettings.showDebugPanel = false;

      const { container } = render(<AudioDebug />);

      expect(container.firstChild).toBeNull();
    });
  });

  describe("debug panel content", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
      mockUseAudioSettings.showDebugPanel = true;
    });

    it("should display audio system status", () => {
      render(<AudioDebug />);

      expect(screen.getByText("Initialized: ✅")).toBeInTheDocument();
      expect(screen.getByText("Loading: ✅")).toBeInTheDocument();
      expect(screen.getByText("Fallback Mode: ✅")).toBeInTheDocument();
      expect(screen.getByText("Context State: running")).toBeInTheDocument();
      expect(screen.getByText("Loaded Sounds: 2")).toBeInTheDocument();
    });

    it("should display error when present", () => {
      mockUseSound.error = "Audio initialization failed";

      render(<AudioDebug />);

      expect(screen.getByText("Error:")).toBeInTheDocument();
      expect(
        screen.getByText("Audio initialization failed")
      ).toBeInTheDocument();
    });

    it("should display loading state", () => {
      mockUseSound.isLoading = true;

      render(<AudioDebug />);

      expect(screen.getByText("Loading: ⏳")).toBeInTheDocument();
    });

    it("should display fallback mode warning", () => {
      mockUseSound.fallbackMode = true;

      render(<AudioDebug />);

      expect(screen.getByText("Fallback Mode: ⚠️")).toBeInTheDocument();
    });

    it("should display test sound buttons", () => {
      render(<AudioDebug />);

      expect(screen.getByText("MOVE")).toBeInTheDocument();
      expect(screen.getByText("COLLECT DIAMOND")).toBeInTheDocument();
      expect(screen.getByText("BOMB EXPLODE")).toBeInTheDocument();
    });

    it("should display loaded sounds list", () => {
      render(<AudioDebug />);

      expect(screen.getByText("MOVE, COLLECT_DIAMOND")).toBeInTheDocument();
    });

    it("should handle empty loaded sounds", () => {
      mockUseAudioContext.audioManager.state.loadedSounds = new Set();

      render(<AudioDebug />);

      expect(screen.getByText("None")).toBeInTheDocument();
    });
  });

  describe("interaction", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
      mockUseAudioSettings.showDebugPanel = true;
    });

    it("should call playSound when test button is clicked", () => {
      render(<AudioDebug />);

      const moveButton = screen.getByText("MOVE");
      moveButton.click();

      expect(mockUseSound.playSound).toHaveBeenCalledWith("MOVE", {
        volume: 0.5,
      });
    });

    it("should handle sound ID case conversion", () => {
      render(<AudioDebug />);

      const collectButton = screen.getByText("COLLECT DIAMOND");
      collectButton.click();

      expect(mockUseSound.playSound).toHaveBeenCalledWith("COLLECT_DIAMOND", {
        volume: 0.5,
      });
    });
  });

  describe("edge cases", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
      mockUseAudioSettings.showDebugPanel = true;
    });

    it("should handle missing audio manager gracefully", () => {
      mockUseAudioContext.audioManager = null;

      render(<AudioDebug />);

      expect(screen.getByText("Audio Debug Panel")).toBeInTheDocument();
      expect(screen.getByText("Context State: unknown")).toBeInTheDocument();
      expect(screen.getByText("Loaded Sounds: 0")).toBeInTheDocument();
    });

    it("should handle audio manager without state", () => {
      mockUseAudioContext.audioManager = { state: null };

      render(<AudioDebug />);

      expect(screen.getByText("Audio Debug Panel")).toBeInTheDocument();
      expect(screen.getByText("Context State: unknown")).toBeInTheDocument();
    });

    it("should handle audio manager without audioContext", () => {
      mockUseAudioContext.audioManager = {
        state: { loadedSounds: new Set(["MOVE"]) },
      };

      render(<AudioDebug />);

      expect(screen.getByText("Context State: unknown")).toBeInTheDocument();
      expect(screen.getByText("Loaded Sounds: 1")).toBeInTheDocument();
    });
  });
});
