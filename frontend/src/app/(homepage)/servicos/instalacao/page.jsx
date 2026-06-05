export const metadata = {
 title: "Instalação de painéis solares — Luminar",
};

export default function InstallationPage() {
 return (
    <div className="bg-white min-vh-100" style={{ color: "#221f20" }}>

  {/* HERO */}
  <section
    className="d-flex align-items-center py-5"
    style={{
      minHeight: "90vh",
      background:
        "linear-gradient(180deg, #ffffff 0%, #fff8df 100%)",
      paddingTop: "120px",
      paddingBottom: "80px",
    }}
  >
    <div className="container px-4 px-lg-5">

      <div className="row align-items-center g-5">

        {/* TEXTO */}
        <div className="col-lg-6">

          <h1
            className="display-3 fw-black mb-4"
            style={{
              fontWeight: "900",
              lineHeight: "1.05",
              letterSpacing: "-2px",
            }}
          >
            Instalação de{" "}
            <span style={{ color: "#febd17" }}>
             sistemas solares
            </span>
          </h1>

          <p
            className="fs-3 mb-5"
            style={{
              opacity: 0.85,
              lineHeight: "1.5",
            }}
          >
            Simule de forma 100% automatizada, crie sua conta e agende sua instalação.
          </p>

          <div className="d-flex flex-wrap gap-3">

            <a
              href="/orcamento"
              className="btn btn-lg px-5 py-4 rounded-4 fw-bold shadow"
              style={{
                backgroundColor: "#febd17",
                color: "#221f20",
                border: "none",
              }}
            >
              Solicitar Orçamento
            </a>

            

          </div>

          

        </div>

        {/* IMAGEM */}
        <div className="col-lg-6 text-center">

          <div className="position-relative d-inline-block">

            {/* GLOW */}
            <div
              style={{
                position: "absolute",
                width: "450px",
                height: "450px",
                background: "rgba(254,189,23,0.20)",
                filter: "blur(120px)",
                borderRadius: "50%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
              }}
            />

            {/* IMAGEM */}
            <img
      src="/logo-luminar-removebg-preview.png"
      alt="Painéis solares"
      className="img-fluid position-relative"
      style={{
        maxWidth: "95%",
        zIndex: 2,
      }}
    />

          </div>

        </div>

      </div>
    </div>
  </section>

  {/* PROCESSO */}
  <section
    className="py-5"
    style={{
      backgroundColor: "#2e2e2e",
      color: "#ffffff",
    }}
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
            className="h-100 p-5 rounded-4"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              backdropFilter: "blur(10px)",
              transition: "0.3s",
            }}
          >

            {/* ÍCONE */}
            <div
              className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4"
              style={{
                width: "80px",
                height: "80px",
                backgroundColor: "#febd17",
                color: "#221f20",
              }}
            >
              <i
                className={`bi ${item.icone}`}
                style={{
                  fontSize: "36px",
                }}
              ></i>
            </div>

            {/* ETAPA */}
            <span
              className="badge mb-3 px-3 py-2 rounded-pill"
              style={{
                backgroundColor: "#febd17",
                color: "#221f20",
              }}
            >
              Etapa {index + 1}
            </span>

            {/* TÍTULO */}
            <h3 className="fw-bold mb-3">
              {item.titulo}
            </h3>

            {/* DESCRIÇÃO */}
            <p
              className="fs-5 opacity-75 m-0"
              style={{
                lineHeight: "1.7",
              }}
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
