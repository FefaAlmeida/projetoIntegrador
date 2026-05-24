import { getConnection } from '../config/database.js';
import { hashPassword } from '../utils/password.js';

// Camada de acesso ao banco. Toda query usa prepared statements (?).
// A tabela MySQL usa colunas em PT (id_usuario, tipo_usuario), mas
// expomos os nomes "canônicos" (id, nome, tipo) via SELECT ... AS ...
// para o resto do código não precisar saber dos nomes reais das colunas.

const SELECT_FIELDS = `
  id_usuario AS id,
  nome,
  email,
  senha,
  tipo_usuario AS tipo,
  status_usuario AS status,
  id_empresa
`;

export const findById = async (id) => {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT ${SELECT_FIELDS} FROM usuarios WHERE id_usuario = ? LIMIT 1`,
      [id],
    );
    return rows[0] || null;
  } finally {
    conn.release();
  }
};

export const findByEmail = async (email) => {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute(
      `SELECT ${SELECT_FIELDS} FROM usuarios WHERE email = ? LIMIT 1`,
      [email],
    );
    return rows[0] || null;
  } finally {
    conn.release();
  }
};

export const listAll = async (limit, offset) => {
  const conn = await getConnection();
  try {
    const [users] = await conn.query(
      `SELECT ${SELECT_FIELDS} FROM usuarios ORDER BY id_usuario DESC LIMIT ? OFFSET ?`,
      [limit, offset],
    );
    const [[{ total }]] = await conn.execute('SELECT COUNT(*) AS total FROM usuarios');
    return { users, total };
  } finally {
    conn.release();
  }
};

export const create = async ({ nome, email, senha, tipo }) => {
  const passwordHash = await hashPassword(senha);
  const conn = await getConnection();
  try {
    const [result] = await conn.execute(
      'INSERT INTO usuarios (nome, email, senha, tipo_usuario) VALUES (?, ?, ?, ?)',
      [nome, email, passwordHash, tipo],
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

// Mapa de campo lógico → coluna real no banco (pra UPDATE dinâmico).
const COLUMN_MAP = {
  nome: 'nome',
  email: 'email',
  senha: 'senha',
  tipo: 'tipo_usuario',
};

export const update = async (id, fields) => {
  const setClauses = [];
  const values = [];

  for (const [key, value] of Object.entries(fields)) {
    const column = COLUMN_MAP[key];
    if (!column) continue;
    setClauses.push(`${column} = ?`);
    values.push(key === 'senha' ? await hashPassword(value) : value);
  }

  if (setClauses.length === 0) return 0;

  const conn = await getConnection();
  try {
    const [result] = await conn.execute(
      `UPDATE usuarios SET ${setClauses.join(', ')} WHERE id_usuario = ?`,
      [...values, id],
    );
    return result.affectedRows;
  } finally {
    conn.release();
  }
};

export const remove = async (id) => {
  const conn = await getConnection();
  try {
    const [result] = await conn.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
    return result.affectedRows;
  } finally {
    conn.release();
  }
};
