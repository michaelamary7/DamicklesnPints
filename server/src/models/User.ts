import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

import menuSchema from './Menu';
import reservationSchema from './Reservation';
import { MenuDocument } from './Menu';
import { ReservationDocument } from './Reservation';

export interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  menuItems: MenuDocument[];
  reservations: ReservationDocument[];
  isCorrectPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    menuItems: [menuSchema],
    reservations: [reservationSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<UserDocument>('User', userSchema);

export default User;
  
  

