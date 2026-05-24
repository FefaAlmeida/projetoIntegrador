import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { uploadImagens, handleUploadError } from '../middlewares/upload.middleware.js';

const router = Router();

// Públicas
router.get('/', productController.list);
router.get('/:id', productController.findById);

// Protegidas
router.post(
  '/',
  authMiddleware,
  uploadImagens.single('imagem'),
  handleUploadError,
  productController.create,
);
router.post(
  '/upload',
  authMiddleware,
  uploadImagens.single('imagem'),
  handleUploadError,
  productController.uploadImage,
);
router.put(
  '/:id',
  authMiddleware,
  uploadImagens.single('imagem'),
  handleUploadError,
  productController.update,
);
router.delete('/:id', authMiddleware, productController.remove);

export default router;
