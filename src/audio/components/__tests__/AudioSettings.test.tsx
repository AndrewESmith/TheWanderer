import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AudioSettings } from "../AudioSettings";
import { SOUND_CONFIG } from "../../config/sound-config";

// Mock the audio settings hook
const mockUseAudioSettings = {
  isMuted: false,
  globalVolume: 0.8,
  categoryVolumes: {
    movement: 0.8,
    collision: 0.9,
    gameState: 1.0,
  },
  showDebugPanel: false,
  setMuted: jest.fn(),
  setGlobalVolume: jest.fn(),
  setCategoryVolume: jest.fn(),
  setShowDebugPanel: jest.fn(),
  resetToDefaults: jest.fn(),
};

jest.mock("../../hooks/use-audio-settings", () => ({
  useAudioSettings: () => mockUseAudioSettings,
}));

describe("AudioSettings", () => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should not render when isOpen is false", () => {
      render(<AudioSettings isOpen={false} onClose={jest.fn()} />);

      expect(screen.queryByText("Audio Settings")).not.toBeInTheDocument();
    });

    it("should render when isOpen is true", () => {
      render(<AudioSettings {...defaultProps} />);

      expect(screen.getByText("Audio Settings")).toBeInTheDocument();
      expect(screen.getByText("Mute All Sounds")).toBeInTheDocument();
      expect(screen.getByText("Master Volume: 80%")).toBeInTheDocument();
      expect(screen.getByText("Sound Categories")).toBeInTheDocument();
    });

    it("should render all sound categories", () => {
      render(<AudioSettings {...defaultProps} />);

      Object.entries(SOUND_CONFIG.categories).forEach(([, category]) => {
        expect(screen.getByText(new RegExp(category.name))).toBeInTheDocument();
      });
    });

    it("should show keyboard shortcut hint", () => {
      render(<AudioSettings {...defaultProps} />);

      expect(
        screen.getByText("Keyboard shortcut: Ctrl/Cmd + M")
      ).toBeInTheDocument();
    });
  });

  describe("mute toggle", () => {
    it("should call setMuted when mute toggle is clicked", () => {
      render(<AudioSettings {...defaultProps} />);

      const muteToggle = screen.getByRole("checkbox");
      fireEvent.click(muteToggle);

      expect(mockUseAudioSettings.setMuted).toHaveBeenCalledWith(true);
    });

    it("should show correct mute state", () => {
      mockUseAudioSettings.isMuted = true;
      render(<AudioSettings {...defaultProps} />);

      const muteToggle = screen.getByRole("checkbox");
      expect(muteToggle).toBeChecked();
    });
  });

  describe("volume controls", () => {
    it("should call setGlobalVolume when master volume slider changes", () => {
      render(<AudioSettings {...defaultProps} />);

      const globalVolumeSlider = screen.getByLabelText(/Master Volume/);
      fireEvent.change(globalVolumeSlider, { target: { value: "0.6" } });

      expect(mockUseAudioSettings.setGlobalVolume).toHaveBeenCalledWith(0.6);
    });

    it("should call setCategoryVolume when category volume slider changes", () => {
      render(<AudioSettings {...defaultProps} />);

      const movementSlider = screen.getByLabelText(/Movement/);
      fireEvent.change(movementSlider, { target: { value: "0.5" } });

      expect(mockUseAudioSettings.setCategoryVolume).toHaveBeenCalledWith(
        "movement",
        0.5
      );
    });

    it("should disable volume controls when muted", () => {
      mockUseAudioSettings.isMuted = true;
      render(<AudioSettings {...defaultProps} />);

      const globalVolumeSlider = screen.getByLabelText(/Master Volume/);
      expect(globalVolumeSlider).toBeDisabled();

      const movementSlider = screen.getByLabelText(/Movement/);
      expect(movementSlider).toBeDisabled();
    });

    it("should display correct volume percentages", () => {
      mockUseAudioSettings.globalVolume = 0.75;
      mockUseAudioSettings.categoryVolumes.movement = 0.6;

      render(<AudioSettings {...defaultProps} />);

      expect(screen.getByText("Master Volume: 75%")).toBeInTheDocument();
      expect(screen.getByText(/Movement: 60%/)).toBeInTheDocument();
    });
  });

  describe("reset functionality", () => {
    it("should call resetToDefaults when reset button is clicked", () => {
      render(<AudioSettings {...defaultProps} />);

      const resetButton = screen.getByText("Reset to Defaults");
      fireEvent.click(resetButton);

      expect(mockUseAudioSettings.resetToDefaults).toHaveBeenCalled();
    });
  });

  describe("close functionality", () => {
    it("should call onClose when close button is clicked", () => {
      const onClose = jest.fn();
      render(<AudioSettings isOpen={true} onClose={onClose} />);

      const closeButton = screen.getByLabelText("Close");
      fireEvent.click(closeButton);

      expect(onClose).toHaveBeenCalled();
    });

    it("should call onClose when overlay is clicked", () => {
      const onClose = jest.fn();
      render(<AudioSettings isOpen={true} onClose={onClose} />);

      const overlay = screen
        .getByText("Audio Settings")
        .closest(".audio-settings-overlay");
      fireEvent.click(overlay!);

      expect(onClose).toHaveBeenCalled();
    });

    it("should not call onClose when panel content is clicked", () => {
      const onClose = jest.fn();
      render(<AudioSettings isOpen={true} onClose={onClose} />);

      const panel = screen
        .getByText("Audio Settings")
        .closest(".audio-settings-panel");
      fireEvent.click(panel!);

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("should have proper ARIA labels", () => {
      render(<AudioSettings {...defaultProps} />);

      expect(screen.getByLabelText("Close")).toBeInTheDocument();
      expect(screen.getByLabelText(/Master Volume/)).toBeInTheDocument();
    });

    it("should have proper form labels", () => {
      render(<AudioSettings {...defaultProps} />);

      const globalVolumeSlider = screen.getByLabelText(/Master Volume/);
      expect(globalVolumeSlider).toHaveAttribute("id", "global-volume");

      Object.keys(SOUND_CONFIG.categories).forEach((categoryKey) => {
        const slider = screen.getByLabelText(
          new RegExp(SOUND_CONFIG.categories[categoryKey]!.name)
        );
        expect(slider).toHaveAttribute("id", `${categoryKey}-volume`);
      });
    });
  });
});
