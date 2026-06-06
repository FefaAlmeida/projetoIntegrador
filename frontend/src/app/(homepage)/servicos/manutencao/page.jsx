export const metadata = {
 title: "Manutenção de painéis solares — Luminar",
};

export default function ManutencaoPage() {
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
            Manutenção profissional dos{" "}
            <span className="service-highlight">
              sistemas solares
            </span>
          </h1>

          <p
            className="service-hero-text mb-4"
          >
            Garantimos máxima eficiência, segurança e
            vida útil para o seu sistema fotovoltaico
            com manutenção especializada.
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

            {/* IMAGEM */}
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

  {/* PROCESSO */}
  <section
    className="py-5 service-process-section"
  >
    <div className="container px-4 px-lg-5 py-5">

      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold mb-3">
          Como funciona
        </h2>

        <p className="fs-4 opacity-75 col-lg-8 mx-auto">
          Processo completo para garantir segurança,
          eficiência e durabilidade do sistema.
        </p>
      </div>

      <div className="row g-4 g-lg-5 text-center justify-content-center">

        {[
          {
            titulo: "Chamado em 1 clique",
            descricao:
              "Solicite manutenção ou limpeza de forma fácil e rápida direto pelo painel online da Luminar.",
            icone: "bi-cursor-fill",
          },
          {
            titulo: "Envio ágil",
            descricao:
              "Nossa equipe técnica é acionada imediatamente para agendar e realizar o atendimento sem enrolação.",
            icone: "bi-lightning-charge-fill",
          },
          {
            titulo: "Manutenção e Limpeza",
            descricao:
              "Técnicos especializados realizam a limpeza das placas e a revisão completa dos inversores.",
            icone: "bi-tools",
          },
          {
            titulo: "Garantia assegurada",
            descricao:
              "Nosso suporte técnico garante máxima performance do seu sistema.",
            icone: "bi-check-circle",
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
