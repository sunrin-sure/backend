export interface User {
  _id: string
  username: string;
  email: string;
  password: string;
  refresh_token: string;
  fields: string[];
  admin: boolean;
}
