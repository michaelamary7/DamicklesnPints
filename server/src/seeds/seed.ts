import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';
import Reservation from '../models/Reservation.js';
import db from '../config/connection.js';
import mongoose from 'mongoose';

// Mock Data
const users = [
  {
    username: "johndoe",
    email: "john@example.com",
    password: "hashedPassword123"
  },
  {
    username: "janesmith",
    email: "jane@example.com",
    password: "hashedPassword456"
  }
];

const restaurants = [
  {
    name: "The Fine Diner",
    location: "123 Main St, City"
  },
  {
    name: "Sushi Master",
    location: "456 Oak Ave, Metro City"
  }
];

const trendingMenuItems = [
  {
    name: "Truffle Pasta",
    restaurant: "The Fine Diner",
    location: "123 Main St, City",
    price: 24.99,
    description: "Fresh pasta with black truffle and parmesan",
    category: 'Main Course',
    trending: true,
    imageUrl: "/images/truffle-pasta.jpg"
  },
  {
    name: "Dragon Roll Deluxe",
    restaurant: "Sushi Master",
    location: "456 Oak Ave, City",
    price: 18.99,
    description: "Special dragon roll with eel and avocado",
    category: 'Main Course',
    trending: true,
    imageUrl: "/images/dragon-roll.jpg"
  }
];

const menuItems = [
  {
    name: "Classic Burger",
    restaurant: "The Fine Diner",
    location: "123 Main St, City",
    price: 15.99,
    description: "Angus beef burger with fresh vegetables",
    category: 'Main Course',
    trending: false,
    isAvailable: true,
    imageUrl: "/images/classic-burger.jpg"
  },
  {
    name: 'MetroMan Burger',
    restaurant: "Sushi Master",
    location: '123 S Main St, Metro City',
    price: 12.99,
    description: 'Juicy beef patty with fresh vegetables',
    category: 'Main Course',
    trending: false,
    isAvailable: true,
    imageUrl: 'https://dinnerthendessert.com/wp-content/uploads/2022/02/Classic-Burgers-8.jpg'
  },
  {
    name: 'Cheesecake',
    restaurant: "Sushi Master",
    price: 5.99,
    description: 'New York style cheesecake with strawberry topping',
    category: 'Desserts',
    trending: false,
    isAvailable: true,
    imageUrl: 'https://tornadoughalli.com/wp-content/uploads/2018/09/NEW-YORK-STYLE-CHEESECAKE2-2.jpg'
  }, 
  {
    name: 'Caesar Salad',
    restaurant: "The Fine Diner",
    price: 8.99,
    description: 'Fresh romaine lettuce with parmesan',
    category: 'Appetizers',
    isAvailable: true,
    imageUrl: 'https://www.onceuponachef.com/images/2010/08/Homemade-Caesar-Salad-Dressing.jpg'
  },
];

const reservations = [
  {
    name: "John Black",
    email: "john@example.com",
    phone: "123-456-7890",
    date: "2025-01-15",
    time: "19:00",
    guests: 2,
    status: "confirmed",
    notes: "Window seat preferred, non-smoker"
  }
];

async function seed() {
  try {
    // First establish database connection
    await db();
    console.log('Connected to MongoDB successfully');

    // Wait a moment to ensure connection is ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Clean existing data
    console.log('Cleaning existing data...');
    await Promise.all([
      User.deleteMany({}),
      Restaurant.deleteMany({}),
      MenuItem.deleteMany({}),
      Reservation.deleteMany({})
    ]);
    console.log('Cleaned existing data');

    // Seed users
    console.log('Seeding users...');
    await User.insertMany(users);
    console.log('Users seeded');

    // Seed restaurants and store their IDs
    console.log('Seeding restaurants...');
    const insertedRestaurants = await Restaurant.insertMany(restaurants);
    console.log('Restaurants seeded');

    // Create a map of restaurant names to their IDs
    const restaurantMap = new Map(
      insertedRestaurants.map(restaurant => [restaurant.name, restaurant._id])
    );

    // Add restaurant IDs to menu items
    console.log('Seeding menu items...');
    const allMenuItems = [...trendingMenuItems, ...menuItems].map(item => ({
      ...item,
      restaurantId: restaurantMap.get(item.restaurant)
    }));

    // Seed menu items
    await MenuItem.insertMany(allMenuItems);
    console.log('Menu items seeded');

    // Add restaurant ID to reservations
    console.log('Seeding reservations...');
    const reservationsWithIds = reservations.map(reservation => ({
      ...reservation,
      restaurantId: restaurantMap.get("The Fine Diner")
    }));

    // Seed reservations
    await Reservation.insertMany(reservationsWithIds);
    console.log('Reservations seeded');

    console.log('Database seeded successfully!');
    
    // Close the connection
    await mongoose.disconnect();
    console.log('Database connection closed');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seed();