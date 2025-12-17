import { getPlateType } from '../src/classifier';
import { PlateType } from '../src/types';

describe('getPlateType', () => {
    test('should classify PARTICULAR/PUBLICO', () => {
        expect(getPlateType('ABC123')).toBe(PlateType.PARTICULAR);
    });

    test('should classify MOTO', () => {
        expect(getPlateType('ABC12D')).toBe(PlateType.MOTO);
    });

    test('should classify DIPLOMATICO', () => {
        expect(getPlateType('AA1234')).toBe(PlateType.DIPLOMATICO);
    });

    test('should classify REMOLQUE', () => {
        expect(getPlateType('R12345')).toBe(PlateType.REMOLQUE);
    });

    test('should return null for invalid', () => {
        expect(getPlateType('INVALID')).toBeNull();
        expect(getPlateType('')).toBeNull();
    });
});
