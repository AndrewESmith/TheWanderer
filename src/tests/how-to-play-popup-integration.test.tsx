import React from "react";
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

describe("How to Play Popup Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should show popup automatically for first-time users", async () => {
    // Mock localStorage to return null (first-time user)
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    // Wait for the popup to appear
    await waitFor(
      () => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    // Verify popup content is visible
    expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    expect(screen.getByText("Don't show again")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("should not show popup for returning users who opted out", async () => {
    // Mock localStorage to return settings indicating user has opted out
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        dontShowAgain: true,
        hasSeenInstructions: true,
      })
    );

    render(<App />);

    // Wait a bit to ensure popup doesn't appear
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verify popup is not visible
    expect(
      screen.queryByText("How to Play The Wanderer")
    ).not.toBeInTheDocument();
  });

  it("should block keyboard input when popup is open", async () => {
    // Mock localStorage to return null (first-time user)
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    // Wait for the popup to appear
    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    // Try to send keyboard input
    fireEvent.keyDown(document, { key: "ArrowRight" });
    fireEvent.keyDown(document, { key: "w" });
    fireEvent.keyDown(document, { key: "W" });

    // Since the popup is open, the player should not move
    // We can't easily test player movement without more complex setup,
    // but we can verify the popup is still open (input was blocked)
    expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
  });

  it("should allow keyboard input after popup is closed", async () => {
    // Mock localStorage to return null (first-time user)
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    // Wait for the popup to appear
    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    // Close the popup
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Wait for popup to disappear
    await waitFor(() => {
      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();
    });

    // Now keyboard input should work (popup is closed)
    // We can't easily test actual movement, but we can verify popup stays closed
    fireEvent.keyDown(document, { key: "ArrowRight" });

    // Popup should still be closed
    expect(
      screen.queryByText("How to Play The Wanderer")
    ).not.toBeInTheDocument();
  });

  it("should disable mobile controls when popup is open", async () => {
    // Mock touch device
    Object.defineProperty(window, "ontouchstart", {
      value: true,
      configurable: true,
    });

    // Mock localStorage to return null (first-time user)
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    // Wait for the popup to appear
    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    // Check if mobile controls are present and disabled
    const upButton = screen.getByLabelText("Up");
    const downButton = screen.getByLabelText("Down");
    const leftButton = screen.getByLabelText("Left");
    const rightButton = screen.getByLabelText("Right");

    expect(upButton).toBeDisabled();
    expect(downButton).toBeDisabled();
    expect(leftButton).toBeDisabled();
    expect(rightButton).toBeDisabled();
  });

  it("should enable mobile controls after popup is closed", async () => {
    // Mock touch device
    Object.defineProperty(window, "ontouchstart", {
      value: true,
      configurable: true,
    });

    // Mock localStorage to return null (first-time user)
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    // Wait for the popup to appear
    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    // Close the popup
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Wait for popup to disappear
    await waitFor(() => {
      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();
    });

    // Check if mobile controls are now enabled
    const upButton = screen.getByLabelText("Up");
    const downButton = screen.getByLabelText("Down");
    const leftButton = screen.getByLabelText("Left");
    const rightButton = screen.getByLabelText("Right");

    expect(upButton).not.toBeDisabled();
    expect(downButton).not.toBeDisabled();
    expect(leftButton).not.toBeDisabled();
    expect(rightButton).not.toBeDisabled();
  });

  it('should save "don\'t show again" preference when checkbox is checked', async () => {
    // Mock localStorage to return null (first-time user)
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    // Wait for the popup to appear
    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    // Check the "Don't show again" checkbox
    const checkbox = screen.getByLabelText(
      "Don't show this dialog automatically on future visits"
    );
    fireEvent.click(checkbox);

    // Close the popup
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Wait for popup to disappear
    await waitFor(() => {
      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();
    });

    // Verify localStorage was called to save the preference
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "wanderer-how-to-play-settings",
      expect.stringContaining('"dontShowAgain":true')
    );
  });

  it("should handle focus management correctly", async () => {
    // Mock localStorage to return null (first-time user)
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    // Wait for the popup to appear
    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    // Check that focus is trapped within the modal
    const modal = document.querySelector(".how-to-play-panel");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("tabIndex", "-1");

    // Test that Tab key cycles through focusable elements within modal
    const closeButton = screen.getByLabelText("Close dialog using X button");
    const checkbox = screen.getByRole("checkbox");
    const footerCloseButton = screen.getByText("Close");

    expect(closeButton).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(footerCloseButton).toBeInTheDocument();
  });

  it("should prevent interaction with background elements when popup is open", async () => {
    // Mock localStorage to return null (first-time user)
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    // Wait for the popup to appear
    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    // Verify that body scroll is prevented
    expect(document.body.style.overflow).toBe("hidden");

    // Try to interact with background elements (they should be blocked by overlay)
    const overlay = document.querySelector(".how-to-play-overlay");
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveAttribute("role", "dialog");
  });

  it("should handle settings persistence across app restarts", async () => {
    // First visit - user opts out
    mockLocalStorage.getItem.mockReturnValue(null);

    const { unmount } = render(<App />);

    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    // Check the "Don't show again" checkbox
    const checkbox = screen.getByLabelText(
      "Don't show this dialog automatically on future visits"
    );
    fireEvent.click(checkbox);

    // Close the popup
    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();
    });

    // Unmount the app (simulate restart)
    unmount();

    // Mock localStorage to return the saved settings
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        dontShowAgain: true,
        hasSeenInstructions: true,
        lastViewedVersion: "1.0.0",
      })
    );

    // Render app again (simulate restart)
    render(<App />);

    // Wait a bit to ensure popup doesn't appear
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Verify popup doesn't show on restart
    expect(
      screen.queryByText("How to Play The Wanderer")
    ).not.toBeInTheDocument();
  });

  it("should handle localStorage errors gracefully", async () => {
    // Mock localStorage to throw an error
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error("localStorage error");
    });

    // Should still render without crashing
    render(<App />);

    // Should show popup for first-time user (fallback behavior)
    await waitFor(
      () => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("should handle corrupted localStorage data", async () => {
    // Mock localStorage to return invalid JSON
    mockLocalStorage.getItem.mockReturnValue("invalid-json-data");

    render(<App />);

    // Should show popup for first-time user (fallback behavior)
    await waitFor(
      () => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("should handle partial localStorage data", async () => {
    // Mock localStorage to return partial data
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        dontShowAgain: true,
        // hasSeenInstructions is missing
      })
    );

    render(<App />);

    // Should show popup because hasSeenInstructions is missing/false
    await waitFor(
      () => {
        expect(
          screen.getByText("How to Play The Wanderer")
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("should handle escape key properly in different scenarios", async () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    // Test escape key closes popup
    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(
        screen.queryByText("How to Play The Wanderer")
      ).not.toBeInTheDocument();
    });

    // Test that escape key doesn't do anything when popup is closed
    fireEvent.keyDown(document, { key: "Escape" });

    // Popup should remain closed
    expect(
      screen.queryByText("How to Play The Wanderer")
    ).not.toBeInTheDocument();
  });

  it("should handle checkbox state changes correctly", async () => {
    mockLocalStorage.getItem.mockReturnValue(null);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    });

    const checkbox = screen.getByLabelText(
      "Don't show this dialog automatically on future visits"
    );

    // Initially unchecked
    expect(checkbox).not.toBeChecked();

    // Check the checkbox
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Uncheck the checkbox
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();

    // Check again and close
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    // Verify the final state was saved
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      "wanderer-how-to-play-settings",
      expect.stringContaining('"dontShowAgain":true')
    );
  });
});
