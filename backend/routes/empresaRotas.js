import express from 'express';
import EmpresaController from '../controllers/EmpresaController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// EMPRESA DO USUÁRIO LOGADO
router.get(
    '/minha',
    authMiddleware,
    EmpresaController.minhaEmpresa
);

// CRIAR EMPRESA
router.post(
    '/',
    authMiddleware,
    EmpresaController.criarEmpresa
);

// LISTAR EMPRESAS
router.get(
    '/',
    authMiddleware,
    adminMiddleware,
    EmpresaController.listarEmpresas
);

// BUSCAR EMPRESA POR ID
router.get(
    '/:id',
    authMiddleware,
    EmpresaController.buscarEmpresa
);

// ATUALIZAR EMPRESA
router.put(
    '/:id',
    authMiddleware,
    EmpresaController.atualizarEmpresa
);

// INATIVAR EMPRESA
router.patch(
    '/:id/inativar',
    authMiddleware,
    adminMiddleware,
    EmpresaController.inativarEmpresa
);

// OPTIONS /

router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    res.sendStatus(200);
});

// OPTIONS /minha

router.options('/minha', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, OPTIONS'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    res.sendStatus(200);
});

// OPTIONS /:id

router.options('/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, PATCH, DELETE, OPTIONS'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    res.sendStatus(200);
});

// OPTIONS /:id/inativar

router.options('/:id/inativar', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Methods',
        'PATCH, OPTIONS'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization'
    );
    res.sendStatus(200);
});

export default router;