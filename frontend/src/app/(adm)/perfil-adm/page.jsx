"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { atualizarPerfil, getPerfil, logoutUsuario } from "@/api";
import styles from "./page.module.css";

const usuarioInicial = {
  nome: "",
  senha: "",
  confirmarSenha: "",
};

function valorTexto(valor) {
  return valor || "Não informado";
}

export default function PerfilAdmPage() {
  const [usuario, setUsuario] = useState(null);
  const [formUsuario, setFormUsuario] = useState(usuarioInicial);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  async function carregarDados() {
    setCarregando(true);

    try {
      const perfilResponse = await getPerfil();

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
      nome: formUsuario.nome.trim(),
    };

    if (formUsuario.senha) {
      usuarioPayload.senha = formUsuario.senha;
    }

    setSalvando(true);

    try {
      const perfilResponse = await atualizarPerfil(usuarioPayload);

      if (!perfilResponse?.sucesso) {
        toast.error(perfilResponse?.erro || "Erro ao atualizar perfil.");
        return;
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

  const iniciais = (usuario?.nome || "Admin")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join("")
    .toUpperCase();

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
                Área do administrador
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
                      Dados do administrador
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
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
