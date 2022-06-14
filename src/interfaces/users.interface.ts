import { JobType } from '@types/users/user.job.type';

export interface User {
  _id: string
  username: string;
  email: string;
  password: string;
  fields: JobType[];
  stacks: string[];
  refresh_token: string;
  admin: boolean;
}
