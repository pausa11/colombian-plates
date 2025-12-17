export enum PlateType {
    PARTICULAR = 'PARTICULAR', // Private
    PUBLICO = 'PUBLICO', // Public (Taxi, Bus - Format is same as Particular usually, differentiation is context or color, but format wise effectively same pattern often)
    MOTO = 'MOTO', // Motorcycle
    DIPLOMATICO = 'DIPLOMATICO', // Diplomatic
    REMOLQUE = 'REMOLQUE', // Trailer
    MOTOCARRO = 'MOTOCARRO', // Motocarro (often same as Moto?) - Let's keep separate if distinct. Actually usually 3-3 format or Moto format.
    // We can add more like MAQUINARIA (Machinery) later
}
