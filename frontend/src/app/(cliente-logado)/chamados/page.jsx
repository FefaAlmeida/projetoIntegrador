import styles from "./page.module.css";

export const metadata = {
 title: "Instalação de painéis solares — Luminar",
};

export default function ChamadosPage() {
 return (
    <>
      <div
        className={`d-flex flex-column min-vh-100 ${styles.page}`}
      >

        {/* CONTEÚDO */}
        <main
          className={`flex-grow-1 py-5 px-3 ${styles.main}`}
        >
          <div
            className={`container shadow-lg p-0 overflow-hidden ${styles.shell}`}
          >

            <div className="row g-0">

              {/* LADO ESQUERDO */}
              <div
                className={`col-lg-5 text-white d-flex flex-column justify-content-center p-5 ${styles.sidebar}`}
              >

                <h1
                  className={`fw-bold mb-4 ${styles.title}`}
                >
                  Abrir <br />
                  <span className={styles.highlight}>
                    Chamado Técnico
                  </span>
                </h1>

                <p
                  className={`mb-4 ${styles.description}`}
                >
                  Informe o problema encontrado no seu sistema
                  fotovoltaico. Nossa equipe técnica irá analisar
                  e entrar em contato o mais rápido possível.
                </p>

                {/* BENEFÍCIOS */}
                <div className="mt-4">

                  <div className="d-flex align-items-center mb-3">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${styles.iconCircle}`}
                    >
                      <i className="bi bi-lightning-charge fs-4"></i>
                    </div>

                    <span>Atendimento rápido</span>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${styles.iconCircle}`}
                    >
                      <i className="bi bi-tools fs-4"></i>
                    </div>

                    <span>Equipe especializada</span>
                  </div>

                  <div className="d-flex align-items-center">
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center me-3 ${styles.iconCircle}`}
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
                        className={`form-control ${styles.field}`}
                        placeholder="Seu nome"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        E-mail
                      </label>

                      <input
                        type="email"
                        className={`form-control ${styles.field}`}
                        placeholder="seu@email.com"
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
                        className={`form-control ${styles.field}`}
                        placeholder="(00) 00000-0000"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">
                        Tipo do chamado
                      </label>

                      <select
                        className={`form-select ${styles.field}`}
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
                      className={`form-control ${styles.field}`}
                      placeholder="Ex: Inversor desligado"
                    />

                  </div>

            

                  {/* DESCRIÇÃO */}
                  <div className="mb-4">

                    <label className="form-label fw-bold small text-secondary">
                      Descrição do problema
                    </label>

                    <textarea
                      className={`form-control ${styles.field} ${styles.textarea}`}
                      rows="5"
                      placeholder="Descreva o problema encontrado..."
                    ></textarea>

                  </div>

                  {/* BOTÃO */}
                  <button
                    type="submit"
                    className={`btn fw-bold w-100 py-3 mt-2 ${styles.submitButton}`}
                  >
                    Abrir Chamado
                  </button>

                </form>

              </div>

            </div>

          </div>
        </main>

      </div>
    </>
 );
}
