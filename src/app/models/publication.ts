import { User } from './user';
import { Car } from './cars';
import { House } from './house';
import { Land } from './land';
import { ItemType } from './itemtag';

export enum PublicationStatus {
    BROUILLON = 'BROUILLON',
    PUBLIE = 'PUBLIE',
    ARCHIVE = 'ARCHIVE'
}

export interface Publication {
    trackingId?: string;
    utilisateur?: User;
    titre: string;
    contenu: string;
    itemId?: number;
    typeItem?: ItemType;
    statut: PublicationStatus;
    enVedette: boolean;
    voiture?: Car;
    maison?: House;
    terrain?: Land;
    dateCreation?: Date;
    dateModification?: Date;
} 