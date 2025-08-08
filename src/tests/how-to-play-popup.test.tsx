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
});
