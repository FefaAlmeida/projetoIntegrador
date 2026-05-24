import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt.js';
import { ApiError } from '../utils/apiError.js';

// Lê o header Authorization: Bearer <token>, valida o JWT e
// injeta req.usuario = { id, email, tipo } pros próximos handlers.
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw ApiError.unauthorized('Token não fornecido');

    const token = authHeader.split(' ')[1];
    if (!token) throw ApiError.unauthorized('Formato do token inválido');

    const decoded = jwt.verify(token, JWT_CONFIG.secret);
    req.usuario = { id: decoded.id, email: decoded.email, tipo: decoded.tipo };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(ApiError.unauthorized('Sessão expirada. Faça login novamente'));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(ApiError.unauthorized('Token inválido'));
    }
    next(error);
  }
};

// Bloqueia rota se o usuário não for admin. Sempre usar DEPOIS de authMiddleware.
export const adminMiddleware = (req, res, next) => {
  if (req.usuario?.tipo !== 'ADMIN') {
    return next(ApiError.forbidden('Apenas administradores podem acessar este recurso'));
  }
  next();
};
