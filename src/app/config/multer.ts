import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { cloudinary } from './cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'storage',
    resource_type: 'auto',
    public_id: (req: any, file: any) => {
      const originalNameWithoutExt = file.originalname
        .split('.')
        .slice(0, -1)
        .join('.')
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^a-z0-9_]/gi, '');

      return `${originalNameWithoutExt}_${Date.now()}`;
    },
  } as any,
});

export const multerUpload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith('image/') ||
      file.mimetype === 'application/pdf'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed') as any, false);
    }
  },
});
