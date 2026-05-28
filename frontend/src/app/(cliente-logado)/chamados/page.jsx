export const metadata = {
 title: "Instalação de painéis solares — Luminar",
};

export default function ChamadosPage() {
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

        {/* CONTEÚDO */}
        <main
          className="flex-grow-1 py-5 px-3"
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
          }}
        >
          <div
            className="container shadow-lg p-0 overflow-hidden"
            style={{
              maxWidth: "1100px",
              borderRadius: "28px",
              backgroundColor: "#ffffff",
            }}
          >

            <div className="row g-0">

              {/* LADO ESQUERDO */}
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
                  Abrir <br />
                  <span style={{ color: "#febd17" }}>
                    Chamado Técnico
                  </span>
                </h1>

                <p
                  className="mb-4"
                  style={{
                    color: "#d4d4d4",
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                  }}
                >
                  Informe o problema encontrado no seu sistema
                  fotovoltaico. Nossa equipe técnica irá analisar
                  e entrar em contato o mais rápido possível.
                </p>

                {/* BENEFÍCIOS */}
                <div className="mt-4">

                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "45px",
                        height: "45px",
                        backgroundColor: "rgba(254, 189, 23, 0.2)",
                        color: "#febd17",
                      }}
                    >
                      <i className="bi bi-lightning-charge fs-4"></i>
                    </div>

                    <span>Atendimento rápido</span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "45px",
                        height: "45px",
                        backgroundColor: "rgba(254, 189, 23, 0.2)",
                        color: "#febd17",
                      }}
                    >
                      <i className="bi bi-tools fs-4"></i>
                    </div>

                    <span>Equipe especializada</span>
                  </div>

                  <div className="d-flex align-items-center">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center me-3"
                      style={{
                        width: "45px",
                        height: "45px",
                        backgroundColor: "rgba(254, 189, 23, 0.2)",
                        color: "#febd17",
                      }}
                    >
                      <i className="bi bi-shield-check fs-4"></i>
                    </div>

                    <span>Suporte seguro e confiável</span>
                  </div>

                </div>

              </div>

              {/* FORMULÁRIO */}
              <div className="col-lg-7 p-5">

                <form>

                  {/* LINHA 1 */}
                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        Nome
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="Seu nome"
                        style={{
                          borderRadius: "10px",
                          padding: "12px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        E-mail
                      </label>

                      <input
                        type="email"
                        className="form-control"
                        placeholder="seu@email.com"
                        style={{
                          borderRadius: "10px",
                          padding: "12px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                  </div>

                  {/* LINHA 2 */}
                  <div className="row">

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        Telefone
                      </label>

                      <input
                        type="text"
                        className="form-control"
                        placeholder="(00) 00000-0000"
                        style={{
                          borderRadius: "10px",
                          padding: "12px",
                          border: "1px solid #ddd",
                        }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        Tipo do chamado
                      </label>

                      <select
                        className="form-select"
                        style={{
                          borderRadius: "10px",
                          padding: "12px",
                          border: "1px solid #ddd",
                        }}
                      >
                        <option value="">
                          Selecione...
                        </option>

                        <option value="manutencao">
                          Manutenção
                        </option>

                        <option value="limpeza">
                          Limpeza
                        </option>

                        <option value="emergencia">
                          Emergência
                        </option>

                        <option value="outros">
                          Outros
                        </option>

                      </select>
                    </div>

                  </div>

                  {/* TÍTULO */}
                  <div className="mb-3">

                    <label className="form-label fw-bold small text-secondary">
                      Título do problema
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: Inversor desligado"
                      style={{
                        borderRadius: "10px",
                        padding: "12px",
                        border: "1px solid #ddd",
                      }}
                    />

                  </div>

            

                  {/* DESCRIÇÃO */}
                  <div className="mb-4">

                    <label className="form-label fw-bold small text-secondary">
                      Descrição do problema
                    </label>

                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Descreva o problema encontrado..."
                      style={{
                        borderRadius: "10px",
                        padding: "12px",
                        border: "1px solid #ddd",
                        resize: "none",
                      }}
                    ></textarea>

                  </div>

                  {/* BOTÃO */}
                  <button
                    type="submit"
                    className="btn fw-bold w-100 py-3 mt-2"
                    style={{
                      backgroundColor: "#febd17",
                      color: "#221f20",
                      borderRadius: "14px",
                      fontSize: "1.1rem",
                      border: "none",
                      boxShadow:
                        "0 4px 15px rgba(254, 189, 23, 0.3)",
                    }}
                  >
                    Abrir Chamado
                  </button>

                </form>

              </div>

            </div>

          </div>
        </main>

      </div>
      <div style={{
    backgroundColor:"#ececec"
      }}>
        <h6>₢feito por marcelo₢</h6>

      </div>
    </>
 );
}
