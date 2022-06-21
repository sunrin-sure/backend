import sharp from 'sharp';

export const avatarImageResizer = async (file: Express.Multer.File): Promise<Buffer> => { 
  return await sharp(file.buffer)
    .resize({width: 640})
    .withMetadata()
    .toBuffer();
}