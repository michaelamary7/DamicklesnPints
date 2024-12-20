import { Schema, model, Document } from 'mongoose';

interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: Schema.Types.ObjectId;
  image: string;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
  };
}

const classSchema = new Schema<IMenuItem>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      type: Schema.Types.ObjectId,
      ref: 'Professor',
    },
    image: {
      type: String,
      default: '',
    },
    nutritionalInfo: {
      calories: {
        type: Number, // Add type assignment
        required: true, // Add required assignment
      },
      protein: {
        type: Number, // Add type assignment
        required: true, // Add required assignment
      },
      carbohydrates: {
        type: Number, // Add type assignment
        required: true, // Add required assignment
      },
      fats: {
        type: Number, // Add type assignment
        required: true, // Add required assignment
      },
    },
  },
  {
    timestamps: true,
  }
);

const Class = model<IMenuItem>('MenuItems', classSchema);

export default Class;
