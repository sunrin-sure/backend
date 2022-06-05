export interface User {
  _id: string
  username: string;
  email: string;
  password: string;
  fields: string[];
  verified: boolean;
}