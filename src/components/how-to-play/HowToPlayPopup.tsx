import React, { useEffect, useCallback, useRef } from "react";
import { useHowToPlaySettings } from "../../hooks/use-how-to-play-settings";
import { HowToPlayContent } from "./HowToPlayContent";
import { createFocusTrap } from "../../utils/focus-trap";
import type { HowToPlayPopupProps } from "../../Interfaces/IHowToPlayPopup";
import type { JSX } from "react/jsx-runtime";
import "./HowToPlayPopup.css";

/**
 * Main How to Play popup component that displays game instructions in a modal overlay
 * Follows the AudioSettings pattern for consistent modal behavior and styling
 */
export function HowToPlayPopup({
  isOpen,
  onClose,
}: HowToPlayPopupProps): JSX.Element {
  const { settings, setDontShowAgain, markAsViewed } = useHowToPlaySettings();
  const modalRef = useRef<HTMLDivElement>(null);
  const focusTrapCleanupRef = useRef<(() => void) | null>(null);

  // Handle escape key press to close popup
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  // Add/remove escape key listener and focus trap when popup opens/closes
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Mark as viewed when popup is opened
      markAsViewed();

      // Set up focus trap
      if (modalRef.current) {
        focusTrapCleanupRef.current = createFocusTrap(modalRef.current);
      }

      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);

      // Clean up focus trap
      if (focusTrapCleanupRef.current) {
        focusTrapCleanupRef.current();
        focusTrapCleanupRef.current = null;
      }

      // Restore body scroll
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (focusTrapCleanupRef.current) {
        focusTrapCleanupRef.current();
        focusTrapCleanupRef.current = null;
      }
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown, markAsViewed]);

  // Handle "Don't show again" checkbox change
  const handleDontShowAgainChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDontShowAgain(event.target.checked);
  };

  // Handle overlay click to close popup
  const handleOverlayClick = () => {
    onClose();
  };

  // Prevent popup panel clicks from closing the popup
  const handlePanelClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <div
      className="how-to-play-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-to-play-title"
      aria-describedby="how-to-play-description"
    >
      <div
        className="how-to-play-panel"
        onClick={handlePanelClick}
        ref={modalRef}
        tabIndex={-1}
      >
        <div className="how-to-play-header">
          <h2 id="how-to-play-title">How to Play The Wanderer</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close How to Play dialog"
            title="Close (Escape)"
          >
            ×
          </button>
        </div>

        <div
          className="how-to-play-content"
          id="how-to-play-description"
          role="document"
          aria-label="Game instructions and credits"
        >
          <HowToPlayContent className="popup-content" />
        </div>

        <div
          className="how-to-play-footer"
          role="group"
          aria-label="Dialog actions"
        >
          <label className="dont-show-again-toggle">
            <input
              type="checkbox"
              checked={settings.dontShowAgain}
              onChange={handleDontShowAgainChange}
              aria-describedby="dont-show-again-description"
            />
            <span className="checkbox-custom" aria-hidden="true"></span>
            <span className="checkbox-label">Don't show again</span>
            <span id="dont-show-again-description" className="sr-only">
              Check this box to prevent the How to Play dialog from appearing
              automatically on future visits
            </span>
          </label>
          <button
            className="close-footer-button"
            onClick={onClose}
            aria-label="Close How to Play dialog"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
