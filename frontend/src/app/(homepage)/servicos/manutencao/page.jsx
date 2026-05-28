export const metadata = {
 title: "Instalação de painéis solares — Luminar",
};

export default function ManutencaoPage() {
 return (
    <div className="bg-white min-vh-100" style={{ color: "#221f20" }}>

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

        {/* TEXTO */}
        <div className="col-lg-6">

          <span
            className="badge px-4 py-3 rounded-pill fw-bold mb-4 fs-6"
            style={{
              backgroundColor: "#febd17",
              color: "#221f20",
            }}
          >
            MANUTENÇÃO • SEGURANÇA • PERFORMANCE
          </span>

          <h1
            className="display-1 fw-black mb-4"
            style={{
              fontWeight: "900",
              lineHeight: "1.05",
              letterSpacing: "-2px",
            }}
          >
            Manutenção profissional de{" "}
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
            Garantimos máxima eficiência, segurança e
            vida útil para o seu sistema fotovoltaico
            com manutenção especializada.
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
              Solicitar Orcamento
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
          Processo completo para garantir segurança,
          eficiência e durabilidade do sistema.
        </p>
      </div>

      <div className="row g-4 text-center">

        {[
          {
            titulo: "Inspeção inicial",
            descricao:
              "Analisamos todo o sistema fotovoltaico.",
            icone: "bi-search",
          },
          {
            titulo: "Diagnóstico técnico",
            descricao:
              "Identificamos falhas e perda de eficiência.",
            icone: "bi-clipboard-data",
          },
          {
            titulo: "Execução",
            descricao:
              "Realizamos limpeza e manutenção técnica.",
            icone: "bi-tools",
          },
          {
            titulo: "Teste final",
            descricao:
              "Garantimos máxima performance do sistema.",
            icone: "bi-check-circle",
          },
        ].map((item, index) => (
          <div className="col-md-6 col-lg-3" key={index}>

            <div
              className="h-100 p-5 rounded-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >

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

              <h3 className="fw-bold mb-3">
                {item.titulo}
              </h3>

              <p className="fs-5 opacity-75 m-0">
                {item.descricao}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  </section>
  <div
  style={{
    backgroundColor:"2e2e2e"
  }}
  >
    <h6 style={{color:"#2e2e2e"}}>₢feito por @46maarcelo</h6>
  </div>

</div>
 );
}
