import { ItemTag } from './itemtag';
import { Review } from './review';

export interface BaseItem {
    trackingid?: string;
    titre: string;
    description?: string;
    prix: number;
    negociable: boolean;
    paiementEnPlus: boolean;
    caracteristiques?: string[];
    images?: string[];
    itemTags?: ItemTag[];
    reviews?: Review[];
    noteMoyenne?: number;
    nombreAvis?: number;
} 