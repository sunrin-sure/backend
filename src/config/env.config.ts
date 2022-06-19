import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const {
  NODE_ENV,
  PORT,
  DB_URL,
  DB_DATABASE,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  SECRET_KEY,
  R_SECRET_KEY,
  ACCESS_EXPIRATION,
  REFRESH_EXPIRATION,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
} = process.env;
