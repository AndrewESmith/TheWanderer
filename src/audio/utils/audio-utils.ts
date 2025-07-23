// Audio utility functions for browser compatibility and format detection

export function isWebAudioSupported(): boolean {
    return !!(window.AudioContext || (window as any).webkitAudioContext);
}

export function isHTML5AudioSupported(): boolean {
    return !!window.Audio;
}

export function getSupportedAudioFormat(formats: string[]): string | null {
    if (!isHTML5AudioSupported()) {
        return null;
    }

    const audio = new Audio();

    for (const format of formats) {
        const mimeType = getMimeTypeFromExtension(format);
        if (mimeType && audio.canPlayType(mimeType)) {
            return format;
        }
    }

    return null;
}

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
        default:
            return null;
    }
}

export function createAudioContext(): AudioContext | null {
    try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        return new AudioContextClass();
    } catch (error) {
        console.warn('Failed to create AudioContext:', error);
        return null;
    }
}