import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';

import { simpleLogMiddleware } from './middlewares/log.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(simpleLogMiddleware);

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', userRoutes);
app.use('/api/produtos', productRoutes);

// Documentação rápida na raiz
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API Luminar',
    version: '1.0.0',
    routes: {
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/registrar',
        getProfile: 'GET /api/auth/perfil',
        updateProfile: 'PUT /api/auth/perfil',
      },
      users: {
        list: 'GET /api/usuarios (admin)',
        create: 'POST /api/usuarios (admin)',
        update: 'PUT /api/usuarios/:id (admin)',
        remove: 'DELETE /api/usuarios/:id (admin)',
      },
      products: {
        list: 'GET /api/produtos',
        findById: 'GET /api/produtos/:id',
        create: 'POST /api/produtos',
        update: 'PUT /api/produtos/:id',
        remove: 'DELETE /api/produtos/:id',
      },
    },
  });
});

// 404 para rotas não tratadas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `${req.method} ${req.originalUrl} não existe`,
  });
});

// Tratamento global de erro (último middleware)
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`API Luminar rodando em http://localhost:${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
