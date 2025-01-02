import { Schema, model, Document } from 'mongoose';

interface ICategory extends Document {
    name: string;
    }

const classSchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);
const Category = model<ICategory>('Category', classSchema);

export default Category;