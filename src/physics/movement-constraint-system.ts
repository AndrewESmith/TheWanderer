import type { BoulderStateManager, MovementConstraint } from './boulder-state-manager';
import { hasMovingBoulders, createMovementConstraint } from './boulder-state-manager';

// Movement constraint system interface
export interface MovementConstraintSystem {
    shouldBlockPlayerMovement(boulderStateManager: BoulderStateManager): boolean;
    updateMovementConstraints(boulderStateManager: BoulderStateManager): MovementConstraint;
    getConstraintReason(boulderStateManager: BoulderStateManager): string;
}

// Pure function to check if player movement should be blocked
export function shouldBlockPlayerMovement(boulderStateManager: BoulderStateManager): boolean {
    return hasMovingBoulders(boulderStateManager);
}

// Pure function to update movement constraints based on boulder states
export function updateMovementConstraints(
    boulderStateManager: BoulderStateManager
): MovementConstraint {
    return createMovementConstraint(boulderStateManager);
}

// Pure function to get human-readable constraint reason
export function getConstraintReason(boulderStateManager: BoulderStateManager): string {
    if (hasMovingBoulders(boulderStateManager)) {
        const movingCount = boulderStateManager.movingBoulderCount;
        return movingCount === 1
            ? 'A boulder is currently moving'
            : `${movingCount} boulders are currently moving`;
    }
    return 'No movement constraints active';
}

// Pure function to check if any boulders are currently in motion
export function hasBouldersInMotion(boulderStateManager: BoulderStateManager): boolean {
    return hasMovingBoulders(boulderStateManager);
}

// Pure function to get count of moving boulders
export function getMovingBoulderCount(boulderStateManager: BoulderStateManager): number {
    return boulderStateManager.movingBoulderCount;
}

// Pure function to validate movement constraint state
export function validateConstraintState(constraint: MovementConstraint): boolean {
    // Ensure constraint state is consistent
    if (constraint.isPlayerMovementBlocked && constraint.blockingReason === 'none') {
        return false;
    }
    if (!constraint.isPlayerMovementBlocked && constraint.blockingReason !== 'none') {
        return false;
    }
    return true;
}

// Pure function to create movement constraint system factory
export function createMovementConstraintSystem(): MovementConstraintSystem {
    return {
        shouldBlockPlayerMovement,
        updateMovementConstraints,
        getConstraintReason,
    };
}

// Enhanced constraint with additional metadata
export interface EnhancedMovementConstraint extends MovementConstraint {
    movingBoulderCount: number;
    constraintReason: string;
    isValid: boolean;
}

// Pure function to create enhanced movement constraint
export function createEnhancedMovementConstraint(
    boulderStateManager: BoulderStateManager
): EnhancedMovementConstraint {
    const baseConstraint = updateMovementConstraints(boulderStateManager);

    return {
        ...baseConstraint,
        movingBoulderCount: getMovingBoulderCount(boulderStateManager),
        constraintReason: getConstraintReason(boulderStateManager),
        isValid: validateConstraintState(baseConstraint),
    };
}

// Pure function to check if movement is allowed
export function isMovementAllowed(boulderStateManager: BoulderStateManager): boolean {
    return !shouldBlockPlayerMovement(boulderStateManager);
}

// Pure function to get movement status information
export function getMovementStatus(boulderStateManager: BoulderStateManager): {
    isAllowed: boolean;
    reason: string;
    movingBoulderCount: number;
} {
    const isAllowed = isMovementAllowed(boulderStateManager);

    return {
        isAllowed,
        reason: getConstraintReason(boulderStateManager),
        movingBoulderCount: getMovingBoulderCount(boulderStateManager),
    };
}