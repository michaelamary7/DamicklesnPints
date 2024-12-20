import { Schema, model, Document } from 'mongoose';

export interface ReservationDocument extends Document {
    reservationId: string;
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
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
    reservationId: {
        type: String,
        required: true,
    },
});

export default reservationSchema;
