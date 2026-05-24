import * as productService from '../services/product.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok, created, paginated } from '../utils/response.js';

export const list = asyncHandler(async (req, res) => {
  const { data, pagination } = await productService.list(req.query);
  paginated(res, data, pagination);
});

export const findById = asyncHandler(async (req, res) => {
  const data = await productService.findById(req.params.id);
  ok(res, data);
});

export const create = asyncHandler(async (req, res) => {
  const data = await productService.create(req.body, req.file);
  created(res, data, 'Produto criado com sucesso');
});

export const update = asyncHandler(async (req, res) => {
  const data = await productService.update(req.params.id, req.body, req.file);
  ok(res, data, 'Produto atualizado com sucesso');
});

export const remove = asyncHandler(async (req, res) => {
  const data = await productService.remove(req.params.id);
  ok(res, data, 'Produto excluído com sucesso');
});

export const uploadImage = asyncHandler(async (req, res) => {
  const data = await productService.uploadImage(req.body.produto_id, req.file);
  ok(res, data, 'Imagem enviada com sucesso');
});
