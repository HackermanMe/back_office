import { User } from './user';
import { Car } from './cars';
import { House } from './house';
import { Land } from './land';
import { ItemType } from './itemtag';

export interface Favorite {
    trackingId?: string;
    utilisateur?: User;
    itemId: number;
    itemType: ItemType;
    voiture?: Car;
    maison?: House;
    terrain?: Land;
    note?: string;
    dateCreation?: Date;
    dateModification?: Date;
} 