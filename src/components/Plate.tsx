import React, { useState, useRef, useEffect } from 'react';
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

export const Plate: React.FC<PlateProps> = ({ plate, type, city = 'colombia', showHoles = true, width = 300, style, className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [measuredWidth, setMeasuredWidth] = useState<number>(0);

    useEffect(() => {
        if (!containerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentRect.width > 0) {
                    setMeasuredWidth(entry.contentRect.width);
                }
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    const detectedType = type || getPlateType(plate) || PlateType.PARTICULAR;
    const isMoto = detectedType === PlateType.MOTO || detectedType === 'motorcycle' as any;

    let backgroundColor = '#FFD700';

    if (detectedType === PlateType.PUBLICO || detectedType === 'public' as any) {
        backgroundColor = '#FFFFFF';
    } else if (detectedType === PlateType.DIPLOMATICO || detectedType === 'diplomatic' as any) {
        backgroundColor = '#4169E1';
    } else if (detectedType === PlateType.REMOLQUE || detectedType === 'trailer' as any) {
        backgroundColor = '#2E8B57';
    } else if (detectedType === PlateType.MOTO || detectedType === 'motorcycle' as any) {
        backgroundColor = '#FFD700';
    }

    const borderColor = '#000000';
    let textColor = '#000000';

    if (detectedType === PlateType.DIPLOMATICO || detectedType === 'diplomatic' as any ||
        detectedType === PlateType.REMOLQUE || detectedType === 'trailer' as any) {
        textColor = '#FFFFFF';
    }

    // Determine effective width for calculations
    const effectiveWidth = (typeof width === 'number' ? width : measuredWidth) || 300;
    const borderRadius = effectiveWidth * 0.05;

    const displayPlate = plate.toUpperCase();

    const letters = displayPlate.substring(0, 3);
    const numbers = displayPlate.substring(3);

    const isStandardLayout = /^[A-Z]{3}\d{2,3}[A-Z]?$/.test(displayPlate);

    const aspectRatio = '2 / 1';
    const mainFontSize = effectiveWidth * 0.18;
    const cityFontSize = effectiveWidth * 0.06;

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                width: width,
                aspectRatio,
                backgroundColor,
                borderRadius,
                border: `${Math.max(2, effectiveWidth * 0.015)}px solid ${borderColor}`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5% 3%',
                boxSizing: 'border-box',
                fontFamily: '"FakeReceipt", "Helvetica Neue", Arial, sans-serif',
                boxShadow: `0 ${effectiveWidth * 0.015}px ${effectiveWidth * 0.02}px rgba(0,0,0,0.3)`,
                ...style,
            }}
        >
            {showHoles && (
                <div id="top-holes" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 8%' }}>
                    <div style={{ width: effectiveWidth * 0.04, height: effectiveWidth * 0.04, borderRadius: '50%', backgroundColor: '#333' }} />
                    <div style={{ width: effectiveWidth * 0.04, height: effectiveWidth * 0.04, borderRadius: '50%', backgroundColor: '#333' }} />
                </div>
            )}

            <div id="plate-content" style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', fontSize: mainFontSize, fontWeight: 'bold', letterSpacing: effectiveWidth * 0.005, color: textColor, textShadow: `${effectiveWidth * 0.003}px ${effectiveWidth * 0.003}px 0px rgba(255,255,255,0.5)`, overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%', lineHeight: 'normal', paddingTop: 0 }}>
                {isStandardLayout ? (
                    <>
                        <span>{letters}</span>
                        <span style={{ margin: `0 ${effectiveWidth * 0.025}px`, fontSize: '0.4em', alignSelf: 'center' }}></span>
                        <span>{numbers}</span>
                    </>
                ) : (
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '100%' }}>
                        {displayPlate}
                    </span>
                )}
            </div>

            <div id="city-name" style={{ textTransform: 'uppercase', fontSize: cityFontSize, fontWeight: 600, color: textColor, marginTop: isMoto ? 5 : -5, marginBottom: showHoles ? 0 : '2%', maxWidth: '90%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {city}
            </div>

            {showHoles && (
                <div id="bottom-holes" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 8%' }}>
                    <div style={{ width: effectiveWidth * 0.04, height: effectiveWidth * 0.04, borderRadius: '50%', backgroundColor: '#333' }} />
                    <div style={{ width: effectiveWidth * 0.04, height: effectiveWidth * 0.04, borderRadius: '50%', backgroundColor: '#333' }} />
                </div>
            )}
        </div>
    );
};
