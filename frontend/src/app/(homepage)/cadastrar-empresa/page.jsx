"use client";

import { useState, useEffect } from "react";
import { criarEmpresa } from "../../../api";
import { toast } from "sonner";

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
        className="container-fluid d-flex align-items-center position-relative overflow-hidden bg-white px-0"
        style={{
          minHeight: "calc(100vh - 180px)",
          fontFamily: "'Poppins', sans-serif",
          paddingTop: "72px",
          paddingBottom: "72px",
        }}
      >
        <div
          className="position-absolute top-0 start-0 w-50"
          style={{ zIndex: 1 }}
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
          className="position-absolute bottom-0 end-0 w-50"
          style={{ zIndex: 1, transform: "rotate(180deg)" }}
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

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center gy-5">

            <section className="col-lg-6">

              <div
                className="mb-5 overflow-hidden bg-white mx-auto mx-lg-0"
                style={{
                  width: "min(520px, 100%)",
                  height: "300px",
                  borderRadius: "48% 52% 45% 55% / 52% 43% 57% 48%",
                  boxShadow: "0 24px 42px rgba(34, 31, 32, 0.38)",
                }}
              >
                <img
                  src="https://img.freepik.com/fotos-gratis/equipe-de-negocios-alegre-assistindo-apresentacao-no-laptop-sentado-no-local-de-trabalho-olhando-para-o-visor-e-sorrindo-copie-o-espaco-conceito-de-reuniao-de-negocios_74855-11583.jpg?semt=ais_rp_progressive&w=740&q=80"
                  alt="Painéis solares"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="text-center text-lg-start">

                <h1
                  className="mb-3"
                  style={{
                    color: "#221f20",
                    fontSize: "clamp(3.2rem, 6vw, 3.8rem)",
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  Empresa <span style={{ color: "#f5bd31" }}>Cliente</span>
                </h1>

                <p
                  className="m-0"
                  style={{
                    maxWidth: "560px",
                    color: "#221f20",
                    fontSize: "clamp(1.45rem, 2.6vw, 2.0rem)",
                    lineHeight: 1.15,
                  }}
                >
                  Informe os dados da sua empresa para finalizar seu cadastro.
                </p>

              </div>

            </section>

            <section className="col-lg-5 offset-lg-1 d-flex justify-content-center justify-content-lg-end">

              <div
                className="bg-white rounded-4 p-4 p-md-5 w-100"
                style={{
                  maxWidth: "430px",
                  border: "1px solid #221f20",
                  boxShadow: "0 24px 48px rgba(34, 31, 32, 0.32)",
                }}
              >

                <h2
                  className="fw-bold mb-5"
                  style={{ color: "#221f20" }}
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
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: "#d8d8d8",
                        borderBottomWidth: "2px",
                        fontSize: "1.05rem",
                        paddingBottom: "12px",
                      }}
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
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: "#d8d8d8",
                        borderBottomWidth: "2px",
                        fontSize: "1.05rem",
                        paddingBottom: "12px",
                      }}
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
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: "#d8d8d8",
                        borderBottomWidth: "2px",
                        fontSize: "1.05rem",
                        paddingBottom: "12px",
                      }}
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
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: "#d8d8d8",
                        borderBottomWidth: "2px",
                        fontSize: "1.05rem",
                        paddingBottom: "12px",
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                  </div>

                  <button
                    type="button"
                    className="btn btn-warning w-100 py-3 rounded-pill fw-bold shadow-sm mb-4"
                    style={{ color: "#221f20" }}
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
