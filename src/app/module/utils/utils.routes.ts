import { Router } from 'express';
import { UtilsController } from './utils.controller';
import { checkAuth } from '../../middleware/checkAuth';

const router = Router();

router.patch('/rename', checkAuth(), UtilsController.renameItem);

router.patch('/copy', checkAuth(), UtilsController.copyItem);

export const utilsRoutes = router;
