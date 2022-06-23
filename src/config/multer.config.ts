import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { HttpException } from '../exceptions/HttpException';

const storage = multer.memoryStorage();

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new HttpException(400, 'Unsupported file format'));
  }
};

export const multerConfig = {
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
};
