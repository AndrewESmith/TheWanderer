import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AudioSettings } from "../../../audio/components/AudioSettings";

// Mock the useAudioSettings hook
const mockUseAudioSettings = {
  isMuted: false,
  globalVolume: 0.8,
  categoryVolumes: {
    movement: 0.7,
    collision: 0.9,
    gameState: 0.6,
  },
  showDebugPanel: false,
  setMuted: vi.fn(),
  setGlobalVolume: vi.fn(),
  setCategoryVolume: vi.fn(),
  setShowDebugPanel: vi.fn(),
  resetToDefaults: vi.fn(),
};

vi.mock("../../../audio/hooks/use-audio-settings", () => ({
  useAudioSettings: () => mockUseAudioSettings,
}));

// Mock the sound config
vi.mock("../../../audio/config/sound-config", () => ({
  SOUND_CONFIG: {
    categories: {
      movement: { name: "Movement", volume: 0.8 },
      collision: { name: "Collision", volume: 1.0 },
      gameState: { name: "Game State", volume: 0.7 },
    },
  },
}));

// Mock CSS import
vi.mock("../../../audio/components/AudioSettings.css", () => ({}));

// Mock process.env.NODE_ENV
const originalEnv = process.env.NODE_ENV;

describe("AudioSettings Component", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mock values
    mockUseAudioSettings.isMuted = false;
    mockUseAudioSettings.globalVolume = 0.8;
    mockUseAudioSettings.showDebugPanel = false;
    process.env.NODE_ENV = "development";
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  describe("debug toggle rendering", () => {
    it("should render debug panel toggle in development mode", () => {
      process.env.NODE_ENV = "development";

      render(<AudioSettings {...defaultProps} />);

      expect(screen.getByText("Developer Options")).toBeInTheDocument();
      expect(screen.getByText("Show Audio Debug Panel")).toBeInTheDocument();

      const debugCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });
      expect(debugCheckbox).toBeInTheDocument();
      expect(debugCheckbox).not.toBeChecked();
    });

    it("should not render debug panel toggle in production mode", () => {
      process.env.NODE_ENV = "production";

      render(<AudioSettings {...defaultProps} />);

      expect(screen.queryByText("Developer Options")).not.toBeInTheDocument();
      expect(
        screen.queryByText("Show Audio Debug Panel")
      ).not.toBeInTheDocument();
    });

    it("should show debug toggle as checked when showDebugPanel is true", () => {
      process.env.NODE_ENV = "development";
      mockUseAudioSettings.showDebugPanel = true;

      render(<AudioSettings {...defaultProps} />);

      const debugCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });
      expect(debugCheckbox).toBeChecked();
    });

    it("should show debug toggle as unchecked when showDebugPanel is false", () => {
      process.env.NODE_ENV = "development";
      mockUseAudioSettings.showDebugPanel = false;

      render(<AudioSettings {...defaultProps} />);

      const debugCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });
      expect(debugCheckbox).not.toBeChecked();
    });
  });

  describe("debug toggle interaction", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
    });

    it("should call setShowDebugPanel when debug toggle is clicked", () => {
      mockUseAudioSettings.showDebugPanel = false;

      render(<AudioSettings {...defaultProps} />);

      const debugCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });
      fireEvent.click(debugCheckbox);

      expect(mockUseAudioSettings.setShowDebugPanel).toHaveBeenCalledWith(true);
    });

    it("should call setShowDebugPanel with false when unchecking", () => {
      mockUseAudioSettings.showDebugPanel = true;

      render(<AudioSettings {...defaultProps} />);

      const debugCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });
      fireEvent.click(debugCheckbox);

      expect(mockUseAudioSettings.setShowDebugPanel).toHaveBeenCalledWith(
        false
      );
    });

    it("should toggle debug panel state correctly", () => {
      mockUseAudioSettings.showDebugPanel = false;

      const { rerender } = render(<AudioSettings {...defaultProps} />);

      const debugCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });

      // First click should enable
      fireEvent.click(debugCheckbox);
      expect(mockUseAudioSettings.setShowDebugPanel).toHaveBeenCalledWith(true);

      // Simulate state change
      mockUseAudioSettings.showDebugPanel = true;

      // Re-render with new state
      rerender(<AudioSettings {...defaultProps} />);
      const updatedCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });

      // Second click should disable
      fireEvent.click(updatedCheckbox);
      expect(mockUseAudioSettings.setShowDebugPanel).toHaveBeenCalledWith(
        false
      );
    });
  });

  describe("component visibility", () => {
    it("should not render when isOpen is false", () => {
      const { container } = render(
        <AudioSettings {...defaultProps} isOpen={false} />
      );

      expect(container.firstChild).toBeNull();
    });

    it("should render when isOpen is true", () => {
      render(<AudioSettings {...defaultProps} isOpen={true} />);

      expect(screen.getByText("Audio Settings")).toBeInTheDocument();
    });
  });

  describe("other settings integration", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
    });

    it("should render all audio settings alongside debug toggle", () => {
      render(<AudioSettings {...defaultProps} />);

      // Main settings should be present
      expect(screen.getByText("Mute All Sounds")).toBeInTheDocument();
      expect(screen.getByText(/Master Volume:/)).toBeInTheDocument();
      expect(screen.getByText("Sound Categories")).toBeInTheDocument();
      expect(screen.getByText("Reset to Defaults")).toBeInTheDocument();

      // Debug toggle should also be present
      expect(screen.getByText("Developer Options")).toBeInTheDocument();
      expect(screen.getByText("Show Audio Debug Panel")).toBeInTheDocument();
    });

    it("should call resetToDefaults when reset button is clicked", () => {
      render(<AudioSettings {...defaultProps} />);

      const resetButton = screen.getByText("Reset to Defaults");
      fireEvent.click(resetButton);

      expect(mockUseAudioSettings.resetToDefaults).toHaveBeenCalled();
    });

    it("should handle mute toggle", () => {
      render(<AudioSettings {...defaultProps} />);

      const muteCheckbox = screen.getByRole("checkbox", {
        name: /mute all sounds/i,
      });
      fireEvent.click(muteCheckbox);

      expect(mockUseAudioSettings.setMuted).toHaveBeenCalledWith(true);
    });

    it("should handle global volume changes", () => {
      render(<AudioSettings {...defaultProps} />);

      const volumeSlider = screen.getByLabelText(/Master Volume:/);
      fireEvent.change(volumeSlider, { target: { value: "0.5" } });

      expect(mockUseAudioSettings.setGlobalVolume).toHaveBeenCalledWith(0.5);
    });
  });

  describe("styling and accessibility", () => {
    beforeEach(() => {
      process.env.NODE_ENV = "development";
    });

    it("should have proper toggle slider styling class", () => {
      render(<AudioSettings {...defaultProps} />);

      const debugLabel = screen.getByText("Show Audio Debug Panel");
      const toggleSlider =
        debugLabel.parentElement?.querySelector(".toggle-slider");

      expect(toggleSlider).toBeInTheDocument();
    });

    it("should have proper label association", () => {
      render(<AudioSettings {...defaultProps} />);

      const debugCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });
      expect(debugCheckbox).toBeInTheDocument();
    });

    it("should be grouped under Developer Options", () => {
      render(<AudioSettings {...defaultProps} />);

      const developerOptions = screen.getByText("Developer Options");
      const debugToggle = screen.getByText("Show Audio Debug Panel");

      expect(developerOptions).toBeInTheDocument();
      expect(debugToggle).toBeInTheDocument();

      // Check that they are in the same setting group
      const settingGroup = developerOptions.closest(".setting-group");
      expect(settingGroup).toContainElement(debugToggle);
    });
  });

  describe("edge cases", () => {
    it("should handle undefined showDebugPanel gracefully", () => {
      process.env.NODE_ENV = "development";
      mockUseAudioSettings.showDebugPanel = undefined as any;

      render(<AudioSettings {...defaultProps} />);

      const debugCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });
      expect(debugCheckbox).not.toBeChecked();
    });

    it("should handle null showDebugPanel gracefully", () => {
      process.env.NODE_ENV = "development";
      mockUseAudioSettings.showDebugPanel = null as any;

      render(<AudioSettings {...defaultProps} />);

      const debugCheckbox = screen.getByRole("checkbox", {
        name: /show audio debug panel/i,
      });
      expect(debugCheckbox).not.toBeChecked();
    });
  });
});
