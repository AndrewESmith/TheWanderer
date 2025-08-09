import React from "react";
import { useAudioSettings } from "../hooks/use-audio-settings";
import { SOUND_CONFIG } from "../config/sound-config";
import "./AudioSettings.css";
import type { JSX } from "react/jsx-runtime";

interface AudioSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHowToPlay?: () => void;
}

export function AudioSettings({
  isOpen,
  onClose,
  onOpenHowToPlay,
}: AudioSettingsProps): JSX.Element {
  const {
    isMuted,
    globalVolume,
    categoryVolumes,
    showDebugPanel,
    setMuted,
    setGlobalVolume,
    setCategoryVolume,
    setShowDebugPanel,
    resetToDefaults,
  } = useAudioSettings();

  const handleGlobalVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const volume = parseFloat(event.target.value);
    setGlobalVolume(volume);
  };

  const handleCategoryVolumeChange =
    (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const volume = parseFloat(event.target.value);
      setCategoryVolume(category, volume);
    };

  const handleMuteToggle = () => {
    setMuted(!isMuted);
  };

  const handleDebugPanelToggle = () => {
    setShowDebugPanel(!showDebugPanel);
  };

  const handleHowToPlayClick = () => {
    if (onOpenHowToPlay) {
      onOpenHowToPlay();
      onClose(); // Close settings panel when opening How to Play
    }
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="audio-settings-overlay" onClick={onClose}>
      <div
        className="audio-settings-panel"
        onClick={(e) => e.stopPropagation()}
        data-testid="audio-settings-panel"
      >
        {/* Settings title and close button on same line */}
        <div className="settings-header">
          <h1>Settings</h1>
          <button className="close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        {/* How to Play Button */}
        <div className="how-to-play-section">
          <button
            className="how-to-play-button-top"
            onClick={handleHowToPlayClick}
            disabled={!onOpenHowToPlay}
          >
            How to Play
          </button>
        </div>

        {/* Audio Settings Subtitle */}
        <div className="audio-settings-subtitle">
          <h2>Audio Settings</h2>
        </div>

        <div className="audio-settings-content">
          {/* Mute Toggle */}
          <div className="setting-group">
            <label className="mute-toggle">
              <input
                type="checkbox"
                checked={!!isMuted}
                onChange={handleMuteToggle}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Mute All Sounds</span>
            </label>
            <small>Keyboard shortcut: Ctrl/Cmd + M</small>
          </div>

          {/* Global Volume */}
          <div className="setting-group">
            <label htmlFor="global-volume">
              Master Volume: {Math.round(globalVolume * 100)}%
            </label>
            <input
              id="global-volume"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={globalVolume}
              onChange={handleGlobalVolumeChange}
              disabled={isMuted}
              className="volume-slider"
            />
          </div>

          {/* Category Volumes */}
          <div className="setting-group">
            <h3>Sound Categories</h3>
            {Object.entries(SOUND_CONFIG.categories).map(
              ([categoryKey, category]) => (
                <div key={categoryKey} className="category-volume">
                  <label htmlFor={`${categoryKey}-volume`}>
                    {category.name}:{" "}
                    {Math.round((categoryVolumes[categoryKey] ?? 1) * 100)}%
                  </label>
                  <input
                    id={`${categoryKey}-volume`}
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={categoryVolumes[categoryKey] ?? 1}
                    onChange={handleCategoryVolumeChange(categoryKey)}
                    disabled={isMuted}
                    className="volume-slider"
                  />
                </div>
              )
            )}
          </div>

          {/* Developer Options */}
          {process.env.NODE_ENV === "development" && (
            <div className="setting-group">
              <h3>Developer Options</h3>
              <label className="debug-toggle">
                <input
                  type="checkbox"
                  checked={showDebugPanel}
                  onChange={handleDebugPanelToggle}
                />
                <span className="toggle-slider"></span>
                <span className="toggle-label">Show Audio Debug Panel</span>
              </label>
            </div>
          )}

          {/* Reset Button */}
          <div className="setting-group">
            <button className="reset-button" onClick={resetToDefaults}>
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
