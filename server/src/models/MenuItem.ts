import { Schema, model, Document, ObjectId } from 'mongoose';

interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  imageURL: string;
  restaurantId: ObjectId;
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
      type: String,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    imageURL: {
      type: String,
      default: '',
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    }
  },
  {
    toJSON: {
      getters: true,
    },
    timestamps: true,
  }
);

const Menu = model<IMenuItem>('MenuItem', menuSchema);

export default Menu;