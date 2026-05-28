export const metadata = {
 title: "Instalação de painéis solares — Luminar",
};

export default function InstallationPage() {
 return (
    <div className="bg-white min-vh-100" style={{ color: "#221f20" }}>

  {/* HERO */}
 {/* HERO */}
<section
  className="d-flex align-items-center"
  style={{
    minHeight: "90vh",
    background:
      "linear-gradient(180deg, #ffffff 0%, #fff8df 100%)",
  }}
>
  <div className="container">

    <div className="row align-items-center g-5">

      {/* LADO ESQUERDO — TEXTO */}
      <div className="col-lg-6">

        <span
          className="badge px-4 py-3 rounded-pill fw-bold mb-4 fs-6"
          style={{
            backgroundColor: "#febd17",
            color: "#221f20",
          }}
        >
          ENGENHARIA • INSTALAÇÃO • HOMOLOGAÇÃO
        </span>

        <h1
          className="display-1 fw-black mb-4"
          style={{
            fontWeight: "900",
            lineHeight: "1.05",
            letterSpacing: "-2px",
          }}
        >
          Instalação de{" "}
          <span style={{ color: "#febd17" }}>
            energia solar
          </span>{" "}
          com máxima eficiência
        </h1>

        <p
          className="fs-3 mb-5"
          style={{
            opacity: 0.85,
            lineHeight: "1.5",
          }}
        >
          Economize até 95% na conta de energia com
          projetos fotovoltaicos modernos.
        </p>

        <a
          href="/orcamento"
          className="btn btn-lg px-5 py-4 rounded-4 fw-bold shadow"
          style={{
            backgroundColor: "#febd17",
            color: "#221f20",
            border: "none",
          }}
        >
          Solicitar orçamento
        </a>

      </div>

      {/* LADO DIREITO — IMAGEM */}
      <div className="col-lg-6 text-center">

        <div className="position-relative d-inline-block">

          

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
{/* PROCESSO */}
<section
  className="py-5"
  style={{
    backgroundColor: "#221f20",
    color: "#ffffff",
  }}
>
  <div className="container py-5">

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
          titulo: "Análise de consumo",
          descricao:
            "Estudamos sua conta de energia para identificar o sistema ideal.",
          icone: "bi-bar-chart-line",
        },
        {
          titulo: "Projeto personalizado",
          descricao:
            "Criamos um projeto fotovoltaico sob medida para sua necessidade.",
          icone: "bi-rulers",
        },
        {
          titulo: "Aprovação técnica",
          descricao:
            "Realizamos toda documentação e aprovação junto à concessionária.",
          icone: "bi-file-earmark-check",
        },
        {
          titulo: "Instalação profissional",
          descricao:
            "O Marcelo realiza a instalação com rapidez e segurança.",
          icone: "bi-tools",
        },
        {
          titulo: "Homologação",
          descricao:
            "Seu sistema é conectado oficialmente à rede elétrica.",
          icone: "bi-lightning-charge",
        },
        {
          titulo: "Economia imediata",
          descricao:
            "Você começa a gerar sua própria energia e reduzir custos.",
          icone: "bi-cash-stack",
        },
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
