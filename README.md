# Colombian Vehicle Plates Library 🇨🇴

A lightweight, zero-dependency Node.js/TypeScript library to validate, format, and classify Colombian vehicle license plates.

## Features
- **Validation**: Check if a plate is valid (e.g., `ABC123`, `ABC12D`).
- **Classification**: Identify the type of plate (Private, Motorcycle, Diplomatic, Trailer, etc.).
- **Formatting**: Normalizes inputs (handles lower case, spaces, dashes).
- **TypeScript Support**: First-class type definitions included.

## Installation

```bash
npm install colombian-plates
```

## Usage

### Validation

```typescript
import { isValid } from 'colombian-plates';

console.log(isValid('ABC123')); // true
console.log(isValid('ABC-123')); // true
console.log(isValid('ABC12D')); // true (Moto)
console.log(isValid('XYZ')); // false
```

### Classification

```typescript
import { getPlateType, PlateType } from 'colombian-plates';

const type = getPlateType('ABC123');
if (type === PlateType.PARTICULAR) {
    console.log('It is a private car or public vehicle');
} else if (type === PlateType.MOTO) {
    console.log('It is a motorcycle');
}
```

## Supported Plate Types

| Type | Format | Example |
|------|--------|---------|
| PARTICULAR / PUBLICO | 3 Letters, 3 Numbers | `ABC123` |
| MOTO | 3 Letters, 2 Numbers, 1 Letter | `ABC12D` |
| DIPLOMATICO | 2 Letters, 4 Numbers | `CC1234` |
| REMOLQUE | R/S + 5 Numbers | `R12345` |

## License
MIT
