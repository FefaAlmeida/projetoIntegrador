import UsuarioModel from '../models/UsuarioModel.js';
import OrcamentoModel from '../models/OrcamentoModel.js';

class UsuarioController {

    static async criarUsuario(req, res) {
        try {
            const { nome, email, senha, token } = req.body;

            if (!nome || !email || !senha || !token) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Todos os campos são obrigatórios'
                });
            }

            const orcamento = await OrcamentoModel.buscarPorToken(token);

            if (!orcamento) {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Token inválido ou orçamento não aceito'
                });
            }

            if (orcamento.status_solicitacao !== 'ACEITA') {
                return res.status(403).json({
                    sucesso: false,
                    erro: 'Orçamento não aceito'
                });
            }

            const existe = await UsuarioModel.buscarPorEmail(email);

            if (existe) {
                return res.status(409).json({
                    sucesso: false,
                    erro: 'Esse e-mail já está em uso.'
                });
            }

            const id = await UsuarioModel.criar({
                nome: nome.trim(),
                email: email.trim().toLowerCase(),
                senha,
                tipo_usuario: 'CLIENTE',
                id_solicitacao: orcamento.id_solicitacao
            });

            await OrcamentoModel.invalidarToken(token);

            return res.status(201).json({
                sucesso: true,
                mensagem: 'Usuário criado com sucesso',
                dados: {
                    id,
                    id_solicitacao: orcamento.id_solicitacao
                }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor'
            });
        }
    }

    static async listarUsuarios(req, res) {
        try {
            const pagina = parseInt(req.query.pagina) || 1;
            const limite = parseInt(req.query.limite) || 10;

            const resultado = await UsuarioModel.listarTodos(pagina, limite);

            const usuarios = resultado.usuarios.map(u => {
                delete u.senha;
                return u;
            });

            return res.status(200).json({
                sucesso: true,
                dados: usuarios,
                paginacao: resultado
            });

        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    static async atualizarUsuario(req, res) {
        try {
            const { id } = req.params;

            const usuario = await UsuarioModel.buscarPorId(id);

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado'
                });
            }

            await UsuarioModel.atualizar(id, req.body);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Usuário atualizado'
            });

        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }


    static async inativarUsuario(req, res) {
        try {
            const { id } = req.params;

            const usuario = await UsuarioModel.buscarPorId(id);

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado'
                });
            }

            await UsuarioModel.inativar(id);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Usuário inativado'
            });

        } catch (error) {

            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    static async me(req, res) {
        try {
            const id = req.usuario.id;

            const usuario = await UsuarioModel.buscarPorId(id);

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado'
                });
            }

            delete usuario.senha;

            return res.status(200).json({
                sucesso: true,
                dados: usuario
            });

        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

    static async atualizarMeuPerfil(req, res) {
        try {
            const id = req.usuario.id;

            const {
                nome,
                email,
                senha
            } = req.body;

            await UsuarioModel.atualizar(id, {
                nome,
                email: email?.trim().toLowerCase(),
                senha
            });

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Perfil atualizado com sucesso'
            });

        } catch (error) {
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno'
            });
        }
    }

}

export default UsuarioController;