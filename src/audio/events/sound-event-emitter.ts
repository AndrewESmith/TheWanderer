import type { SoundEvent } from '../../Interfaces/ISoundEvent';
import { mapSoundEventToId } from './sound-event-mapper';

// Type for sound event callback
export type SoundEventCallback = (soundId: string, event: SoundEvent) => void;

// Sound event emitter class following functional patterns
export interface SoundEventEmitter {
    emit: (event: SoundEvent) => void;
    emitMultiple: (events: SoundEvent[]) => void;
    setCallback: (callback: SoundEventCallback | null) => void;
}

// Factory function to create sound event emitter
export function createSoundEventEmitter(): SoundEventEmitter {
    let callback: SoundEventCallback | null = null;

    const emit = (event: SoundEvent): void => {
        if (!callback) {
            return;
        }

        try {
            const soundId = mapSoundEventToId(event);
            callback(soundId, event);
        } catch (error) {
            console.error('Failed to emit sound event:', error);
        }
    };

    const emitMultiple = (events: SoundEvent[]): void => {
        events.forEach(emit);
    };

    const setCallback = (newCallback: SoundEventCallback | null): void => {
        callback = newCallback;
    };

    return {
        emit,
        emitMultiple,
        setCallback
    };
}

// Global sound event emitter instance
let globalEmitter: SoundEventEmitter | null = null;

// Function to get or create the global emitter
export function getSoundEventEmitter(): SoundEventEmitter {
    if (!globalEmitter) {
        globalEmitter = createSoundEventEmitter();
    }
    return globalEmitter;
}

// Convenience function to emit sound events
export function emitSoundEvent(event: SoundEvent): void {
    const emitter = getSoundEventEmitter();
    emitter.emit(event);
}

// Convenience function to emit multiple sound events
export function emitSoundEvents(events: SoundEvent[]): void {
    const emitter = getSoundEventEmitter();
    emitter.emitMultiple(events);
}