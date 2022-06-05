import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

import { logger } from '@utils/logger';

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = err.status || 500;
    const message: string = err.message || 'Something went wrong';

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message: ${message}`);
    res.status(status).json({ message });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
