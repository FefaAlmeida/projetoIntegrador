import * as productModel from '../models/product.model.js';
import { ApiError } from '../utils/apiError.js';
import { validator } from '../utils/validator.js';
import { removerArquivoAntigo } from '../middlewares/upload.middleware.js';

export const list = async (query) => {
  const { page, limit, offset } = validator.pagination(query);
  const { products, total } = await productModel.listAll(limit, offset);
  return {
    data: products,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

export const findById = async (rawId) => {
  const id = validator.id(rawId, 'produto');
  const product = await productModel.findById(id);
  if (!product) throw ApiError.notFound('Produto');
  return product;
};

export const create = async ({ nome, descricao, preco, categoria }, file) => {
  validator.required({ nome, preco });
  validator.length(nome, 3, 255, 'nome');
  const price = validator.positiveNumber(preco, 'preco');

  const id = await productModel.create({
    nome: String(nome).trim(),
    descricao: descricao ? String(descricao).trim() : null,
    preco: price,
    categoria: categoria ? String(categoria).trim() : 'Geral',
    imagem: file?.filename ?? null,
  });

  return {
    id,
    nome: String(nome).trim(),
    preco: price,
    categoria: categoria ? String(categoria).trim() : 'Geral',
  };
};

export const update = async (rawId, { nome, descricao, preco, categoria }, file) => {
  const id = validator.id(rawId, 'produto');
  const existing = await productModel.findById(id);
  if (!existing) throw ApiError.notFound('Produto');

  const fields = {};
  if (nome !== undefined) {
    validator.length(nome, 3, 255, 'nome');
    fields.nome = String(nome).trim();
  }
  if (preco !== undefined) fields.preco = validator.positiveNumber(preco, 'preco');
  if (descricao !== undefined) fields.descricao = descricao ? String(descricao).trim() : null;
  if (categoria !== undefined) fields.categoria = categoria ? String(categoria).trim() : 'Geral';
  if (file) {
    if (existing.imagem) await removerArquivoAntigo(existing.imagem, 'imagem');
    fields.imagem = file.filename;
  }

  if (Object.keys(fields).length === 0) {
    throw ApiError.validation('Nenhum campo enviado para atualizar');
  }

  const affectedRows = await productModel.update(id, fields);
  return { affectedRows };
};

export const remove = async (rawId) => {
  const id = validator.id(rawId, 'produto');
  const existing = await productModel.findById(id);
  if (!existing) throw ApiError.notFound('Produto');
  if (existing.imagem) await removerArquivoAntigo(existing.imagem, 'imagem');
  const affectedRows = await productModel.remove(id);
  return { affectedRows };
};

export const uploadImage = async (rawProductId, file) => {
  const id = validator.id(rawProductId, 'produto');
  if (!file) throw ApiError.validation('Imagem é obrigatória');

  const existing = await productModel.findById(id);
  if (!existing) throw ApiError.notFound('Produto');

  if (existing.imagem) await removerArquivoAntigo(existing.imagem, 'imagem');
  await productModel.update(id, { imagem: file.filename });

  return { filename: file.filename, path: `/uploads/imagens/${file.filename}` };
};
