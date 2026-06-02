"use client";
import styles from "./page.module.css";
import { useState } from "react";

export default function PerfilPage() {
    const [formData, setFormData] = useState({
        nome: "Marcelo Batista",
        email: "marcelo@email.com",
        telefone: "(11) 99999-9999",
        cidade: "São Paulo",
        estado: "SP",
        senha: "",
        confirmarSenha: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            formData.senha &&
            formData.senha !== formData.confirmarSenha
        ) {
            alert("As senhas não coincidem.");
            return;
        }

        alert("Perfil atualizado com sucesso!");
    };

    return (
        <div
            className="container-fluid"
            style={{
                minHeight: "100vh",
                background: "#f4f4f4",
                padding: "20px",
            }}
        >
            <div
                className="row shadow mx-auto"
                style={{
                    width: "95vw",
                    minHeight: "90vh",
                    background: "#fff",
                    overflow: "hidden",
                }}
            >
                {/* SIDEBAR */}
                <div
                    className="col-lg-3 p-5 text-white d-flex flex-column"
                    style={{
                        background: "#221f20",
                    }}
                >
                    <small
                        className="fw-bold"
                        style={{
                            color: "#febd17",
                            letterSpacing: "1px",
                        }}
                    >
                        ÁREA DO CLIENTE
                    </small>

                    <div className="d-flex align-items-center gap-3 mt-4">
                        <img
                            src="/IMG_8007.jpeg"
                            alt="Foto de Perfil"
                            style={{
                                width: "90px",
                                height: "90px",
                                objectFit: "cover",
                                borderRadius: "50%",
                                border: "4px solid #252323",
                                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
                                flexShrink: 0,
                            }}
                        />

                        <div>
                            <h3 className="fw-bold mb-1">
                                Marcelo Batista
                            </h3>

                            <p
                                className="mb-0"
                                style={{
                                    color: "#bbb",
                                }}
                            >
                                Cliente Luminar
                            </p>
                        </div>
                    </div>

                    <hr
                        style={{
                            borderColor: "#444",
                            margin: "35px 0",
                        }}
                    />

                    <small
                        className="fw-bold"
                        style={{
                            color: "#888",
                        }}
                    >
                        USUÁRIO ATUAL
                    </small>

                    <h4 className="mt-3 fw-bold">
                        Marcelo Batista
                    </h4>

                    <p
                        style={{
                            color: "#bbb",
                        }}
                    >
                        marcelo@email.com
                    </p>

                    <div>
                        <p>

                        </p>
                        <p>


                        </p>


                    </div>

                    <a
                        href="/perfil-empresa"
                        className="btn w-100 fw-bold"
                        style={{
                            background: "#1d1c1c",
                            border: "1px solid #1d1c1c",
                            color: "#febd17",
                            padding: "12px",
                        }}
                    >
                        Perfil empresarial
                    </a>

                    <div className="mt-auto">
                        <button
                            className="btn w-100 fw-bold"
                            style={{
                                border: "1px solid #febd17",
                                color: "#febd17",
                                padding: "12px",
                            }}

                        >
                            Sair da Conta
                        </button>
                    </div>
                </div>

                {/* CONTEÚDO */}
                <div className="col-lg-9 p-5">

                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <div>
                            <h1
                                className="fw-bold"
                                style={{
                                    color: "#221f20",
                                }}
                            >
                                Editar Perfil
                            </h1>

                            <p className="text-muted">
                                Atualize suas informações pessoais.
                            </p>
                        </div>

                        <span
                            className="badge"
                            style={{
                                background: "#fff3cd",
                                color: "#221f20",
                                padding: "12px 16px",
                                fontSize: "14px",
                            }}
                        >
                            Cliente Luminar
                        </span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* DADOS */}
                        <h4
                            className="fw-bold mb-4"
                            style={{
                                color: "#221f20",
                            }}
                        >
                            Dados Pessoais
                        </h4>

                        <div className="row">

                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-semibold">
                                    Nome Completo
                                </label>

                                <input
                                    type="text"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-semibold">
                                    E-mail
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                />
                            </div>

                            <div className="col-md-4 mb-4">
                                <label className="form-label fw-semibold">
                                    Telefone
                                </label>

                                <input
                                    type="tel"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder="(11) 99999-9999"
                                />
                            </div>

                            <div className="col-md-4 mb-4">
                                <label className="form-label fw-semibold">
                                    Cidade
                                </label>

                                <input
                                    type="text"
                                    name="cidade"
                                    value={formData.cidade}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                />
                            </div>

                            <div className="col-md-4 mb-4">
                                <label className="form-label fw-semibold">
                                    Estado
                                </label>

                                <select
                                    name="estado"
                                    value={formData.estado}
                                    onChange={handleChange}
                                    className="form-select form-select-lg"
                                >
                                    <option>SP</option>
                                    <option>RJ</option>
                                    <option>MG</option>
                                    <option>PR</option>
                                    <option>SC</option>
                                    <option>RS</option>
                                </select>
                            </div>


                            <div className="col-md-4 mb-4">
                                <label className="form-label fw-semibold">
                                    Marcelo é legal?
                                </label>

                                <select
                                    name="marcelo é Legal?"
                                    value={formData.marceloEhLegal}
                                    onChange={handleChange}
                                    className="form-select form-select-lg"
                                >
                                    <option>Sim</option>
                                    <option>Com certeza</option>
                                    <option>Sem duvida</option>
                                    <option>Claro</option>
                                    <option>Obvio</option>
                                    <option>Uhum</option>
                                    <option>Sem sombra de duvida</option>


                                </select>
                            </div>

                        </div>

                        <hr className="my-5" />

                        {/* SEGURANÇA */}
                        <h4
                            className="fw-bold mb-4"
                            style={{
                                color: "#221f20",
                            }}
                        >
                            Segurança
                        </h4>

                        <div className="row">

                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-semibold">
                                    Nova Senha
                                </label>

                                <input
                                    type="password"
                                    name="senha"
                                    value={formData.senha}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder="Digite uma nova senha"
                                />
                            </div>

                            <div className="col-md-6 mb-4">
                                <label className="form-label fw-semibold">
                                    Confirmar Senha
                                </label>

                                <input
                                    type="password"
                                    name="confirmarSenha"
                                    value={formData.confirmarSenha}
                                    onChange={handleChange}
                                    className="form-control form-control-lg"
                                    placeholder="Repita a senha"
                                />
                            </div>

                        </div>

                        <div className="d-flex justify-content-end gap-3 mt-5">

                            <button
                                type="button"
                                className="btn btn-outline-secondary px-4 py-2"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn px-4 py-2 fw-bold"
                                style={{
                                    background: "#febd17",
                                    color: "#221f20",
                                }}
                            >
                                Salvar Alterações
                            </button>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}