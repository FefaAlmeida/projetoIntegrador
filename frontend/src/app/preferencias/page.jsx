
import styles from "./page.module.css";

const userPreview = {
  name: "Maria Oliveira",
  email: "maria.oliveira@email.com",
  phone: "(11) 99999-9999",
  city: "São Paulo",
  state: "SP",
};

export default function PreferenciasPage() {
  return (
    <>

      <main className="bg-soft py-section">
        <section className="container">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-4">
              <aside className="h-100 bg-gradient-dark text-white rounded-xl p-4 p-md-5 shadow-glow-dark">
                <span className="badge bg-yellow text-dark-2 rounded-pill px-3 py-2 mb-4 fw-bold">
                  Área do cliente
                </span>

                <div className="d-flex align-items-center gap-3 mb-4">
                  <div
                    className={`rounded-circle bg-yellow text-dark-2 d-flex align-items-center justify-content-center fw-bold ${styles.avatar}`}
                  >
                    MO
                  </div>
                  <div>
                    <h1 className="h3 fw-bold mb-1">Preferências</h1>
                    <p className="text-white-50 mb-0">Gerencie sua conta Luminar.</p>
                  </div>
                </div>

                <div className="border-top border-secondary pt-4 mt-4">
                  <p className="small text-uppercase text-white-50 fw-bold mb-2">
                    Usuário atual
                  </p>
                  <h2 className="h5 fw-bold mb-1">{userPreview.name}</h2>
                  <p className="text-white-50 mb-0">{userPreview.email}</p>
                </div>

                <div className="mt-5">
                  <button type="button" className="btn btn-outline-light w-100 rounded-pill fw-bold py-3">
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Sair da conta
                  </button>
                  <p className="small text-white-50 mt-3 mb-0">
                    Este botão está preparado visualmente para logout, mas ainda não executa backend.
                  </p>
                </div>
              </aside>
            </div>

            <div className="col-lg-8">
              <div className="bg-white rounded-xl shadow-card p-4 p-md-5 h-100">
                <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-5">
                  <div>
                    <h2 className="fw-bold text-dark-2 mb-2">Editar informações</h2>
                    <p className="text-muted-custom mb-0">
                      Dados estáticos por enquanto, prontos para integração futura.
                    </p>
                  </div>
                  <span className="badge bg-warning-subtle text-dark rounded-pill px-3 py-2">
                    Sem backend
                  </span>
                </div>

                <form>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0 px-0 shadow-none input-underline"
                        defaultValue={userPreview.name}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">
                        E-mail
                      </label>
                      <input
                        type="email"
                        className="form-control border-0 border-bottom rounded-0 px-0 shadow-none input-underline"
                        defaultValue={userPreview.email}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label small fw-bold text-secondary">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        className="form-control border-0 border-bottom rounded-0 px-0 shadow-none input-underline"
                        defaultValue={userPreview.phone}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-secondary">
                        Cidade
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0 px-0 shadow-none input-underline"
                        defaultValue={userPreview.city}
                      />
                    </div>

                    <div className="col-md-3">
                      <label className="form-label small fw-bold text-secondary">
                        Estado
                      </label>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom rounded-0 px-0 shadow-none input-underline"
                        defaultValue={userPreview.state}
                      />
                    </div>
                  </div>

                  <div className="bg-soft rounded-lg-custom p-4 mt-5">
                    <h3 className="h5 fw-bold text-dark-2 mb-3">Segurança</h3>
                    <div className="row g-4">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">
                          Nova senha
                        </label>
                        <input
                          type="password"
                          className="form-control border-0 border-bottom rounded-0 px-0 shadow-none input-underline bg-transparent"
                          placeholder="Digite uma nova senha"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-secondary">
                          Confirmar nova senha
                        </label>
                        <input
                          type="password"
                          className="form-control border-0 border-bottom rounded-0 px-0 shadow-none input-underline bg-transparent"
                          placeholder="Repita a nova senha"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-3 justify-content-end mt-5">
                    <button type="button" className="btn btn-outline-custom rounded-pill px-4 py-3">
                      Cancelar alterações
                    </button>
                    <button type="button" className="btn btn-yellow rounded-pill px-5 py-3 shadow-glow">
                      Salvar preferências
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
