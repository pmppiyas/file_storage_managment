import { Router } from 'express';
import { MetaControllers } from './meta.controller';
import { checkAuth } from '../../middleware/checkAuth';

const router = Router();

router.get('/stats', checkAuth(), MetaControllers.getStorageStats);

export const metaRoutes = router;
