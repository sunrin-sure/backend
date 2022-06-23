import * as dotenv from 'dotenv';

try {
  dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
} catch (err) {
  dotenv.config();
}

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

export const {
  NODE_ENV,
  PORT,
  DB_URL,
  DB_DATABASE,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  DEFAULT_AVATAR,
  SECRET_KEY,
  R_SECRET_KEY,
  ACCESS_EXPIRATION,
  REFRESH_EXPIRATION,
  ORIGIN,
} = process.env;
