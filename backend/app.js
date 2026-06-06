import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rotas
import authRotas from './routes/authRotas.js';
import criptografiaRotas from './routes/criptografiaRotas.js';
import usuarioRotas from './routes/usuarioRotas.js';
import empresaRotas from './routes/empresaRotas.js';
import orcamentoRotas from './routes/orcamentoRotas.js';
import faleConoscoRotas from './routes/faleConoscoRotas.js';
import dashboardRotas from './routes/dashboardRotas.js';
import pagamentoRotas from './routes/pagamentoRotas.js';
import instalacaoRotas from './routes/instalacaoRotas.js';
import tecnicoRotas from './routes/tecnicoRotas.js';

// Importar middlewares
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
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//  Servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas da API
app.use('/api/auth', authRotas);
app.use('/api/criptografia', criptografiaRotas);
app.use('/api/usuarios', usuarioRotas);
app.use('/api/empresas', empresaRotas);
app.use('/api/orcamentos', orcamentoRotas);
app.use('/api/faleConosco', faleConoscoRotas);
app.use('/api/dashboard', dashboardRotas);
app.use('/api/pagamentos', pagamentoRotas);
app.use('/api/instalacoes', instalacaoRotas);
app.use('/api/tecnicos', tecnicoRotas);

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        sucesso: true,
        mensagem: 'API da Luminar - Sistema de Gestão de Energia Solar',
        versao: '1.0.0',
        rotas: {
            autenticacao: '/api/auth',
            criptografia: '/api/criptografia',
            orcamentos: '/api/orcamentos'
        },
        documentacao: {
            login: 'POST /api/auth/login',
            registrar: 'POST /api/criarUsuario',
            perfil: 'GET /api/auth/perfil', 

            infoCriptografia: 'GET /api/criptografia/info',
            cadastrarUsuario: 'POST /api/criptografia/cadastrar-usuario',
            
            criarOrcamento: 'POST /api/orcamentos',
            listarOrcamentos: 'GET /api/orcamentos',
            buscarOrcamento: 'GET /api/orcamentos/:id',
            atualizarOrcamento: 'PUT /api/orcamentos/:id',
            aceitarOrcamento: 'PATCH /api/orcamentos/:id/aceitar',
            recusarOrcamento: 'PATCH /api/orcamentos/:id/recusar',
            excluirOrcamento: 'DELETE /api/orcamentos/:id',
            criarFaleConosco: 'POST /api/faleConosco',
            listarFaleConosco: 'GET /api/faleConosco', 
            excluirFaleConosco: 'DELETE /api/faleConosco/:id' 
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

