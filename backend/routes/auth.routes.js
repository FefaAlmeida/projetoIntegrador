import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// Públicas
router.post('/login', authController.login);
router.post('/registrar', authController.register);

// Protegidas (precisam de JWT válido)
router.get('/perfil', authMiddleware, authController.getProfile);
router.put('/perfil', authMiddleware, authController.updateProfile);

export default router;
