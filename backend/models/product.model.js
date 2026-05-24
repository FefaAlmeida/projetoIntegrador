import { getConnection } from '../config/database.js';

// Camada de acesso ao banco da tabela `produtos`.

export const listAll = async (limit, offset) => {
  const conn = await getConnection();
  try {
    const [products] = await conn.query(
      'SELECT * FROM produtos ORDER BY id DESC LIMIT ? OFFSET ?',
      [limit, offset],
    );
    const [[{ total }]] = await conn.execute('SELECT COUNT(*) AS total FROM produtos');
    return { products, total };
  } finally {
    conn.release();
  }
};

export const findById = async (id) => {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute('SELECT * FROM produtos WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  } finally {
    conn.release();
  }
};

export const findByCategory = async (categoria) => {
  const conn = await getConnection();
  try {
    const [rows] = await conn.execute('SELECT * FROM produtos WHERE categoria = ?', [categoria]);
    return rows;
  } finally {
    conn.release();
  }
};

export const create = async ({
  nome,
  descricao = null,
  preco,
  categoria = 'Geral',
  imagem = null,
}) => {
  const conn = await getConnection();
  try {
    const [result] = await conn.execute(
      'INSERT INTO produtos (nome, descricao, preco, categoria, imagem) VALUES (?, ?, ?, ?, ?)',
      [nome, descricao, preco, categoria, imagem],
    );
    return result.insertId;
  } finally {
    conn.release();
  }
};

export const update = async (id, fields) => {
  const setClauses = [];
  const values = [];
  for (const [key, value] of Object.entries(fields)) {
    setClauses.push(`${key} = ?`);
    values.push(value);
  }
  if (setClauses.length === 0) return 0;

  const conn = await getConnection();
  try {
    const [result] = await conn.execute(
      `UPDATE produtos SET ${setClauses.join(', ')} WHERE id = ?`,
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
    const [result] = await conn.execute('DELETE FROM produtos WHERE id = ?', [id]);
    return result.affectedRows;
  } finally {
    conn.release();
  }
};
