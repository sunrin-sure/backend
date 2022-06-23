import * as dotenv from 'dotenv';

try {
  dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
} catch (err) {
  dotenv.config();
}

export const CREDENTIALS = process.env.CREDENTIALS === 'true';

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const DB_DATABASE = process.env.DB_DATABASE;
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;
const DEFAULT_AVATAR = process.env.DEFAULT_AVATAR;
const SECRET_KEY = process.env.SECRET_KEY;
const R_SECRET_KEY = process.env.R_SECRET_KEY;
const ACCESS_EXPIRATION = process.env.ACCESS_EXPIRATION;
const REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION;
const LOG_FORMAT = process.env.LOG_FORMAT;
const LOG_DIR = process.env.LOG_DIR;
const ORIGIN = process.env.ORIGIN;

export {
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
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
};