import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string,
}

export const authenticateToken = ({ req }: any) => {
  let token = req.headers.authorization || req.body.token || req.query.token;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return req;
  }

  try {
    const secretKey: any = process.env.JWT_SECRET_KEY || '';
    const decoded: JwtPayload = jwt.verify(token, secretKey, { maxAge: '1h' }) as JwtPayload;
    req.user = decoded;
    
  } catch (err) {
    console.log('Invalid token');
  }

  return req;
};

export const signToken = (username: string, email: string, _id: unknown) => {
  const payload = { username, email, _id };
  const secretKey: any = process.env.JWT_SECRET_KEY || '';

    return jwt.sign(payload, secretKey, { expiresIn: '1h' });

}

export const AuthenticationError = class extends GraphQLError {
  constructor(message: string) {
    super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};

