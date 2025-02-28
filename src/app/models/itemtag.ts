import { Tag } from './tag';

export enum ItemType {
    VOITURE = 'VOITURE',
    MAISON = 'MAISON',
    TERRAIN = 'TERRAIN'
}

export interface ItemTag {
    trackingId?: string;
    itemId: number;
    itemType: ItemType;
    tag?: Tag;
    dateCreation?: Date;
    dateModification?: Date;
} 