import React, { useState } from 'react';
import { useAudioSettings } from '../hooks/use-audio-settings';
import { AudioSettings } from './AudioSettings';
import './AudioControl.css';

export function AudioControl(): JSX.Element {
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
                    className={`audio-button mute-button ${isMuted ? 'muted' : ''}`}
                    onClick={handleMuteClick}
                    title={isMuted ? 'Unmute (Ctrl+M)' : 'Mute (Ctrl+M)'}
                    aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>
                <button
                    className="audio-button settings-button"
                    onClick={handleSettingsClick}
                    title="Audio Settings"
                    aria-label="Open audio settings"
                >
                    ⚙️
                </button>
            </div>
            
            <AudioSettings 
                isOpen={showSettings} 
                onClose={handleCloseSettings} 
            />
        </>
    );
}