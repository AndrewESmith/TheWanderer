export interface SoundEvent {
    type: 'movement' | 'collision' | 'collection' | 'death' | 'victory' | 'door_slam' | 'bomb_explode';
    source: 'player' | 'boulder' | 'arrow' | 'system';
    priority: 'low' | 'medium' | 'high';
    volume?: number;
}

export interface PlaySoundOptions {
    volume?: number;
    loop?: boolean;
    delay?: number;
}