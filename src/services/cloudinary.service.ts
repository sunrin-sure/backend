import { Readable } from 'stream';
import { UploadApiResponse, v2 } from 'cloudinary';
import { HttpException } from '@exceptions/HttpException';

export class CloudinaryService {
  constructor(public fileBuffer: Buffer) {
    this.fileBuffer = fileBuffer;
  }

  public uploadImage(): Promise<UploadApiResponse | HttpException> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(new HttpException(error.http_code, error.message));
        return resolve(result);
      });

      const readable = new Readable();
      readable._read = () => {};
      readable.push(this.fileBuffer);
      readable.push(null);

      readable.pipe(upload);
    });
  }
}
