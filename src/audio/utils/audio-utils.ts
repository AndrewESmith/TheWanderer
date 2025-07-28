// Audio utility functions for browser compatibility and format detection

/**
 * Check if Web Audio API is supported by the browser
 * Performs a more thorough check than just checking for AudioContext existence
 */
export function isWebAudioSupported(): boolean {
    try {
        // Check for AudioContext constructor
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
            return false;
        }

        // Try to create an audio context
        const context = new AudioContextClass();
        if (!context) {
            return false;
        }

        // Check for essential methods
        if (!context.createGain || !context.createBufferSource || !context.createBuffer) {
            context.close();
            return false;
        }

        // Check if we can create and connect nodes
        try {
            const gain = context.createGain();
            const source = context.createBufferSource();
            source.connect(gain);
            gain.connect(context.destination);
            context.close();
            return true;
        } catch (e) {
            context.close();
            return false;
        }
    } catch (e) {
        return false;
    }
}

/**
 * Check if HTML5 Audio is supported by the browser
 * Performs a more thorough check than just checking for Audio constructor
 */
export function isHTML5AudioSupported(): boolean {
    try {
        // Check for Audio constructor
        if (!window.Audio) {
            return false;
        }

        // Try to create an audio element
        const audio = new Audio();

        // Check for essential properties and methods
        if (typeof audio.canPlayType !== 'function') {
            return false;
        }

        // Check if we can set source and control playback
        try {
            audio.volume = 0;
            return true;
        } catch (e) {
            return false;
        }
    } catch (e) {
        return false;
    }
}

/**
 * Get the first supported audio format from a list of formats
 * @param formats List of file extensions (e.g., ['mp3', 'ogg'])
 * @returns The first supported format or null if none are supported
 */
export function getSupportedAudioFormat(formats: string[]): string | null {
    if (!isHTML5AudioSupported()) {
        return null;
    }

    try {
        const audio = new Audio();

        for (const format of formats) {
            const mimeType = getMimeTypeFromExtension(format);
            if (mimeType) {
                const support = audio.canPlayType(mimeType);
                if (support === 'probably' || support === 'maybe') {
                    return format;
                }
            }
        }
    } catch (e) {
        // Format support check failed
    }

    return null;
}

/**
 * Get MIME type from file extension
 * @param filePath File path or extension
 * @returns MIME type or null if unknown extension
 */
function getMimeTypeFromExtension(filePath: string): string | null {
    const extension = filePath.split('.').pop()?.toLowerCase();

    switch (extension) {
        case 'mp3':
            return 'audio/mpeg';
        case 'ogg':
            return 'audio/ogg';
        case 'wav':
            return 'audio/wav';
        case 'm4a':
            return 'audio/mp4';
        case 'aac':
            return 'audio/aac';
        case 'flac':
            return 'audio/flac';
        default:
            return null;
    }
}

/**
 * Create an AudioContext with error handling
 * @returns AudioContext instance or null if creation fails
 */
export function createAudioContext(): AudioContext | null {
    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) {
            return null;
        }

        return new AudioContextClass();
    } catch (error) {
        console.warn('Failed to create AudioContext:', error);
        return null;
    }
}

/**
 * Check if the browser has autoplay restrictions
 * @returns Promise that resolves to true if autoplay is allowed, false otherwise
 */
export async function canAutoplay(): Promise<boolean> {
    try {
        // Create a test audio context
        const audioContext = createAudioContext();
        if (!audioContext) {
            return false;
        }

        // Check initial state
        if (audioContext.state === 'running') {
            audioContext.close();
            return true;
        }

        // Try to resume and see if it works
        try {
            await audioContext.resume();
            const result = audioContext.state === 'running';
            audioContext.close();
            return result;
        } catch (e) {
            audioContext.close();
            return false;
        }
    } catch (e) {
        console.warn('Autoplay check failed:', e);
        return false;
    }
}

/**
 * Detect browser type for browser-specific audio handling
 * @returns Object with browser detection flags
 */
export function detectBrowser(): {
    isSafari: boolean;
    isChrome: boolean;
    isFirefox: boolean;
    isIOS: boolean;
    isMobile: boolean;
} {
    const ua = navigator.userAgent.toLowerCase();

    return {
        isSafari: /^((?!chrome|android).)*safari/i.test(ua),
        isChrome: /chrome/.test(ua) && !/edge|edg/.test(ua),
        isFirefox: /firefox/.test(ua),
        isIOS: /iphone|ipad|ipod/.test(ua) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
        isMobile: /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
    };
}