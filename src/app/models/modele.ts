import { Marque } from './marque';

export interface Modele {
    trackingId?: string;
    nom: string;
    marque?: Marque;
} 