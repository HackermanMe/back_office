import { AppointmentStatus } from './enums/AppointmentStatus';
import { User } from './user';

export interface Appointment {
    trackingId?: string;
    client?: User;
    agent?: User;
    dateTime: Date;
    status: AppointmentStatus;
    notes?: string;
    itemId?: number;
    itemType?: string;
} 