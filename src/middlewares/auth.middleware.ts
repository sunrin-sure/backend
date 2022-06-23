import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../exceptions/HttpException';

import { verify } from '../utils/jwt.utils';
import { SECRET_KEY } from '../config/env.config';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = verify(token, SECRET_KEY);
    if (result instanceof HttpException) next(result);
    else req.jwtPayload = result;
    next();
  } else {
    next(new HttpException(401, 'Token is empty'));
  }
};

export default authMiddleware;
