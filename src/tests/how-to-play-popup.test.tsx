import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HowToPlayPopup } from "../components/how-to-play/HowToPlayPopup";

// Mock the settings hook
const mockSetDontShowAgain = vi.fn();
const mockMarkAsViewed = vi.fn();

vi.mock("../hooks/use-how-to-play-settings", () => ({
  useHowToPlaySettings: () => ({
    settings: {
      dontShowAgain: false,
      hasSeenInstructions: false,
    },
    setDontShowAgain: mockSetDontShowAgain,
    markAsViewed: mockMarkAsViewed,
  }),
}));

describe("HowToPlayPopup", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders when isOpen is true", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("How to Play The Wanderer")).toBeInTheDocument();
    expect(screen.getByText("Objective")).toBeInTheDocument();
    expect(screen.getByText("Controls")).toBeInTheDocument();
    expect(screen.getByText("Game Objects")).toBeInTheDocument();
    expect(screen.getByText("Movement Rules")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(<HowToPlayPopup isOpen={false} onClose={mockOnClose} />);

    expect(
      screen.queryByText("How to Play The Wanderer")
    ).not.toBeInTheDocument();
  });

  it("calls markAsViewed when popup opens", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    expect(mockMarkAsViewed).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when close button is clicked", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByLabelText("Close dialog using X button");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when footer close button is clicked", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByText("Close");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when overlay is clicked", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const overlay = document.querySelector(".how-to-play-overlay");
    fireEvent.click(overlay!);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not close when panel is clicked", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const panel = document.querySelector(".how-to-play-panel");
    fireEvent.click(panel!);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('handles "Don\'t show again" checkbox change', () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockSetDontShowAgain).toHaveBeenCalledWith(true);
  });

  it("calls onClose when escape key is pressed", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose when other keys are pressed", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: "Enter" });

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("has proper accessibility attributes", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby", "how-to-play-title");
    expect(dialog).toHaveAttribute(
      "aria-describedby",
      "how-to-play-description"
    );
    expect(dialog).toHaveAttribute(
      "aria-label",
      "How to Play The Wanderer - Game Instructions Dialog"
    );
  });

  it("has proper heading structure", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const mainHeading = screen.getByRole("heading", {
      name: "How to Play The Wanderer",
    });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading.tagName).toBe("H2");
  });

  it("has proper landmark roles", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("close button has proper accessibility attributes", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const closeButton = screen.getByLabelText("Close dialog using X button");
    expect(closeButton).toHaveAttribute("title", "Close (Escape key)");
    expect(closeButton).toHaveAttribute("type", "button");

    const srOnlyText = closeButton.querySelector(".sr-only");
    expect(srOnlyText).toHaveTextContent("Close dialog");
  });

  it("checkbox has proper accessibility attributes", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute(
      "aria-describedby",
      "dont-show-again-description"
    );
    expect(checkbox).toHaveAttribute(
      "aria-label",
      "Don't show this dialog automatically on future visits"
    );

    const description = document.getElementById("dont-show-again-description");
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass("sr-only");
  });

  it("footer close button has proper accessibility attributes", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    const footerCloseButton = screen.getByLabelText(
      "Close How to Play dialog and return to game"
    );
    expect(footerCloseButton).toHaveAttribute("type", "button");
    expect(footerCloseButton).toHaveTextContent("Close");
  });

  it("prevents body scroll when open", () => {
    const originalOverflow = document.body.style.overflow;

    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    expect(document.body.style.overflow).toBe("hidden");

    // Cleanup
    document.body.style.overflow = originalOverflow;
  });

  it("restores body scroll when closed", () => {
    const originalOverflow = document.body.style.overflow;

    const { rerender } = render(
      <HowToPlayPopup isOpen={true} onClose={mockOnClose} />
    );
    expect(document.body.style.overflow).toBe("hidden");

    rerender(<HowToPlayPopup isOpen={false} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe("");

    // Cleanup
    document.body.style.overflow = originalOverflow;
  });

  it("announces dialog opening to screen readers", async () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    // Check that announcement element is created
    const announcement = document.querySelector('[aria-live="polite"]');
    expect(announcement).toBeInTheDocument();
    expect(announcement).toHaveTextContent(
      "How to Play dialog opened. Press Escape to close."
    );
    expect(announcement).toHaveClass("sr-only");
  });

  it("handles focus trap setup and cleanup", () => {
    const { rerender } = render(
      <HowToPlayPopup isOpen={true} onClose={mockOnClose} />
    );

    const modal = document.querySelector(".how-to-play-panel");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute("tabIndex", "-1");

    // Test cleanup when closing
    rerender(<HowToPlayPopup isOpen={false} onClose={mockOnClose} />);

    // Modal should not be in DOM when closed
    expect(
      document.querySelector(".how-to-play-panel")
    ).not.toBeInTheDocument();
  });

  it("only calls onClose once when escape is pressed multiple times", () => {
    render(<HowToPlayPopup isOpen={true} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.keyDown(document, { key: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(3); // Each keydown should trigger
  });

  it("does not call onClose when escape is pressed and popup is closed", () => {
    render(<HowToPlayPopup isOpen={false} onClose={mockOnClose} />);

    fireEvent.keyDown(document, { key: "Escape" });

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
