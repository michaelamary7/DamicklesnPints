import { Schema, type Document } from 'mongoose';

export interface MenuDocument extends Document {
    menuId: string;
    item: string;
    description: string;
    price: number;
    category: string;
    image: string;
    }

const menuSchema = new Schema<MenuDocument>({
    item: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    menuId: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

export default menuSchema;