import jwt from 'jsonwebtoken';
import { CookieOptions } from 'express';
import {
  ACCESS_EXPIRATION, REFRESH_EXPIRATION, R_SECRET_KEY, SECRET_KEY,
} from '../config/env.config';
import { JwtUserPayload } from '../interfaces/jwt.interface';
import { HttpException } from '../exceptions/HttpException';
import getCookieTime from './cookie.utils';

const sign = (payload: JwtUserPayload) => {
  const token = jwt.sign(payload, SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: ACCESS_EXPIRATION,
  });

  return token;
};

const verify = (token: string, secretKey: string) => {
  try {
    const decoded = jwt.verify(token, secretKey) as JwtUserPayload;
    return decoded;
  } catch (error) {
    return new HttpException(401, error);
  }
};

const refresh = (payload: JwtUserPayload) => {
  const token = jwt.sign(payload, R_SECRET_KEY, {
    algorithm: 'HS256',
    expiresIn: REFRESH_EXPIRATION,
  });

  const refreshTokenCookieOptions: CookieOptions = {
    expires: getCookieTime(REFRESH_EXPIRATION, 'expires'),
    maxAge: getCookieTime(REFRESH_EXPIRATION, 'maxage'),
    httpOnly: true,
    sameSite: 'lax',
  };

  return { refreshToken: token, refreshTokenCookieOptions };
};

export { sign, verify, refresh };
