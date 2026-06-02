import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

class OrcamentoModel {

    static async listarTodos(limite, offset) {
        try {

            const connection = await getConnection();

            try {

                const sql = `
                    SELECT *
                    FROM solicitacoes_orcamentos
                    ORDER BY id_solicitacao DESC
                    LIMIT ? OFFSET ?
                `;

                const [orcamentos] = await connection.query(
                    sql,
                    [limite, offset]
                );

                const [totalResult] = await connection.execute(
                    'SELECT COUNT(*) as total FROM solicitacoes_orcamentos'
                );

                const total = totalResult[0].total;

                return {
                    orcamentos,
                    total,
                    pagina: (offset / limite) + 1,
                    limite,
                    totalPaginas: Math.ceil(total / limite)
                };

            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar orçamentos:', error);
            throw error;
        }
    }

    static async buscarPorId(id) {
        try {

            const rows = await read(
                'solicitacoes_orcamentos',
                `id_solicitacao = ${id}`
            );

            return rows[0] || null;

        } catch (error) {
            console.error('Erro ao buscar orçamento:', error);
            throw error;
        }
    }

    static async buscarPorEmail(email) {
        try {

            return await read(
                'solicitacoes_orcamentos',
                `email_contato = '${email}'`
            );

        } catch (error) {
            console.error('Erro ao buscar orçamento por email:', error);
            throw error;
        }
    }

    static async listarPendentes() {
        try {

            return await read(
                'solicitacoes_orcamentos',
                "status_solicitacao = 'PENDENTE'"
            );

        } catch (error) {
            console.error('Erro ao listar pendentes:', error);
            throw error;
        }
    }

    static async listarAceitas() {
        try {

            return await read(
                'solicitacoes_orcamentos',
                "status_solicitacao = 'ACEITA'"
            );

        } catch (error) {
            console.error('Erro ao listar aceitas:', error);
            throw error;
        }
    }

    static async listarRecusadas() {
        try {

            return await read(
                'solicitacoes_orcamentos',
                "status_solicitacao = 'RECUSADA'"
            );

        } catch (error) {
            console.error('Erro ao listar recusadas:', error);
            throw error;
        }
    }

    static async criar(dadosOrcamento) {
        try {

            return await create(
                'solicitacoes_orcamentos',
                dadosOrcamento
            );

        } catch (error) {
            console.error('Erro ao criar orçamento:', error);
            throw error;
        }
    }

    static async atualizar(id, dadosOrcamento) {
        try {

            return await update(
                'solicitacoes_orcamentos',
                dadosOrcamento,
                `id_solicitacao = ${id}`
            );

        } catch (error) {
            console.error('Erro ao atualizar orçamento:', error);
            throw error;
        }
    }

    static async excluir(id) {
        try {

            return await deleteRecord(
                'solicitacoes_orcamentos',
                `id_solicitacao = ${id}`
            );

        } catch (error) {
            console.error('Erro ao excluir orçamento:', error);
            throw error;
        }
    }

    static async salvarToken(id_solicitacao, token) {
        const connection = await getConnection();

        try {
            const sql = `
                UPDATE solicitacoes_orcamentos
                SET token_cadastro = ?
                WHERE id_solicitacao = ?
            `;

            await connection.execute(sql, [
                token,
                id_solicitacao
            ]);

        } finally {
            connection.release();
        }
    }

    static async buscarPorToken(token) {
        const connection = await getConnection();

        try {

            const sql = `
                SELECT *
                FROM solicitacoes_orcamentos
                WHERE token_cadastro = ?
                AND status_solicitacao = 'ACEITA'
                LIMIT 1
            `;

            const [rows] = await connection.execute(
                sql,
                [token]
            );

            return rows[0] || null;

        } finally {
            connection.release();
        }
    }

    static async invalidarToken(token) {
        const connection = await getConnection();

        try {

            const sql = `
                UPDATE solicitacoes_orcamentos
                SET token_cadastro = NULL
                WHERE token_cadastro = ?
            `;

            await connection.execute(sql, [token]);

        } finally {
            connection.release();
        }
    }

}

export default OrcamentoModel;