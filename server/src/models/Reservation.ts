import { Schema, model, Document } from 'mongoose';

export interface ReservationDocument extends Document {
    reservationId: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    specialRequests: string;
    status: 'pending' | 'confirmed' | 'rejected';
    createdAt: Date;
    }

const reservationSchema = new Schema<ReservationDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    guests: {
        type: Number,
        required: true,
    },
    specialRequests: {
        type: String,
    },
    reservationId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'rejected'],
        default: 'pending',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

});

const Reservation = model<ReservationDocument>('Reservation', reservationSchema);

export default Reservation;
