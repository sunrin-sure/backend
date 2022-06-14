import { JobTypes } from '@types/users/user.job.type';

export interface User {
  _id: string
  username: string;
  email: string;
  password: string;
  fields: JobTypes[];
  stacks: string[];
  refresh_token: string;
  admin: boolean;
}
