import jwt from 'jsonwebtoken';
import * as userModel from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { validator } from '../utils/validator.js';
import { comparePassword } from '../utils/password.js';
import { JWT_CONFIG } from '../config/jwt.js';

// Toda a regra de negócio de autenticação mora aqui.
// Controller só converte req/res. Service não toca em req/res.

const ALLOWED_TYPES = ['CLIENTE', 'ADMIN'];

const sanitizeUser = ({ senha, ...rest }) => rest;

const generateToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, tipo: user.tipo }, JWT_CONFIG.secret, {
    expiresIn: JWT_CONFIG.expiresIn,
  });

export const login = async ({ email, senha }) => {
  validator.required({ email, senha });
  validator.email(email);

  const user = await userModel.findByEmail(String(email).trim());
  if (!user || !(await comparePassword(senha, user.senha))) {
    throw ApiError.unauthorized('Email ou senha incorretos');
  }

  return { token: generateToken(user), usuario: sanitizeUser(user) };
};

export const register = async ({ nome, email, senha, tipo }) => {
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

export const getProfile = async (userId) => {
  const user = await userModel.findById(userId);
  if (!user) throw ApiError.notFound('Usuário');
  return sanitizeUser(user);
};

export const updateProfile = async (userId, { nome, email, senhaAtual, novaSenha }) => {
  const current = await userModel.findById(userId);
  if (!current) throw ApiError.notFound('Usuário');

  const fields = {};

  if (nome !== undefined) {
    validator.length(nome, 2, 255, 'nome');
    fields.nome = String(nome).trim();
  }

  if (email !== undefined) {
    validator.email(email);
    const normalized = String(email).trim().toLowerCase();
    if (normalized !== current.email) {
      const conflict = await userModel.findByEmail(normalized);
      if (conflict && conflict.id !== userId) throw ApiError.conflict('Email já cadastrado');
    }
    fields.email = normalized;
  }

  if (novaSenha) {
    if (!senhaAtual) throw ApiError.validation('Informe sua senha atual');
    validator.length(novaSenha, 6, 100, 'novaSenha');
    if (!(await comparePassword(senhaAtual, current.senha))) {
      throw ApiError.unauthorized('Senha atual incorreta');
    }
    fields.senha = novaSenha;
  }

  if (Object.keys(fields).length === 0) {
    throw ApiError.validation('Nenhuma alteração foi enviada');
  }

  await userModel.update(userId, fields);
  return getProfile(userId);
};
