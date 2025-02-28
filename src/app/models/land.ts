import { User } from './user';
import { Review } from './review';

export interface Land {
    trackingId: string;
    titre: string;
    status: string;
    surface: number;
    adresse: string;
    ville: string;
    district?: string;
    description: string;
    prix: number;
    negociable: boolean;
    paiementEnPlus: boolean;
    aEau: boolean;
    aElectricite: boolean;
    constructible: boolean;
    caracteristiques: string[];
    images: string[];
    documentsCadastraux: string[];
    certificatUrbanisme: string[];
    proprietaire?: User;
    reviews?: Review[];
    noteMoyenne: number;
    nombreAvis: number;
    createdAt?: Date;
    updatedAt?: Date;
} 