export const users = [
    {
      username: 'test',
      email: 'test@test.com',
      password: 'testtest1',
    },
    {
      username: 'test2',
      email: 'test2@test.com',
      password: 'testtest2',
    },
  ];
  
  import { Types } from 'mongoose';

// Create fixed ObjectIds for restaurants to reference in menu items
const restaurantIds = {
  oceanFresh: new Types.ObjectId(),
  gourmetBites: new Types.ObjectId(),
  spiceGarden: new Types.ObjectId(),
};

export const restaurants = [
  {
    _id: restaurantIds.oceanFresh,
    name: 'Ocean Fresh',
    location: 'Waterfront Drive',
  },
  {
    _id: restaurantIds.gourmetBites,
    name: 'Gourmet Bites',
    location: 'Downtown Square',
  },
  {
    _id: restaurantIds.spiceGarden,
    name: 'Spice Garden',
    location: 'Garden District',
  },
];

export const menus = [
  // Ocean Fresh Menu Items
  {
    name: 'Grilled Atlantic Salmon',
    description: 'Fresh salmon fillet grilled to perfection with herbs and lemon',
    price: 24.99,
    category: 'Seafood',
    isAvailable: true,
    image: '/images/salmon.jpg',
    restaurantId: restaurantIds.oceanFresh,
  },
  {
    name: 'Lobster Thermidor',
    description: 'Classic French dish with lobster meat in creamy sauce',
    price: 38.99,
    category: 'Seafood',
    isAvailable: true,
    image: '/images/lobster.jpg',
    restaurantId: restaurantIds.oceanFresh,
  },
  {
    name: 'Seafood Paella',
    description: 'Spanish rice dish with mixed seafood and saffron',
    price: 29.99,
    category: 'Main Course',
    isAvailable: true,
    image: '/images/paella.jpg',
    restaurantId: restaurantIds.oceanFresh,
  },

  // Gourmet Bites Menu Items
  {
    name: 'Truffle Burger',
    description: 'Wagyu beef patty with truffle aioli and caramelized onions',
    price: 18.99,
    category: 'Burgers',
    isAvailable: true,
    image: '/images/burger.jpg',
    restaurantId: restaurantIds.gourmetBites,
  },
  {
    name: 'Duck Confit',
    description: 'Slow-cooked duck leg with crispy skin and root vegetables',
    price: 32.99,
    category: 'Main Course',
    isAvailable: true,
    image: '/images/duck.jpg',
    restaurantId: restaurantIds.gourmetBites,
  },
  {
    name: 'Chocolate Soufflé',
    description: 'Warm chocolate soufflé with vanilla ice cream',
    price: 12.99,
    category: 'Dessert',
    isAvailable: true,
    image: '/images/souffle.jpg',
    restaurantId: restaurantIds.gourmetBites,
  },

  // Spice Garden Menu Items
  {
    name: 'Butter Chicken',
    description: 'Tender chicken in rich tomato-cream curry sauce',
    price: 19.99,
    category: 'Curry',
    isAvailable: true,
    image: '/images/butter-chicken.jpg',
    restaurantId: restaurantIds.spiceGarden,
  },
  {
    name: 'Vegetable Biryani',
    description: 'Aromatic rice dish with mixed vegetables and saffron',
    price: 16.99,
    category: 'Rice',
    isAvailable: true,
    image: '/images/biryani.jpg',
    restaurantId: restaurantIds.spiceGarden,
  },
  {
    name: 'Tandoori Platter',
    description: 'Assorted grilled meats and vegetables from the tandoor',
    price: 28.99,
    category: 'Appetizer',
    isAvailable: true,
    image: '/images/tandoori.jpg',
    restaurantId: restaurantIds.spiceGarden,
  },
];

