import React from 'react';
import { useAudioSettings } from '../hooks/use-audio-settings';
import { SOUND_CONFIG } from '../config/sound-config';
import './AudioSettings.css';

interface AudioSettingsProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AudioSettings({ isOpen, onClose }: AudioSettingsProps): JSX.Element {
    const {
        isMuted,
        globalVolume,
        categoryVolumes,
        setMuted,
        setGlobalVolume,
        setCategoryVolume,
        resetToDefaults
    } = useAudioSettings();

    const handleGlobalVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(event.target.value);
        setGlobalVolume(volume);
    };

    const handleCategoryVolumeChange = (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(event.target.value);
        setCategoryVolume(category, volume);
    };

    const handleMuteToggle = () => {
        setMuted(!isMuted);
    };

    if (!isOpen) {
        return <></>;
    }

    return (
        <div className="audio-settings-overlay" onClick={onClose}>
            <div className="audio-settings-panel" onClick={(e) => e.stopPropagation()}>
                <div className="audio-settings-header">
                    <h2>Audio Settings</h2>
                    <button className="close-button" onClick={onClose} aria-label="Close">
                        ×
                    </button>
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
                            Mute All Sounds
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
                        {Object.entries(SOUND_CONFIG.categories).map(([categoryKey, category]) => (
                            <div key={categoryKey} className="category-volume">
                                <label htmlFor={`${categoryKey}-volume`}>
                                    {category.name}: {Math.round((categoryVolumes[categoryKey] ?? 1) * 100)}%
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
                        ))}
                    </div>

                    {/* Reset Button */}
                    <div className="setting-group">
                        <button 
                            className="reset-button"
                            onClick={resetToDefaults}
                        >
                            Reset to Defaults
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}