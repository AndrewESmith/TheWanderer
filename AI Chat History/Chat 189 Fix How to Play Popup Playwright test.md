383 | aw...

New Session





Error: expect.toBeVisible: Error: strict mode violation: locator('button:has-text("Close")') resolved to 2 elements:     1) <button type="button" class="close-button" title="Close (Escape key)" data-testid="close-button" aria-label="Close dialog using X button">…</button> aka getByTestId('close-button')     2) <button type="button" class="close-footer-button" aria-label="Close How to Play dialog and return to game">Close</button> aka getByRole('button', { name: 'Close How to Play dialog and' })

Call log:  - Expect "toBeVisible" with timeout 5000ms  - waiting for locator('button:has-text("Close")')    at src\playwrighttests\how-to-play-popup.spec.ts:171:36

Kiro
Including Steering Documents

typescript-standards.md
I can see you're dealing with a Playwright test failure due to a strict mode violation. The test is finding 2 elements that match the selector button:has-text("Close") when it expects only one. Let me examine the test file and the component to understand the issue.

Read file(s)

how-to-play-popup.spec.ts
Now let me check the HowToPlayPopup component to see the structure and understand why there are two "Close" buttons:

Read file(s)

HowToPlayPopup.tsx
Now I can see the issue clearly. The test is using button:has-text("Close") which matches both:

The X button in the header (which has "Close dialog" in a sr-only span)
The "Close" button in the footer
The error shows that line 171 is failing. Looking at the test, I can see that the problematic line is in the test that's trying to click the footer close button. The selector button:has-text("Close") is ambiguous because both buttons contain the text "Close".

Let me fix this by making the selectors more specific:


6 edits to file

how-to-play-popup.spec.ts


Perfect! I've fixed the Playwright test by replacing all instances of the ambiguous button:has-text("Close") selector with the more specific button.close-footer-button selector. This targets the footer close button specifically using its CSS class, which eliminates the strict mode violation.

The issue was that Playwright's strict mode detected two elements matching button:has-text("Close"):

The X button in the header (which contains "Close dialog" text in a screen reader span)
The "Close" button in the footer
By using the specific CSS class selector button.close-footer-button, we now target exactly the footer button we want to test, making the tests more reliable and eliminating the ambiguity.

The changes I made:

Updated the footer close button test to use button.close-footer-button
Fixed all other test cases that were using the ambiguous selector
Maintained the existing test for the X button which already used the correct specific selector button[aria-label="Close dialog using X button"]
This should resolve the strict mode violation and make your tests pass reliably.


6 changes accepted
(
View all
)
Revert


how-to-play-popup.spec.ts






Claude Sonnet 4.0
Autopilot
