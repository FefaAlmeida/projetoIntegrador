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
      {/* ONDA SUPERIOR ESQUERDA (VETOR INLINE DE TRÊS CAMADAS) */}
      <div className={`${styles.waveWrapper} ${styles.topWave}`} aria-hidden="true">
        <svg viewBox="0 0 800 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Camada de trás - Amarelo Claro */}
          <path d="M0,0 L550,0 C450,220 320,280 180,260 C80,250 30,350 0,420 Z" fill="#f5bd31" opacity="0.45" />
          {/* Camada do meio - Amarelo Médio */}
          <path d="M0,0 L480,0 C400,180 280,220 160,210 C70,205 25,290 0,350 Z" fill="#f5bd31" opacity="0.7" />
          {/* Camada da frente - Amarelo Principal */}
          <path d="M0,0 L420,0 C350,150 240,180 130,170 C50,165 20,240 0,290 Z" fill="#f5bd31" />
        </svg>
      </div>

      {/* ONDA INFERIOR DIREITA (VETOR INLINE DE TRÊS CAMADAS) */}
      <div className={`${styles.waveWrapper} ${styles.bottomWave}`} aria-hidden="true">
        <svg viewBox="0 0 800 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          {/* Camada de trás - Cinza Claro */}
          <path d="M800,600 L250,600 C350,420 480,360 620,380 C720,390 770,290 800,220 Z" fill="#d8d8d8" />
          {/* Camada do meio - Cinza Grafite */}
          <path d="M800,600 L320,600 C400,450 520,410 640,420 C730,425 775,340 800,280 Z" fill="#444042" />
          {/* Camada da frente - Preto Principal */}
          <path d="M800,600 L400,600 C470,480 580,450 690,460 C770,465 790,390 800,340 Z" fill="#221f20" />
        </svg>
      </div>

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
