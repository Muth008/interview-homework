import { RequestHandler } from 'express';
import multer from 'multer';
import path from 'path';

const uploadFolderPath = path.join(__dirname, '../../../public/uploads/');

/**
 * Configure storage for file upload
 */
function configureStorage(uploadPath: string): multer.StorageEngine {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
}

/**
 * Middleware to handle file upload
 */
export function uploadFileMiddleware(folder: string, imageProperty = 'image'): RequestHandler {
  const uploadPath = uploadFolderPath + folder;
  const storage = configureStorage(uploadPath);
  return multer({ storage }).single(imageProperty);
}

module.exports = { uploadFileMiddleware };