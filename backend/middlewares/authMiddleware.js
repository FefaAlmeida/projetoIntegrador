import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';
import { AUTH_COOKIE } from '../utils/authCookie.js';

// Middleware de autenticação JWT — lê token do cookie httpOnly OU do header Authorization
const authMiddleware = (req, res, next) => {
    try {
        // 1) cookie httpOnly (padrão novo do frontend)
        let token = req.cookies?.[AUTH_COOKIE];

        // 2) fallback: header Authorization (clientes legados / Postman)
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.slice(7);
            }
        }

        if (!token) {
            return res.status(401).json({
                erro: 'Token de acesso não fornecido',
                mensagem: 'É necessário fornecer um token de autenticação'
            });
        }

        // Verificar e decodificar o token
        const decoded = jwt.verify(token, JWT_CONFIG.secret);

        // Adicionar informações do usuário ao request
        req.usuario = {
            id: decoded.id,
            tipo_usuario: decoded.tipo_usuario,
            email: decoded.email
        };

        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                erro: 'Token expirado',
                mensagem: 'Faça login novamente'
            });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                erro: 'Token inválido',
                mensagem: 'Token de autenticação inválido'
            });
        }

        console.error('Erro no middleware de autenticação:', error);
        return res.status(500).json({ 
            erro: 'Erro interno do servidor',
            mensagem: 'Erro ao processar autenticação'
        });
    }
};

// Middleware para verificar se o usuário é administrador
const adminMiddleware = (req, res, next) => {
    if (req.usuario.tipo_usuario !== 'ADMIN') {
        return res.status(403).json({ 
            erro: 'Acesso negado',
            mensagem: 'Apenas administradores podem acessar este recurso'
        });
    }
    next();
};

export { authMiddleware, adminMiddleware };

