import { Readable } from 'stream';
import { UploadApiResponse, v2 } from 'cloudinary';
import { HttpException } from '../exceptions/HttpException';

export class CloudinaryService {
  constructor(public fileBuffer: Buffer, public fileName: string) {
    this.fileBuffer = fileBuffer;
    this.fileName = fileName;
  }

  public uploadImage(): Promise<UploadApiResponse | HttpException> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          public_id: `avatars/${this.fileName}`,
          overwrite: true,
        },
        (error, result) => {
          if (error) return reject(new HttpException(error.http_code, error.message));
          return resolve(result);
        },
      );

      const readable = new Readable();
      readable._read = () => {};
      readable.push(this.fileBuffer);
      readable.push(null);

      readable.pipe(upload);
    });
  }
}
