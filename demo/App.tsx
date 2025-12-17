import React, { useState } from 'react';
// @ts-ignore
import { Plate } from '../src/components/Plate';
// @ts-ignore
import { PlateType } from '../src/types';

const App = () => {
    const [plateNumber, setPlateNumber] = useState('ABC123');

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Colombian Plates Demo</h1>
            <p>Type a plate number to see it update live.</p>

            <div style={{ marginBottom: '40px' }}>
                <label style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                    Plate Number:
                    <input
                        type="text"
                        value={plateNumber}
                        onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                        style={{ marginLeft: '10px', padding: '10px', fontSize: '1.2rem', textTransform: 'uppercase' }}
                        maxLength={7}
                    />
                </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px' }}>
                <div>
                    <h3>Inferred / Default</h3>
                    <Plate plate={plateNumber} width={300} />
                    <p style={{ marginTop: 10, color: '#666' }}>Auto-detects based on input</p>
                </div>
                <div>
                    <h3>Private (Particular)</h3>
                    {/* @ts-ignore */}
                    <Plate plate={plateNumber || "ABC123"} type="private" width={300} />
                    <p style={{ marginTop: 5, fontSize: 12 }}>Standard Yellow</p>
                </div>
                <div>
                    <h3>Public (Service)</h3>
                    {/* @ts-ignore */}
                    <Plate plate="TAX456" type="public" width={300} />
                    <p style={{ marginTop: 5, fontSize: 12 }}>White</p>
                </div>
                <div>
                    <h3>Diplomatic</h3>
                    {/* @ts-ignore */}
                    <Plate plate="DIP999" type="diplomatic" width={300} />
                    <p style={{ marginTop: 5, fontSize: 12 }}>Blue</p>
                </div>
                <div>
                    <h3>Trailer (Remolque)</h3>
                    {/* @ts-ignore */}
                    <Plate plate="R12345" type="trailer" width={300} />
                    <p style={{ marginTop: 5, fontSize: 12 }}>Green</p>
                </div>
                <div>
                    <h3>Overflow Test</h3>
                    {/* @ts-ignore */}
                    <Plate plate="EXTRALONG12345" width={300} />
                </div>
                <div>
                    <h3>Motorcycle (Moto)</h3>
                    {/* @ts-ignore */}
                    <Plate plate="ABC12" type="motorcycle" width={300} />
                    <p style={{ marginTop: 5, fontSize: 12 }}>Rectangular Layout</p>
                </div>
                <div>
                    <h3>Responsive (100% of container)</h3>
                    <div style={{ width: '100%', border: '1px dashed #ccc', padding: 5 }}>
                        {/* @ts-ignore */}
                        <Plate plate="RESP123" width="100%" />
                    </div>
                </div>
                <div>
                    <h3>Responsive (50% of container)</h3>
                    <div style={{ width: '50%', border: '1px dashed #ccc', padding: 5 }}>
                        {/* @ts-ignore */}
                        <Plate plate="HALF50" width="100%" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
