import MenuItem from '../models/MenuItem.js';
import Category from '../models/Category.js';
import User  from '../models/User.js';
import { signToken, AuthenticationError } from '../services/auth.js';

export const resolvers = {
  Query: {
    menuItems: async () => {
      return await MenuItem.find();
    },
    menuItem: async (_: any, { id }: { id: string }) => {
      return await MenuItem.findById(id);
    },
    menuItemsByCategory: async (_: any, { category }: { category: string }) => {
      return await MenuItem.find({ category });
    },
    categories: async () => {
      return await Category.find().sort('displayOrder');
    }
  },

  Mutation: {    
    login: async (_: any, { email, password }: { email: string, password: string }) => {
      const user = await User.findOne({ email });

      if (!user) {
          throw new AuthenticationError('Could not Authenticate user.');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
          throw new AuthenticationError('Could not Authenticate user.');
      }

      const token = signToken(user.username, user.email, user._id);

      return { token, user };

    },
    addMenuItem: async (_: any, { input }: { input: any }) => {
      const menuItem = new MenuItem(input);
      return await menuItem.save();
    },
    updateMenuItem: async (_: any, { id, input }: { id: string, input: any }) => {
      return await MenuItem.findByIdAndUpdate(
        id,
        input,
        { new: true, runValidators: true }
      );
    },
    deleteMenuItem: async (_: any, { id }: { id: string }) => {
      const result = await MenuItem.findByIdAndDelete(id);
      return !!result;
    },
    toggleMenuItemAvailability: async (_: any, { id }: { id: string }) => {
      const menuItem = await MenuItem.findById(id);
      if (!menuItem) throw new Error('Menu item not found');
      
      menuItem.isAvailable = !menuItem.isAvailable;
      return await menuItem.save();
    }
  }
};