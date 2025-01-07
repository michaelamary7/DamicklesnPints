import MenuItem from '../models/MenuItem.js';
import Reservation from '../models/Reservation.js';
import { nanoid } from 'nanoid';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface AddMenuItemArgs {
    input:{
        name: string;
        description: string;
        price: number;
        category: string;
        isAvailable: boolean;
    }
}

interface UpdateMenuItemArgs {
    id: string;
    input:{
        name: string;
        description: string;
        price: number;
        category: string;
        isAvailable: boolean;
    }
}

interface DeleteMenuItemArgs {
    id: string;
}

interface ToggleMenuItemAvailabilityArgs {
    id: string;
}

interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    };
}

interface AddReservationArgs {
    input:{
        name: string;
        email: string;
        phone: string;
        date: string;
        time: string;
        guests: number;
        specialRequests: string;
    }
}

interface UpdateReservationStatusArgs {
    reservationId: string;
    status: 'pending' | 'confirmed' | 'rejected';
}

const signToken: (username: string, email: string, _id: unknown) => string = (username, email, _id) => {
    const payload = { username, email, id: _id };
    const secret = process.env.JWT_SECRET || 'default_secret';
    const options = { expiresIn: '24h' };

    return jwt.sign(payload, secret, options);
}
export const resolvers = {
    Query: {
        menus: async () => {
            try {
                const menuItems = await MenuItem.find().populate('restaurantId');
                const restaurantMenus = menuItems.reduce((acc: { [key: string]: any }, item) => {
                    const restaurantId = (item.restaurantId as any)?._id.toString();
                    if (!acc[restaurantId]) {
                        acc[restaurantId] = {
                            _id: restaurantId,
                            items: [],
                            restaurantId: item.restaurantId,
                            lastUpdated: new Date().toISOString()
                        };
                    }
                    acc[restaurantId].items.push(item);
                    return acc;
                }, {});
    
                return Object.values(restaurantMenus);
            } catch (error) {
                throw new Error('Failed to fetch menus');
            }
        },
        menu: async (_: any, { _id }: { _id: string }) => {
            try {
                return await MenuItem.findById(_id).populate('restaurantId');
            } catch (error) {
                throw new Error('Failed to fetch menu');
            }
        },
        menuItems: async () => {
            try {
                return await MenuItem.find({ trending: true }).populate('restaurantId');
            } catch (error) {
                throw new Error('Failed to fetch menu items');
            }
        },
        menuItem: async (_: any, { id }: { id: string }) => {
            try {
                return await MenuItem.findById(id).populate('restaurantId');
            } catch (error) {
                throw new Error('Failed to fetch menu item');
            }
        },
        reservations: async () => {
            try {
                return await Reservation.find();
            } catch (error) {
                throw new Error('Failed to fetch reservations');
            }
        },
        getReservationsByStatus: async (_: any, { status }: { status: 'pending' | 'confirmed' | 'rejected' }) => {
            try {
                return await Reservation.find({ status });
            } catch (error) {
                throw new Error('Failed to fetch reservations');
            }
        },
        getReservation: async (_: any, { reservationId }: { reservationId: string }) => {
            try {
                return await Reservation.findOne({ reservationId });
            } catch (error) {
                throw new Error('Failed to fetch reservation');
            }
        },
    },

    Mutation: {
        login: async (_: any, { email, password }: { email: string; password: string }, { models }: any) => {
            if (!models?.User) {
                console.error('User model not found in context');
                throw new Error('Internal server error');
            }
        
            try {
                const user = await models.User.findOne({ email });
                
                if (!user) {
                    throw new Error('User not found');
                }
          
                const validPassword = await bcrypt.compare(password, user.password);
                
                if (!validPassword) {
                    throw new Error('Invalid password');
                }
          
                const token = jwt.sign(
                    { _id: user._id, email: user.email },
                    process.env.JWT_SECRET || 'default_secret',
                    { expiresIn: '24h' }
                );
          
                return {
                    token,
                    user: {
                        _id: user._id,
                        username: user.username
                    }
                };
            } catch (error) {
                console.error('Login error:', error);
                throw error;
            }
        },
        createUser: async (_: any, { input }: AddUserArgs) => {
            const user = await User.create(input);
            const token = signToken(user.username, user.email, user._id);

            return { token, user };
        },
        addMenuItem: async (_: any, { input }: AddMenuItemArgs) => {
            const menuItem = new MenuItem(input);
            return await menuItem.save();
        },
        updateMenuItem: async (_: any, { id, input }: UpdateMenuItemArgs) => {
            return await MenuItem.findByIdAndUpdate(
                id,
                input,
                { new: true, runValidators: true }
            );
        },
        deleteMenuItem: async (_: any, { id }: DeleteMenuItemArgs) => {
            const result = await MenuItem.findByIdAndDelete(id);
            return !!result;
        },
        toggleMenuItemAvailability: async (_: any, { id }: ToggleMenuItemAvailabilityArgs) => {
            const menuItem = await MenuItem.findById(id);
            if (!menuItem) throw new Error('Menu item not found');
            
            menuItem.isAvailable = !menuItem.isAvailable;
            return await menuItem.save();
        },
        addReservation: async (_: any, { input }: AddReservationArgs) => {
          try {
              const reservationId = nanoid(10); // Generate a unique ID
              const reservation = new Reservation({
                  ...input,
                  reservationId,
                  status: 'pending',
                  createdAt: new Date()
              });
              return await reservation.save();
          } catch (error) {
              throw new Error('Failed to add reservation');
          }   
        },
        updateReservationStatus: async (_: any, { reservationId, status }: UpdateReservationStatusArgs) => {
          try {
              const reservation = await Reservation.findOneAndUpdate(
                  { reservationId },
                  { status },
                  { new: true }
              );

              if (!reservation) {
                  throw new Error('Reservation not found');
              }

              return reservation;
          } catch (error) {
              if (error instanceof Error) {
                  throw new Error(`Failed to update reservation status: ${error.message}`);
              } else {
                  throw new Error('Failed to update reservation status');
              }
          }
        },
        deleteReservation: async (_: any, { reservationId }: { reservationId: string }) => {
          try {
              const result = await Reservation.deleteOne({ reservationId });
              return result.deletedCount > 0;
          } catch (error) {
              if (error instanceof Error) {
                  throw new Error(`Failed to delete reservation: ${error.message}`);
              } else {
                  throw new Error('Failed to delete reservation');
              }
          }
        },                
    }
};

export default resolvers;


