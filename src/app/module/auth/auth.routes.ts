import { Router } from 'express';
import { AuthController } from './auth.controller';
import passport from 'passport';

const router = Router();

router.post('/signin', AuthController.localLogin);

router.get('/google', AuthController.googleLogin);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/login',
  }),
  AuthController.googleCallback
);

export const authRoutes = router;
