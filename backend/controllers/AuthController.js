import jwt from 'jsonwebtoken';
import UsuarioModel from '../models/UsuarioModel.js';
import { JWT_CONFIG } from '../config/jwt.js';
import { comparePassword } from '../config/database.js';
import { setAuthCookie, clearAuthCookie } from '../utils/authCookie.js';

class AuthController {

    // LOGIN
    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Email e senha são obrigatórios'
                });
            }

            const usuario = await UsuarioModel.verificarCredenciais(
                email.trim().toLowerCase(),
                senha
            );

            if (!usuario) {
                return res.status(401).json({
                    sucesso: false,
                    erro: 'Credenciais inválidas'
                });
            }

            const token = jwt.sign(
                {
                    id: usuario.id,
                    email: usuario.email,
                    tipo_usuario: usuario.tipo_usuario
                },
                JWT_CONFIG.secret,
                { expiresIn: JWT_CONFIG.expiresIn }
            );

            setAuthCookie(res, token);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Login realizado com sucesso',
                dados: {
                    usuario: {
                        id: usuario.id,
                        nome: usuario.nome,
                        email: usuario.email,
                        tipo_usuario: usuario.tipo_usuario
                    }
                }
            });

        } catch (error) {
            console.error('Erro no login:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno no servidor'
            });
        }
    }

    // LOGOUT
    static async logout(req, res) {
        try {
            clearAuthCookie(res);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Logout realizado com sucesso'
            });

        } catch (error) {
            console.error('Erro no logout:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno no servidor'
            });
        }
    }

    // OBTER PERFIL (usuário logado)
    static async obterPerfil(req, res) {
        try {
            const usuario = await UsuarioModel.buscarPorId(req.usuario.id);

            if (!usuario) {
                return res.status(404).json({
                    sucesso: false,
                    erro: 'Usuário não encontrado'
                });
            }

            return res.status(200).json({
                sucesso: true,
                dados: usuario
            });

        } catch (error) {
            console.error('Erro ao obter perfil:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno no servidor'
            });
        }
    }

    // ATUALIZAR PERFIL (usuário logado)
    static async atualizarPerfil(req, res) {
        try {
            const id = req.usuario.id;

            const dadosAtualizacao = { ...req.body };

            // Se estiver alterando senha, já deixa pronto pro model hashear
            const resultado = await UsuarioModel.atualizar(id, dadosAtualizacao);

            if (resultado === 0) {
                return res.status(400).json({
                    sucesso: false,
                    erro: 'Nenhuma alteração realizada'
                });
            }

            const atualizado = await UsuarioModel.buscarPorId(id);

            return res.status(200).json({
                sucesso: true,
                mensagem: 'Perfil atualizado com sucesso',
                dados: {
                    id: atualizado.id,
                    nome: atualizado.nome,
                    email: atualizado.email,
                    tipo_usuario: atualizado.tipo_usuario
                }
            });

        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            return res.status(500).json({
                sucesso: false,
                erro: 'Erro interno no servidor'
            });
        }
    }
}

export default AuthController;