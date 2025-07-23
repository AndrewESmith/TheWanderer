export interface SoundAsset {
    id: string;
    src: string[];  // Multiple formats for fallback
    volume: number;
    loop: boolean;
    preload: boolean;
}

export interface SoundCategory {
    name: string;
    volume: number;
    sounds: Record<string, SoundAsset>;
}

export interface SoundConfiguration {
    categories: Record<string, SoundCategory>;
    globalVolume: number;
    enabledByDefault: boolean;
}