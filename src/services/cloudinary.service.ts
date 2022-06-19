import fs from 'fs';
import { UploadApiResponse, v2 } from 'cloudinary';
import { HttpException } from '@/exceptions/HttpException';

export class CloudinaryService {
  constructor(public file: Express.Multer.File) {
    this.file = file;
  }

  public uploadImage(): Promise<UploadApiResponse | HttpException> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(new HttpException(error.http_code, error.message));
        return resolve(result);
      });

      fs.createReadStream(this.file.buffer).pipe(upload);
    });
  }
}
