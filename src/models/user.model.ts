import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    required: false,
  },
  fields: {
    type: [String],
    required: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
