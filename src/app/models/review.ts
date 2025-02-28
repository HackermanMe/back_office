import { User } from './user';

export interface Review {
    trackingId?: string;
    utilisateur?: User;
    note: number;
    commentaire: string;
    idItem: number;
    typeItem: string;
    moderateur?: User;
    dateCreation?: Date;
    dateModification?: Date;
} 