/**
 * TypeScript interfaces and types for the How to Play popup feature
 * These interfaces define the structure for popup components, settings management,
 * and game instruction content.
 */

/**
 * Props for the main HowToPlayPopup component
 */
export interface HowToPlayPopupProps {
    /** Whether the popup is currently open */
    isOpen: boolean;
    /** Callback function to close the popup */
    onClose: () => void;
    /** Optional flag indicating if popup was opened from settings menu */
    triggeredFromSettings?: boolean;
}

/**
 * Props for the HowToPlayContent component that renders the instruction content
 */
export interface HowToPlayContentProps {
    /** Optional CSS class name for styling */
    className?: string;
}

/**
 * Settings object for managing how-to-play popup preferences
 */
export interface HowToPlaySettings {
    /** Whether user has chosen to not show the popup again */
    dontShowAgain: boolean;
    /** Whether user has seen the instructions at least once */
    hasSeenInstructions: boolean;
}

/**
 * Return type for the useHowToPlaySettings hook
 */
export interface UseHowToPlaySettingsReturn {
    /** Current settings state */
    settings: HowToPlaySettings;
    /** Function to update the "don't show again" preference */
    setDontShowAgain: (value: boolean) => void;
    /** Function to mark instructions as viewed */
    markAsViewed: () => void;
    /** Function to determine if popup should show on app startup */
    shouldShowOnStartup: () => boolean;
}

/**
 * Structure for settings stored in localStorage
 */
export interface StoredHowToPlaySettings {
    /** Whether user has chosen to not show the popup again */
    dontShowAgain: boolean;
    /** Whether user has seen the instructions at least once */
    hasSeenInstructions: boolean;
    /** Optional version tracking for future content updates */
    lastViewedVersion?: string;
}

/**
 * Structure for individual game instruction sections
 */
export interface GameInstruction {
    /** Title of the instruction section */
    title: string;
    /** Content/description of the instruction */
    content: string;
    /** Type categorization of the instruction */
    type: 'objective' | 'controls' | 'mechanics' | 'objects';
}

/**
 * Structure for the credits section content
 */
export interface CreditsSection {
    /** Author name */
    author: string;
    /** Link to author's profile (e.g., LinkedIn) */
    authorLink: string;
    /** List of AI assistance tools used in development */
    aiAssistance: string[];
    /** Description of image sources */
    imageSources: string;
    /** Description of sound sources */
    soundSources: string;
    /** Information about the original Wanderer game */
    originalGame: {
        /** Name of the original game */
        name: string;
        /** Link to original game information */
        link: string;
        /** Original game author name */
        author: string;
        /** Link to original game author's profile */
        authorLink: string;
    };
    /** List of acknowledgements */
    acknowledgements: string[];
}

/**
 * Complete game instructions data structure
 */
export interface GameInstructionsData {
    /** List of instruction sections */
    instructions: GameInstruction[];
    /** Credits information */
    credits: CreditsSection;
}