import { Schema, model, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  menuItems: ObjectId[];
  reservations: ObjectId[];
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
    menuItems: [
      {
        type: Schema.Types.ObjectId,
        ref: 'MenuItem',
      },
    ],
    reservations: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reservation',
      },
    ],
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

export { userSchema };
export default User;
  
  

