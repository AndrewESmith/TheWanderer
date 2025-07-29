import React, { useEffect, useState } from "react";
import { useAudioContext } from "../context/audio-context";

interface AudioInitializationProps {
  children: React.ReactNode;
}

export function AudioInitialization({ children }: AudioInitializationProps) {
  const { audioManager, isInitialized, error } = useAudioContext();
  const [showAudioPrompt, setShowAudioPrompt] = useState(false);
  const [audioContextState, setAudioContextState] = useState<string>("unknown");
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 800;
      setIsMobile(isTouch || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Monitor audio context state
  useEffect(() => {
    if (!audioManager) return;

    const checkAudioContextState = () => {
      // Access the internal audio context state
      const manager = audioManager as any;
      if (manager.state?.audioContext) {
        const state = manager.state.audioContext.state;
        setAudioContextState(state);

        // Show prompt if context is suspended and not on mobile
        if (state === "suspended" && isInitialized && !isMobile) {
          setShowAudioPrompt(true);
        } else if (state === "running") {
          setShowAudioPrompt(false);
        }
      }
    };

    // Check initial state
    checkAudioContextState();

    // Listen for audio context state changes
    const handleAudioError = (event: CustomEvent) => {
      const { type } = event.detail;
      if (type === "AUDIO_CONTEXT_SUSPENDED" && !isMobile) {
        setShowAudioPrompt(true);
      } else if (type === "AUDIO_CONTEXT_RESUMED") {
        setShowAudioPrompt(false);
      }
    };

    window.addEventListener("audioError", handleAudioError as EventListener);

    // Periodic check for state changes
    const intervalId = setInterval(checkAudioContextState, 1000);

    return () => {
      window.removeEventListener(
        "audioError",
        handleAudioError as EventListener
      );
      clearInterval(intervalId);
    };
  }, [audioManager, isInitialized, isMobile]);

  const handleEnableAudio = async () => {
    if (!audioManager) return;

    try {
      // Use the new resumeAudioContext method if available
      const manager = audioManager as any;
      if (manager.resumeAudioContext) {
        await manager.resumeAudioContext();
        setShowAudioPrompt(false);
      } else {
        // Fallback to direct access
        if (
          manager.state?.audioContext &&
          manager.state.audioContext.state === "suspended"
        ) {
          await manager.state.audioContext.resume();
          console.log("Audio context resumed successfully");
          setShowAudioPrompt(false);

          // Trigger preload after resume
          if (manager.preloadSoundsAfterResume) {
            await manager.preloadSoundsAfterResume();
          }
        }
      }
    } catch (error) {
      console.error("Failed to enable audio:", error);
    }
  };

  return (
    <>
      {showAudioPrompt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#333",
            color: "white",
            padding: "10px",
            textAlign: "center",
            zIndex: 1000,
            borderBottom: "2px solid #555",
          }}
        >
          <span style={{ marginRight: "10px" }}>
            🔊 Audio is disabled due to browser policy. Click to enable sound
            effects.
          </span>
          <button
            onClick={handleEnableAudio}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "5px 15px",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Enable Audio
          </button>
        </div>
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV === "development" && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            padding: "5px",
            fontSize: "12px",
            zIndex: 999,
          }}
        >
          Audio: {audioContextState} | Init: {isInitialized ? "Yes" : "No"}
          {error && <div style={{ color: "#ff6b6b" }}>Error: {error}</div>}
        </div>
      )}

      {children}
    </>
  );
}
