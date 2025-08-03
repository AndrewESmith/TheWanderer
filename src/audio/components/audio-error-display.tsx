import { useAudioContext } from '../context/audio-context';
import { useSound } from '../hooks/use-sound';

interface AudioErrorDisplayProps {
    showAlways?: boolean;
}

/**
 * Component to display audio errors and fallback status to the user
 * Provides options to retry audio initialization or continue in fallback mode
 */
export function AudioErrorDisplay({ showAlways = false }: AudioErrorDisplayProps) {
    const { error, fallbackMode, autoplayAllowed, reinitializeAudio } = useAudioContext();
    const { resetAudioSystem, hasPlaybackErrors } = useSound();
    const [dismissed, setDismissed] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
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

    // Reset dismissed state when errors change
    useEffect(() => {
        if (error || (fallbackMode && !dismissed)) {
            setDismissed(false);
        }
    }, [error, fallbackMode]);

    // Don't show anything on mobile devices
    if (isMobile) {
        return null;
    }

    // Don't show anything if no errors and not in fallback mode (unless showAlways is true)
    if (!showAlways && !error && (!fallbackMode || dismissed) && !hasPlaybackErrors && autoplayAllowed) {
        return null;
    }

    // Don't show if explicitly dismissed
    if (dismissed && !showAlways) {
        return null;
    }

    const handleRetry = async () => {
        await resetAudioSystem();
        setDismissed(false);
    };

    const handleDismiss = () => {
        setDismissed(true);
        setShowHelp(false);
    };

    return (
        <div className="audio-error-container" style={{
            padding: '10px',
            margin: '10px 0',
            backgroundColor: error ? '#fff0f0' : fallbackMode ? '#fffaf0' : '#f0f8ff',
            border: `1px solid ${error ? '#ffcccc' : fallbackMode ? '#ffe0b2' : '#b3e0ff'}`,
            borderRadius: '4px',
            fontSize: '14px'
        }}>
            {error && (
                <div className="audio-error">
                    <p style={{ fontWeight: 'bold', color: '#d32f2f' }}>
                        Audio Error: {error}
                    </p>
                    <p>
                        The game will continue to work, but sound effects may be limited or unavailable.
                    </p>
                </div>
            )}

            {fallbackMode && !error && (
                <div className="audio-fallback">
                    <p style={{ fontWeight: 'bold', color: '#ed6c02' }}>
                        Audio Fallback Mode Active
                    </p>
                    <p>
                        Your browser has limited audio support. The game is using a simplified audio system.
                    </p>
                </div>
            )}

            {!autoplayAllowed && !error && !fallbackMode && (
                <div className="audio-autoplay">
                    <p style={{ fontWeight: 'bold', color: '#0288d1' }}>
                        Audio Interaction Required
                    </p>
                    <p>
                        Click anywhere on the game to enable sound effects.
                    </p>
                </div>
            )}

            {hasPlaybackErrors && !error && !fallbackMode && (
                <div className="audio-playback-errors">
                    <p style={{ fontWeight: 'bold', color: '#ed6c02' }}>
                        Some sound effects failed to play
                    </p>
                </div>
            )}

            <div className="audio-error-actions" style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '10px'
            }}>
                <div>
                    <button
                        onClick={handleRetry}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#2196f3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                    >
                        Retry Audio
                    </button>
                    <button
                        onClick={() => setShowHelp(!showHelp)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#f5f5f5',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        {showHelp ? 'Hide Help' : 'Audio Help'}
                    </button>
                </div>
                <button
                    onClick={handleDismiss}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}
                >
                    Dismiss
                </button>
            </div>

            {showHelp && (
                <div className="audio-help" style={{
                    marginTop: '15px',
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px'
                }}>
                    <h4 style={{ margin: '0 0 10px 0' }}>Audio Troubleshooting</h4>
                    <ul style={{ paddingLeft: '20px', margin: '0' }}>
                        <li>Make sure your device volume is turned up</li>
                        <li>Check if your browser allows autoplay (Settings &gt; Site Settings &gt; Sound)</li>
                        <li>Try using a different browser (Chrome or Firefox recommended)</li>
                        <li>Click the "Retry Audio" button after changing settings</li>
                        <li>Use the keyboard shortcut Ctrl+M (or Cmd+M on Mac) to toggle mute</li>
                    </ul>
                </div>
            )}
        </div>
    );
}