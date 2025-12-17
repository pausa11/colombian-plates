import React from 'react';
import { PlateType } from '../types';
import { getPlateType } from '../classifier';

export interface PlateProps {
    plate: string;
    type?: PlateType; // Optional override, otherwise inferred
    city?: string; // e.g., "BOGOTA D.C."
    showHoles?: boolean;
    width?: number | string;
    style?: React.CSSProperties;
    className?: string;
}

export const Plate: React.FC<PlateProps> = ({
    plate,
    type,
    city = 'BOGOTA D.C.',
    showHoles = true,
    width = 300,
    style,
    className,
}) => {
    const detectedType = type || getPlateType(plate) || PlateType.PARTICULAR;

    // Colors and styles based on type (future proofing)
    // Standard Particular/Public is Yellow with Black Text.
    // Diplomatic is Blue or Red?
    // Moto is same yellow usually.

    const backgroundColor = '#FFD700'; // Standard Yellow
    const borderColor = '#000000';
    const textColor = '#000000';
    const borderRadius = 10;

    // Aspect ratio for car plates is usually 2:1 (300x150mm approx)
    // We'll use a wrapper with flexbox.

    const displayPlate = plate.toUpperCase();
    // Split logic: usually 3 letters - logo - 3 numbers
    // Or match regex to split visually

    const letters = displayPlate.replace(/[^A-Z]/g, '').slice(0, 3);
    const numbers = displayPlate.replace(/[^0-9]/g, '').slice(0, 3);

    // Simple rendering logic
    // If we can't cleanly split 3/3 (e.g. it's Moto 3-2-1), we just render full string.
    const isStandardCar = /^[A-Z]{3}\d{3}$/.test(displayPlate);

    return (
        <div
            className={className}
            style={{
                width: width,
                aspectRatio: '2 / 1',
                backgroundColor,
                borderRadius,
                border: `4px solid ${borderColor}`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5%',
                boxSizing: 'border-box',
                fontFamily: '"FakeReceipt", "Helvetica Neue", Arial, sans-serif', // Fallback
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                ...style,
            }}
        >
            {/* Top Screws */}
            {showHoles && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 10%' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#333' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#333' }} />
                </div>
            )}

            {/* Main Content */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: typeof width === 'number' ? width * 0.25 : '3rem',
                fontWeight: 'bold',
                letterSpacing: 2,
                color: textColor,
                textShadow: '1px 1px 0px rgba(255,255,255,0.5)'
            }}>
                {isStandardCar ? (
                    <>
                        <span>{letters}</span>
                        <span style={{ margin: '0 10px', fontSize: '0.4em' }}>●</span>
                        <span>{numbers}</span>
                    </>
                ) : (
                    <span>{displayPlate}</span>
                )}
            </div>

            {/* City */}
            <div style={{
                textTransform: 'uppercase',
                fontSize: typeof width === 'number' ? width * 0.08 : '1rem',
                fontWeight: 600,
                color: textColor,
                marginTop: -10
            }}>
                {city}
            </div>

            {/* Bottom Screws */}
            {showHoles && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 10%' }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#333' }} />
                    <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#333' }} />
                </div>
            )}
        </div>
    );
};
