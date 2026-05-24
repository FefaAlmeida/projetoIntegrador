import * as userModel from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { validator } from '../utils/validator.js';

// CRUD admin de usuários. Endpoints aqui exigem authMiddleware + adminMiddleware.
// Cadastro normal de usuário fica em auth.service.js (register).

const ALLOWED_TYPES = ['CLIENTE', 'ADMIN'];

const sanitizeUser = ({ senha, ...rest }) => rest;

export const list = async (query) => {
  const { page, limit, offset } = validator.pagination(query);
  const { users, total } = await userModel.listAll(limit, offset);
  return {
    data: users.map(sanitizeUser),
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
};

export const create = async ({ nome, email, senha, tipo }) => {
  validator.required({ nome, email, senha });
  validator.length(nome, 2, 255, 'nome');
  validator.email(email);
  validator.length(senha, 6, 100, 'senha');

  const type = validator.oneOf(tipo || 'CLIENTE', ALLOWED_TYPES, 'tipo');
  const normalizedEmail = String(email).trim().toLowerCase();

  if (await userModel.findByEmail(normalizedEmail)) {
    throw ApiError.conflict('Email já cadastrado');
  }

  const id = await userModel.create({
    nome: String(nome).trim(),
    email: normalizedEmail,
    senha,
    tipo: type,
  });

  return { id, nome: String(nome).trim(), email: normalizedEmail, tipo: type };
};

export const update = async (rawId, { nome, email, senha, tipo }) => {
  const id = validator.id(rawId, 'usuário');
  const existing = await userModel.findById(id);
  if (!existing) throw ApiError.notFound('Usuário');

  const fields = {};

  if (nome !== undefined) {
    validator.length(nome, 2, 255, 'nome');
    fields.nome = String(nome).trim();
  }

  if (email !== undefined) {
    validator.email(email);
    const normalized = String(email).trim().toLowerCase();
    const conflict = await userModel.findByEmail(normalized);
    if (conflict && conflict.id !== id) throw ApiError.conflict('Email já cadastrado');
    fields.email = normalized;
  }

  if (senha !== undefined) {
    validator.length(senha, 6, 100, 'senha');
    fields.senha = senha;
  }

  if (tipo !== undefined) {
    fields.tipo = validator.oneOf(tipo, ALLOWED_TYPES, 'tipo');
  }

  if (Object.keys(fields).length === 0) {
    throw ApiError.validation('Nenhum campo enviado para atualizar');
  }

  const affectedRows = await userModel.update(id, fields);
  return { affectedRows };
};

export const remove = async (rawId) => {
  const id = validator.id(rawId, 'usuário');
  const existing = await userModel.findById(id);
  if (!existing) throw ApiError.notFound('Usuário');
  const affectedRows = await userModel.remove(id);
  return { affectedRows };
};
