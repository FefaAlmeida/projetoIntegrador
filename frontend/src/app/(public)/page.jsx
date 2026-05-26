"use client";

export default function Home() {
 return (
  <>
   <div className="bg-light">
    {/* INICIAL */}
    <div
     className="position-relative overflow-hidden pt-0 px-3 pb-3 p-md-5 text-center text-white"
     style={{
      marginTop: "-1px",
      backgroundImage:
       'linear-gradient(rgba(33, 37, 41, 0.8), rgba(33, 37, 41, 0.85)), url("https://moduloenergia.com/wp-content/uploads/telha-solar-ou-painel-solar-qual-o-melhor.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
     }}
    >
     <div
      className="col-md-6 p-lg-5 mx-auto my-5 position-relative"
      style={{ zIndex: 2 }}
     >
      <h1 className="display-3 fw-bold mb-3 text-uppercase tracking-wide">
       Projetado para <span style={{ color: "#FFC107" }}>Empresas</span>
      </h1>

      <h3 className="fw-light mb-5 fs-4" style={{ color: "#e9ecef" }}>
       Consiga tudo o que quiser com o luminar.
      </h3>
     </div>
    </div>

    {/* HERO */}
    <section
     className="bg-light"
     style={{
      paddingTop: "90px",
      paddingBottom: "130px",
     }}
    >
     <div className="container">
      <div className="row align-items-center g-5">
       {/* TEXTO */}
       <div className="col-lg-6">
        <h1
         className="display-4 fw-bold mb-4"
         style={{
          color: "#1a1a1a",
          lineHeight: "1.2",
         }}
        >
         Energia solar para reduzir sua conta de luz
        </h1>

        <p
         className="lead"
         style={{
          color: "#6c757d",
          maxWidth: "540px",
         }}
        >
         Projetamos e instalamos sistemas de energia solar fotovoltaica para residências,
         comércios e indústrias com alta eficiência e economia garantida.
        </p>

        <div className="d-flex flex-wrap gap-3 mt-4">
         <button
          className="btn btn-warning btn-lg fw-bold px-4"
          style={{
           borderRadius: "12px",
          }}
         >
          Solicitar orçamento
         </button>

         <button
          className="btn btn-outline-dark btn-lg fw-bold px-4"
          style={{
           borderRadius: "12px",
          }}
         >
          Simular economia
         </button>
        </div>
       </div>

       {/* IMAGEM */}
       <div className="col-lg-6 text-center">
        <img
         src="painelsolar.jpg"
         className="img-fluid shadow"
         alt="Painel solar"
         style={{
          borderRadius: "24px",
          maxHeight: "500px",
          objectFit: "cover",
         }}
        />
       </div>
      </div>
     </div>
    </section>

    {/* DIFERENCIAIS */}
    <section
     className="bg-white"
     style={{
      paddingTop: "130px",
      paddingBottom: "130px",
     }}
    >
     <div className="container">
      <div className="text-center mb-5">
       <h2
        className="fw-bold"
        style={{
         fontSize: "2.7rem",
         color: "#212529",
         fontFamily: "'Poppins', sans-serif",
         letterSpacing: "1px",
        }}
       >
        Nossos Diferenciais
       </h2>

       <div
        className="mx-auto mt-3"
        style={{
         width: "90px",
         height: "5px",
         backgroundColor: "#FFC107",
         borderRadius: "10px",
        }}
       ></div>
      </div>

      {/* ROW */}
      <div className="row g-5">
       {/* CARD */}
       <div className="col-md-4">
        <div
         className="card border-0 shadow-lg h-100 text-center p-4 rounded-4 hover-card"
         style={{
          transition: "0.3s",
          cursor: "pointer",
         }}
        >
         <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center"
          style={{
           width: "80px",
           height: "80px",
           borderRadius: "50%",
           backgroundColor: "#FFC107",
          }}
         >
          <i className="bi bi-cash-coin fs-2 text-dark"></i>
         </div>

         <h4 className="fw-bold mb-3">Economia Real</h4>

         <p className="text-secondary">
          Economize até 95% na conta de energia com soluções eficientes.
         </p>
        </div>
       </div>

       {/* CARD */}
       <div className="col-md-4">
        <div
         className="card border-0 shadow-lg h-100 text-center p-4 rounded-4 hover-card"
         style={{
          transition: "0.3s",
          cursor: "pointer",
         }}
        >
         <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center"
          style={{
           width: "80px",
           height: "80px",
           borderRadius: "50%",
           backgroundColor: "#FFC107",
          }}
         >
          <i className="bi bi-lightning-charge fs-2 text-dark"></i>
         </div>

         <h4 className="fw-bold mb-3">Tecnologia Moderna</h4>

         <p className="text-secondary">
          Equipamentos modernos com alta eficiência e durabilidade.
         </p>
        </div>
       </div>

       {/* CARD */}
       <div className="col-md-4">
        <div
         className="card border-0 shadow-lg h-100 text-center p-4 rounded-4 hover-card"
         style={{
          transition: "0.3s",
          cursor: "pointer",
         }}
        >
         <div
          className="mx-auto mb-4 d-flex align-items-center justify-content-center"
          style={{
           width: "80px",
           height: "80px",
           borderRadius: "50%",
           backgroundColor: "#FFC107",
          }}
         >
          <i className="bi bi-headset fs-2 text-dark"></i>
         </div>

         <h4 className="fw-bold mb-3">Suporte Especializado</h4>

         <p className="text-secondary">
          Atendimento técnico rápido e suporte completo para você.
         </p>
        </div>
       </div>
      </div>

      <style jsx>{`
       .hover-card:hover {
        transform: scale(1.05);
       }
      `}</style>
     </div>
    </section>

    {/* SERVIÇOS */}
    <section
     style={{
      backgroundColor: "#212529",
      paddingTop: "30px",
      paddingBottom: "30px",
     }}
    >
     <div className="container px-4 py-5" id="custom-cards">
      <div className="text-center mb-5">
       <h2
        className="fw-bold"
        style={{
         fontSize: "2.7rem",
         color: "#FFC107",
         fontFamily: "'Poppins', sans-serif",
         letterSpacing: "1px",
        }}
       >
        Confira nossos Serviços
       </h2>
      </div>

      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
       {/* CARD 1 */}
       <div className="col">
        <div
         className="card-hover card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg border-0 position-relative"
         style={{
          backgroundImage:
           'url("https://descarbonizesolucoes.com.br/blog/wp-content/uploads/2024/12/engenharia-instalacao-paineis-solares-campo-aberto.webp")',
          minHeight: "360px",
          backgroundSize: "cover",
          backgroundPosition: "center",
         }}
        >
         {/* PELÍCULA PRETA */}
         <div
          style={{
           position: "absolute",
           inset: 0,
           backgroundColor: "rgba(0,0,0,0.45)",
          }}
         ></div>

         {/* TEXTO */}
         <div className="d-flex flex-column h-100 p-4 text-white text-shadow-1 text-center justify-content-center position-relative">
          <h3 className="fw-bold">Instalação de painéis solares</h3>
         </div>
        </div>
       </div>

       {/* CARD 2 */}
       <div className="col">
        <div
         className="card-hover card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg border-0 position-relative"
         style={{
          backgroundImage:
           'url("https://cdn.prod.website-files.com/6800d450c97b7af1e8cc4be2/681b4df93cee4c65220a1fa8_Design%20sem%20nome%20-%202025-05-07T091107.350.png")',
          minHeight: "360px",
          backgroundSize: "cover",
          backgroundPosition: "center",
         }}
        >
         {/* PELÍCULA PRETA */}
         <div
          style={{
           position: "absolute",
           inset: 0,
           backgroundColor: "rgba(0,0,0,0.45)",
          }}
         ></div>

         {/* TEXTO */}
         <div className="d-flex flex-column h-100 p-4 text-white text-shadow-1 text-center justify-content-center position-relative">
          <h3 className="fw-bold">Monitoramento energético</h3>
         </div>
        </div>
       </div>

       {/* CARD 3 */}
       <div className="col">
        <div
         className="card-hover card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg border-0 position-relative"
         style={{
          backgroundImage:
           'url("https://institutosolar.com/wp-content/uploads/2019/05/Manuten%C3%A7%C3%A3o-do-painel-solar.jpg")',
          minHeight: "360px",
          backgroundSize: "cover",
          backgroundPosition: "center",
         }}
        >
         {/* PELÍCULA PRETA */}
         <div
          style={{
           position: "absolute",
           inset: 0,
           backgroundColor: "rgba(0,0,0,0.45)",
          }}
         ></div>

         {/* TEXTO */}
         <div className="d-flex flex-column h-100 p-4 text-white text-shadow-1 text-center justify-content-center position-relative">
          <h3 className="fw-bold">Manutenção</h3>
         </div>
        </div>
       </div>
      </div>
     </div>

     <style jsx>{`
      .card-hover {
       transition: transform 0.3s ease;
       cursor: pointer;
      }

      .card-hover:hover {
       transform: scale(1.03);
      }
     `}</style>
    </section>

    {/* ORÇAMENTO */}
    <section
     style={{
      backgroundColor: "#febd17",
      paddingTop: "130px",
      paddingBottom: "130px",
     }}
    >
     <div className="container">
      <div
       className="mx-auto text-center position-relative overflow-hidden"
       style={{
        backgroundColor: "#221f20",
        borderRadius: "35px",
        padding: "90px 40px",
       }}
      >
       {/* TEXTO */}
       <div
        className="mx-auto"
        style={{
         maxWidth: "900px",
        }}
       >
        <h2
         className="fw-bold mb-4"
         style={{
          fontSize: "4rem",
          lineHeight: "1.2",
          color: "#febd17",
         }}
        >
         Energia inteligente para sua empresa economizar mais e gastar menos
        </h2>

        {/* BOTÃO */}
        <a
         href="#"
         className="btn fw-bold px-5 py-3"
         style={{
          backgroundColor: "#febd17",
          color: "#221f20",
          borderRadius: "18px",
          fontSize: "1.1rem",
          transition: "0.3s",
         }}
        >
         Solicitar orçamento
        </a>
       </div>
      </div>
     </div>
    </section>

    {/* FAQ */}
    <section
     className="bg-light"
     style={{
      paddingTop: "130px",
      paddingBottom: "130px",
     }}
    >
     <div className="container">
      <h2 className="text-center fw-bold mb-5">
       Perguntas Frequentes
       <div
        className="mx-auto mt-3"
        style={{
         width: "90px",
         height: "5px",
         backgroundColor: "#FFC107",
         borderRadius: "10px",
        }}
       ></div>
      </h2>

      <div
       className="accordion accordion-flush shadow rounded-4 overflow-hidden"
       id="accordionFlushExample"
      >
       <div className="accordion-item">
        <h2 className="accordion-header">
         <button
          className="accordion-button collapsed fw-bold"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseOne"
         >
          Como funciona a energia solar?
         </button>
        </h2>

        <div
         id="flush-collapseOne"
         className="accordion-collapse collapse"
         data-bs-parent="#accordionFlushExample"
        >
         <div className="accordion-body">
          A energia solar converte a luz do sol em energia elétrica.
         </div>
        </div>
       </div>

       <div className="accordion-item">
        <h2 className="accordion-header">
         <button
          className="accordion-button collapsed fw-bold"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseTwo"
         >
          Quanto posso economizar?
         </button>
        </h2>

        <div
         id="flush-collapseTwo"
         className="accordion-collapse collapse"
         data-bs-parent="#accordionFlushExample"
        >
         <div className="accordion-body">
          Você pode economizar até 95% na conta de energia.
         </div>
        </div>
       </div>

       <div className="accordion-item">
        <h2 className="accordion-header">
         <button
          className="accordion-button collapsed fw-bold"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#flush-collapseThree"
         >
          Vocês fazem manutenção?
         </button>
        </h2>

        <div
         id="flush-collapseThree"
         className="accordion-collapse collapse"
         data-bs-parent="#accordionFlushExample"
        >
         <div className="accordion-body">
          Sim, realizamos manutenção preventiva e corretiva.
         </div>
        </div>
       </div>
      </div>
     </div>
    </section>
   </div>
  </>
 );
}
