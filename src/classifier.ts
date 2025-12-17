import { PATTERNS } from './constants';
import { PlateType } from './types';
import { normalizePlate } from './validator';

/**
 * Determines the type of a given Colombian vehicle plate.
 * @param plate The plate string to classify
 * @returns The PlateType or null if not valid/recognized
 */
export function getPlateType(plate: string): PlateType | null {
    if (!plate) return null;

    const normalized = normalizePlate(plate);

    for (const [type, pattern] of Object.entries(PATTERNS)) {
        if (pattern.test(normalized)) {
            // Distinction between PARTICULAR and PUBLICO is context-dependent for same 3x3 format.
            // Usually default to PARTICULAR as the base format, user logic might need to distinguish.
            // However, if we MUST return one, we can return 'PARTICULAR' for standard 3x3.
            // Or maybe we return an array or a generic 'AUTO' type?
            // For now, let's respect the enum. If it matches PARTICULAR regex (which is same as PUBLICO),
            // we return PARTICULAR.
            // Note: Object.entries order is not guaranteed but usually insertion order.
            return type as PlateType;
        }
    }

    return null;
}
