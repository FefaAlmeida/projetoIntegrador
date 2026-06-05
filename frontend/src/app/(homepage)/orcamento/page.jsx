"use client";

import React, { useState } from "react";
import { criarOrcamento, aceitarOrcamento, recusarOrcamento } from "../../../api";
import { toast } from "sonner";
import './orcamento.css';

export default function OrcamentoPage() {

  const placas = [
    {
      id: "CANADIAN_550W",
      nome: "Canadian Solar 550W",
      descricao: "Alto desempenho com excelente custo-benefício.",
      imagem: "https://www.evolusom.com.br/media/catalog/product/cache/05cb70b6fa50ec9e936cb2c4f7845492/3/8/382518_67d2cb1483a8a.webp",
      valor: 900,
    },
    {
      id: "JINKO_600W",
      nome: "Jinko Solar 600W",
      descricao: "Alta potência para empresas com grande demanda energética.",
      imagem: "https://pt.sailsolarpv.com/storage/uploads/images/202509/11/1757583519_fbuil7fOUO.jpg",
      valor: 1000,
    },
    {
      id: "TRINA_575W",
      nome: "Trina Solar 575W",
      descricao: "Alta estabilidade e excelente eficiência contínua.",
      imagem: "https://solarman.com.br/wp-content/uploads/2024/12/575w-trina.png",
      valor: 950,
    },
    {
      id: "LONGI_650W",
      nome: "Longi Solar 650W",
      descricao: "Altíssima performance para grandes operações empresariais.",
      imagem: "https://siwasolar.com/wp-content/uploads/2024/10/5.jpg",
      valor: 1200,
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
          `/cadastrar?token=${response.dados.token}`;

      } else {

        toast.error(response.erro || "Erro ao aceitar orçamento.");

      }

    } catch (error) {

      toast.error("Erro ao conectar com o servidor.");

    }
  }

  async function handleRecusarOrcamento() {
    try {

      const response = await recusarOrcamento(resultado.id);

      if (response.sucesso) {

        setShowModal(false)

      } else {

        toast.error(response.erro || "Erro ao recusar orçamento.");

      }

    } catch (error) {

      toast.error("Erro ao conectar com o servidor.");

    }
  }

  return (
    <>
      <div
        className="d-flex flex-column min-vh-100 "
        style={{
          backgroundColor: "#ececec",
          overflowX: "hidden",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5 px-3" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
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
                  Insira os dados da sua empresa e informe a quantidade e modelo das placas. Nossa plataforma vai calcular a sua economia e gerar uma proposta personalizada <strong>em poucos segundos</strong>.
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
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        <option value="AM">AM</option>
                        <option value="AP">AP</option>
                        <option value="BA">BA</option>
                        <option value="CE">CE</option>
                        <option value="DF">DF</option>
                        <option value="ES">ES</option>
                        <option value="GO">GO</option>
                        <option value="MA">MA</option>
                        <option value="MG">MG</option>
                        <option value="MS">MS</option>
                        <option value="MT">MT</option>
                        <option value="PA">PA</option>
                        <option value="PB">PB</option>
                        <option value="PE">PE</option>
                        <option value="PI">PI</option>
                        <option value="PR">PR</option>
                        <option value="RJ">RJ</option>
                        <option value="RN">RN</option>
                        <option value="RO">RO</option>
                        <option value="RR">RR</option>
                        <option value="RS">RS</option>
                        <option value="SC">SC</option>
                        <option value="SE">SE</option>
                        <option value="SP">SP</option>
                        <option value="TO">TO</option>
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
                    className="btn fw-bold w-100 py-3 mt-5"
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
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)" }}
                    >
                      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "480px" }}>
                        <div 
                          className="modal-content border-0 shadow-2xl p-4" 
                          style={{ borderRadius: "24px", backgroundColor: "#ffffff" }}
                        >

                          {modalLoading ? (
                            <div className="text-center py-5">
                              <div className="spinner-border text-warning mb-3" role="status" style={{ width: "3rem", height: "3rem" }}></div>
                              <h5 className="fw-bold text-dark">Calculando seu orçamento...</h5>
                              <p className="text-muted small mb-0">Analisando potência e estimativa de economia</p>
                            </div>
                          ) : (
                            <>
                              {/* ÍCONE DE SUCESSO ANIMADO */}
                              <div className="text-center my-3">
                                <div 
                                  className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
                                  style={{ width: "70px", height: "70px", backgroundColor: "rgba(254, 189, 23, 0.15)" }}
                                >
                                  <i
                                    className="bi bi-check-circle-fill"
                                    style={{ fontSize: "2.5rem", color: "#febd17" }}
                                  />
                                </div>
                                <h4 className="fw-bold text-dark mb-1">Orçamento Gerado!</h4>
                                <p className="text-muted small">Confira os detalhes da sua proposta personalizada</p>
                              </div>

                              {/* GRID DE DETALHES ESPECÍFICOS */}
                              <div className="bg-light rounded-4 p-3 mb-3" style={{ borderRadius: "16px" }}>
                                <div className="row g-3">
                                  <div className="col-6">
                                    <span className="text-secondary d-block" style={{ fontSize: "0.8rem", fontWeight: "500" }}>Potência Estimada</span>
                                    <strong className="text-dark fs-5">{resultado?.potencia_estimada} <span className="fs-6 fw-normal text-muted">kWp</span></strong>
                                  </div>
                                  <div className="col-6">
                                    <span className="text-secondary d-block" style={{ fontSize: "0.8rem", fontWeight: "500" }}>Economia Anual</span>
                                    <strong className="text-success fs-5">
                                      {Number(resultado?.economia_estimada || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </strong>
                                  </div>
                                  <div className="col-12"><hr className="my-1 opacity-25" /></div>
                                  <div className="col-6">
                                    <span className="text-secondary d-block" style={{ fontSize: "0.8rem", fontWeight: "500" }}>Custo dos Painéis</span>
                                    <span className="text-dark fw-semibold">
                                      {Number(resultado?.valor_placas || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </span>
                                  </div>
                                  <div className="col-6">
                                    <span className="text-secondary d-block" style={{ fontSize: "0.8rem", fontWeight: "500" }}>Custo de Instalação</span>
                                    <span className="text-dark fw-semibold">
                                      {Number(resultado?.valor_instalacao || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* CAIXA DE DESTAQUE DO VALOR TOTAL */}
                              <div 
                                className="text-center p-3 mb-4" 
                                style={{ 
                                  backgroundColor: "#221f20", 
                                  borderRadius: "16px",
                                  boxShadow: "0 8px 20px rgba(34, 31, 32, 0.15)"
                                }}
                              >
                                <span className="text-uppercase tracking-wider d-block mb-1" style={{ color: "#d4d4d4", fontSize: "0.75rem", fontWeight: "600", letterSpacing: "1px" }}>
                                  Investimento Total
                                </span>
                                <h2 className="fw-bold m-0" style={{ color: "#febd17", fontSize: "2rem" }}>
                                  {Number(resultado?.valor_total || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </h2>
                              </div>

                              {/* BOTÕES DE AÇÃO */}
                              <div className="d-flex flex-column gap-2">
                                <button
                                  type="button"
                                  className="btn fw-bold py-3 text-center transition-all d-flex align-items-center justify-content-center gap-2"
                                  style={{
                                    backgroundColor: "#febd17",
                                    color: "#221f20",
                                    borderRadius: "14px",
                                    border: "none",
                                    boxShadow: "0 4px 12px rgba(254, 189, 23, 0.25)"
                                  }}
                                  onClick={handleAceitarOrcamento}
                                >
                                  <span>Aceitar e Criar Conta</span>
                                  <i className="bi bi-arrow-right-short fs-5"></i>
                                </button>

                                <button
                                  type="button"
                                  className="btn fw-semibold py-2.5 text-secondary border-0 btn-hover-light"
                                  style={{
                                    borderRadius: "14px",
                                    fontSize: "0.9rem",
                                    backgroundColor: "transparent"
                                  }}
                                  onClick={handleRecusarOrcamento}
                                >
                                  Recusar Proposta
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
    style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)" }}
  >
    <div className="modal-dialog modal-dialog-centered modal-scale" style={{ maxWidth: "680px" }}>
      <div 
        className="modal-content border-0 shadow-2xl p-4" 
        style={{ borderRadius: "24px", backgroundColor: "#ffffff" }}
      >
        
        {/* CABEÇALHO DO MODAL */}
        <div className="text-center mb-4">
          <h4 className="fw-bold text-dark mb-1">Escolha seu modelo de placa</h4>
          <p className="text-muted small mb-0">Selecione a tecnologia ideal para o projeto da sua empresa</p>
        </div>

        {/* GRID DE PLACAS */}
        <div className="row g-3">
          {placas.map((placa) => {
            const isSelected = formData.modelo_placa === placa.id;
            return (
              <div key={placa.id} className="col-md-6">
                <div
                  onClick={() => selecionarPlaca(placa.id)}
                  className={`card h-100 p-3 transition-all ${isSelected ? 'shadow-sm' : ''}`}
                  style={{
                    cursor: "pointer",
                    borderRadius: "16px",
                    border: isSelected ? "2px solid #febd17" : "1px solid #e5e7eb",
                    backgroundColor: isSelected ? "rgba(254, 189, 23, 0.03)" : "#ffffff",
                    transform: isSelected ? "scale(1.01)" : "none",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {/* CONTAINER DA IMAGEM */}
                  <div 
                    className="w-100 mb-3 d-flex align-items-center justify-content-center bg-light"
                    style={{ borderRadius: "12px", height: "130px", overflow: "hidden" }}
                  >
                    <img
                      src={placa.imagem}
                      className="img-fluid"
                      style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                      alt={placa.nome}
                    />
                  </div>

                  {/* LINHA DO TÍTULO + VALOR EM DESTAQUE */}
                  <div className="d-flex align-items-start justify-content-between gap-2 mb-1">
                    <h6 className="fw-bold text-dark mb-0 style-title" style={{ lineHeight: "1.2" }}>
                      {placa.nome}
                    </h6>
                    <span 
                      className="fw-bold px-2 py-1 rounded" 
                      style={{ 
                        fontSize: "0.85rem", 
                        backgroundColor: isSelected ? "#febd17" : "#f3f4f6",
                        color: "#221f20",
                        whiteSpace: "nowrap",
                        transition: "background-color 0.2s"
                      }}
                    >
                      {Number(placa.valor || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>

                  {/* DESCRIÇÃO */}
                  <p className="small text-secondary mb-0 flex-grow-1" style={{ fontSize: "0.85rem", lineHeight: "1.4" }}>
                    {placa.descricao}
                  </p>
                  
        

                </div>
              </div>
            );
          })}
        </div>

        {/* BOTÃO FECHAR */}
        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn fw-bold px-4 py-2.5 text-white"
            style={{ 
              backgroundColor: "#221f20", 
              borderRadius: "12px",
              fontSize: "0.95rem",
              border: "none",
              boxShadow: "0 4px 12px rgba(34, 31, 32, 0.15)"
            }}
            onClick={() => setShowPlacaModal(false)}
          >
            Confirmar Escolha
          </button>
        </div>

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
