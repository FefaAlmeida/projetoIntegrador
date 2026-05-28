
export const metadata = {
 title: "Instalação de painéis solares — Luminar",
};

export default function InstallationPage() {
 return (
    <div className="bg-white min-vh-100" style={{ color: '#221f20' }}>
      
      {/* 1. HERO */}
      <section className="py-5 text-center d-flex align-items-center" style={{ background: '#ffffff', minHeight: '65vh' }}>
        <div className="container py-5">
          <span className="badge px-4 py-2 rounded-pill fw-bold mb-4 fs-6" style={{ backgroundColor: '#febd17', color: '#221f20' }}>
            ENGENHARIA E EXECUÇÃO
          </span>
          <h1 className="display-2 fw-black mb-4" style={{ color: '#221f20', fontWeight: '900', letterSpacing: '-1px' }}>
            Instalação profissional de <br />
            <span style={{ color: '#febd17' }}>sistemas fotovoltaicos</span>
          </h1>
          <p className="lead col-md-8 mx-auto fs-3 fw-normal mb-5" style={{ color: '#221f20', opacity: 0.85 }}>
            Transformamos seu telhado em uma geradora de economia com rapidez, segurança e zero dor de cabeça.
          </p>
          <a href="/quote" className="btn btn-lg px-5 py-4 rounded-4 fw-bold shadow border-0 fs-4" style={{ backgroundColor: '#febd17', color: '#221f20' }}>
            Realizar um Orçamento
          </a>
        </div>
      </section>

      {/* 2. PROCESSO EM DOIS PASSOS */}
      <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container py-5">
          <div className="row g-5 justify-content-center">
            {/* Passo 1 */}
            <div className="col-md-6 col-lg-5">
              <div className="card p-5 h-100 rounded-4 shadow-sm bg-white" style={{ border: '2px solid #221f20' }}>
                <div className="d-flex align-items-center mb-4">
                  <span className="fs-3 rounded-circle me-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '55px', height: '55px', backgroundColor: '#febd17', color: '#221f20' }}>
                    1
                  </span>
                  <h3 className="display-6 fw-bold m-0" style={{ color: '#221f20' }}>Engenharia</h3>
                </div>
                <p className="m-0 fs-4 lh-base" style={{ color: '#221f20', opacity: 0.9 }}>
                  Análise estrutural completa e desenvolvimento do projeto ideal para o seu consumo.
                </p>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="col-md-6 col-lg-5">
              <div className="card p-5 h-100 rounded-4 shadow-sm bg-white" style={{ border: '2px solid #221f20' }}>
                <div className="d-flex align-items-center mb-4">
                  <span className="fs-3 rounded-circle me-3 d-flex align-items-center justify-content-center fw-bold" style={{ width: '55px', height: '55px', backgroundColor: '#febd17', color: '#221f20' }}>
                    2
                  </span>
                  <h3 className="display-6 fw-bold m-0" style={{ color: '#221f20' }}>Ativação</h3>
                </div>
                <p className="m-0 fs-4 lh-base" style={{ color: '#221f20', opacity: 0.9 }}>
                  Montagem física ágil e homologação burocrática 100% resolvida com a concessionária.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CAPTURA DE LEAD DIRETA */}
      <section className="py-5" style={{ backgroundColor: '#febd17' }}>
        <div className="container py-5">
          <div className="card p-5 rounded-4 border-0 shadow-lg" style={{ backgroundColor: '#221f20', color: '#ffffff' }}>
            <div className="row align-items-center g-4">
              <div className="col-lg-6">
                <h2 className="display-4 fw-bold mb-3">Deseja uma avaliacao de um dos nossos Engenheiros? </h2>
                <p className="fs-4 opacity-75 mb-4">Insira o seu email para entrarmos em contato.</p>
                <div className="mb-3">
                  <input type="email" className="form-control form-control-lg rounded-3 border-0 py-3 fs-4" placeholder="Digite seu email" style={{ color: '#221f20' }} />
                </div>
                <button className="btn btn-lg w-100 py-3 fw-bold fs-4" style={{ backgroundColor: '#febd17', color: '#221f20' }}>
                  Verificar Viabilidade Grátis
                </button>
              </div>
              <div className="col-lg-6 text-center">
                <img src="logo-luminar.png" alt="Logo" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
 );
}
