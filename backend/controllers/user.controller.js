import * as userService from '../services/user.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok, created, paginated } from '../utils/response.js';

export const list = asyncHandler(async (req, res) => {
  const { data, pagination } = await userService.list(req.query);
  paginated(res, data, pagination);
});

export const create = asyncHandler(async (req, res) => {
  const data = await userService.create(req.body);
  created(res, data, 'Usuário criado com sucesso');
});

export const update = asyncHandler(async (req, res) => {
  const data = await userService.update(req.params.id, req.body);
  ok(res, data, 'Usuário atualizado com sucesso');
});

export const remove = asyncHandler(async (req, res) => {
  const data = await userService.remove(req.params.id);
  ok(res, data, 'Usuário excluído com sucesso');
});
