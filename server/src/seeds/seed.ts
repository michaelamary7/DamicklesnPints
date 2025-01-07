import db from '../config/connection.js';
import cleanDB from './cleanDB.js';
import models from '../models/index.js';

const { TrendingMenus } = models;
const { MenuItem } = models;

import trendingSeeds from './trendingSeeds.json' assert { type: "json" };
import menuSeeds from './Seeds.json' assert { type: "json" };

const seedDatabase = async (): Promise<void> => {
   try{
      await db();
      await cleanDB();

      await TrendingMenus.insertMany(trendingSeeds);
      await MenuItem.insertMany(menuSeeds);

      console.log('Data seeded successfully!');
      process.exit(0);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error seeding database:', error.message);
      } else {
        console.error('Unknown error seeding database');
      }
      process.exit(1);
    }
}

seedDatabase();
