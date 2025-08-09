import React, { useState } from "react";
import { useAudioSettings } from "../hooks/use-audio-settings";
import { AudioSettings } from "./AudioSettings";
import "./AudioControl.css";

interface AudioControlProps {
  onOpenHowToPlay?: () => void;
}

export function AudioControl({
  onOpenHowToPlay,
}: AudioControlProps = {}): React.ReactElement {
  const { isMuted, toggleMute } = useAudioSettings();
  const [showSettings, setShowSettings] = useState(false);

  const handleMuteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleMute();
  };

  const handleSettingsClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  return (
    <>
      <div className="audio-control">
        <button
          className={`audio-button mute-button ${isMuted ? "muted" : ""}`}
          onClick={handleMuteClick}
          title={isMuted ? "Unmute (Ctrl+M)" : "Mute (Ctrl+M)"}
          aria-label={isMuted ? "Unmute audio" : "Mute audio"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
        <button
          className="audio-button settings-button"
          onClick={handleSettingsClick}
          title="Audio Settings"
          data-testid="settings-button"
          aria-label="Open audio settings"
          aria-expanded={showSettings}
        >
          <span aria-hidden="true">⚙️</span>
        </button>
      </div>

      <AudioSettings
        isOpen={showSettings}
        onClose={handleCloseSettings}
        onOpenHowToPlay={onOpenHowToPlay}
      />
    </>
  );
}
