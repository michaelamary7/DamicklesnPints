import { Schema, model, type Document } from 'mongoose';

export interface ITrendingMenus extends Document {
  id: number;
  name: string;
  restaurant: string;
  restaurantId: string;
  trending: boolean;
  description: string;
  price: number;
  imageUrl: string;
  location: string;
}

const TrendingMenusSchema = new Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  restaurant: { type: String, required: true },
  restaurantId: { type: Number, required: true },
  trending: { type: Boolean, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  location: { type: String, required: true },
});

const TrendingMenus = model<ITrendingMenus>('TrendingMenus', TrendingMenusSchema);

export default TrendingMenus;