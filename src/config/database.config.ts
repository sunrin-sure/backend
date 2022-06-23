import { DB_URL, DB_DATABASE } from './env.config';

export const dbConnection = {
  url: DB_URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: DB_DATABASE,
  },
};
