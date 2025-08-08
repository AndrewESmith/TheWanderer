import React, { useEffect, useCallback } from "react";
import { useHowToPlaySettings } from "../../hooks/use-how-to-play-settings";
import { HowToPlayContent } from "./HowToPlayContent";
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

  // Handle escape key press to close popup
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  // Add/remove escape key listener when popup opens/closes
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Mark as viewed when popup is opened
      markAsViewed();
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
    <div className="how-to-play-overlay" onClick={handleOverlayClick}>
      <div className="how-to-play-panel" onClick={handlePanelClick}>
        <div className="how-to-play-header">
          <h2>How to Play The Wanderer</h2>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close How to Play"
          >
            ×
          </button>
        </div>

        <div className="how-to-play-content">
          <HowToPlayContent className="popup-content" />
        </div>

        <div className="how-to-play-footer">
          <label className="dont-show-again-toggle">
            <input
              type="checkbox"
              checked={settings.dontShowAgain}
              onChange={handleDontShowAgainChange}
            />
            <span className="checkbox-custom"></span>
            <span className="checkbox-label">Don't show again</span>
          </label>
          <button className="close-footer-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
