export interface HouseRequest {
    titre: string;
    type: string;
    chambres: number;
    sallesDeBain: number;
    surface: number;
    adresse: string;
    ville: string;
    district?: string;
    description: string;
    prix: number;
    negociable: boolean;
    paiementEnPlus: boolean;
    caracteristiques: string[];
    images: (File | string)[];
    aGarage: boolean;
    aParking: boolean;
    aJardin: boolean;
    aPiscine: boolean;
    aTerrasse: boolean;
    aAscenseur: boolean;
    anneeConstruction?: number;
    proprietaireId?: string | null;
    itemTagsIds?: string[];
    reviewsIds?: string[];
    notemoyenne?: number;
    nombreavis?: number;
} 