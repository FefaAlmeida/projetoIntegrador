import FinanceiroClienteModel from '../models/FinanceiroClienteModel.js';

class FinanceiroClienteController {

    // AGORA SIM: Método assíncrono buscando direto na tabela do banco
static async obterIdEmpresa(req) {
        const alvo = req.usuario || req.user || {};
        const email_usuario_logado = alvo.email; // Captura 'teste2@gmail.com' do Token

        if (!email_usuario_logado) return null;

        try {
            const { getConnection } = await import('../config/database.js');
            const db = await getConnection();
            
            // Buscamos o id_empresa na tabela empresa_clientes onde o e-mail seja igual ao do usuário logado
            const query = `SELECT id_empresa FROM empresa_clientes WHERE email_principal = ? LIMIT 1`;
            const [rows] = await db.execute(query, [email_usuario_logado]);
            db.release();

            if (rows.length > 0) {
                return rows[0].id_empresa; // Retorna o ID da empresa criado para o teste2@gmail.com
            } else {
                console.warn(`AVISO: Nenhuma empresa cadastrada com o e-mail ${email_usuario_logado} na tabela empresa_clientes.`);
            }
        } catch (e) {
            console.error("Erro ao buscar id_empresa por e-mail:", e);
        }

        return null; 
    }

    // GET /cliente/financeiro
    static async obterPainel(req, res) {
        try {
            // Ajustado com await
            const id_empresa = await FinanceiroClienteController.obterIdEmpresa(req);
            
            if (!id_empresa) {
                return res.status(401).json({ sucesso: false, erro: 'Empresa não identificada no token.' });
            }
            
            let pagina = Math.max(1, parseInt(req.query.pagina) || 1);
            let limite = Math.max(1, parseInt(req.query.limite) || 12);
            const offset = (pagina - 1) * limite;

            const statusValidos = ['PENDENTE', 'PAGO', 'ATRASADO'];
            const status = req.query.status && statusValidos.includes(req.query.status.toUpperCase())
                ? req.query.status.toUpperCase()
                : null;

            try {
                await FinanceiroClienteModel.sincronizarAtrasadosPorEmpresa(id_empresa);
            } catch (errSync) {
                console.error("Aviso: Falha temporária ao sincronizar faturas atrasadas:", errSync.message);
            }

            const jaConfigurou = await FinanceiroClienteModel.verificarSeJaTemParcelas(id_empresa);

            if (!jaConfigurou) {
                const orcamento = await FinanceiroClienteModel.obterOrcamentoAprovado(id_empresa);
                
                if (!orcamento) {
                    return res.status(200).json({
                        sucesso: false,
                        requerSetup: true,
                        erro: 'Nenhum orçamento aceito localizado para sua conta.'
                    });
                }

                return res.status(200).json({
                    sucesso: true,
                    requerSetup: true,
                    mensagem: 'Defina o seu parcelamento inicial baseado no seu orçamento.',
                    orcamento: { valor_total: parseFloat(orcamento.valor_total) }
                });
            }

            const resultado = await FinanceiroClienteModel.listarPorEmpresa({ id_empresa, limite, offset, status });
            const resumoBruto = await FinanceiroClienteModel.obterResumoCliente(id_empresa) || {};

            const resumoSuavizado = {
                totalRecebido: parseFloat(resumoBruto.totalPago) || 0,
                totalPendente: parseFloat(resumoBruto.totalPendente) || 0,
                totalAtrasado: parseFloat(resumoBruto.totalAtrasado) || 0,
                qtdRecebidos: parseInt(resumoBruto.qtdRecebidos) || 0,
                qtdPendentes: parseInt(resumoBruto.qtdPendentes) || 0,
                qtdAtrasados: parseInt(resumoBruto.quantidadeAtrasada) || 0,
                totalRegistros: parseInt(resultado.total) || 0
            };

            return res.status(200).json({
                sucesso: true,
                requerSetup: false,
                dados: resultado.pagamentos || [],
                resumo: resumoSuavizado,
                paginacao: {
                    pagina,
                    limite,
                    total: resultado.total || 0,
                    totalPaginas: Math.ceil((resultado.total || 0) / limite)
                }
            });

        } catch (error) {
            console.error('Erro crítico no painel financeiro:', error);
            return res.status(500).json({ sucesso: false, erro: 'Erro interno ao carregar o painel financeiro.' });
        }
    }

    // POST /cliente/financeiro/setup
    static async inicializarParcelamento(req, res) {
        try {
            // Ajustado com await
            const id_empresa = await FinanceiroClienteController.obterIdEmpresa(req);
            if (!id_empresa) {
                return res.status(401).json({ sucesso: false, erro: 'Empresa não identificada.' });
            }

            const { quantidade_parcelas, forma_pagamento } = req.body;
            const formasValidas = ['BOLETO', 'PIX', 'CARTAO'];
            const qtdParcelasNum = parseInt(quantidade_parcelas);

            // Ajustado para aceitar até 240 parcelas (72x passa liso)
            if (!qtdParcelasNum || qtdParcelasNum <= 0 || qtdParcelasNum > 240 || !forma_pagamento || !formasValidas.includes(forma_pagamento.toUpperCase())) {
                return res.status(400).json({ 
                    sucesso: false, 
                    erro: 'Quantidade de parcelas inválida ou forma de pagamento incorreta.' 
                });
            }

            const jaExiste = await FinanceiroClienteModel.verificarSeJaTemParcelas(id_empresa);
            if (jaExiste) {
                return res.status(403).json({ sucesso: false, erro: 'O parcelamento já foi inicializado.' });
            }

            const orcamento = await FinanceiroClienteModel.obterOrcamentoAprovado(id_empresa);
            if (!orcamento) {
                return res.status(404).json({ sucesso: false, erro: 'Orçamento aprovado não localizado.' });
            }

            const valorTotal = parseFloat(orcamento.valor_total);
            const valorParcelaBase = (valorTotal / qtdParcelasNum).toFixed(2);
            
            let parcelasParaInserir = [];
            let dataVencimentoBase = new Date();

            for (let i = 1; i <= qtdParcelasNum; i++) {
                let dataVencimento = new Date();
                dataVencimento.setDate(dataVencimentoBase.getDate() + (30 * i));

                let valorFinalParcela = parseFloat(valorParcelaBase);
                if (i === qtdParcelasNum) {
                    const somaAnteriores = parseFloat(valorParcelaBase) * (qtdParcelasNum - 1);
                    valorFinalParcela = parseFloat((valorTotal - somaAnteriores).toFixed(2));
                }

                parcelasParaInserir.push({
                    valor: valorFinalParcela,
                    tipo_pagamento: 'PLACAS',
                    numero_parcela: i,
                    quantidade_parcelas: qtdParcelasNum,
                    forma_pagamento: forma_pagamento.toUpperCase(),
                    data_vencimento: dataVencimento.toISOString().split('T')[0]
                });
            }

            await FinanceiroClienteModel.gerarParcelas(id_empresa, parcelasParaInserir);
            return res.status(201).json({ sucesso: true, mensagem: 'Parcelamento gerado com sucesso!' });

        } catch (error) {
            console.error('Erro ao gerar parcelas:', error);
            return res.status(500).json({ sucesso: false, erro: 'Erro interno ao processar o parcelamento.' });
        }
    }

    // PATCH /cliente/financeiro/forma-pagamento
    static async alterarMetodoPagamento(req, res) {
        try {
            // Ajustado com await
            const id_empresa = await FinanceiroClienteController.obterIdEmpresa(req);
            if (!id_empresa) return res.status(401).json({ sucesso: false, erro: 'Não autenticado.' });
            
            const formatoRecebido = req.body.forma_pagamento || req.body.metodoGlobal;
            if (!formatoRecebido) return res.status(400).json({ sucesso: false, erro: 'Forma de pagamento não fornecida.' });

            await FinanceiroClienteModel.alterarFormaPagamentoFutura(id_empresa, formatoRecebido.toUpperCase());
            return res.status(200).json({ sucesso: true, mensagem: 'Método de pagamento updated!' });
        } catch (error) {
            return res.status(500).json({ sucesso: false, erro: 'Erro ao atualizar forma de pagamento.' });
        }
    }

    // POST /cliente/financeiro/:id/pagar
    static async pagarParcela(req, res) {
        try {
            // Ajustado com await
            const id_empresa = await FinanceiroClienteController.obterIdEmpresa(req);
            const { id } = req.params;
            
            const sucesso = await FinanceiroClienteModel.registrarPagamento(id, id_empresa);
            if (!sucesso) return res.status(400).json({ sucesso: false, erro: 'Não foi possível pagar esta fatura.' });

            return res.status(200).json({ sucesso: true, mensagem: 'Pagamento homologado!' });
        } catch (error) {
            return res.status(500).json({ sucesso: false, erro: 'Erro interno ao processar pagamento.' });
        }
    }
}

export default FinanceiroClienteController;