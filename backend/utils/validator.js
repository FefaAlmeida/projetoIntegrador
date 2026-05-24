import { ApiError } from './apiError.js';

// Conjunto de validações reutilizáveis. Cada função lança ApiError.validation
// quando falha — o errorMiddleware converte automaticamente em resposta 400.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validator = {
  // Recebe um objeto { campo1: valor1, campo2: valor2 } e checa que nenhum está vazio.
  required(fields) {
    const missing = Object.entries(fields)
      .filter(([, value]) => value === undefined || value === null || String(value).trim() === '')
      .map(([name]) => name);
    if (missing.length > 0) {
      throw ApiError.validation(`Campos obrigatórios: ${missing.join(', ')}`, { fields: missing });
    }
  },

  email(value, field = 'email') {
    if (!EMAIL_REGEX.test(String(value))) {
      throw ApiError.validation(`Formato de ${field} inválido`);
    }
  },

  length(value, min, max, field = 'campo') {
    const len = String(value).length;
    if (len < min) throw ApiError.validation(`${field} deve ter pelo menos ${min} caracteres`);
    if (len > max) throw ApiError.validation(`${field} deve ter no máximo ${max} caracteres`);
  },

  // Devolve o valor em UPPERCASE caso esteja na lista de opções; senão lança erro.
  oneOf(value, options, field = 'campo') {
    const normalized = String(value).toUpperCase();
    if (!options.includes(normalized)) {
      throw ApiError.validation(`${field} deve ser um de: ${options.join(', ')}`);
    }
    return normalized;
  },

  positiveNumber(value, field = 'campo') {
    const num = Number(value);
    if (isNaN(num) || num <= 0) {
      throw ApiError.validation(`${field} deve ser um número positivo`);
    }
    return num;
  },

  // Garante que o id é um inteiro positivo. Retorna o número parseado.
  id(value, resource = 'recurso') {
    const num = Number(value);
    if (!Number.isInteger(num) || num <= 0) {
      throw ApiError.validation(`ID de ${resource} inválido`);
    }
    return num;
  },

  // Lê e valida ?page=&limit= da query string. Retorna { page, limit, offset } prontos.
  pagination(query) {
    const page = parseInt(query.page || query.pagina) || 1;
    const limit = parseInt(query.limit || query.limite) || 10;
    const maxLimit = parseInt(process.env.PAGINACAO_LIMITE_MAXIMO) || 100;

    if (page < 1) throw ApiError.validation('page deve ser maior que zero');
    if (limit < 1 || limit > maxLimit) {
      throw ApiError.validation(`limit deve estar entre 1 e ${maxLimit}`);
    }
    return { page, limit, offset: (page - 1) * limit };
  },
};
