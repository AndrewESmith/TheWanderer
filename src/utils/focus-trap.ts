/**
 * Focus trap utility for modal components
 * Ensures keyboard navigation stays within the modal when it's open
 */

/**
 * Gets all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
    ].join(', ');

    return Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];
}

/**
 * Creates a focus trap for a modal element
 * Returns cleanup function to remove the trap
 */
export function createFocusTrap(modalElement: HTMLElement): () => void {
    const focusableElements = getFocusableElements(modalElement);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Store the element that was focused before opening the modal
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    // Focus the first focusable element when trap is created
    if (firstFocusable) {
        firstFocusable.focus();
    }

    const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        // If no focusable elements, prevent tabbing
        if (focusableElements.length === 0) {
            event.preventDefault();
            return;
        }

        // If only one focusable element, keep focus on it
        if (focusableElements.length === 1) {
            event.preventDefault();
            firstFocusable.focus();
            return;
        }

        // Handle tab navigation within the modal
        if (event.shiftKey) {
            // Shift + Tab: moving backwards
            if (document.activeElement === firstFocusable) {
                event.preventDefault();
                lastFocusable.focus();
            }
        } else {
            // Tab: moving forwards
            if (document.activeElement === lastFocusable) {
                event.preventDefault();
                firstFocusable.focus();
            }
        }
    };

    // Add event listener for tab key
    document.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
        document.removeEventListener('keydown', handleTabKey);

        // Restore focus to previously focused element
        if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
            previouslyFocusedElement.focus();
        }
    };
}