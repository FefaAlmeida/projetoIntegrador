import EmpresaModel from '../models/EmpresaModel.js';
import UsuarioModel from '../models/UsuarioModel.js';

class EmpresaController {

    // CRIAR EMPRESA
    static async criarEmpresa(req, res) {
        try {

            const {
                nome_empresa,
                cnpj,
                telefone_principal,
                email_principal
            } = req.body;

            if (
                !nome_empresa ||
                !cnpj ||
                !telefone_principal ||
                !email_principal
            ) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Todos os campos são obrigatórios'
                });
            }

            const usuario = await UsuarioModel.buscarPorId(req.usuario.id);

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado'
                });
            }

            if (usuario.id_empresa) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Você já possui uma empresa cadastrada'
                });
            }

            const empresaExistente = await EmpresaModel.buscarPorCnpj(cnpj);

            if (empresaExistente) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Já existe uma empresa cadastrada com esse CNPJ.'
                });
            }

            const telefoneExistente = await EmpresaModel.buscarPorTelefone(telefone_principal); 
            if (telefoneExistente) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Já existe uma empresa cadastrada com este telefone principal.'
                });
            }

            const emailExistente = await EmpresaModel.buscarPorEmail(email_principal.trim().toLowerCase());
            if (emailExistente) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Este e-mail principal já está em uso por outra empresa.'
                });
            }

            const idEmpresa = await EmpresaModel.criar({
                nome_empresa: nome_empresa.trim(),
                cnpj,
                telefone_principal,
                email_principal: email_principal.trim().toLowerCase()
            });

            await UsuarioModel.atualizar(req.usuario.id, {
                id_empresa: idEmpresa
            });

            return res.status(201).json({
                sucesso: true,
                mensagem: 'Empresa cadastrada com sucesso',
                dados: {
                    id_empresa: idEmpresa
                }
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    // LISTAR EMPRESAS
    static async listarEmpresas(req, res) {
        try {

            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 10;

            const resultado = await EmpresaModel.listarTodas(
                pagina,
                limite
            );

            return res.status(200).json({
                sucesso: true,
                dados: resultado.empresas,
                paginacao: resultado
            });

        } catch (error) {

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    // BUSCAR EMPRESA POR ID
    static async buscarEmpresa(req, res) {
        try {

            const { id } = req.params;

            const empresa = await EmpresaModel.buscarPorId(id);

            if (!empresa) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Empresa não encontrada'
                });
            }

            return res.status(200).json({
                sucesso: true,
                dados: empresa
            });

        } catch (error) {

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    // BUSCAR MINHA EMPRESA
    static async minhaEmpresa(req, res) {
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
                    erro: 'Nenhuma empresa vinculada'
                });
            }

            const empresa = await EmpresaModel.buscarPorId(
                usuario.id_empresa
            );

            return res.status(200).json({
                sucesso: true,
                dados: empresa
            });

        } catch (error) {

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    // ATUALIZAR EMPRESA
    static async atualizarEmpresa(req, res) {
        try {

            const { id } = req.params;

            const empresa = await EmpresaModel.buscarPorId(id);

            if (!empresa) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Empresa não encontrada'
                });
            }

            await EmpresaModel.atualizar(
                id,
                req.body
            );

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Empresa atualizada'
            });

        } catch (error) {

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    // INATIVAR EMPRESA
    static async inativarEmpresa(req, res) {
        try {

            const { id } = req.params;

            const empresa = await EmpresaModel.buscarPorId(id);

            if (!empresa) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Empresa não encontrada'
                });
            }

            await EmpresaModel.inativar(id);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Empresa inativada'
            });

        } catch (error) {

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

}

export default EmpresaController;