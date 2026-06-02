"use client";

import React, { useState } from "react";
import { criarOrcamento, aceitarOrcamento } from "../../../api";
import { toast } from "sonner";
import './orcamento.css';

export default function OrcamentoPage() {

  const placas = [
    {
      id: "CANADIAN_550W",
      nome: "Canadian Solar 550W",
      descricao: "Alta eficiência e ótimo custo-benefício para projetos residenciais.",
      imagem: "https://www.evolusom.com.br/media/catalog/product/cache/05cb70b6fa50ec9e936cb2c4f7845492/3/8/382518_67d2cb1483a8a.webp",
    },
    {
      id: "JINKO_600W",
      nome: "Jinko Solar 600W",
      descricao: "Excelente desempenho em baixa luminosidade e alta potência.",
      imagem: "https://pt.sailsolarpv.com/storage/uploads/images/202509/11/1757583519_fbuil7fOUO.jpg",
    },
    {
      id: "TRINA_575W",
      nome: "Trina Solar 575W",
      descricao: "Equilíbrio entre custo e eficiência para projetos comerciais.",
      imagem: "https://solarman.com.br/wp-content/uploads/2024/12/575w-trina.png",
    },
    {
      id: "LONGI_650W",
      nome: "Longi Solar 650W",
      descricao: "Máxima geração de energia por placa, ideal para alta performance.",
      imagem: "https://siwasolar.com/wp-content/uploads/2024/10/5.jpg",
    },
  ];

  const [formData, setFormData] = useState({
    nome_empresa: "",
    nome_responsavel: "",
    email_contato: "",
    cidade: "",
    estado: "",
    quantidade_placas: "",
    modelo_placa: "",
  });

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [animandoModal, setAnimandoModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [showPlacaModal, setShowPlacaModal] = useState(false);

  async function handleSubmit() {

    if (
      !formData.nome_empresa ||
      !formData.nome_responsavel ||
      !formData.email_contato ||
      !formData.cidade ||
      !formData.estado ||
      !formData.quantidade_placas ||
      !formData.modelo_placa
    ) {
      toast.error("Preencha todos os campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email_contato)) {
      toast.error("Formato de email inválido.");
      return;
    }

    if (Number(formData.quantidade_placas) > 500) {
      toast.error("Quantidade máxima permitida de 500 placas.");
      return;
    }

      setLoading(true);

      try {

        const response = await criarOrcamento({
          ...formData,
          quantidade_placas: Number(formData.quantidade_placas)
        });

        if (response.sucesso) {

        setShowModal(true);
        setModalLoading(true);
        setResultado(null);

        setTimeout(() => {
          setResultado(response.dados);
          setModalLoading(false);
        }, 5000);

          toast.success("Orçamento gerado com sucesso.");

          setFormData({
            nome_empresa: "",
            nome_responsavel: "",
            email_contato: "",
            cidade: "",
            estado: "",
            quantidade_placas: "",
            modelo_placa: "",
          });

        } else {
          toast.error(response.erro || "Erro ao gerar orçamento.");
        }

      } catch (error) {

        toast.error("Erro ao conectar com o servidor.");

      } finally {

        setLoading(false);

      }

  }

  function selecionarPlaca(id) {
    setFormData({
      ...formData,
      modelo_placa: id,
    });

    setShowPlacaModal(false);

    toast.success("Modelo selecionado!");
  }

  async function handleAceitarOrcamento() {
    try {

      const response = await aceitarOrcamento(resultado.id);

      if (response.sucesso) {

        window.location.href =
          `/cadastrar?id_solicitacao=${resultado.id}`;

      } else {

        toast.error(response.erro || "Erro ao aceitar orçamento.");

      }

    } catch (error) {

      toast.error("Erro ao conectar com o servidor.");

    }
  }

  return (
    <>
      <div
        className="d-flex flex-column min-vh-100"
        style={{
          backgroundColor: "#ececec",
          overflowX: "hidden",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-grow-1 py-5 px-3" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <div
            className="container shadow-lg p-0 overflow-hidden"
            style={{
              maxWidth: "1000px",
              borderRadius: "28px",
              backgroundColor: "#ffffff",
            }}
          >
            <div className="row g-0">
              {/* LADO ESQUERDO: TEXTO E INFORMAÇÕES */}
              <div
                className="col-lg-5 text-white d-flex flex-column justify-content-center p-5"
                style={{
                  backgroundColor: "#221f20",
                }}
              >
                <h1
                  className="fw-bold mb-4"
                  style={{
                    fontSize: "3rem",
                    lineHeight: "1.1",
                  }}
                >
                  Solicite seu <br />
                  <span style={{ color: "#febd17" }}>Orçamento</span>
                </h1>
                <p
                  className="mb-4"
                  style={{
                    color: "#d4d4d4",
                    fontSize: "1.1rem",
                    lineHeight: "1.6",
                  }}
                >
                  Conte um pouco sobre seu imóvel e consumo. Em até 24h nossa equipe entrará em contato com uma proposta sob medida para você reduzir sua conta de luz.
                </p>
                
                <div className="mt-4">
                    <div className="d-flex align-items-center mb-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px", backgroundColor: "rgba(254, 189, 23, 0.2)", color: "#febd17" }}>
                            <i className="bi bi-check2-circle fs-4"></i>
                        </div>
                        <span>Economia imediata</span>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px", backgroundColor: "rgba(254, 189, 23, 0.2)", color: "#febd17" }}>
                            <i className="bi bi-sun fs-4"></i>
                        </div>
                        <span>Energia 100% limpa</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px", backgroundColor: "rgba(254, 189, 23, 0.2)", color: "#febd17" }}>
                            <i className="bi bi-shield-check fs-4"></i>
                        </div>
                        <span>Garantia de performance</span>
                    </div>
                </div>
              </div>

              {/* LADO DIREITO: FORMULÁRIO */}
              <div className="col-lg-7 p-5">

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        Nome da Empresa
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={formData.nome_empresa}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nome_empresa: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        Nome do Responsável
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={formData.nome_responsavel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            nome_responsavel: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">
                      E-mail para Contato
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      value={formData.email_contato}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email_contato: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        Cidade
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        value={formData.cidade}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cidade: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        Estado
                      </label>

                      <select
                        className="form-select"
                        value={formData.estado}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            estado: e.target.value,
                          })
                        }
                      >
                        <option value="">UF</option>
                        <option value="SP">SP</option>
                        <option value="RJ">RJ</option>
                        <option value="MG">MG</option>
                        <option value="PR">PR</option>
                        <option value="SC">SC</option>
                        <option value="RS">RS</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        Quantidade de Placas
                      </label>

                      <input
                        type="number"
                        min="1"
                        className="form-control"
                        value={formData.quantidade_placas}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            quantidade_placas: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-md-8 mb-4">
                      <label className="form-label fw-bold small text-secondary">
                        Modelo da Placa
                      </label>

                      <select
                        className="form-select"
                        value={formData.modelo_placa}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            modelo_placa: e.target.value,
                          })
                        }
                      >
                        <option value="">Selecione...</option>
                        <option value="CANADIAN_550W">
                          Canadian Solar 550W
                        </option>
                        <option value="JINKO_600W">
                          Jinko Solar 600W
                        </option>
                        <option value="TRINA_575W">
                          Trina Solar 575W
                        </option>
                        <option value="LONGI_650W">
                          Longi Solar 650W
                        </option>
                      </select>

                      <div className="d-flex justify-content-end mt-2">
                        <button
                          type="button"
                          onClick={() => setShowPlacaModal(true)}
                          className="btn btn-sm mt-2"
                          style={{
                            backgroundColor: "transparent",
                            color: "#221f20",
                            border: "1px solid #ddd",
                            borderRadius: "10px",
                            fontSize: "0.85rem",
                          }}
                        >
                          Escolher modelo visualmente
                        </button>
                      </div>

                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn fw-bold w-100 py-3 mt-2"
                    style={{
                      backgroundColor: "#febd17",
                      color: "#221f20",
                      borderRadius: "14px",
                      border: "none",
                      boxShadow: "0 4px 15px rgba(254, 189, 23, 0.3)",
                    }}
                  >
                    {loading ? "Calculando..." : "Solicitar Orçamento"}
                  </button>

                  {showModal && (
                    <div
                      className="modal d-block modal-fade"
                      tabIndex="-1"
                      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    >
                      <div className="modal-dialog modal-dialog-centered modal-scale">
                        <div className="modal-content p-4" style={{ borderRadius: "16px" }}>

                          {modalLoading ? (
                            <div className="text-center py-5">
                              <div className="spinner-border text-warning mb-3" role="status"></div>
                              <h5>Calculando seu orçamento...</h5>
                              <p className="text-muted mb-0">Aguarde alguns segundos</p>
                            </div>

                          ) : (

                            <>
                              <div className="text-center mb-3">
                                <i
                                  className="bi bi-check-circle-fill"
                                  style={{ fontSize: "3rem", color: "#febd17" }}
                                />
                              </div>

                              <h4 className="text-center fw-bold mb-4">
                                Orçamento gerado
                              </h4>

                              <div className="row">

                                <div className="col-6 mb-2">
                                  <small>Potência</small>
                                  <div className="fw-bold">
                                    {resultado?.potencia_estimada} kWp
                                  </div>
                                </div>

                                <div className="col-6 mb-2">
                                  <small>Economia</small>
                                  <div className="fw-bold">
                                    R$ {Number(resultado?.economia_estimada || 0).toFixed(2)}
                                  </div>
                                </div>

                                <div className="col-6 mb-2">
                                  <small>Placas</small>
                                  <div className="fw-bold">
                                    R$ {Number(resultado?.valor_placas || 0).toFixed(2)}
                                  </div>
                                </div>

                                <div className="col-6 mb-2">
                                  <small>Instalação</small>
                                  <div className="fw-bold">
                                    R$ {Number(resultado?.valor_instalacao || 0).toFixed(2)}
                                  </div>
                                </div>

                              </div>

                              <hr />

                              <h3 className="text-center" style={{ color: "#febd17" }}>
                                R$ {Number(resultado?.valor_total || 0).toFixed(2)}
                              </h3>

                              <div className="d-flex gap-2 mt-3">

                                <button
                                  className="btn flex-fill"
                                  style={{
                                    backgroundColor: "#febd17",
                                    color: "#221f20"
                                  }}
                                  onClick={handleAceitarOrcamento}
                                >
                                  Aceitar e criar conta
                                </button>

                                <button
                                  className="btn btn-outline-secondary flex-fill"
                                  onClick={() => {
                                    setShowModal(false);
                                    setResultado(null);
                                  }}
                                >
                                  Fechar
                                </button>

                              </div>

                            </>
                          )}

                        </div>
                      </div>
                    </div>
                  )}

                  {showPlacaModal && (
                    <div
                      className="modal d-block modal-fade"
                      tabIndex="-1"
                      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                    >
                      <div className="modal-dialog modal-dialog-centered modal-scale" style={{ maxWidth: "650px" }}>
                        <div className="modal-content p-3" style={{ borderRadius: "16px" }}>

                          <h4 className="fw-bold text-center mb-4">
                            Escolha seu modelo de placa
                          </h4>

                          <div className="row g-3">

                            {placas.map((placa) => (
                              <div key={placa.id} className="col-md-6">

                                <div
                                  onClick={() => selecionarPlaca(placa.id)}
                                  className="card h-100 p-2"
                                  style={{
                                    cursor: "pointer",
                                    border:
                                      formData.modelo_placa === placa.id
                                        ? "2px solid #febd17"
                                        : "1px solid #ddd",
                                    transition: "0.2s",
                                  }}
                                >

                                  <img
                                    src={placa.imagem}
                                    className="img-fluid mb-2"
                                    style={{ borderRadius: "10px", maxHeight: "120px", objectFit: "cover" }}
                                  />

                                  <h6 className="fw-bold">{placa.nome}</h6>

                                  <p className="small text-muted mb-0">
                                    {placa.descricao}
                                  </p>

                                  {formData.modelo_placa === placa.id && (
                                    <div className="mt-2 fw-bold" style={{ color: "#febd17" }}>
                                      Selecionado ✓
                                    </div>
                                  )}

                                </div>
                              </div>
                            ))}

                          </div>

                          <button
                            className="btn mt-4"
                            style={{ backgroundColor: "#febd17", color: "#221f20" }}
                            onClick={() => setShowPlacaModal(false)}
                          >
                            Fechar
                          </button>

                        </div>
                      </div>
                    </div>
                  )}

                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
    </>
  );
}
