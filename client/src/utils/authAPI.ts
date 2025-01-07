// resolvers/auth.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authResolvers = {
  Mutation: {
    login: async (_: any, { username, password }: { username: string; password: string }, { models }: { models: any }) => {
      const user = await models.User.findOne({ username });
      
      if (!user) {
        throw new Error('User not found');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      
      if (!validPassword) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET is not defined'); })(),
        { expiresIn: '24h' }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username
        }
      };
    }
  }
};

export default authResolvers;