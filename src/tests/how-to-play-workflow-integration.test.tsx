import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import App from "../App";

// Mock the audio context and related APIs
const mockAudioContext = {
  createGain: vi.fn(() => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
    gain: { value: 1 },
  })),
  createBufferSource: vi.fn(() => ({
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    buffer: null,
  })),
  decodeAudioData: vi.fn(),
  destination: {},
  state: "running",
  resume: vi.fn().mockResolvedValue(undefined),
  suspend: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
};

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

// Mock AudioContext
Object.defineProperty(window, "AudioContext", {
  value: vi.fn(() => mockAudioContext),
});

Object.defineProperty(window, "webkitAudioContext", {
  value: vi.fn(() => mockAudioContext),
});

// Mock fetch for audio files
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  arrayBuffer: vi.fn().mockResolvedValue(new ArrayBuffer(8)),
});

describe("How to Play Popup Workflow Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
    // Reset body overflow style
    document.body.style.overflow = "";
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Clean up body overflow style
    document.body.style.overflow = "";
  });

  describe("Complete first-visit user journey", () => {
    it("should complete full first-visit workflow from app load to popup dismissal", async () => {
      // Requirement 1.1: First-time user sees popup automatically
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      // Step 1: Popup appears automatically for first-time user
      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Step 2: Verify popup content is displayed (Requirement 4.1, 4.2, 4.3, 4.4, 4.5)
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
      expect(screen.getByText(/collect all diamonds/i)).toBeInTheDocument();
      expect(screen.getByText(/WASD keys/i)).toBeInTheDocument();
      expect(screen.getByText(/arrow keys/i)).toBeInTheDocument();
      expect(screen.getByText("Don't show again")).toBeInTheDocument();
      expect(screen.getByText("Close")).toBeInTheDocument();

      // Step 3: Verify interaction blocking (Requirement 1.4)
      expect(document.body.style.overflow).toBe("hidden");

      // Verify mobile controls are disabled if present
      const mobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      mobileButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });

      // Step 4: User checks "Don't show again" (Requirement 2.1)
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      expect(checkbox).not.toBeChecked();
      fireEvent.click(checkbox);
      expect(checkbox).toBeChecked();

      // Step 5: User closes popup (Requirement 2.2)
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      // Step 6: Verify popup is dismissed and preference is saved
      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"dontShowAgain":true')
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"hasSeenInstructions":true')
      );

      // Step 7: Verify interaction is restored
      expect(document.body.style.overflow).toBe("");

      // Verify mobile controls are enabled if present
      const enabledMobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      enabledMobileButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });

    it("should handle first-visit workflow without checking dont show again", async () => {
      // Requirement 2.4: User closes without checking box
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Close without checking the box
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify preference shows user has seen instructions but didn't opt out
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"dontShowAgain":false')
      );
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"hasSeenInstructions":true')
      );
    });

    it("should handle escape key dismissal in first-visit workflow", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Check the checkbox first
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      fireEvent.click(checkbox);

      // Close with escape key
      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify preference is still saved
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"dontShowAgain":true')
      );
    });
  });

  describe("Settings menu integration and popup reopening", () => {
    it("should complete settings menu integration workflow", async () => {
      // Requirement 3.1, 3.2: Settings menu provides access to popup
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: true,
          hasSeenInstructions: true,
        })
      );

      render(<App />);

      // Wait for app to load without popup
      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();

      // Step 1: Open settings menu
      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      // Step 2: Click "How to Play" button in settings
      const howToPlayButton = screen.getByText("How to Play");
      fireEvent.click(howToPlayButton);

      // Step 3: Verify popup opens from settings (Requirement 3.2)
      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Step 4: Verify both settings panel and popup are visible
      // (The settings panel doesn't automatically close when popup opens)
      expect(screen.getByText("Audio Settings")).toBeInTheDocument();
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();

      // Step 5: Verify checkbox shows current preference state (Requirement 3.3)
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      expect(checkbox).toBeChecked(); // Should reflect saved preference

      // Step 6: User can modify preference from settings-opened popup (Requirement 3.4)
      fireEvent.click(checkbox);
      expect(checkbox).not.toBeChecked();

      // Step 7: Close popup and verify preference is updated
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings",
        expect.stringContaining('"dontShowAgain":false')
      );
    });

    it("should handle settings integration when user has never seen popup", async () => {
      // User who has never seen popup accesses it through settings
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      // First dismiss the automatic popup
      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Now access through settings
      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      const howToPlayButton = screen.getByText("How to Play");
      fireEvent.click(howToPlayButton);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Checkbox should be unchecked (default state)
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      expect(checkbox).not.toBeChecked();
    });

    it("should handle multiple settings menu interactions", async () => {
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: false,
          hasSeenInstructions: true,
        })
      );

      render(<App />);

      // Open and close popup multiple times through settings
      for (let i = 0; i < 3; i++) {
        // Open settings
        const settingsButton = screen.getByLabelText("Open audio settings");
        fireEvent.click(settingsButton);

        await waitFor(() => {
          expect(screen.getByText("Settings")).toBeInTheDocument();
        });

        // Open popup
        const howToPlayButton = screen.getByText("How to Play");
        fireEvent.click(howToPlayButton);

        await waitFor(() => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        });

        // Close popup
        const closeButton = screen.getByText("Close");
        fireEvent.click(closeButton);

        await waitFor(() => {
          expect(
            screen.queryByText("How to Play The Wanderer")
          ).not.toBeInTheDocument();
        });
      }

      // Should work consistently each time
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });

  describe("Preference persistence across page refreshes", () => {
    it("should persist dont show again preference across app restarts", async () => {
      // Requirement 2.2, 2.3: Preference persistence

      // First session - user opts out
      mockLocalStorage.getItem.mockReturnValue(null);

      const { unmount } = render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      fireEvent.click(checkbox);

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Capture the saved settings - get the last call to setItem for how-to-play settings
      const howToPlayCalls = mockLocalStorage.setItem.mock.calls.filter(
        (call) => call[0] === "wanderer-how-to-play-settings"
      );
      const savedSettings = howToPlayCalls[howToPlayCalls.length - 1]?.[1];

      unmount();

      // Second session - simulate page refresh
      vi.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue(savedSettings || null);

      render(<App />);

      // Wait to ensure popup doesn't appear
      await new Promise((resolve) => setTimeout(resolve, 1500));

      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();

      // Verify localStorage was checked
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith(
        "wanderer-how-to-play-settings"
      );
    });

    it("should persist show again preference across app restarts", async () => {
      // User who didn't check "don't show again" should see popup on restart

      // First session
      mockLocalStorage.getItem.mockReturnValue(null);

      const { unmount } = render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Close without checking "don't show again"
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      const savedSettings = mockLocalStorage.setItem.mock.calls.find(
        (call) => call[0] === "wanderer-how-to-play-settings"
      )?.[1];

      unmount();

      // Second session
      vi.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue(savedSettings || null);

      render(<App />);

      // Popup should appear again since user didn't opt out
      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should handle settings changes persistence across sessions", async () => {
      // User changes preference through settings menu
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: true,
          hasSeenInstructions: true,
        })
      );

      const { unmount } = render(<App />);

      // Access through settings and change preference
      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      const howToPlayButton = screen.getByText("How to Play");
      fireEvent.click(howToPlayButton);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Change preference to show again
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      fireEvent.click(checkbox); // Uncheck it

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      // Get the LAST call to setItem for how-to-play settings (user's final preference)
      const howToPlayCalls = mockLocalStorage.setItem.mock.calls.filter(
        (call) => call[0] === "wanderer-how-to-play-settings"
      );
      const savedSettings = howToPlayCalls[howToPlayCalls.length - 1]?.[1];

      unmount();

      // New session should show popup due to changed preference
      vi.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue(savedSettings || null);

      render(<App />);

      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it("should handle corrupted localStorage gracefully across sessions", async () => {
      // First session with corrupted data
      mockLocalStorage.getItem.mockReturnValue("invalid-json");

      const { unmount } = render(<App />);

      // Should show popup due to fallback behavior
      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      unmount();

      // Second session should work normally
      vi.clearAllMocks();
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });
  });

  describe("Interaction blocking while popup is displayed", () => {
    it("should block all game interactions when popup is open", async () => {
      // Requirement 1.4: Popup blocks game interaction
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Test keyboard input blocking
      const keyEvents = [
        { key: "ArrowUp" },
        { key: "ArrowDown" },
        { key: "ArrowLeft" },
        { key: "ArrowRight" },
        { key: "w" },
        { key: "W" },
        { key: "a" },
        { key: "A" },
        { key: "s" },
        { key: "S" },
        { key: "d" },
        { key: "D" },
      ];

      keyEvents.forEach((event) => {
        fireEvent.keyDown(document, event);
      });

      // Popup should still be open (input was blocked)
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();

      // Test mobile controls are disabled
      const mobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      mobileButtons.forEach((button) => {
        expect(button).toBeDisabled();

        // Try to click disabled button
        fireEvent.click(button);
      });

      // Popup should still be open
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();

      // Test body scroll is prevented
      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should restore interactions after popup is closed", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Verify interactions are blocked
      expect(document.body.style.overflow).toBe("hidden");

      const mobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      mobileButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });

      // Close popup
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify interactions are restored
      expect(document.body.style.overflow).toBe("");

      const enabledMobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      enabledMobileButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });

      // Test keyboard input works (popup stays closed)
      fireEvent.keyDown(document, { key: "ArrowRight" });

      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();
    });

    it("should handle interaction blocking with settings menu workflow", async () => {
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: true,
          hasSeenInstructions: true,
        })
      );

      render(<App />);

      // Initially no blocking
      expect(document.body.style.overflow).toBe("");

      // Open settings
      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      // Open popup from settings
      const howToPlayButton = screen.getByText("How to Play");
      fireEvent.click(howToPlayButton);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Verify blocking is active
      expect(document.body.style.overflow).toBe("hidden");

      const mobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      mobileButtons.forEach((button) => {
        expect(button).toBeDisabled();
      });

      // Test keyboard blocking
      fireEvent.keyDown(document, { key: "ArrowUp" });
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();

      // Close popup
      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify blocking is removed
      expect(document.body.style.overflow).toBe("");

      const enabledMobileButtons = screen.queryAllByRole("button", {
        name: /Up|Down|Left|Right/,
      });
      enabledMobileButtons.forEach((button) => {
        expect(button).not.toBeDisabled();
      });
    });

    it("should handle escape key properly during interaction blocking", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Verify blocking is active
      expect(document.body.style.overflow).toBe("hidden");

      // Test that escape key works to close popup (not blocked)
      fireEvent.keyDown(document, { key: "Escape" });

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Verify blocking is removed
      expect(document.body.style.overflow).toBe("");

      // Test that escape key doesn't do anything when popup is closed
      fireEvent.keyDown(document, { key: "Escape" });

      // Should remain closed
      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();
    });

    it("should handle focus management during interaction blocking", async () => {
      mockLocalStorage.getItem.mockReturnValue(null);

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      });

      // Verify modal has proper focus management
      const modal = document.querySelector(".how-to-play-panel");
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute("tabIndex", "-1");

      // Verify focusable elements are present
      const closeButtonX = screen.getByLabelText("Close dialog using X button");
      const checkbox = screen.getByRole("checkbox");
      const footerCloseButton = screen.getByText("Close");

      expect(closeButtonX).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
      expect(footerCloseButton).toBeInTheDocument();

      // Test tab navigation within modal
      closeButtonX.focus();
      expect(document.activeElement).toBe(closeButtonX);

      // Close popup
      fireEvent.click(footerCloseButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // Focus should be restored to body or appropriate element
      expect(document.activeElement).toBeTruthy();
    });
  });

  describe("Error handling in workflow integration", () => {
    it("should handle localStorage errors during workflow", async () => {
      // Mock localStorage to throw errors
      mockLocalStorage.getItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });
      mockLocalStorage.setItem.mockImplementation(() => {
        throw new Error("localStorage error");
      });

      render(<App />);

      // Should still show popup (fallback behavior)
      await waitFor(
        () => {
          expect(
            screen.getByText("How to Play The Wanderer")
          ).toBeInTheDocument();
        },
        { timeout: 3000 }
      );

      // Should be able to interact with popup despite storage errors
      const checkbox = screen.getByLabelText(
        "Don't show this dialog automatically on future visits"
      );
      fireEvent.click(checkbox);

      const closeButton = screen.getByText("Close");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(
          screen.queryByText("How to Play The Wanderer")
        ).not.toBeInTheDocument();
      });

      // App should continue to function normally
      expect(document.body.style.overflow).toBe("");
    });

    it("should handle workflow with missing onOpenHowToPlay callback", async () => {
      // This tests the case where AudioControl doesn't have the callback
      mockLocalStorage.getItem.mockReturnValue(
        JSON.stringify({
          dontShowAgain: true,
          hasSeenInstructions: true,
        })
      );

      render(<App />);

      const settingsButton = screen.getByLabelText("Open audio settings");
      fireEvent.click(settingsButton);

      await waitFor(() => {
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });

      // Button should be present but might be disabled if callback is missing
      const howToPlayButton = screen.getByText("How to Play");
      expect(howToPlayButton).toBeInTheDocument();

      // Should not crash when clicked
      fireEvent.click(howToPlayButton);

      // Should either open popup or handle gracefully
      // The actual behavior depends on implementation
    });
  });
});
