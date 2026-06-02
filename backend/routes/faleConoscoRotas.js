import express from 'express';
import FaleConoscoController from '../controllers/FaleConoscoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas públicas
router.post('/', FaleConoscoController.criar);

// Rotas protegidas (somente admin)
router.get('/pendentes', authMiddleware, FaleConoscoController.listarPendentes);
router.get('/respondidos', authMiddleware, FaleConoscoController.listarRespondidos);
router.get('/por-data', authMiddleware, FaleConoscoController.listarPorData);

router.get('/:id', authMiddleware, FaleConoscoController.buscarPorId);
router.get('/', authMiddleware, FaleConoscoController.listarTodos);

// OPTIONS para CORS
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id/aceitar', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

router.options('/:id/recusar', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.status(200).send();
});

export default router;