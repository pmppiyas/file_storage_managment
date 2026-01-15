import { Router } from 'express';
import { UserControllers } from './user.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { userZodSchema } from './user.Validation';
import { multerUpload } from '../../config/multer';

const router = Router();

router.post(
  '/signup',
  multerUpload.single('photo'),
  validateRequest(userZodSchema),
  UserControllers.createUser
);

export const userRoutes = router;
