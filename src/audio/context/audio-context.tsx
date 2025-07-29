import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { AudioManager } from "../../Interfaces/IAudioManager";
import {
  createAudioManager,
  createSpecificAudioManager,
} from "../managers/audio-manager-factory";
import { canAutoplay } from "../utils/audio-utils";
import { SOUND_CONFIG } from "../config/sound-config";

interface AudioSettings {
  isMuted: boolean;
  globalVolume: number;
  categoryVolumes: Record<string, number>;
  showDebugPanel: boolean;
}

interface AudioContextState {
  audioManager: AudioManager | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;
  fallbackMode: boolean;
  autoplayAllowed: boolean;
  settings: AudioSettings;
}

interface AudioContextValue extends AudioContextState {
  initializeAudio: () => Promise<void>;
  cleanup: () => void;
  reinitializeAudio: () => Promise<void>;
  switchToFallback: (type: "html5" | "silent") => Promise<void>;
  setMuted: (muted: boolean) => void;
  setGlobalVolume: (volume: number) => void;
  setCategoryVolume: (category: string, volume: number) => void;
  toggleMute: () => void;
  resetToDefaults: () => void;
  setShowDebugPanel: (show: boolean) => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

const DEFAULT_SETTINGS: AudioSettings = {
  isMuted: false,
  globalVolume: SOUND_CONFIG.globalVolume,
  categoryVolumes: Object.fromEntries(
    Object.entries(SOUND_CONFIG.categories).map(([key, category]) => [
      key,
      category.volume,
    ])
  ),
  showDebugPanel: false,
};

const STORAGE_KEY = "wanderer-audio-settings";

function loadAudioSettings(): AudioSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new settings and ensure proper types
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        isMuted: Boolean(parsed.isMuted),
        globalVolume:
          Number(parsed.globalVolume) || DEFAULT_SETTINGS.globalVolume,
        categoryVolumes: {
          ...DEFAULT_SETTINGS.categoryVolumes,
          ...parsed.categoryVolumes,
        },
        showDebugPanel: (() => {
          const value = parsed.showDebugPanel;
          if (value === null || value === undefined) return false;
          if (typeof value === "boolean") return value;
          if (typeof value === "string") {
            if (value === "false" || value === "") return false;
            return true; // Any other string is truthy
          }
          if (typeof value === "number") return value !== 0;
          return Boolean(value); // Fallback for other types
        })(),
      };
    }
  } catch (error) {
    console.warn("Failed to load audio settings:", error);
  }
  return DEFAULT_SETTINGS;
}

function saveAudioSettings(settings: AudioSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn("Failed to save audio settings:", error);
  }
}

interface AudioProviderProps {
  children: ReactNode;
  initialManagerType?: "auto" | "web" | "html5" | "silent";
}

export function AudioProvider({
  children,
  initialManagerType = "auto",
}: AudioProviderProps) {
  const [state, setState] = useState<AudioContextState>({
    audioManager: null,
    isInitialized: false,
    isLoading: false,
    error: null,
    fallbackMode: false,
    autoplayAllowed: false,
    settings: loadAudioSettings(),
  });

  // Save settings whenever they change
  useEffect(() => {
    saveAudioSettings(state.settings);
  }, [state.settings]);

  // Sync mute state with audio manager
  useEffect(() => {
    if (state.audioManager) {
      state.audioManager.setMuted(state.settings.isMuted);
    }
  }, [state.audioManager, state.settings.isMuted]);

  // Check if autoplay is allowed
  useEffect(() => {
    const checkAutoplay = async () => {
      const allowed = await canAutoplay();
      setState((prev) => ({ ...prev, autoplayAllowed: allowed }));

      // Autoplay status is now tracked in state
    };

    checkAutoplay();
  }, []);

  // Listen for audio errors
  useEffect(() => {
    const handleAudioError = (event: CustomEvent) => {
      const { type, error } = event.detail;

      // Update error state
      setState((prev) => ({
        ...prev,
        error: `${type}: ${error.message || "Unknown error"}`,
      }));

      // Handle critical errors that require fallback
      if (type === "AUDIO_CONTEXT_ERROR" || type === "INITIALIZATION_FAILED") {
        switchToFallback("html5");
      }
    };

    const handleAudioFallback = (event: CustomEvent) => {
      const { to } = event.detail;

      // Switch to the appropriate fallback
      if (to === "HTML5Audio") {
        switchToFallback("html5");
      } else if (to === "Silent") {
        switchToFallback("silent");
      }
    };

    window.addEventListener("audioError", handleAudioError as EventListener);
    window.addEventListener(
      "audioManagerFallback",
      handleAudioFallback as EventListener
    );

    return () => {
      window.removeEventListener(
        "audioError",
        handleAudioError as EventListener
      );
      window.removeEventListener(
        "audioManagerFallback",
        handleAudioFallback as EventListener
      );
    };
  }, []);

  const initializeAudio = useCallback(async () => {
    if (state.audioManager || state.isLoading) {
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      let manager: AudioManager;

      // Create the appropriate audio manager
      if (initialManagerType === "auto") {
        manager = createAudioManager();
      } else {
        manager = createSpecificAudioManager(initialManagerType);
      }

      // Check if the manager is supported
      if (!manager.isSupported()) {
        // Try HTML5 fallback
        manager = createSpecificAudioManager("html5");

        if (!manager.isSupported()) {
          manager = createSpecificAudioManager("silent");

          setState((prev) => ({
            ...prev,
            fallbackMode: true,
          }));
        }
      }

      // Preload sounds with error handling
      await manager.preloadSounds();

      setState((prev) => ({
        ...prev,
        audioManager: manager,
        isInitialized: true,
        isLoading: false,
        error: null,
        fallbackMode: !manager.isSupported(),
      }));
    } catch (error) {
      console.error("Failed to initialize audio:", error);

      setState((prev) => ({
        ...prev,
        audioManager: null,
        isInitialized: false,
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to initialize audio",
        fallbackMode: false,
      }));
    }
  }, [
    state.audioManager,
    state.isLoading,
    state.autoplayAllowed,
    initialManagerType,
  ]);

  const cleanup = useCallback(() => {
    if (state.audioManager) {
      state.audioManager.cleanup();
      setState((prev) => ({
        ...prev,
        audioManager: null,
        isInitialized: false,
        isLoading: false,
        error: null,
        fallbackMode: false,
      }));
    }
  }, [state.audioManager, state.autoplayAllowed]);

  const reinitializeAudio = useCallback(async () => {
    cleanup();
    await initializeAudio();
  }, [cleanup, initializeAudio]);

  const switchToFallback = useCallback(
    async (type: "html5" | "silent") => {
      if (state.audioManager) {
        // Clean up current manager
        state.audioManager.cleanup();
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const fallbackManager = createSpecificAudioManager(type);

        // Try to preload sounds
        try {
          await fallbackManager.preloadSounds();
        } catch (preloadError) {
          // Preload errors are handled gracefully by the manager
        }

        setState((prev) => ({
          ...prev,
          audioManager: fallbackManager,
          isInitialized: true,
          isLoading: false,
          error: null,
          fallbackMode: true,
          autoplayAllowed: type === "silent" ? false : prev.autoplayAllowed,
        }));

        // Successfully switched to fallback manager
      } catch (error) {
        console.error(`Failed to switch to ${type} fallback:`, error);

        // Last resort: silent mode
        if (type !== "silent") {
          switchToFallback("silent");
        } else {
          // Create silent manager directly as last resort
          const silentManager = createSpecificAudioManager("silent");

          setState((prev) => ({
            ...prev,
            audioManager: silentManager,
            isInitialized: true,
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : `Failed to switch to ${type} fallback`,
            fallbackMode: true,
            autoplayAllowed: false,
          }));
        }
      }
    },
    [state.audioManager, state.autoplayAllowed]
  );

  // Initialize audio on mount
  useEffect(() => {
    initializeAudio();

    // Cleanup on unmount
    return () => {
      cleanup();
    };
  }, [initializeAudio, cleanup]);

  // Settings management functions
  const setMuted = useCallback((muted: boolean) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, isMuted: muted },
    }));
  }, []);

  const toggleMute = useCallback(() => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, isMuted: !prev.settings.isMuted },
    }));
  }, []);

  const setGlobalVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, globalVolume: clampedVolume },
    }));
  }, []);

  const setCategoryVolume = useCallback((category: string, volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setState((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        categoryVolumes: {
          ...prev.settings.categoryVolumes,
          [category]: clampedVolume,
        },
      },
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setState((prev) => ({
      ...prev,
      settings: DEFAULT_SETTINGS,
    }));
  }, []);

  const setShowDebugPanel = useCallback((show: boolean) => {
    setState((prev) => ({
      ...prev,
      settings: { ...prev.settings, showDebugPanel: show },
    }));
  }, []);

  // Set up keyboard shortcut for mute toggle
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + M to toggle mute
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "m") {
        event.preventDefault();
        toggleMute();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleMute]);

  const contextValue: AudioContextValue = {
    ...state,
    initializeAudio,
    cleanup,
    reinitializeAudio,
    switchToFallback,
    setMuted,
    setGlobalVolume,
    setCategoryVolume,
    toggleMute,
    resetToDefaults,
    setShowDebugPanel,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudioContext(): AudioContextValue {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudioContext must be used within an AudioProvider");
  }
  return context;
}
