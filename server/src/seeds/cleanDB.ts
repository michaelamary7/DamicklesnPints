import MenuItem from '../models/MenuItem.js';
import process from 'process';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import Reservation from '../models/Reservation.js';

import db from '../config/connection.js';


const cleanDB = async () => {
  try {
    // Connect to database
    const connection = await db();
    console.log('Connected to database');

    // Clean all collections
    await Promise.all([
      User.deleteMany({}),
      Restaurant.deleteMany({}),
      MenuItem.deleteMany({}),
      Reservation.deleteMany({})
    ]);

    console.log('All collections cleaned successfully!');
    await connection.close();
  } catch (error) {
    console.error('Error cleaning database:', error);
    process.exit(1);
  }
};

export default cleanDB;