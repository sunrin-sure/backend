import sharp from 'sharp';

export const avatarImageResizer = (file: Express.Multer.File): Promise<Buffer> => sharp(file.buffer)
  .resize({ width: 256 })
  .withMetadata()
  .png({ palette: true })
  .toBuffer();
