import cloudinary from 'cloudinary';
import { CLOUDINARY } from '../constants/index.js';
import fs from 'node:fs/promises';

// Burası dışarda olduğundan env fonksiyonu ile çalışmadı // process.env ile çalıştı
cloudinary.v2.config({
  secure: true,
  cloud_name: process.env[CLOUDINARY.CLOUD_NAME],
  api_key: process.env[CLOUDINARY.API_KEY],
  api_secret: process.env[CLOUDINARY.API_SECRET],
});


export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};