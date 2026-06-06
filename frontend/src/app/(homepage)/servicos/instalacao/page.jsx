export const metadata = {
 title: "Instalação de painéis solares — Luminar",
};

export default function InstallationPage() {
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
            Instalação de{" "}
            <span className="service-highlight">
             sistemas solares
            </span>
          </h1>

          <p
            className="service-hero-text mb-4"
          >
            Simule de forma 100% automatizada, crie sua conta e agende sua instalação.
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
        Cuidamos de todo o processo para você começar
        a economizar energia com segurança, rapidez e
        acompanhamento técnico especializado.
        </p>
      </div>

<div className="row g-4 text-center">

      {[
        {
          titulo: "Simulação Instantânea",
          descricao: "Você insere os dados de consumo da sua empresa e nossa plataforma calcula o orçamento ideal na hora.",
          icone: "bi-lightning-charge-fill",
        },
        {
          titulo: "Criação de conta e Agendamento",
          descricao: "Ao aceitar a proposta, você cria seu perfil na Luminar e agenda o melhor dia para a instalação.",
          icone: "bi-calendar-event-fill",
        },
        {
          titulo: "Instalação e Economia",
          descricao: "Técnicos especializados montam o sistema. Pronto! Sua usina começa a gerar energia e reduzir custos.",
          icone: "bi-tools",
        }
      ].map((item, index) => (
        <div className="col-md-6 col-lg-4" key={index}>

          <div
            className="service-step-card service-step-card-dark h-100 p-5 rounded-4 d-flex flex-column align-items-center"
          >

            {/* ÍCONE */}
            <div
              className="service-step-icon service-step-icon-lg rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
            >
              <i
                className={`bi ${item.icone} service-step-symbol-lg`}
              ></i>
            </div>

            {/* ETAPA */}
            <span
              className="badge mb-3 px-3 py-2 rounded-pill service-step-badge"
            >
              Etapa {index + 1}
            </span>

            {/* TÍTULO */}
            <h3 className="fw-bold mb-3 text-center">
              {item.titulo}
            </h3>

            {/* DESCRIÇÃO */}
            <p
              className="fs-5 opacity-75 m-0 w-100 service-step-description"
            >
              {item.descricao}
            </p>

          </div>

        </div>
      ))}

    </div>    

  </div>

  </section>

</div>
 );
}
