"use client";

import { useState, useEffect } from "react";
import { criarEmpresa } from "../../../api";
import { toast } from "sonner";
import styles from "./page.module.css";

export default function CadastroEmpresaPage() {



  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubimit() {

    if (!nomeEmpresa || !cnpj || !telefone || !email) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const nomeEmpresaTrim = nomeEmpresa.trim();

    if (nomeEmpresaTrim.length < 2) {
      toast.error("O nome deve ter pelo menos 2 caracteres.");
      return;
    }

    if (nomeEmpresaTrim.length > 255) {
      toast.error("O nome deve ter no máximo 255 caracteres.");
      return;
    }

    if (!/^\d{14}$/.test(cnpj)) {
    toast.error("CNPJ deve conter 14 números.");
    return;
    }

    if (!/^\d{10,11}$/.test(telefone)) {
    toast.error("Telefone deve conter 10 ou 11 números.");
    return;
}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Formato de email inválido.");
      return;
    }

    setLoading(true);

    try {

      const response = await criarEmpresa({
        nome_empresa: nomeEmpresa.trim(),
        cnpj: cnpj.trim(),
        telefone_principal: telefone.trim(),
        email_principal: email.trim().toLowerCase()
      });

      if (response && response.sucesso) {

        toast.success("Empresa cadastrada com sucesso.");

        setTimeout(() => {
          window.location.href = "/inicio-dashboard";
        }, 1000);

      } else {

        toast.error(
          response?.erro ||
          response?.mensagem ||
          "Erro ao cadastrar empresa."
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
    <>

      <main
        className={`container-fluid d-flex align-items-center position-relative overflow-hidden bg-white px-0 ${styles.shell}`}
      >
        <div
          className={`position-absolute top-0 start-0 w-50 ${styles.shapeTop}`}
        >
          <svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0H620C520 60 460 112 376 90C250 56 204 162 92 170C44 173 12 194 0 218V0Z"
              fill="#ffc107"
            />
            <path
              d="M0 80C106 154 194 88 278 116C356 142 396 218 508 156C552 132 590 128 620 142V0H0V80Z"
              fill="#ffe58a"
              opacity="0.75"
            />
          </svg>
        </div>

        <div
          className={`position-absolute bottom-0 end-0 w-50 ${styles.shapeBottom}`}
        >
          <svg viewBox="0 0 620 260" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0H620C520 60 460 112 376 90C250 56 204 162 92 170C44 173 12 194 0 218V0Z"
              fill="#221f20"
            />
            <path
              d="M0 80C106 154 194 88 278 116C356 142 396 218 508 156C552 132 590 128 620 142V0H0V80Z"
              fill="#d9d9d9"
              opacity="0.8"
            />
          </svg>
        </div>

        <div className={`container position-relative ${styles.content}`}>
          <div className="row align-items-center gy-5">

            <section className="col-lg-6">

              <div
                className={`mb-5 overflow-hidden bg-white mx-auto mx-lg-0 ${styles.imageBox}`}
              >
                <img
                  src="https://img.freepik.com/fotos-gratis/equipe-de-negocios-alegre-assistindo-apresentacao-no-laptop-sentado-no-local-de-trabalho-olhando-para-o-visor-e-sorrindo-copie-o-espaco-conceito-de-reuniao-de-negocios_74855-11583.jpg?semt=ais_rp_progressive&w=740&q=80"
                  alt="Painéis solares"
                  className={`w-100 h-100 ${styles.coverImage}`}
                />
              </div>

              <div className="text-center text-lg-start">

                <h1
                  className={`mb-3 ${styles.title}`}
                >
                  Empresa <span className={styles.highlight}>Cliente</span>
                </h1>

                <p
                  className={`m-0 ${styles.subtitle}`}
                >
                  Informe os dados da sua empresa para finalizar seu cadastro.
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
                  Cadastrar empresa
                </h2>

                <form onSubmit={(e) => e.preventDefault()}>

                  <div className="mb-4">

                    <label className="form-label small fw-bold text-secondary mb-2">
                      Nome da Empresa
                    </label>

                    <input
                      type="text"
                      className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
                      value={nomeEmpresa}
                      onChange={(e) => setNomeEmpresa(e.target.value)}
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label small fw-bold text-secondary mb-2">
                      CNPJ
                    </label>

                    <input
                      type="text"
                      className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value.replace(/\D/g, ""))}
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label small fw-bold text-secondary mb-2">
                      Telefone principal
                    </label>

                    <input
                      type="text"
                      className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value.replace(/\D/g, ""))}
                    />

                  </div>

                  <div className="mb-5">

                    <label className="form-label small fw-bold text-secondary mb-2">
                      E-mail principal
                    </label>

                    <input
                      type="text"
                      className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                  </div>

                  <button
                    type="button"
                    className={`btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-sm mb-4 ${styles.primaryButton}`}
                    onClick={handleSubimit}
                    disabled={loading}
                  >
                    {loading ? "Salvando..." : "Finalizar cadastro"}
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
