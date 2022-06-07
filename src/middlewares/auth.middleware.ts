import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

import { verify } from '@utils/jwt.utils';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = verify(token);
    if (result.ok) {
      req.jwtPayload = result.payload;
      next();
    } else {
      next(new HttpException(401, result.message));
    }
  } else {
    next(new HttpException(401, 'Token is empty'));
  }
};

export default authMiddleware;