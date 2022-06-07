import { JwtUserPayload } from '@interfaces/jwt.interface';

declare module 'express' {
  export interface Request {
    jwtPayload: JwtUserPayload
  }
}
