import { useState, useEffect } from "react";
import { useSound } from "../hooks/use-sound";
import { useAudioContext } from "../context/audio-context";
import { useAudioSettings } from "../hooks/use-audio-settings";
import { SOUND_IDS } from "../config/sound-config";

export function AudioDebug() {
  const { playSound, isLoading, error, fallbackMode } = useSound();
  const { audioManager, isInitialized } = useAudioContext();
  const { showDebugPanel } = useAudioSettings();
  const [audioContextState, setAudioContextState] = useState<string>("unknown");
  const [loadedSounds, setLoadedSounds] = useState<string[]>([]);

  useEffect(() => {
    if (!audioManager) return;

    const checkState = () => {
      const manager = audioManager as any;
      if (manager.state?.audioContext) {
        setAudioContextState(manager.state.audioContext.state);
      }
      if (manager.state?.loadedSounds) {
        setLoadedSounds(Array.from(manager.state.loadedSounds));
      }
    };

    checkState();
    const intervalId = setInterval(checkState, 1000);

    return () => clearInterval(intervalId);
  }, [audioManager]);

  const testSound = (soundId: string) => {
    soundId = soundId.toUpperCase();
    console.log(`Testing sound: ${soundId}`);
    playSound(soundId, { volume: 0.5 });
  };

  if (process.env.NODE_ENV !== "development" || !showDebugPanel) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: "rgba(0,0,0,0.9)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        maxWidth: "300px",
        zIndex: 1000,
      }}
    >
      <h3>Audio Debug Panel</h3>

      <div>
        <strong>Status:</strong>
        <ul style={{ margin: "5px 0", paddingLeft: "20px" }}>
          <li>Initialized: {isInitialized ? "✅" : "❌"}</li>
          <li>Loading: {isLoading ? "⏳" : "✅"}</li>
          <li>Fallback Mode: {fallbackMode ? "⚠️" : "✅"}</li>
          <li>Context State: {audioContextState}</li>
          <li>Loaded Sounds: {loadedSounds.length}</li>
        </ul>
      </div>

      {error && (
        <div style={{ color: "#ff6b6b", marginBottom: "10px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <div>
        <strong>Test Sounds:</strong>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
            marginTop: "5px",
          }}
        >
          {Object.values(SOUND_IDS).map((soundId) => (
            <button
              key={soundId}
              onClick={() => testSound(soundId)}
              style={{
                padding: "2px 5px",
                fontSize: "10px",
                backgroundColor: loadedSounds.includes(soundId)
                  ? "#4CAF50"
                  : "#ff6b6b",
                color: "white",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
              title={loadedSounds.includes(soundId) ? "Loaded" : "Not loaded"}
            >
              {soundId.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "10px" }}>
        <strong>Loaded Sounds:</strong>
        <div style={{ fontSize: "10px", color: "#ccc" }}>
          {loadedSounds.length > 0 ? loadedSounds.join(", ") : "None"}
        </div>
      </div>
    </div>
  );
}
