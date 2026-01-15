import { Router } from 'express';
import { AuthController } from './auth.controller';

const router = Router();

router.post('/signin', AuthController.localLogin);

export const authRoutes = router;
