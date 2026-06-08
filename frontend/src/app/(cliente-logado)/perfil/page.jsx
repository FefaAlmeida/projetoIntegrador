"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  atualizarEmpresa,
  atualizarPerfil,
  getMinhaEmpresa,
  getMeusEnderecos,
  getPerfil,
  logoutUsuario,
} from "../../../api";
import styles from "./page.module.css";

const usuarioInicial = {
  nome: "",
  senha: "",
  confirmarSenha: "",
};

const empresaInicial = {
  nome_empresa: "",
  cnpj: "",
  telefone_principal: "",
  email_principal: "",
};

function somenteNumeros(valor) {
  return (valor || "").replace(/\D/g, "");
}

function valorTexto(valor) {
  return valor || "Não informado";
}

function normalizarEndereco(endereco = {}) {
  return {
    id_endereco: endereco.id_endereco || null,
    logradouro: endereco.logradouro || "",
    numero: endereco.numero || "",
    bairro: endereco.bairro || "",
    cidade: endereco.cidade || "",
    estado: endereco.estado || "",
    cep: endereco.cep || "",
    complemento: endereco.complemento || "",
  };
}

export default function PerfilPage() {
  const [usuario, setUsuario] = useState(null);
  const [empresa, setEmpresa] = useState(null);
  const [enderecos, setEnderecos] = useState([]);
  const [formUsuario, setFormUsuario] = useState(usuarioInicial);
  const [formEmpresa, setFormEmpresa] = useState(empresaInicial);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function carregarDados() {
    setCarregando(true);

    try {
      const [perfilResponse, empresaResponse, enderecosResponse] = await Promise.all([
        getPerfil(),
        getMinhaEmpresa(),
        getMeusEnderecos(),
      ]);

      if (!perfilResponse?.sucesso) {
        toast.error(perfilResponse?.erro || "Erro ao carregar perfil.");
        return;
      }

      const usuarioAtual = perfilResponse.dados;
      setUsuario(usuarioAtual);
      setFormUsuario({
        nome: usuarioAtual?.nome || "",
        senha: "",
        confirmarSenha: "",
      });

      if (empresaResponse?.sucesso && empresaResponse?.dados) {
        const empresaAtual = empresaResponse.dados;
        setEmpresa(empresaAtual);
        setFormEmpresa({
          nome_empresa: empresaAtual?.nome_empresa || "",
          cnpj: empresaAtual?.cnpj || "",
          telefone_principal: empresaAtual?.telefone_principal || "",
          email_principal: empresaAtual?.email_principal || "",
        });
      } else {
        setEmpresa(null);
        setFormEmpresa(empresaInicial);
      }

      if (enderecosResponse?.sucesso && Array.isArray(enderecosResponse.dados)) {
        const enderecosAtuais = enderecosResponse.dados.map(normalizarEndereco);
        setEnderecos(enderecosAtuais);
      } else {
        setEnderecos([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão ao carregar o perfil.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  function handleUsuarioChange(event) {
    const { name, value } = event.target;
    setFormUsuario((atual) => ({
      ...atual,
      [name]: value,
    }));
  }

  function handleEmpresaChange(event) {
    const { name, value } = event.target;
    const novoValor =
      name === "telefone_principal"
        ? somenteNumeros(value)
        : value;

    setFormEmpresa((atual) => ({
      ...atual,
      [name]: novoValor,
    }));
  }

  async function handleLogout() {
    const response = await logoutUsuario();

    if (response?.sucesso) {
      window.location.href = "/login";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (formUsuario.senha !== formUsuario.confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    const usuarioPayload = {
      nome: formUsuario.nome,
    };

    if (formUsuario.senha) {
      usuarioPayload.senha = formUsuario.senha;
    }

    const empresaPayload = empresa
      ? {
          nome_empresa: formEmpresa.nome_empresa,
          telefone_principal: formEmpresa.telefone_principal,
        }
      : null;

    setSalvando(true);

    try {
      const perfilResponse = await atualizarPerfil(usuarioPayload);

      if (!perfilResponse?.sucesso) {
        toast.error(perfilResponse?.erro || "Erro ao atualizar perfil.");
        return;
      }

      if (empresaPayload) {
        const empresaResponse = await atualizarEmpresa(empresa.id_empresa, empresaPayload);

        if (!empresaResponse?.sucesso) {
          toast.error(empresaResponse?.erro || "Erro ao atualizar empresa.");
          return;
        }
      }

      toast.success("Perfil atualizado com sucesso.");
      await carregarDados();
    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão ao salvar o perfil.");
    } finally {
      setSalvando(false);
    }
  }

  const isAdmin = usuario?.tipo_usuario === "ADMIN";

  const iniciais = (usuario?.nome || "Usuário")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();

  const botoesAlteracao = (
    <div className="d-flex flex-column flex-sm-row justify-content-end gap-3 mt-4">
      <button
        type="button"
        className="btn btn-light border px-4 py-3 fw-semibold rounded-pill"
        onClick={carregarDados}
        disabled={salvando}
      >
        Cancelar alterações
      </button>

      <button
        type="submit"
        className={`btn btn-warning px-4 py-3 fw-bold rounded-pill shadow-sm ${styles.primaryButton}`}
        disabled={salvando}
      >
        {salvando ? "Salvando..." : "Confirmar alterações"}
      </button>
    </div>
  );

  if (carregando) {
    return (
      <div className="container py-5">
        <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
          <div className="spinner-border text-warning mx-auto mb-3" role="status" />
          <p className="mb-0 text-muted">Carregando dados do perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 py-lg-5">
      <div className="row g-4">
        <aside className="col-lg-4 col-xl-3">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden sticky-lg-top">
            <div className={`card-body p-4 text-white ${styles.sidebarCard}`}>
              <span className={`badge rounded-pill text-dark fw-bold mb-4 ${styles.badgeHighlight}`}>
                {usuario?.tipo_usuario === "ADMIN" ? "Área do administrador" : "Área do cliente"}
              </span>

              <div className="d-flex align-items-center gap-3 mb-4">
                <div
                  className={`rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3 ${styles.avatarSmall}`}
                >
                  {iniciais}
                </div>

                <div className="min-w-0">
                  <h2 className="h5 fw-bold mb-1">{valorTexto(usuario?.nome)}</h2>
                  <p className="small mb-0 text-white-50">{valorTexto(usuario?.email)}</p>
                </div>
              </div>

              <div className="list-group list-group-flush rounded-4 overflow-hidden mb-4">
                {!isAdmin && (
                  <div className="list-group-item bg-transparent text-white border-secondary-subtle px-0">
                    <small className="text-white-50 d-block">Empresa vinculada</small>
                    <span>{empresa ? empresa.nome_empresa : "Nenhuma empresa vinculada"}</span>
                  </div>
                )}
                <div className="list-group-item bg-transparent text-white border-secondary-subtle px-0">
                  <small className="text-white-50 d-block">E-mail de acesso</small>
                  <span>{valorTexto(usuario?.email)}</span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-outline-warning w-100 fw-bold rounded-pill"
                onClick={handleLogout}
              >
                Sair da conta
              </button>
            </div>
          </div>
        </aside>

        <section className="col-lg-8 col-xl-9">
          <form onSubmit={handleSubmit}>
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                  <div>
                    <span className="text-uppercase small fw-bold text-warning">Perfil</span>
                    <h1 className={`h2 fw-bold mb-2 ${styles.title}`}>
                      Dados do usuário
                    </h1>
                    <p className="text-muted mb-0">
                      O e-mail é exibido apenas para consulta. Nesta tela você pode alterar nome e senha.
                    </p>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Nome completo</label>
                    <input
                      type="text"
                      name="nome"
                      className="form-control form-control-lg rounded-3"
                      maxLength={150}
                      value={formUsuario.nome}
                      onChange={handleUsuarioChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">E-mail</label>
                    <div className="form-control form-control-lg rounded-3 bg-light">
                      {valorTexto(usuario?.email)}
                    </div>
                    <div className="form-text">O e-mail de acesso não pode ser alterado por aqui.</div>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Nova senha</label>
                    <input
                      type="password"
                      name="senha"
                      className="form-control form-control-lg rounded-3"
                      minLength={6}
                      value={formUsuario.senha}
                      onChange={handleUsuarioChange}
                      placeholder="Preencha apenas se quiser alterar"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Confirmar nova senha</label>
                    <input
                      type="password"
                      name="confirmarSenha"
                      className="form-control form-control-lg rounded-3"
                      minLength={6}
                      value={formUsuario.confirmarSenha}
                      onChange={handleUsuarioChange}
                      placeholder="Repita a nova senha"
                    />
                  </div>

                </div>

                {botoesAlteracao}
              </div>
            </div>

            {!isAdmin && (
            <>
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                  <div>
                    <span className="text-uppercase small fw-bold text-warning">Empresa</span>
                    <h2 className={`h3 fw-bold mb-2 ${styles.title}`}>
                      Dados da empresa
                    </h2>
                    <p className="text-muted mb-0">
                      Nome e telefone podem ser alterados. CNPJ e e-mail ficam apenas para consulta.
                    </p>
                  </div>
                </div>

                {!empresa ? (
                  <div className="alert alert-warning rounded-4 mb-0">
                    Nenhuma empresa está vinculada a este usuário.
                  </div>
                ) : (
                  <div className="row g-4">
                    <div className="col-md-8">
                      <label className="form-label fw-semibold">Nome da empresa</label>
                      <input
                        type="text"
                        name="nome_empresa"
                        className="form-control form-control-lg rounded-3"
                        maxLength={150}
                        value={formEmpresa.nome_empresa}
                        onChange={handleEmpresaChange}
                        required
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-semibold">CNPJ</label>
                      <input
                        type="text"
                        name="cnpj"
                        className="form-control form-control-lg rounded-3 bg-light"
                        maxLength={18}
                        value={formEmpresa.cnpj}
                        readOnly
                      />
                      <div className="form-text">CNPJ não pode ser alterado por aqui.</div>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Telefone principal</label>
                      <input
                        type="tel"
                        name="telefone_principal"
                        className="form-control form-control-lg rounded-3"
                        maxLength={20}
                        value={formEmpresa.telefone_principal}
                        onChange={handleEmpresaChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">E-mail principal</label>
                      <input
                        type="email"
                        name="email_principal"
                        className="form-control form-control-lg rounded-3 bg-light"
                        maxLength={150}
                        value={formEmpresa.email_principal}
                        readOnly
                      />
                      <div className="form-text">E-mail principal não pode ser alterado por aqui.</div>
                    </div>
                  </div>
                )}

                {empresa && botoesAlteracao}
              </div>
            </div>

            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4 p-lg-5">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">
                  <div>
                    <span className="text-uppercase small fw-bold text-warning">Endereço</span>
                    <h2 className={`h3 fw-bold mb-2 ${styles.title}`}>
                      Endereços vinculados
                    </h2>
                    <p className="text-muted mb-0">
                      Cadastre e consulte os endereços ligados à sua empresa.
                    </p>
                  </div>

                  {empresa && (
                    <a
                      href="/cadastrar-endereco"
                      className={`btn btn-warning px-4 py-3 fw-bold rounded-pill shadow-sm align-self-start ${styles.primaryButton}`}
                    >
                      <i className="bi bi-plus-circle me-2" />
                      Cadastrar endereço
                    </a>
                  )}
                </div>

                {enderecos.length === 0 ? (
                  <div className="alert alert-warning rounded-4 mb-0">
                    Nenhum endereço cadastrado para esta empresa.
                  </div>
                ) : (
                  <div className="vstack gap-4">
                    {enderecos.map((endereco, index) => (
                      <div className="border rounded-4 p-4" key={endereco.id_endereco || index}>
                        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-geo-alt-fill text-warning fs-5" />
                            <h3 className="h5 fw-bold mb-0">
                              Endereço {index + 1}
                            </h3>
                          </div>

                          <span className="badge rounded-pill bg-light text-muted border align-self-start">
                            Histórico
                          </span>
                        </div>

                        <div className="row g-3">
                          <div className="col-md-8">
                            <small className="text-muted d-block">Logradouro</small>
                            <strong>{valorTexto(endereco.logradouro)}</strong>
                          </div>

                          <div className="col-md-4">
                            <small className="text-muted d-block">Número</small>
                            <strong>{valorTexto(endereco.numero)}</strong>
                          </div>

                          <div className="col-md-4">
                            <small className="text-muted d-block">Bairro</small>
                            <strong>{valorTexto(endereco.bairro)}</strong>
                          </div>

                          <div className="col-md-4">
                            <small className="text-muted d-block">Cidade</small>
                            <strong>{valorTexto(endereco.cidade)}</strong>
                          </div>

                          <div className="col-md-2">
                            <small className="text-muted d-block">Estado</small>
                            <strong>{valorTexto(endereco.estado)}</strong>
                          </div>

                          <div className="col-md-2">
                            <small className="text-muted d-block">CEP</small>
                            <strong>{valorTexto(endereco.cep)}</strong>
                          </div>

                          <div className="col-12">
                            <small className="text-muted d-block">Complemento</small>
                            <strong>{valorTexto(endereco.complemento)}</strong>
                          </div>
                        </div>

                        <div className="alert alert-light border rounded-4 mt-4 mb-0">
                          Este endereço fica disponível para consulta no perfil da empresa.
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            </>
            )}

          </form>
        </section>
      </div>
    </div>
  );
}