"use client";

import { useState, useEffect } from "react";
import { criarEmpresa, getPerfil, getMinhaEmpresa } from "../../../api";
import { toast } from "sonner";
import styles from "./page.module.css";

export default function CadastroEmpresaPage() {

  const [verificando, setVerificando] = useState(true);

  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // Precisa estar logado para cadastrar empresa; quem já tem empresa vai pro painel.
  useEffect(() => {

    async function verificarAcesso() {

      try {

        const perfil = await getPerfil();

        if (!perfil?.sucesso) {
          window.location.href = "/login";
          return;
        }

        const empresa = await getMinhaEmpresa();

        if (empresa?.sucesso) {
          window.location.href = "/inicio-dashboard";
          return;
        }

        setVerificando(false);

      } catch (error) {
        window.location.href = "/login";
      }
    }

    verificarAcesso();

  }, []);

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

  if (verificando) {
    return <p>Carregando...</p>;
  }

  return (
    <>

      <main
        className={`container-fluid d-flex align-items-center position-relative overflow-hidden bg-white px-0 ${styles.shell}`}
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
