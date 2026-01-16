import { Router } from 'express';
import { userRoutes } from '../module/user/user.routes';
import { authRoutes } from '../module/auth/auth.routes';
import { folderRoutes } from '../module/folder/folder.routes';
import { fileRoutes } from '../module/file/file.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },

  {
    path: '/folder',
    route: folderRoutes,
  },

  {
    path: '/file',
    route: fileRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
