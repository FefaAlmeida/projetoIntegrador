

export const metadata = {
 title: "Monitoramento dos painéis solares — Luminar",
};

export default function MonitoramentoPage() {
 return (
    <div className="bg-white min-vh-100 service-page">

  {/* HERO */}
  <section className="service-hero d-flex align-items-center">
    <div className="container px-4 px-lg-5">

      <div className="row align-items-center g-4 g-lg-5">

        {/* TEXTO */}
        <div className="col-lg-6">

          <h1
            className="service-hero-title fw-black mb-3 service-hero-copy service-hero-heading"
          >
            Monitoramento inteligente das{" "}
            <span className="service-highlight">
              placas solares
            </span>
          </h1>

          <p
            className="service-hero-text mb-4"
          >
            Acompanhe em tempo real a geração de energia,
            desempenho do sistema e economia mensal das
            suas placas solares.
          </p>

          <div className="d-flex flex-wrap gap-3">

            <a
              href="/orcamento"
              className="btn fw-bold shadow service-quote-btn"
            >
              Solicitar Orçamento
            </a>

            

          </div>

        </div>

        {/* IMAGEM */}
        <div className="col-lg-6 text-center">

          <div className="position-relative d-inline-block service-hero-logo-wrap">

            {/* GLOW */}
            <div className="service-hero-glow" />
{/*IMAGEM*/ }
            <img
      src="/logo-luminar-removebg-preview.png"
      alt="Painéis solares"
      className="img-fluid position-relative service-hero-logo"
    />

          </div>

        </div>

      </div>
    </div>
  </section>

  

  {/* FUNCIONAMENTO */}
  <section
    id="funcionamento"
    className="py-5 service-process-section"
  >
    <div className="container px-4 px-lg-5 py-5">

      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold mb-3">
          Como funciona
        </h2>

        <p className="fs-4 opacity-75 col-lg-8 mx-auto">
          Tecnologia inteligente para acompanhar sua geração
          de energia em tempo real.
        </p>
      </div>

      <div className="row g-4 g-lg-5 text-center justify-content-center">

        {[
          {
            titulo: "Conexão do Sistema",
            descricao:
              "Integramos sensores inteligentes diretamente aos inversores da sua usina solar.",
            icone: "bi-wifi",
          },
          {
            titulo: "Coleta Automatizada",
            descricao:
              "Os dados de geração e eficiência são enviados em tempo real para a nuvem.",
            icone: "bi-cloud-arrow-up",
          },
          {
            titulo: "Análise Inteligente",
            descricao:
              "Algoritmos detectam instantaneamente qualquer anomalia ou perda de performance.",
            icone: "bi-cpu",
          },
          {
            titulo: "Relatórios completos",
            descricao:
              "Você acompanha todos os dados através de um dashboard completo.",
            icone: "bi-file-earmark-bar-graph",
          },
        ].map((item, index) => (
          <div className="col-12 col-lg-10 mx-auto" key={index}>

            <div
              className="service-step-card service-step-card-dark h-100 p-4 rounded-4 d-flex flex-column flex-md-row align-items-center text-center text-md-start gap-3 gap-md-4"
            >

              <div
                className="service-step-icon service-step-icon-md rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
              >
                <i
                  className={`bi ${item.icone} service-step-symbol-md`}
                ></i>
              </div>

              <div className="flex-grow-1">
                <span
                  className="badge mb-2 px-3 py-2 rounded-pill service-step-badge"
                >
                  Etapa {index + 1}
                </span>

                <h3 className="h5 fw-bold mb-2">
                  {item.titulo}
                </h3>

                <p
                  className="opacity-75 m-0 service-step-description-sm"
                >
                  {item.descricao}
                </p>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  </section>
</div>
 );
}
