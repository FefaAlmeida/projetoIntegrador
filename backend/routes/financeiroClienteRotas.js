import express from 'express';
import FinanceiroClienteController from '../controllers/FinanceiroClienteController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 📑 1. Buscar dados do Painel (Se não houver parcelas, retorna os dados do Orçamento para Setup)
// GET /cliente/financeiro
router.get('/', authMiddleware, FinanceiroClienteController.obterPainel);

// ⚙️ 2. Setup Inicial (Executado apenas 1 vez para gerar o parcelamento no banco)
// POST /cliente/financeiro/setup
router.post('/setup', authMiddleware, FinanceiroClienteController.inicializarParcelamento);

// 💳 3. Alterar a forma de pagamento de todas as parcelas futuras/pendentes
// PATCH /cliente/financeiro/forma-pagamento
router.patch('/forma-pagamento', authMiddleware, FinanceiroClienteController.alterarMetodoPagamento);

// 💰 4. Processar/Simular o pagamento de uma parcela específica
// POST /cliente/financeiro/:id/pagar
router.post('/:id/pagar', authMiddleware, FinanceiroClienteController.pagarParcela);


// 🌐 CONFIGURAÇÕES DE CORS/OPTIONS PARA AS ROTAS DO CLIENTE
router.options('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

router.options('/setup', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

router.options('/forma-pagamento', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

router.options('/:id/pagar', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

export default router;