"use client";

import { useState, useEffect } from "react";
import { criarUsuario, loginUsuario, validarTokenOrcamento } from "../../../api";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";

export default function RegisterPage() {

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValido, setTokenValido] = useState(false);

  // Busca nome/e-mail do orçamento vinculado ao token e pré-preenche (somente leitura).
  useEffect(() => {
    if (!token) {
      toast.error("Orçamento inválido. Solicite um orçamento antes de cadastrar-se.");
      return;
    }

    let ativo = true;

    (async () => {
      try {
        const response = await validarTokenOrcamento(token);

        if (!ativo) return;

        if (response?.sucesso) {
          setNome(response.dados?.nome_responsavel || "");
          setEmail(response.dados?.email_contato || "");
          setTokenValido(true);
        } else {
          toast.error(response?.erro || "Orçamento inválido ou já utilizado.");
        }
      } catch (error) {
        if (ativo) toast.error("Erro ao validar o orçamento.");
      }
    })();

    return () => {
      ativo = false;
    };
  }, [token]);

  async function handleSubimit() {

    if (!token || !tokenValido) {
      toast.error("Orçamento inválido. Solicite um orçamento antes de cadastrar-se.");
      return;
    }

    if (!senha || !confirmarSenha) {
      toast.error("Preencha a senha e a confirmação.");
      return;
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {

      const data = {
        senha,
        token: token
      };

      const response = await criarUsuario(data);

      if (response && response.sucesso) {

        const loginResponse = await loginUsuario({
          email: email.trim().toLowerCase(),
          senha
        });

        if (!loginResponse?.sucesso) {
          toast.error("Erro ao realizar login automático.");
          return;
        }

        toast.success("Cadastro realizado com sucesso.");

        setTimeout(() => {
          window.location.href = "/cadastrar-empresa";
        }, 1000);

      } else {

        toast.error(
          response?.erro ||
          response?.mensagem ||
          "Erro ao cadastrar usuário."
        );

      }

    } catch (error) {

      console.error(error);

      if (error.response && error.response.data) {
        const apiError = error.response.data.erro || error.response.data.mensage;
        toast.error(apiError || "Erro de conexão com o servidor");
      
      } else {
        toast.error("Erro de conexão com o servidor.");
      } 
    
    }  finally {

      setLoading(false);

    }

  }

  return (
    <>

      <main
        className={`auth-shell container-fluid d-flex align-items-center position-relative overflow-hidden bg-white px-0 ${styles.shell}`}
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

        <div className={`container position-relative ${styles.content}`}>
          <div className="row align-items-center gy-5">

            <section className="col-lg-6">

              <div
                className={`mb-5 overflow-hidden bg-white mx-auto mx-lg-0 ${styles.imageBox}`}
              >
                <img
                  src="/conta-luminar.avif"
                  alt="Painéis solares"
                  className={`w-100 h-100 ${styles.coverImage}`}
                />
              </div>

              <div className="text-center text-lg-start">

                <h1
                  className={`mb-3 ${styles.title}`}
                >
                  Conta <span className={styles.highlight}>Luminar</span>
                </h1>

                <p
                  className={`m-0 ${styles.subtitle}`}
                >
                  Seu nome e e-mail já vieram do orçamento. Defina apenas uma senha para concluir seu cadastro.
                </p>

              </div>

            </section>

            <section className="col-lg-5 offset-lg-1 d-flex justify-content-center justify-content-lg-end">

              <div
                className={`bg-white rounded-4 p-4 p-md-5 w-100 ${styles.formCard}`}
              >

                <h2
                  className={`fw-bold mb-5 ${styles.formTitle}`}
                >
                  Criar conta
                </h2>

                <form onSubmit={(e) => e.preventDefault()}>

                  <div className="mb-4">

                    <label className="form-label small fw-bold text-secondary mb-2">
                      Nome Completo
                    </label>

                    <input
                      type="text"
                      className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input} ${styles.readonlyInput}`}
                      value={nome}
                      readOnly
                      tabIndex={-1}
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label small fw-bold text-secondary mb-2">
                      E-mail
                    </label>

                    <input
                      type="email"
                      className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input} ${styles.readonlyInput}`}
                      value={email}
                      readOnly
                      tabIndex={-1}
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label small fw-bold text-secondary mb-2">
                      Senha (mínimo de 6 dígitos)
                    </label>

                    <input
                      type="password"
                      className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                    />

                  </div>

                  <div className="mb-5">

                    <label className="form-label small fw-bold text-secondary mb-2">
                      Confirmar Senha
                    </label>

                    <input
                      type="password"
                      className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                    />

                  </div>

                  <button
                    type="button"
                    className={`btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-sm mb-4 ${styles.primaryButton}`}
                    onClick={handleSubimit}
                    disabled={loading || !tokenValido}
                  >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                  </button>

                </form>

              </div>

            </section>

          </div>
        </div>
      </main>
    </>
  );
}
