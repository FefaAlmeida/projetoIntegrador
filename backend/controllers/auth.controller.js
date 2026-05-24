import * as authService from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok, created } from '../utils/response.js';

// Controller é fininho: lê req, chama service, devolve response.
// Nenhuma regra de negócio mora aqui.

export const login = asyncHandler(async (req, res) => {
  const data = await authService.login(req.body);
  ok(res, data, 'Login realizado com sucesso');
});

export const register = asyncHandler(async (req, res) => {
  const data = await authService.register(req.body);
  created(res, data, 'Usuário registrado com sucesso');
});

export const getProfile = asyncHandler(async (req, res) => {
  const data = await authService.getProfile(req.usuario.id);
  ok(res, data);
});

export const updateProfile = asyncHandler(async (req, res) => {
  const data = await authService.updateProfile(req.usuario.id, req.body);
  ok(res, data, 'Perfil atualizado com sucesso');
});
