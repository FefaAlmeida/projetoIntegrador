"use client";

import { useState } from "react";
import { toast } from "sonner";
import { criarEndereco } from "../../../api";
import styles from "./page.module.css";

const enderecoInicial = {
  cep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  estado: "",
  complemento: "",
};

function somenteNumeros(valor) {
  return (valor || "").replace(/\D/g, "");
}

export default function CadastrarEnderecoPage() {
  const [formEndereco, setFormEndereco] = useState(enderecoInicial);
  const [salvando, setSalvando] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    const novoValor =
      name === "cep"
        ? somenteNumeros(value).slice(0, 8)
        : value;

    setFormEndereco((atual) => ({
      ...atual,
      [name]: novoValor,
    }));
  }

  function limparFormulario() {
    setFormEndereco(enderecoInicial);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const cep = somenteNumeros(formEndereco.cep);
    const estado = formEndereco.estado.trim().toUpperCase();

    if (
      !formEndereco.logradouro.trim() ||
      !formEndereco.numero.trim() ||
      !formEndereco.bairro.trim() ||
      !formEndereco.cidade.trim() ||
      !estado ||
      !cep
    ) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (cep.length !== 8) {
      toast.error("CEP deve conter 8 números.");
      return;
    }

    if (estado.length !== 2) {
      toast.error("Estado deve conter 2 letras.");
      return;
    }

    const payload = {
      cep,
      logradouro: formEndereco.logradouro.trim(),
      numero: formEndereco.numero.trim(),
      bairro: formEndereco.bairro.trim(),
      cidade: formEndereco.cidade.trim(),
      estado,
      complemento: formEndereco.complemento.trim() || null,
    };

    setSalvando(true);

    try {
      const response = await criarEndereco(payload);

      if (!response?.sucesso) {
        toast.error(response?.erro || "Erro ao cadastrar endereço.");
        return;
      }

      toast.success("Endereço cadastrado com sucesso.");

      setTimeout(() => {
        window.location.href = "/perfil";
      }, 900);
    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão ao cadastrar endereço.");
    } finally {
      setSalvando(false);
    }
  }

  return (
    <div className="container py-4 py-lg-5">
      <div className="row g-4 align-items-stretch">
        <aside className="col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100">
            <div className={`card-body p-4 p-lg-5 text-white d-flex flex-column ${styles.sidebarCard}`}>
              <span className={`badge rounded-pill text-dark fw-bold align-self-start mb-4 ${styles.badgeHighlight}`}>
                Endereço da empresa
              </span>

              <h1 className="display-6 fw-bold mb-3">
                Cadastrar novo endereço
              </h1>

              <p className={`text-white-50 mb-4 ${styles.description}`}>
                Use esta página para registrar endereços vinculados à sua empresa. Eles aparecerão no seu perfil para consulta.
              </p>

              <div className="vstack gap-3 mt-auto">
                <div className="d-flex align-items-center gap-3">
                  <div className={`rounded-circle d-flex align-items-center justify-content-center ${styles.iconCircle}`}>
                    <i className="bi bi-geo-alt-fill fs-5" />
                  </div>
                  <span>Informe o local completo</span>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className={`rounded-circle d-flex align-items-center justify-content-center ${styles.iconCircle}`}>
                    <i className="bi bi-building-fill-check fs-5" />
                  </div>
                  <span>O endereço fica ligado à empresa</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-lg-5">
              <div className="mb-4">
                <span className="text-uppercase small fw-bold text-warning">Cadastro</span>
                <h2 className={`h3 fw-bold mb-2 ${styles.title}`}>
                  Dados do endereço
                </h2>
                <p className="text-muted mb-0">
                  Preencha os campos obrigatórios para adicionar um novo endereço ao perfil da empresa.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">CEP *</label>
                    <input
                      type="text"
                      name="cep"
                      className="form-control form-control-lg rounded-3"
                      maxLength={8}
                      value={formEndereco.cep}
                      onChange={handleChange}
                      placeholder="00000000"
                      required
                    />
                  </div>

                  <div className="col-md-8">
                    <label className="form-label fw-semibold">Logradouro *</label>
                    <input
                      type="text"
                      name="logradouro"
                      className="form-control form-control-lg rounded-3"
                      maxLength={150}
                      value={formEndereco.logradouro}
                      onChange={handleChange}
                      placeholder="Rua, avenida..."
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Número *</label>
                    <input
                      type="text"
                      name="numero"
                      className="form-control form-control-lg rounded-3"
                      maxLength={20}
                      value={formEndereco.numero}
                      onChange={handleChange}
                      placeholder="Ex: 123"
                      required
                    />
                  </div>

                  <div className="col-md-8">
                    <label className="form-label fw-semibold">Bairro *</label>
                    <input
                      type="text"
                      name="bairro"
                      className="form-control form-control-lg rounded-3"
                      maxLength={100}
                      value={formEndereco.bairro}
                      onChange={handleChange}
                      placeholder="Nome do bairro"
                      required
                    />
                  </div>

                  <div className="col-md-8">
                    <label className="form-label fw-semibold">Cidade *</label>
                    <input
                      type="text"
                      name="cidade"
                      className="form-control form-control-lg rounded-3"
                      maxLength={100}
                      value={formEndereco.cidade}
                      onChange={handleChange}
                      placeholder="Nome da cidade"
                      required
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Estado *</label>
                    <input
                      type="text"
                      name="estado"
                      className="form-control form-control-lg rounded-3 text-uppercase"
                      maxLength={2}
                      value={formEndereco.estado}
                      onChange={handleChange}
                      placeholder="SP"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Complemento</label>
                    <input
                      type="text"
                      name="complemento"
                      className="form-control form-control-lg rounded-3"
                      maxLength={150}
                      value={formEndereco.complemento}
                      onChange={handleChange}
                      placeholder="Apto, bloco, referência..."
                    />
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row justify-content-end gap-3 mt-4">
                  <button
                    type="button"
                    className="btn btn-light border px-4 py-3 fw-semibold rounded-pill"
                    onClick={limparFormulario}
                    disabled={salvando}
                  >
                    Limpar campos
                  </button>

                  <button
                    type="submit"
                    className={`btn btn-warning px-4 py-3 fw-bold rounded-pill shadow-sm ${styles.primaryButton}`}
                    disabled={salvando}
                  >
                    {salvando ? "Salvando..." : "Cadastrar endereço"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
