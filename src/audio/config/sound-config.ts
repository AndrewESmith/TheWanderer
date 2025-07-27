import type { SoundAsset, SoundConfiguration } from '../../Interfaces/ISoundAsset';

// Individual sound asset definitions
export const SOUND_ASSETS: Record<string, SoundAsset> = {
    // Player movement sounds
    PLAYER_WALK: {
        id: 'player_walk',
        src: ['/sounds/player/walk.mp3'],
        volume: 0.6,
        loop: false,
        preload: true
    },
    PLAYER_DIG: {
        id: 'player_dig',
        src: ['/sounds/player/dig.mp3'],
        volume: 0.7,
        loop: false,
        preload: true
    },

    // Boulder movement sounds
    BOULDER_MOVE: {
        id: 'boulder_move',
        src: ['/sounds/boulder/Whoosh.mp3'], // Note: capital W in filename
        volume: 0.8,
        loop: false,
        preload: true
    },

    // Arrow movement sounds
    ARROW_MOVE: {
        id: 'arrow_move',
        src: ['/sounds/arrow/twang.mp3'],
        volume: 0.7,
        loop: false,
        preload: true
    },

    // Collision sounds
    COLLISION_THUD: {
        id: 'collision_thud',
        src: ['/sounds/arrow/thud.mp3'], // Using existing thud.mp3 from arrow folder
        volume: 0.8,
        loop: false,
        preload: true
    },

    // Game state sounds
    DEATH_SOUND: {
        id: 'death_sound',
        src: ['/sounds/player/death.mp3'], // Using existing death.mp3
        volume: 0.9,
        loop: false,
        preload: true
    },
    VICTORY_SOUND: {
        id: 'victory_sound',
        src: ['/sounds/environment/door-slam.mp3'], // Using existing file as placeholder
        volume: 0.8,
        loop: false,
        preload: true
    },
    DOOR_SLAM: {
        id: 'door_slam',
        src: ['/sounds/environment/door-slam.mp3'],
        volume: 0.8,
        loop: false,
        preload: true
    },
    DIAMOND_COLLECT: {
        id: 'diamond_collect',
        src: ['/sounds/diamond/collect.mp3'], // replaced placeholder with collect.mp3
        volume: 0.7,
        loop: false,
        preload: true
    }
};

// Sound configuration organized by categories
export const SOUND_CONFIG: SoundConfiguration = {
    categories: {
        movement: {
            name: 'Movement',
            volume: 0.8,
            sounds: {
                PLAYER_WALK: SOUND_ASSETS['PLAYER_WALK']!,
                PLAYER_DIG: SOUND_ASSETS['PLAYER_DIG']!,
                BOULDER_MOVE: SOUND_ASSETS['BOULDER_MOVE']!,
                ARROW_MOVE: SOUND_ASSETS['ARROW_MOVE']!
            }
        },
        collision: {
            name: 'Collision',
            volume: 0.9,
            sounds: {
                COLLISION_THUD: SOUND_ASSETS['COLLISION_THUD']!
            }
        },
        gameState: {
            name: 'Game State',
            volume: 1.0,
            sounds: {
                DEATH_SOUND: SOUND_ASSETS['DEATH_SOUND']!,
                VICTORY_SOUND: SOUND_ASSETS['VICTORY_SOUND']!,
                DOOR_SLAM: SOUND_ASSETS['DOOR_SLAM']!,
                DIAMOND_COLLECT: SOUND_ASSETS['DIAMOND_COLLECT']!
            }
        }
    },
    globalVolume: 0.8,
    enabledByDefault: true
};

// Sound ID constants for easy reference
export const SOUND_IDS = {
    PLAYER_WALK: 'player_walk',
    PLAYER_DIG: 'player_dig',
    BOULDER_MOVE: 'boulder_move',
    ARROW_MOVE: 'arrow_move',
    COLLISION_THUD: 'collision_thud',
    DEATH_SOUND: 'death_sound',
    VICTORY_SOUND: 'victory_sound',
    DOOR_SLAM: 'door_slam',
    DIAMOND_COLLECT: 'diamond_collect'
} as const;

export type SoundId = typeof SOUND_IDS[keyof typeof SOUND_IDS];