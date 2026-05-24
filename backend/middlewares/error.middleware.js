import { ApiError } from '../utils/apiError.js';

// Middleware global de tratamento de erro. SEMPRE registrado por último no app.js.
// Recebe qualquer erro lançado nos controllers/services e devolve resposta JSON
// no formato { success: false, message, ... }.
export const errorMiddleware = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json(error.toJSON());
  }

  // JSON malformado vindo do body parser
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res
      .status(400)
      .json({ success: false, message: 'JSON inválido no corpo da requisição' });
  }

  console.error('Erro não tratado:', {
    message: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === 'development'
        ? `${error.code || error.name || 'Error'}: ${error.sqlMessage || error.message}`
        : 'Erro interno do servidor',
  });
};
