import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, adminMiddleware, userController.list);
router.post('/', authMiddleware, adminMiddleware, userController.create);
router.put('/:id', authMiddleware, adminMiddleware, userController.update);
router.delete('/:id', authMiddleware, adminMiddleware, userController.remove);

export default router;
