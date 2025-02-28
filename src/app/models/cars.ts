import { BaseItem } from './base-item';
import { ItemTag } from './itemtag';
import { Review } from './review';
import { Modele } from './modele';
import { FuelType } from './enums/FuelType';
import { TransmissionType } from './enums/TransmissionType';

export interface Car {
    trackingid: string;
    titre: string;
    modele?: Modele;
    annee: number;
    kilometrage: number;
    couleur?: string;
    typeCarburant: FuelType;
    transmission: TransmissionType;
    puissance?: number;
    caracteristiques: string[];
    prix: number;
    negociable: boolean;
    paiementEnPlus: boolean;
    echangePossible: boolean;
    description: string;
    images: (string | File)[];
    itemTags: ItemTag[];
    reviews: Review[];
    noteMoyenne?: number;
    nombreAvis?: number;
}
