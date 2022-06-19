import { model, Schema, Document } from 'mongoose';
import { User } from '@interfaces/users.interface';
import { DEFAULT_AVATAR } from '@config/env.config';
import { JobTypes } from '@/types/users/user.job.type';

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
  avatar: {
    type: String,
    required: false,
    default: DEFAULT_AVATAR,
    select: false,
  },
  fields: {
    type: [String],
    enum: JobTypes,
    required: true,
  },
  stacks: {
    type: [String],
    required: true,
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
}, { timestamps: true });

const userModel = model<User & Document>('User', userSchema);

export default userModel;
