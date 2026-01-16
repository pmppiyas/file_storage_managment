import { Router } from 'express';
import { FileControllers } from './file.controller';
import { multerUpload } from '../../config/multer';
import { checkAuth } from '../../middleware/checkAuth';

const router = Router();

router.post(
  '/photo',
  checkAuth(),
  multerUpload.single('photo'),
  FileControllers.uploadPhoto
);

export const fileRoutes = router;
