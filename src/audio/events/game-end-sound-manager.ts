import type { SoundEvent } from '../../Interfaces/ISoundEvent';
import { emitSoundEvent } from './sound-event-emitter';

// Type for game end callback
export type GameEndSoundCallback = () => void;

// Game end sound manager following functional patterns
export interface GameEndSoundManager {
    handleGameEnd: (gameState: 'dead' | 'won') => void;
    setStopAllSoundsCallback: (callback: GameEndSoundCallback | null) => void;
}

// Factory function to create game end sound manager
export function createGameEndSoundManager(): GameEndSoundManager {
    let stopAllSoundsCallback: GameEndSoundCallback | null = null;

    const handleGameEnd = (gameState: 'dead' | 'won'): void => {
        // Stop all movement sounds first
        if (stopAllSoundsCallback) {
            stopAllSoundsCallback();
        }

        // Then play the appropriate game end sound
        const gameEndEvent: SoundEvent = {
            type: gameState === 'dead' ? 'death' : 'victory',
            source: 'system',
            priority: 'high',
            volume: gameState === 'dead' ? 0.9 : 0.8
        };

        // Small delay to ensure movement sounds are stopped before playing end sound
        setTimeout(() => {
            emitSoundEvent(gameEndEvent);
        }, 50);
    };

    const setStopAllSoundsCallback = (callback: GameEndSoundCallback | null): void => {
        stopAllSoundsCallback = callback;
    };

    return {
        handleGameEnd,
        setStopAllSoundsCallback
    };
}

// Global game end sound manager instance
let globalGameEndManager: GameEndSoundManager | null = null;

// Function to get or create the global game end manager
export function getGameEndSoundManager(): GameEndSoundManager {
    if (!globalGameEndManager) {
        globalGameEndManager = createGameEndSoundManager();
    }
    return globalGameEndManager;
}

// Convenience function to handle game end
export function handleGameEndSounds(gameState: 'dead' | 'won'): void {
    const manager = getGameEndSoundManager();
    manager.handleGameEnd(gameState);
}