import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rotas
import produtoRotas from './routes/produtoRotas.js';
import authRotas from './routes/authRotas.js';
import criptografiaRotas from './routes/criptografiaRotas.js';
import usuarioRotas from './routes/usuarioRotas.js';
import orcamentoRotas from './routes/orcamentoRotas.js';

// Importar middlewares
import { logMiddleware } from './middlewares/logMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

// Carregar variáveis do arquivo .env
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações do servidor
const PORT = process.env.PORT || 3002;

// Middlewares globais
app.use(helmet()); // Segurança HTTP

// Configuração CORS global — origem específica e credentials habilitados (cookie httpOnly)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:3000';
app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware para log de requisições (salva no banco de dados)
app.use(logMiddleware);

// Rotas da API
app.use('/api/auth', authRotas);
app.use('/api/produtos', produtoRotas);
app.use('/api/criptografia', criptografiaRotas);
app.use('/api/usuarios', usuarioRotas);
app.use('/api/orcamentos', orcamentoRotas);

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        sucesso: true,
        mensagem: 'API de Produtos - Sistema de Gestão',
        versao: '1.0.0',
        rotas: {
            autenticacao: '/api/auth',
            produtos: '/api/produtos',
            criptografia: '/api/criptografia',
            orcamentos: '/api/orcamentos'
        },
        documentacao: {
            login: 'POST /api/auth/login',
            registrar: 'POST /api/auth/registrar',
            perfil: 'GET /api/auth/perfil', 

            listarProdutos: 'GET /api/produtos',
            buscarProduto: 'GET /api/produtos/:id',
            criarProduto: 'POST /api/produtos',
            atualizarProduto: 'PUT /api/produtos/:id',
            excluirProduto: 'DELETE /api/produtos/:id',

            infoCriptografia: 'GET /api/criptografia/info',
            cadastrarUsuario: 'POST /api/criptografia/cadastrar-usuario',
            
            criarOrcamento: 'POST /api/orcamentos',
            listarOrcamentos: 'GET /api/orcamentos',
            buscarOrcamento: 'GET /api/orcamentos/:id',
            atualizarOrcamento: 'PUT /api/orcamentos/:id',
            aceitarOrcamento: 'PATCH /api/orcamentos/:id/aceitar',
            recusarOrcamento: 'PATCH /api/orcamentos/:id/recusar',
            excluirOrcamento: 'DELETE /api/orcamentos/:id'
        }
    });
});

// Middleware para tratar rotas não encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        sucesso: false,
        erro: 'Rota não encontrada',
        mensagem: `A rota ${req.method} ${req.originalUrl} não foi encontrada`
    });
});

// Middleware global de tratamento de erros (deve ser o último)
app.use(errorMiddleware);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log(`API da Luminar - Sistema de Gestão de Energia Solar`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

export default app;

