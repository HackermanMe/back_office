export interface Address {
    trackingId?: string;
    rue?: string;
    ville: string;
    district: string;
    codePostal?: string;
    pays?: string;
    longitude?: number;
    latitude?: number;
} 