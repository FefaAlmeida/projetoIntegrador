import FaleConoscoModel from '../models/FaleConoscoModel.js';

class FaleConoscoController {

    static async listarTodos(req, res) {
        try {
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;

            if (pagina <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser maior que zero'
                });
            }

            if (limite <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: 'O limite deve ser maior que zero'
                });
            }

            const offset = (pagina - 1) * limite;

            const resultado = await FaleConoscoModel.listarTodos(limite, offset);

            res.status(200).json({
                sucesso: true,
                dados: resultado.faleConosco,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro crítico em FaleConoscoController.listarTodos:', error);

            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível carregar a lista geral de mensagens.'
            });
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'ID inválido',
                    mensagem: 'O parâmetro ID deve ser um número válido.'
                });
            }

            const faleConosco = await FaleConoscoModel.buscarPorId(id);

            if (!faleConosco) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Mensagem não encontrada',
                    mensagem: `Não foi localizada nenhuma mensagem com o ID ${id}.`
                });
            }

            res.status(200).json({
                sucesso: true,
                dados: faleConosco
            });

        } catch (error) {
            console.error(`Erro crítico em FaleConoscoController.buscarPorId (ID: ${req.params.id}):`, error);

            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Ocorreu um erro ao tentar buscar os detalhes desta mensagem.'
            });
        }
    }

    static async listarPendentes(req, res) {
        try {
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;

            if (pagina <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser maior que zero'
                });
            }

            if (limite <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: 'O limite deve ser maior que zero'
                });
            }

            const offset = (pagina - 1) * limite;

            const resultado = await FaleConoscoModel.listarPendentes(limite, offset);

            res.status(200).json({
                sucesso: true,
                dados: resultado.faleConosco,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro crítico em FaleConoscoController.listarPendentes:', error);

            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível carregar a lista de mensagens pendentes.'
            });
        }
    }

    static async listarRespondidos(req, res) {
        try {
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;

            if (pagina <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser maior que zero'
                });
            }

            if (limite <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: 'O limite deve ser maior que zero'
                });
            }

            const offset = (pagina - 1) * limite;

            const resultado = await FaleConoscoModel.listarRespondidos(limite, offset);

            res.status(200).json({
                sucesso: true,
                dados: resultado.faleConosco,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro crítico em FaleConoscoController.listarRespondidos:', error);

            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível carregar a lista de mensagens respondidas.'
            });
        }
    }

    static async listarPorData(req, res) {
        try {
            let pagina = parseInt(req.query.pagina) || 1;
            let limite = parseInt(req.query.limite) || 10;

            if (pagina <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Página inválida',
                    mensagem: 'A página deve ser maior que zero'
                });
            }

            if (limite <= 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Limite inválido',
                    mensagem: 'O limite deve ser maior que zero'
                });
            }

            const offset = (pagina - 1) * limite;

            const resultado = await FaleConoscoModel.listarPorData(limite, offset);

            res.status(200).json({
                sucesso: true,
                dados: resultado.faleConosco,
                paginacao: {
                    pagina: resultado.pagina,
                    limite: resultado.limite,
                    total: resultado.total,
                    totalPaginas: resultado.totalPaginas
                }
            });
        } catch (error) {
            console.error('Erro crítico em FaleConoscoController.listarPorData:', error);

            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível carregar a ordem cronológica das mensagens.'
            });
        }
    }

    static async criar(req, res) {
        try {
            const {
                nome_completo,
                email, 
                telefone,
                mensagem,
            } = req.body;

            const erros = [];

            if (!nome_completo || nome_completo.trim() === '') {
                erros.push({
                    campo: 'nome_completo',
                    mensagem: 'Nome completo é obrigatório'
                });
            }

            if (!email || email.trim() === '') {
                erros.push({
                    campo: 'email',
                    mensagem: 'Email é obrigatório'
                });
            }

            if (telefone && telefone.trim() !== '') {
                if (telefone.length < 10 || telefone.length > 20) {
                    erros.push({
                        campo: 'telefone',
                        mensagem: 'O telefone deve ter entre 10 e 20 caracteres.'
                    });
                }
            }

            if (!mensagem || mensagem.trim() === ''){
                erros.push({
                    campo: 'mensagem',
                    mensagem: 'A mensagem é obrigatória!'
                });
            }

            if (erros.length > 0) {
                return res.status(400).json({
                    sucesso: false,
                    erros: erros
                });
            }

            const dadosFaleConosco = {
                nome_completo: nome_completo.trim(),
                email: email.trim(),
                telefone: telefone ? telefone.trim() : null,
                mensagem: mensagem.trim()
            };

            const id = await FaleConoscoModel.criar(dadosFaleConosco);

            res.status(201).json({
                sucesso: true,
                mensagem: 'Mensagem enviada com sucesso',
                dados: {
                    id, 
                    ...dadosFaleConosco,
                    status_contato: 'PENDENTE'
                }
            }); 

        } catch (error) {
            console.error('Erro crítico em FaleConoscoController.criar:', error);

            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno no servidor',
                mensagem: 'Não foi possível registrar o seu contato no momento. Tente novamente mais tarde.'
            });
        }
    }
}

export default FaleConoscoController;