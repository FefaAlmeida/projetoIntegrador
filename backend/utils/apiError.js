// Erro customizado da API.
// Joga `throw new ApiError('msg', 409)` no service e o errorMiddleware
// transforma em resposta JSON com o status correto.
export class ApiError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';
    Error.captureStackTrace(this, this.constructor);
  }

  // Atalhos prontos pros casos mais comuns.
  static validation(message, details = null) {
    return new ApiError(message, 400, details);
  }

  static unauthorized(message = 'Não autorizado') {
    return new ApiError(message, 401);
  }

  static forbidden(message = 'Acesso negado') {
    return new ApiError(message, 403);
  }

  static notFound(resource = 'Recurso') {
    return new ApiError(`${resource} não encontrado`, 404);
  }

  static conflict(message) {
    return new ApiError(message, 409);
  }

  toJSON() {
    return {
      success: false,
      message: this.message,
      ...(this.details && { details: this.details }),
    };
  }
}
