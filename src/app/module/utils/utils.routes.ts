import { Router } from 'express';
import { UtilsController } from './utils.controller';
import { checkAuth } from '../../middleware/checkAuth';

const router = Router();

router.patch('/', checkAuth(), UtilsController.renameItem);

export const utilsRoutes = router;
