import { PATTERNS } from './constants';
import { PlateType } from './types';

/**
 * Validates if a given string is a valid Colombian vehicle plate.
 * It normalizes the input (removes non-alphanumeric chars and converts to uppercase) before checking.
 * @param plate The plate string to validate
 * @returns true if valid, false otherwise
 */
export function isValid(plate: string): boolean {
    if (!plate) return false;

    // STRICT CHECK: Only allow alphanumeric, spaces, and hyphens.
    // If it contains anything else (like $, %, etc.), it's invalid.
    if (/[^a-zA-Z0-9\s-]/.test(plate)) {
        return false;
    }

    // Normalize: Remove spaces, hyphens, and convert to uppercase
    const normalized = plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    // Check against all known patterns
    return Object.values(PATTERNS).some((pattern) => pattern.test(normalized));
}

/**
 * Normalizes a plate string (uppercase, no special chars).
 */
export function normalizePlate(plate: string): string {
    return plate.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}
