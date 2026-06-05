import { getConnection } from '../config/database.js';
import UsuarioModel from '../models/UsuarioModel.js';
import EnderecoModel from '../models/EnderecoModel.js';
import InstalacaoModel from '../models/InstalacaoModel.js';

class InstalacaoController {

    // SOLICITAR INSTALAÇÃO (Cria Endereço e Instalação na mesma ação)
    static async solicitarInstalacao(req, res) {

        const connection = await getConnection();

        try {

            const {
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                complemento
            } = req.body;

            if (
                !logradouro ||
                !cidade ||
                !estado
            ) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Os campos Logradouro, Cidade e Estado são obrigatórios'
                });
            }

            const usuario = await UsuarioModel.buscarPorId(req.usuario.id);

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado'
                });
            }

            if (!usuario.id_empresa) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'O usuário precisa possuir uma empresa vinculada para solicitar instalações.'
                });
            }

            const idEmpresa = usuario.id_empresa;

            // INICIA A TRANSAÇÃO UNIFICADA
            await connection.beginTransaction();

            const idEndereco = await EnderecoModel.criar({
                id_empresa: idEmpresa,
                logradouro: logradouro.trim(),
                numero: numero ? numero.trim() : null,
                bairro: bairro ? bairro.trim() : null,
                cidade: cidade.trim(),
                estado: estado.trim().toUpperCase(),
                cep: cep ? cep.replace(/\D/g, '') : null,
                complemento: complemento ? complemento.trim() : null
            }, connection);

            const idInstalacao = await InstalacaoModel.criar({
                id_empresa: idEmpresa,
                id_endereco: idEndereco
            }, connection);

            // CONSOLIDA TUDO NO BANCO DE DADOS
            await connection.commit();

            return res.status(201).json({
                sucesso: true,
                mensagem: 'Solicitação de instalação registrada com sucesso',
                dados: {
                    id_instalacao: idInstalacao
                }
            });

        } catch (error) {

            await connection.rollback();

            console.error(error);

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });

        } finally {
            connection.release();
        }
    }

    // LISTAR INSTALAÇÕES (GERAL PAGINADO - VISÃO ADMIN)
    static async listarInstalacoes(req, res) {
        try {

            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 10;

            const resultado = await InstalacaoModel.listarTodas(
                pagina,
                limite
            );

            return res.status(200).json({
                sucesso: true,
                dados: resultado.instalacoes,
                paginacao: resultado
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    // LISTAR MINHAS INSTALAÇÕES (VISÃO CLIENTE LOGADO)
    static async minhasInstalacoes(req, res) {
        try {

            const usuario = await UsuarioModel.buscarPorId(req.usuario.id);

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado'
                });
            }

            if (!usuario.id_empresa) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Nenhuma empresa vinculada para buscar histórico'
                });
            }

            const instalacoes = await InstalacaoModel.listarPorEmpresa(
                usuario.id_empresa
            );

            return res.status(200).json({
                sucesso: true,
                dados: instalacoes
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    // BUSCAR INSTALAÇÃO POR ID
    static async buscarInstalacao(req, res) {
        try {

            const { id } = req.params;

            const instalacao = await InstalacaoModel.buscarPorId(id);

            if (!instalacao) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Instalação não encontrada'
                });
            }

            return res.status(200).json({
                sucesso: true,
                dados: instalacao
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

// ATUALIZAR INSTALAÇÃO E ENDEREÇO (FORMULÁRIO UNIFICADO)
    static async atualizarInstalacao(req, res) {
        try {
            const { id } = req.params;

            const instalacao = await InstalacaoModel.buscarPorId(id);

            if (!instalacao) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Instalação não encontrada'
                });
            }

            // 1. Atualiza os dados pertencentes à tabela de Instalações
            await InstalacaoModel.atualizar(id, req.body);

            // 2. Extrai e isola os campos de endereço enviados no mesmo formulário
            const {
                logradouro,
                numero,
                bairro,
                cidade,
                estado,
                cep,
                complemento
            } = req.body;

            // Identifica o ID do endereço de forma segura (tentando mapeamentos possíveis do banco)
            const idEnderecoSeguro = instalacao.id_endereco || instalacao.id_endereco;

            // Se pelo menos um campo de endereço foi enviado E temos um ID de endereço válido
            if (
                idEnderecoSeguro && (
                    logradouro !== undefined ||
                    numero !== undefined ||
                    bairro !== undefined ||
                    cidade !== undefined ||
                    estado !== undefined ||
                    cep !== undefined ||
                    complemento !== undefined
                )
            ) {
                // Executa a atualização apenas se o EnderecoModel existir e o ID for válido
                if (EnderecoModel && typeof EnderecoModel.atualizar === 'function') {
                    await EnderecoModel.atualizar(idEnderecoSeguro, {
                        logradouro,
                        numero,
                        bairro,
                        cidade,
                        estado,
                        cep,
                        complemento
                    });
                }
            }

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Instalação e endereço atualizados com sucesso'
            });

        } catch (error) {
            console.error("Erro detectado no Controller:", error);

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno ao processar a atualização'
            });
        }
    }

    // CANCELAR SOLICITAÇÃO DE INSTALAÇÃO
    static async cancelarInstalacao(req, res) {
        try {

            const { id } = req.params;

            const instalacao = await InstalacaoModel.buscarPorId(id);

            if (!instalacao) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Instalação não encontrada'
                });
            }

            await InstalacaoModel.cancelar(id);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Solicitação de instalação cancelada'
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

}

export default InstalacaoController;