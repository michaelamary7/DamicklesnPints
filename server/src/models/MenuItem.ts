import { Schema, model, Document } from 'mongoose';

interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: Schema.Types.ObjectId;
  isAvailable: boolean;
  image: string;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fats: number;
  };
}

const menuSchema = new Schema<IMenuItem>(
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
    isAvailable: {
      type: Boolean,
      default: true,
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

const Menu = model<IMenuItem>('MenuItems', menuSchema);

export default Menu;