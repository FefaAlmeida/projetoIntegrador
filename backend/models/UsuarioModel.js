import { hashPassword, comparePassword, getConnection } from '../config/database.js';

// Model para operações com usuários
// — fazemos o aliasing via SELECT ... AS ... pra manter a interface consistente.
class UsuarioModel {
    // Listar todos os usuários (com paginação)
    static async listarTodos(pagina = 1, limite = 10) {
        const offset = (pagina - 1) * limite;
        const connection = await getConnection();
        try {
            const sql = `
                SELECT id_usuario AS id, nome, email, senha, tipo_usuario, status_usuario AS status, id_empresa
                FROM usuarios
                ORDER BY id_usuario DESC
                LIMIT ? OFFSET ?
            `;
            const [usuarios] = await connection.query(sql, [limite, offset]);

            const [totalResult] = await connection.execute('SELECT COUNT(*) as total FROM usuarios');
            const total = totalResult[0].total;

            return {
                usuarios,
                total,
                pagina,
                limite,
                totalPaginas: Math.ceil(total / limite)
            };
        } finally {
            connection.release();
        }
    }

    static async buscarPorId(id) {
        const connection = await getConnection();
        try {
            const sql = `
                SELECT id_usuario AS id, nome, email, senha, tipo_usuario, status_usuario AS status, id_empresa
                FROM usuarios
                WHERE id_usuario = ?
                LIMIT 1
            `;
            const [rows] = await connection.execute(sql, [id]);
            return rows[0] || null;
        } finally {
            connection.release();
        }
    }

    static async buscarPorEmail(email) {
        const connection = await getConnection();
        try {
            const sql = `
                SELECT id_usuario AS id, nome, email, senha, tipo_usuario, status_usuario AS status, id_empresa
                FROM usuarios
                WHERE email = ?
                LIMIT 1
            `;
            const [rows] = await connection.execute(sql, [email]);
            return rows[0] || null;
        } finally {
            connection.release();
        }
    }

    static async criar(dadosUsuario) {
        const senhaHash = await hashPassword(dadosUsuario.senha);
        const connection = await getConnection();
        try {
            const sql = `
                INSERT INTO usuarios (nome, email, senha, tipo_usuario)
                VALUES (?, ?, ?, ?)
            `;
            const [result] = await connection.execute(sql, [
                dadosUsuario.nome,
                dadosUsuario.email,
                senhaHash,
                dadosUsuario.tipo_usuario
            ]);
            return result.insertId;
        } finally {
            connection.release();
        }
    }

    static async atualizar(id, dadosUsuario) {
        const campos = [];
        const valores = [];

        if (dadosUsuario.nome !== undefined) {
            campos.push('nome = ?');
            valores.push(dadosUsuario.nome);
        }
        if (dadosUsuario.email !== undefined) {
            campos.push('email = ?');
            valores.push(dadosUsuario.email);
        }
        if (dadosUsuario.senha !== undefined) {
            campos.push('senha = ?');
            valores.push(await hashPassword(dadosUsuario.senha));
        }
        if (dadosUsuario.tipo_usuario !== undefined) {
            campos.push('tipo_usuario = ?');
            valores.push(dadosUsuario.tipo_usuario);
        }

        if (campos.length === 0) return 0;

        const connection = await getConnection();
        try {
            const sql = `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = ?`;
            const [result] = await connection.execute(sql, [...valores, id]);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    static async excluir(id) {
        const connection = await getConnection();
        try {
            const [result] = await connection.execute('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
            return result.affectedRows;
        } finally {
            connection.release();
        }
    }

    static async verificarCredenciais(email, senha) {
        const usuario = await this.buscarPorEmail(email);
        if (!usuario) return null;

        const senhaValida = await comparePassword(senha, usuario.senha);
        if (!senhaValida) return null;

        const { senha: _, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }
}

export default UsuarioModel;
