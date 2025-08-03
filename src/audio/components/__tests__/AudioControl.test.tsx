import { render, screen, fireEvent } from '@testing-library/react';
import { AudioControl } from '../AudioControl';

// Mock the audio settings hook
const mockUseAudioSettings = {
    isMuted: false,
    toggleMute: vi.fn()
};

vi.mock('../../hooks/use-audio-settings', () => ({
    useAudioSettings: () => mockUseAudioSettings
}));

// Mock the AudioSettings component
vi.mock('../AudioSettings', () => ({
    AudioSettings: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
        isOpen ? (
            <div data-testid="audio-settings-modal">
                <button onClick={onClose}>Close Settings</button>
            </div>
        ) : null
    )
}));

describe('AudioControl', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('rendering', () => {
        it('should render mute and settings buttons', () => {
            render(<AudioControl />);
            
            expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            expect(screen.getByLabelText('Open audio settings')).toBeInTheDocument();
        });

        it('should show unmute button when audio is muted', () => {
            mockUseAudioSettings.isMuted = true;
            render(<AudioControl />);
            
            expect(screen.getByLabelText('Unmute audio')).toBeInTheDocument();
            expect(screen.getByTitle('Unmute (Ctrl+M)')).toBeInTheDocument();
        });

        it('should show mute button when audio is not muted', () => {
            mockUseAudioSettings.isMuted = false;
            render(<AudioControl />);
            
            expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            expect(screen.getByTitle('Mute (Ctrl+M)')).toBeInTheDocument();
        });

        it('should apply muted class when audio is muted', () => {
            mockUseAudioSettings.isMuted = true;
            render(<AudioControl />);
            
            const muteButton = screen.getByLabelText('Unmute audio');
            expect(muteButton).toHaveClass('muted');
        });
    });

    describe('mute functionality', () => {
        it('should call toggleMute when mute button is clicked', () => {
            render(<AudioControl />);
            
            const muteButton = screen.getByLabelText('Mute audio');
            fireEvent.click(muteButton);
            
            expect(mockUseAudioSettings.toggleMute).toHaveBeenCalled();
        });

        it('should prevent event propagation when mute button is clicked', () => {
            const parentClickHandler = vi.fn();
            render(
                <div onClick={parentClickHandler}>
                    <AudioControl />
                </div>
            );
            
            const muteButton = screen.getByLabelText('Mute audio');
            fireEvent.click(muteButton);
            
            expect(parentClickHandler).not.toHaveBeenCalled();
        });
    });

    describe('settings modal', () => {
        it('should not show settings modal initially', () => {
            render(<AudioControl />);
            
            expect(screen.queryByTestId('audio-settings-modal')).not.toBeInTheDocument();
        });

        it('should show settings modal when settings button is clicked', () => {
            render(<AudioControl />);
            
            const settingsButton = screen.getByLabelText('Open audio settings');
            fireEvent.click(settingsButton);
            
            expect(screen.getByTestId('audio-settings-modal')).toBeInTheDocument();
        });

        it('should hide settings modal when close is called', () => {
            render(<AudioControl />);
            
            // Open settings
            const settingsButton = screen.getByLabelText('Open audio settings');
            fireEvent.click(settingsButton);
            
            expect(screen.getByTestId('audio-settings-modal')).toBeInTheDocument();
            
            // Close settings
            const closeButton = screen.getByText('Close Settings');
            fireEvent.click(closeButton);
            
            expect(screen.queryByTestId('audio-settings-modal')).not.toBeInTheDocument();
        });

        it('should prevent event propagation when settings button is clicked', () => {
            const parentClickHandler = vi.fn();
            render(
                <div onClick={parentClickHandler}>
                    <AudioControl />
                </div>
            );
            
            const settingsButton = screen.getByLabelText('Open audio settings');
            fireEvent.click(settingsButton);
            
            expect(parentClickHandler).not.toHaveBeenCalled();
        });
    });

    describe('accessibility', () => {
        it('should have proper ARIA labels and titles', () => {
            render(<AudioControl />);
            
            const muteButton = screen.getByLabelText('Mute audio');
            expect(muteButton).toHaveAttribute('title', 'Mute (Ctrl+M)');
            
            const settingsButton = screen.getByLabelText('Open audio settings');
            expect(settingsButton).toHaveAttribute('title', 'Audio Settings');
        });

        it('should update ARIA labels based on mute state', () => {
            // Test unmuted state
            mockUseAudioSettings.isMuted = false;
            const { rerender } = render(<AudioControl />);
            expect(screen.getByLabelText('Mute audio')).toBeInTheDocument();
            
            // Test muted state
            mockUseAudioSettings.isMuted = true;
            rerender(<AudioControl />);
            expect(screen.getByLabelText('Unmute audio')).toBeInTheDocument();
        });
    });
});