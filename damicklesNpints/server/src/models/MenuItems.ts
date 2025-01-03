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

const itemSchema = new Schema<IMenuItem>(
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
// Using model() to compile a model based on the schema 'bookSchema'
const Item = model('Item', itemSchema);

// Create a new instance of the model, a document
Item
  .create({
name: 'Burger',
description: 'A delicious burger',
price: 5.99,
category: '5f785c3f8b4d9e4d3c4e3f6a',
isAvailable: true,
image: 'burger.jpg',
nutritionalInfo: {
  calories: 500,
  protein: 20,
  carbohydrates: 40,
  fats: 30,
}
  })
  .then(result => console.log('Created new document', result))
  .catch(err => console.log(err));

// Create a new instance with required title and optional author properties
Item
  .create({
name: 'Pizza',
description: 'A delicious pizza',
price: 12.99,
category: '5f785c3f8b4d9e4d3c4e3f6a',
isAvailable: true,
image: 'pizza.jpg',
nutritionalInfo: {
  calories: 800,
  protein: 40,
  carbohydrates: 60,
  fats: 50,
}
  })  
  .then(result => console.log('Created new document', result))
  .catch(err => console.log(err));

// Create a new instance with only required title
Item
.create({
name: 'Pasta',
description: 'A delicious pasta',
price: 9.99,
category: '5f785c3f8b4d9e4d3c4e3f6a',
isAvailable: true,
image: 'pasta.jpg',
nutritionalInfo: {
  calories: 600,
  protein: 30,
  carbohydrates: 50,
  fats: 40,
}
})
  .then(result => console.log('Created new document', result))
  .catch(err => console.log(err));

export default Item;