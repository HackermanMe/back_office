import { FuelType } from '../enums/FuelType';
import { TransmissionType } from '../enums/TransmissionType';

export interface CarRequest {
    titre: string;
    modeleId: string;
    modeleNom: string;
    marqueId: string;
    marqueNom: string;
    annee: number;
    kilometrage: number;
    couleur?: string;
    typecarburant: FuelType;
    transmission: TransmissionType;
    puissance: number;
    caracteristiques: string[];
    prix: number;
    negociable: boolean;
    paiementenplus: boolean;
    echangepossible: boolean;
    description: string;
    images: (string | File)[];
    reviewsIds: string[];
    notemoyenne: number;
    nombreavis: number;
} 