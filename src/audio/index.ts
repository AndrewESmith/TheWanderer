// Audio system exports
export * from './config/sound-config';

// Avoid duplicate exports by explicitly selecting symbols
export { WebAudioManager } from './managers/audio-manager';
export { createAudioManager, createSpecificAudioManager } from './managers/audio-manager-factory';
export { HTML5AudioManager } from './managers/html5-audio-manager';
export { SilentAudioManager } from './managers/silent-audio-manager';

export * from './hooks/use-sound';
export * from './hooks/use-audio-settings';
export * from './context/audio-context';
export * from './utils/audio-utils';
export * from './components/audio-error-display';