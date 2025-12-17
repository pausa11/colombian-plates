import { PlateType } from './types';

export const PATTERNS: Record<string, RegExp> = {
    // CAR (Private/Public): 3 letters, 3 numbers
    [PlateType.PARTICULAR]: /^[A-Z]{3}\d{3}$/,
    [PlateType.PUBLICO]: /^[A-Z]{3}\d{3}$/, // Same pattern, often distinguished by registry but format is identical

    // MOTO: 3 letters, 2 numbers, 1 letter
    [PlateType.MOTO]: /^[A-Z]{3}\d{2}[A-Z]$/,

    // DIPLOMATICO: 2 letters, 4 numbers
    [PlateType.DIPLOMATICO]: /^[A-Z]{2}\d{4}$/,

    // REMOLQUE: R or S followed by 5 numbers
    [PlateType.REMOLQUE]: /^[R|S]\d{5}$/,
};

// Consolidated Regex for any valid plate
// We will iterate through patterns to match
