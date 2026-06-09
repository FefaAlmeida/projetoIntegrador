import { getConnection } from '../config/database.js';

class FinanceiroClienteModel {

    // 1. Usa o id_solicitacao recuperado para caçar o orçamento aceito
    static async obterOrcamentoAprovado(id_solicitacao) {
        const db = await getConnection();
        try {
            const query = `
                SELECT valor_total 
                FROM solicitacoes_orcamentos 
                WHERE id_solicitacao = ? AND status_solicitacao = 'ACEITA' 
                LIMIT 1
            `;
            const [rows] = await db.execute(query, [id_solicitacao]);
            return rows[0];
        } finally {
            db.release();
        }
    }

    // 2. Verifica as parcelas na tabela pagamentos usando a coluna mapeada (id_empresa)
    static async verificarSeJaTemParcelas(id_solicitacao) {
        const db = await getConnection();
        try {
            const query = `SELECT COUNT(*) as total FROM pagamentos WHERE id_empresa = ?`;
            const [rows] = await db.execute(query, [id_solicitacao]);
            return rows[0].total > 0;
        } finally {
            db.release();
        }
    }

    // 3. Geração em lote salvando o ID na coluna id_empresa da tabela pagamentos
    static async gerarParcelas(id_solicitacao, parcelas) {
        const db = await getConnection();
        try {
            const query = `
                INSERT INTO pagamentos 
                (id_empresa, valor, tipo_pagamento, numero_parcela, quantidade_parcelas, status_pagamento, forma_pagamento, data_vencimento)
                VALUES ?
            `;
            const valores = parcelas.map(p => [
                id_solicitacao, p.valor, p.tipo_pagamento, p.numero_parcela, p.quantidade_parcelas, 'PENDENTE', p.forma_pagamento, p.data_vencimento
            ]);

            await db.query(query, [valores]);
        } finally {
            db.release();
        }
    }

    // 4. Listagem (CORRIGIDO: Desestrutura estritamente id_empresa vindo do controller)
    static async listarPorEmpresa({ id_empresa, limite, offset, status }) {
        const db = await getConnection();
        try {
            let query = `SELECT * FROM pagamentos WHERE id_empresa = ?`;
            const params = [id_empresa];

            if (status) {
                query += ` AND status_pagamento = ?`;
                params.push(status);
            }

            query += ` ORDER BY data_vencimento ASC LIMIT ? OFFSET ?`;
            params.push(Number(limite), Number(offset));

            const [pagamentos] = await db.execute(query, params);

            let countQuery = `SELECT COUNT(*) as total FROM pagamentos WHERE id_empresa = ?`;
            const countParams = [id_empresa];
            if (status) {
                countQuery += ` AND status_pagamento = ?`;
                countParams.push(status);
            }
            const [countRows] = await db.execute(countQuery, countParams);

            return { pagamentos, total: countRows[0].total };
        } finally {
            db.release();
        }
    }

    // 5. Resumo financeiro mapeado pela coluna id_empresa
    static async obterResumoCliente(id_solicitacao) {
        const db = await getConnection();
        try {
            const query = `
                SELECT 
                    COALESCE(SUM(CASE WHEN status_pagamento = 'PAGO' THEN valor END), 0) as totalPago,
                    COALESCE(SUM(CASE WHEN status_pagamento = 'PENDENTE' THEN valor END), 0) as totalPendente,
                    COALESCE(SUM(CASE WHEN status_pagamento = 'ATRASADO' THEN valor END), 0) as totalAtrasado,
                    COUNT(CASE WHEN status_pagamento = 'PAGO' THEN 1 END) as qtdRecebidos,
                    COUNT(CASE WHEN status_pagamento = 'PENDENTE' THEN 1 END) as qtdPendentes,
                    COUNT(CASE WHEN status_pagamento = 'ATRASADO' THEN 1 END) as quantidadeAtrasada
                FROM pagamentos 
                WHERE id_empresa = ?
            `;
            const [rows] = await db.execute(query, [id_solicitacao]);
            return rows[0];
        } finally {
            db.release();
        }
    }

    // 6. Altera forma futura
    static async alterarFormaPagamentoFutura(id_solicitacao, novaForma) {
        if (!id_solicitacao || !novaForma) {
            throw new Error(`Parâmetros inválidos.`);
        }
        const db = await getConnection();
        try {
            const query = `
                UPDATE pagamentos 
                SET forma_pagamento = ? 
                WHERE id_empresa = ? AND status_pagamento IN ('PENDENTE', 'ATRASADO')
            `;
            await db.execute(query, [novaForma, id_solicitacao]);
        } finally {
            db.release();
        }
    }

    // 7. Registra pagamento
    static async registrarPagamento(id_pagamento, id_solicitacao) {
        const db = await getConnection();
        try {
            const query = `
                UPDATE pagamentos 
                SET status_pagamento = 'PAGO', data_pagamento = CURDATE() 
                WHERE id_pagamento = ? AND id_empresa = ? AND status_pagamento IN ('PENDENTE', 'ATRASADO')
            `;
            const [result] = await db.execute(query, [id_pagamento, id_solicitacao]);
            return result.affectedRows > 0;
        } finally {
            db.release();
        }
    }

    // 8. Sincroniza atrasados
    static async sincronizarAtrasadosPorEmpresa(id_solicitacao) {
        const db = await getConnection();
        try {
            const query = `
                UPDATE pagamentos 
                SET status_pagamento = 'ATRASADO' 
                WHERE id_empresa = ? AND status_pagamento = 'PENDENTE' AND data_vencimento < CURDATE()
            `;
            await db.execute(query, [id_solicitacao]);
        } finally {
            db.release();
        }
    }
}

export default FinanceiroClienteModel;