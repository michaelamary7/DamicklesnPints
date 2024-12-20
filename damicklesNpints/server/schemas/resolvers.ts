import { MenuItem, Category } from '../src/models';

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