import { Router } from 'express';
import { checkAuth } from '../../middleware/checkAuth';
import { FolderController } from './folder.controller';

const router = Router();

router.get('/', checkAuth(), FolderController.getFolders);

router.post('/', checkAuth(), FolderController.createFolder);

export const folderRoutes = router;
