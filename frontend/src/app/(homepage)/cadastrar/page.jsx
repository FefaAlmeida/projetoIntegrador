"use client";

import { useState } from "react";
import { criarUsuario, loginUsuario } from "../../../api";
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

  async function handleSubimit() {

    if (!nome || !email || !senha || !confirmarSenha) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const nomeTrim = nome.trim();

    if (nomeTrim.length < 2) {
      toast.error("O nome deve ter pelo menos 2 caracteres.");
      return;
    }

    if (nomeTrim.length > 255) {
      toast.error("O nome deve ter no máximo 255 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Formato de email inválido.");
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

    if (!token) {
      toast.error("Orçamento inválido. Solicite um orçamento antes de cadastrar-se.");
      return;
    }

    setLoading(true);

    try {

      const data = {
        nome: nomeTrim,
        email: email.trim().toLowerCase(),
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
        <div className="auth-corner auth-corner-top" aria-hidden="true" />
        <div className="auth-corner auth-corner-bottom" aria-hidden="true" />

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
                  Preencha seus dados de usuário para tornar-se um cliente.
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
                      className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />

                  </div>

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
                    disabled={loading}
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
