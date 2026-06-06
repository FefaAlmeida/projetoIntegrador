"use client";

import { useState } from "react";
import { loginUsuario, getPerfil, solicitarRedefinicaoSenha } from "../../../api";
import { toast } from "sonner";
import styles from "./page.module.css";

export default function LoginPage() {
  
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingRedefinicao, setLoadingRedefinicao] = useState(false);

  async function handleLogin() {

    if (!email || !senha) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Formato de email inválido.");
      return;
    }

    setLoading(true);

    try {

      const response = await loginUsuario({
        email: email.trim().toLowerCase(),
        senha
      });

      if (response?.sucesso) {

        toast.success("Login realizado com sucesso!");

        const destino =
          response.dados?.usuario?.tipo_usuario === "ADMIN"
            ? "/inicio-adm"
            : "/inicio-dashboard";

        window.location.href = destino;

      } else {

        toast.error(
          response?.erro ||
          response?.mensagem ||
          "Erro ao realizar login."
        );

      }

    } catch (error) {

      console.error(error);
      toast.error("Erro de conexão com o servidor.");

    } finally {

      setLoading(false);

    }

  }

  async function handleSolicitarRedefinicaoSenha() {
    if (!email) {
      toast.error("Digite seu e-mail para redefinir a senha.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Formato de email inválido.");
      return;
    }

    setLoadingRedefinicao(true);

    try {
      const response = await solicitarRedefinicaoSenha(email.trim().toLowerCase());

      if (response?.sucesso) {
        toast.success(response.mensagem || "Enviamos o link de redefinição para seu e-mail.");
      } else {
        toast.error(
          response?.erro ||
          response?.mensagem ||
          "Erro ao solicitar redefinição de senha."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão com o servidor.");
    } finally {
      setLoadingRedefinicao(false);
    }
  }

  return (
    <main
      className={`auth-shell container-fluid min-vh-100 d-flex align-items-center position-relative overflow-hidden p-0 bg-white ${styles.shell}`}
    >
      <div className="auth-corner auth-corner-top" aria-hidden="true" />
      <div className="auth-corner auth-corner-bottom" aria-hidden="true" />

      <div className={`container position-relative py-5 ${styles.content}`}>
        <div className="row align-items-center gy-5">
          <section className="col-lg-6">
            <div
              className={`mb-5 overflow-hidden bg-white mx-auto mx-lg-0 ${styles.imageBox}`}
            >
              <img
                src="/dashboard.png"
                alt="Painéis solares"
                className={`w-100 h-100 ${styles.coverImage}`}
              />
            </div>

            <div className="text-center text-lg-start">
              <h1
                className={`fw-black mb-3 ${styles.title}`}
              >
                Painel <span className={styles.highlight}>Luminar</span>
              </h1>
              <p
                className={`m-0 ${styles.subtitle}`}
              >
                Faça login para acessar seu painel de monitoramento energético inteligente.
              </p>
            </div>
          </section>

          <section className="col-lg-5 offset-lg-1 d-flex justify-content-center justify-content-lg-end">
            <div
              className={`bg-white rounded-4 p-4 p-md-5 w-100 ${styles.formCard}`}
            >
              <h2 className={`fw-bold mb-5 ${styles.formTitle}`}>
                Entrar na sua conta
              </h2>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  className={`btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-sm mb-3 ${styles.primaryButton}`}
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>

                <div className="text-center mb-2">
                  <button
                    type="button"
                    className={`border-0 bg-transparent text-decoration-none small fw-bold ${styles.linkButton}`}
                    onClick={handleSolicitarRedefinicaoSenha}
                    disabled={loadingRedefinicao}
                  >
                    {loadingRedefinicao ? "Enviando link..." : "Esqueceu a senha?"}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
