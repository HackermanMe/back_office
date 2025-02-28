import { Address } from './address';
import { Car } from './cars';
import { House } from './house';
import { Land } from './land';
import { Publication } from './publication';
import { Favorite } from './favorite';
import { Appointment } from './appointment';

export interface User {
    trackingId?: string;
    prenom: string;
    nom: string;
    email: string;
    motDePasse?: string;
    numeroDeTelephone?: string;
    role: string;
    adresse?: Address;
    imageDeProfil?: string;
    voitures?: Car[];
    maisons?: House[];
    terrains?: Land[];
    publications?: Publication[];
    favoris?: Favorite[];
    rendezVousEnClient?: Appointment[];
    rendezVousEnAgent?: Appointment[];
    dateCreation?: Date;
    dateModification?: Date;
} 