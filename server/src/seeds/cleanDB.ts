import TrendingMenus from '../models/index.js';
import MenuItem from '../models/index.js';
import process from 'process';
import User from '../models/User.js';
import Menu from '../models/MenuItem.js';

const cleanDB = async (): Promise<void> => {
  try {
    await TrendingMenus.TrendingMenus.deleteMany({});
    await MenuItem.MenuItem.deleteMany({});
    await User.deleteMany({});
    await Menu.deleteMany({});
    console.log('Trending Menus, User and Menu collection cleaned.');

  } catch (err: unknown) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDB;