import sharp from 'sharp';

export const avatarImageResizer = (file: Express.Multer.File): Promise<Buffer> => sharp(file.buffer)
  .resize({ width: 640 })
  .withMetadata()
  .toBuffer();
