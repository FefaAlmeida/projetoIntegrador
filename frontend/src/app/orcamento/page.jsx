import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function OrcamentoPage() {
  return (
    <>
      <Header />
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
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Seu nome"
                        style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="seu@email.com"
                        style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">Telefone</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="(00) 00000-0000"
                        style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">Cidade/UF</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: São Paulo - SP"
                        style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Valor médio da conta de luz (R$)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Ex: 350"
                      style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small text-secondary">Tipo de Imóvel</label>
                    <select className="form-select" style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}>
                      <option value="">Selecione...</option>
                      <option value="residencial">Residencial</option>
                      <option value="comercial">Comercial</option>
                      <option value="industrial">Industrial</option>
                      <option value="rural">Rural</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn fw-bold w-100 py-3 mt-2"
                    style={{
                      backgroundColor: "#febd17",
                      color: "#221f20",
                      borderRadius: "14px",
                      fontSize: "1.1rem",
                      border: "none",
                      boxShadow: "0 4px 15px rgba(254, 189, 23, 0.3)",
                    }}
                  >
                    Solicitar Orçamento Grátis
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
    </>
  );
}
