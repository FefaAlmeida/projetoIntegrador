"use client";

import { useEffect, useState } from "react";
import { redefinirSenha } from "../../../api";
import { toast } from "sonner";
import styles from "./page.module.css";

export default function RedefinirSenhaPage() {
  const [token, setToken] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "");
  }, []);

  async function handleRedefinirSenha() {
    if (!token) {
      toast.error("Link de redefinição inválido.");
      return;
    }

    if (!senha || !confirmarSenha) {
      toast.error("Preencha a nova senha e a confirmação.");
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
      const response = await redefinirSenha(token, senha);

      if (response?.sucesso) {
        toast.success("Senha redefinida com sucesso!");
        window.location.href = "/login";
      } else {
        toast.error(
          response?.erro ||
          response?.mensagem ||
          "Erro ao redefinir senha."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={`container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-white px-4 ${styles.shell}`}
    >
      <section
        className={`bg-white rounded-4 p-4 p-md-5 w-100 ${styles.card}`}
      >
        <h1 className={`fw-bold mb-3 ${styles.title}`}>
          Redefinir senha
        </h1>

        <p className="text-secondary mb-4">
          Digite sua nova senha para acessar sua conta Luminar.
        </p>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary mb-2">
              Nova senha
            </label>
            <input
              type="password"
              className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="form-label small fw-bold text-secondary mb-2">
              Confirmar nova senha
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
            className={`btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-sm mb-3 ${styles.primaryButton}`}
            onClick={handleRedefinirSenha}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar nova senha"}
          </button>

          <div className="text-center">
            <a
              href="/login"
              className={`text-decoration-none small fw-bold ${styles.link}`}
            >
              Voltar para o login
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
