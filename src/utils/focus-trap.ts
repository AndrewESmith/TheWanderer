/**
 * Focus trap utility for modal components
 * Ensures keyboard navigation stays within the modal when it's open
 */

/**
 * Gets all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
    const focusableSelectors = [
        'button:not([disabled]):not([aria-hidden="true"])',
        'input:not([disabled]):not([aria-hidden="true"])',
        'select:not([disabled]):not([aria-hidden="true"])',
        'textarea:not([disabled]):not([aria-hidden="true"])',
        'a[href]:not([aria-hidden="true"])',
        '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
        '[contenteditable="true"]:not([aria-hidden="true"])',
        'summary:not([disabled]):not([aria-hidden="true"])',
        'details:not([disabled]):not([aria-hidden="true"])',
        'audio[controls]:not([disabled]):not([aria-hidden="true"])',
        'video[controls]:not([disabled]):not([aria-hidden="true"])'
    ].join(', ');

    const elements = Array.from(container.querySelectorAll(focusableSelectors)) as HTMLElement[];

    // Filter out elements that are not visible or have display: none
    return elements.filter(element => {
        const style = window.getComputedStyle(element);
        return style.display !== 'none' &&
            style.visibility !== 'hidden' &&
            element.offsetWidth > 0 &&
            element.offsetHeight > 0 &&
            !element.hasAttribute('inert');
    });
}

/**
 * Creates a focus trap for a modal element
 * Returns cleanup function to remove the trap
 */
export function createFocusTrap(modalElement: HTMLElement): () => void {
    // Store the element that was focused before opening the modal
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    // Function to get current focusable elements (refreshed on each call)
    const getCurrentFocusableElements = () => getFocusableElements(modalElement);

    // Focus the first focusable element when trap is created
    const initialFocusableElements = getCurrentFocusableElements();
    const initialFirstFocusable = initialFocusableElements[0];

    if (initialFirstFocusable) {
        // Use setTimeout to ensure the modal is fully rendered before focusing
        setTimeout(() => {
            initialFirstFocusable.focus();
        }, 0);
    } else {
        // If no focusable elements, focus the modal container itself
        modalElement.focus();
    }

    const handleTabKey = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        // Get current focusable elements (in case DOM has changed)
        const focusableElements = getCurrentFocusableElements();

        // If no focusable elements, prevent tabbing and focus modal container
        if (focusableElements.length === 0) {
            event.preventDefault();
            modalElement.focus();
            return;
        }

        // If only one focusable element, keep focus on it
        if (focusableElements.length === 1) {
            event.preventDefault();
            focusableElements[0]!.focus();
            return;
        }

        // From here on, we have at least two focusable elements
        const firstFocusable = focusableElements[0]!;
        const lastFocusable = focusableElements[focusableElements.length - 1]!;

        // Handle tab navigation within the modal
        if (event.shiftKey) {
            // Shift + Tab: moving backwards
            if (document.activeElement === firstFocusable || document.activeElement === modalElement) {
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

    // Handle focus events to ensure focus stays within modal
    const handleFocusIn = (event: FocusEvent) => {
        const target = event.target as HTMLElement;

        // If focus moves outside the modal, bring it back
        if (!modalElement.contains(target)) {
            event.preventDefault();
            const focusableElements = getCurrentFocusableElements();
            const firstFocusable = focusableElements[0];

            if (firstFocusable) {
                firstFocusable.focus();
            } else {
                modalElement.focus();
            }
        }
    };

    // Add event listeners
    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('focusin', handleFocusIn);

    // Return cleanup function
    return () => {
        document.removeEventListener('keydown', handleTabKey);
        document.removeEventListener('focusin', handleFocusIn);

        // Restore focus to previously focused element
        if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
            // Use setTimeout to ensure modal is fully closed before restoring focus
            setTimeout(() => {
                previouslyFocusedElement.focus();
            }, 0);
        }
    };
}