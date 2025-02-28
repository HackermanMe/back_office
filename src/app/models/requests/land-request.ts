export interface LandRequest {
    titre: string;
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
    images: (File | string)[];
    documentsCadastraux?: (File | string)[];
    certificatUrbanisme?: (File | string)[];
    proprietaireId?: string | null;
    itemTagsIds?: string[];
    reviewsIds?: string[];
    noteMoyenne?: number;
    nombreAvis?: number;
} 