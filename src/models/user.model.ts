import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { JobType } from '@types/users/user.job.type';

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
    select: false,
  },
  fields: {
    type: [JobType],
    required: false,
  },
  stacks: {
    type: [String],
    required: false,
  },
  refresh_token: {
    type: String,
    required: false,
    select: false,
  },
  admin: {
    type: Boolean,
    default: false,
    select: false,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
