"use client";

export default function Home() {
 return (
  <>
   <main className="bg-light">
    {/* HERO SECTION - Unificado e com mais impacto */}
    <section
     className="position-relative d-flex align-items-center justify-content-center"
     style={{
      minHeight: "85vh",
      backgroundImage:
       'linear-gradient(to right, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7)), url("https://moduloenergia.com/wp-content/uploads/telha-solar-ou-painel-solar-qual-o-melhor.jpg")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed", // Efeito Parallax suave
     }}
    >
     <div className="container position-relative" style={{ zIndex: 2 }}>
      <div className="row justify-content-center text-center">
       <div className="col-lg-8">
        <span
         className="badge bg-warning text-dark px-3 py-2 mb-4 rounded-pill fw-bold tracking-wide"
         style={{ letterSpacing: "2px" }}
        >
         PROJETADO PARA EMPRESAS
        </span>
        <h1
         className="display-3 fw-bolder text-white mb-4"
         style={{ lineHeight: "1.1" }}
        >
         Energia inteligente para <br />
         <span style={{ color: "#FFC107" }}>reduzir sua conta de luz</span>
        </h1>
        <p className="lead text-light mb-5 px-md-5 fw-light fs-4">
         Projetamos e instalamos sistemas de energia solar fotovoltaica com alta
         eficiência e economia garantida. Consiga tudo o que quiser com a
         Luminar.
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-3">
         <button className="btn btn-warning btn-lg fw-bold px-5 py-3 shadow-glow rounded-pill custom-btn">
          Solicitar orçamento
         </button>
         <button className="btn btn-outline-light btn-lg fw-bold px-5 py-3 rounded-pill custom-btn-outline">
          Simular economia
         </button>
        </div>
       </div>
      </div>
     </div>
    </section>

    {/* APRESENTAÇÃO / SOBRE */}
    <section className="bg-white" style={{ padding: "100px 0" }}>
     <div className="container">
      <div className="row align-items-center g-5">
       <div className="col-lg-6 pe-lg-5">
        <h2
         className="fw-bold mb-4 text-dark"
         style={{ fontSize: "2.5rem", lineHeight: "1.2" }}
        >
         Faça a transição para o futuro da energia
        </h2>
        <p className="text-secondary fs-5 mb-4" style={{ lineHeight: "1.8" }}>
         Ajudamos residências, comércios e indústrias a se libertarem das altas
         tarifas de energia. Nossa equipe cuida de tudo: desde o projeto de
         engenharia até a homologação na concessionária.
        </p>
        <ul className="list-unstyled mt-4">
         <li className="d-flex align-items-center mb-3 text-secondary">
          <i className="bi bi-check-circle-fill text-warning fs-4 me-3"></i>
          Instalação rápida e sem dor de cabeça
         </li>
         <li className="d-flex align-items-center mb-3 text-secondary">
          <i className="bi bi-check-circle-fill text-warning fs-4 me-3"></i>
          Retorno do investimento em poucos anos
         </li>
         <li className="d-flex align-items-center text-secondary">
          <i className="bi bi-check-circle-fill text-warning fs-4 me-3"></i>
          Valorização imediata do seu imóvel
         </li>
        </ul>
       </div>
       <div className="col-lg-6 position-relative">
        {/* Efeito de borda deslocada (Premium UI) */}
        <div
         className="position-absolute rounded-4"
         style={{
          top: "20px",
          left: "-20px",
          right: "20px",
          bottom: "-20px",
          backgroundColor: "#FFC107",
          zIndex: 0,
         }}
        ></div>
        <img
         src="painelsolar.jpg"
         className="img-fluid rounded-4 shadow-lg position-relative"
         alt="Instalação de Painel solar"
         style={{
          zIndex: 1,
          objectFit: "cover",
          width: "100%",
          height: "450px",
         }}
        />
       </div>
      </div>
     </div>
    </section>

    {/* DIFERENCIAIS */}
    <section className="bg-light" style={{ padding: "100px 0" }}>
     <div className="container">
      <div className="text-center mb-5 pb-3">
       <h2
        className="fw-bold text-dark"
        style={{ fontSize: "2.5rem", letterSpacing: "-1px" }}
       >
        Nossos Diferenciais
       </h2>
       <div
        className="mx-auto mt-3"
        style={{
         width: "60px",
         height: "4px",
         backgroundColor: "#FFC107",
         borderRadius: "10px",
        }}
       ></div>
      </div>

      <div className="row g-4">
       {[
        {
         icon: "bi-cash-coin",
         title: "Economia Real",
         text:
          "Economize até 95% na conta de energia com soluções projetadas para o seu consumo exato.",
        },
        {
         icon: "bi-lightning-charge",
         title: "Tecnologia Moderna",
         text:
          "Equipamentos de última geração com alta eficiência de captação e décadas de durabilidade.",
        },
        {
         icon: "bi-headset",
         title: "Suporte Especializado",
         text:
          "Atendimento técnico rápido, garantia estendida e suporte completo no pós-venda para você.",
        },
       ].map((item, index) => (
        <div className="col-md-4" key={index}>
         <div className="card border-0 shadow-sm h-100 p-5 rounded-4 hover-lift bg-white">
          <div
           className="mb-4 d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10"
           style={{ width: "70px", height: "70px" }}
          >
           <i className={`bi ${item.icon} fs-1 text-warning`}></i>
          </div>
          <h4 className="fw-bold mb-3 text-dark">{item.title}</h4>
          <p className="text-secondary m-0" style={{ lineHeight: "1.6" }}>
           {item.text}
          </p>
         </div>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* SERVIÇOS */}
    <section style={{ backgroundColor: "#0f172a", padding: "100px 0" }}>
     <div className="container">
      <div className="d-flex justify-content-between align-items-end mb-5">
       <div>
        <h2
         className="fw-bold text-white mb-2"
         style={{ fontSize: "2.5rem", letterSpacing: "-1px" }}
        >
         Nossos Serviços
        </h2>
        <div
         style={{
          width: "60px",
          height: "4px",
          backgroundColor: "#FFC107",
          borderRadius: "10px",
         }}
        ></div>
       </div>
      </div>

      <div className="row g-4">
       {[
        {
         img: "https://descarbonizesolucoes.com.br/blog/wp-content/uploads/2024/12/engenharia-instalacao-paineis-solares-campo-aberto.webp",
         title: "Instalação de painéis",
        },
        {
         img: "https://cdn.prod.website-files.com/6800d450c97b7af1e8cc4be2/681b4df93cee4c65220a1fa8_Design%20sem%20nome%20-%202025-05-07T091107.350.png",
         title: "Monitoramento energético",
        },
        {
         img: "https://institutosolar.com/wp-content/uploads/2019/05/Manuten%C3%A7%C3%A3o-do-painel-solar.jpg",
         title: "Manutenção preventiva",
        },
       ].map((svc, idx) => (
        <div className="col-lg-4 col-md-6" key={idx}>
         <div
          className="card border-0 rounded-4 overflow-hidden h-100 service-card position-relative shadow-lg"
          style={{ minHeight: "400px" }}
         >
          <div
           className="service-bg position-absolute w-100 h-100"
           style={{
            backgroundImage: `url(${svc.img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
           }}
          ></div>
          <div
           className="position-absolute w-100 h-100"
           style={{
            background:
             "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
           }}
          ></div>
          <div className="card-body position-relative d-flex flex-column justify-content-end p-4 z-index-2">
           <h3 className="fw-bold text-white m-0 transform-up">{svc.title}</h3>
           <div className="service-line mt-3"></div>
          </div>
         </div>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* ORÇAMENTO CTA */}
    <section
     className="bg-warning position-relative overflow-hidden"
     style={{ padding: "100px 0" }}
    >
     {/* Círculos decorativos de fundo */}
     <div
      className="position-absolute rounded-circle bg-white opacity-25"
      style={{
       width: "400px",
       height: "400px",
       top: "-100px",
       right: "-100px",
      }}
     ></div>
     <div
      className="position-absolute rounded-circle bg-dark opacity-10"
      style={{ width: "200px", height: "200px", bottom: "-50px", left: "50px" }}
     ></div>

     <div className="container position-relative z-2">
      <div
       className="bg-dark rounded-5 shadow-lg d-flex flex-column flex-lg-row align-items-center justify-content-between"
       style={{ padding: "70px 50px" }}
      >
       <div
        className="text-center text-lg-start mb-4 mb-lg-0"
        style={{ maxWidth: "600px" }}
       >
        <h2
         className="fw-bolder text-white mb-3"
         style={{ fontSize: "3rem", lineHeight: "1.1", letterSpacing: "-1px" }}
        >
         Pronto para zerar sua conta de luz?
        </h2>
        <p className="text-light opacity-75 fs-5 m-0">
         Fale com nossos engenheiros e receba um projeto personalizado para sua
         empresa sem compromisso.
        </p>
       </div>
       <div>
        <a
         href="#"
         className="btn btn-warning btn-lg fw-bold px-5 py-3 rounded-pill shadow-glow-dark custom-btn text-dark fs-5"
        >
         Solicitar Orçamento Agora
        </a>
       </div>
      </div>
     </div>
    </section>

    {/* FAQ Refinado */}
    <section className="bg-white" style={{ padding: "100px 0" }}>
     <div className="container" style={{ maxWidth: "850px" }}>
      <div className="text-center mb-5">
       <h2
        className="fw-bold text-dark"
        style={{ fontSize: "2.5rem", letterSpacing: "-1px" }}
       >
        Perguntas Frequentes
       </h2>
       <div
        className="mx-auto mt-3"
        style={{
         width: "60px",
         height: "4px",
         backgroundColor: "#FFC107",
         borderRadius: "10px",
        }}
       ></div>
      </div>

      <div className="accordion custom-accordion" id="accordionFAQ">
       {[
        {
         q: "Como funciona a energia solar?",
         a: "A energia solar converte a luz do sol em energia elétrica através dos painéis fotovoltaicos. Essa energia passa por um inversor e fica pronta para ser usada nas tomadas da sua casa ou empresa.",
        },
        {
         q: "Quanto posso economizar?",
         a: "Você pode economizar até 95% na conta de energia. Os 5% restantes costumam ser a taxa mínima cobrada pela concessionária de energia da sua região para manter você conectado à rede.",
        },
        {
         q: "Vocês fazem manutenção?",
         a: "Sim! Embora os sistemas solares exijam pouquíssima manutenção, nós realizamos a limpeza especializada dos módulos e a manutenção preventiva/corretiva do seu sistema.",
        },
       ].map((faq, idx) => (
        <div
         className="accordion-item border-0 mb-4 shadow-sm rounded-4 overflow-hidden"
         key={idx}
        >
         <h2 className="accordion-header">
          <button
           className="accordion-button collapsed fw-bold p-4"
           type="button"
           data-bs-toggle="collapse"
           data-bs-target={`#faq-${idx}`}
          >
           {faq.q}
          </button>
         </h2>
         <div
          id={`faq-${idx}`}
          className="accordion-collapse collapse"
          data-bs-parent="#accordionFAQ"
         >
          {/* pt-3 e a borda sutil criam a divisão limpa e confortável que faltava */}
          <div
           className="accordion-body px-4 pb-4 pt-3 text-secondary"
           style={{ lineHeight: "1.8", borderTop: "1px solid #f1f5f9" }}
          >
           {faq.a}
          </div>
         </div>
        </div>
       ))}
      </div>
     </div>
    </section>

    {/* ESTILOS CUSTOMIZADOS */}
    <style jsx>{`
     /* Botões */
     .custom-btn {
      transition: all 0.3s ease;
      border: none;
     }
     .custom-btn:hover {
      transform: translateY(-3px);
     }
     .custom-btn-outline {
      transition: all 0.3s ease;
      border: 2px solid rgba(255, 255, 255, 0.5);
     }
     .custom-btn-outline:hover {
      background-color: white;
      color: #0f172a;
      transform: translateY(-3px);
     }
     .shadow-glow {
      box-shadow: 0 10px 25px -5px rgba(255, 193, 7, 0.4);
     }
     .shadow-glow-dark {
      box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5);
     }

     /* Hover dos Cards de Diferenciais */
     .hover-lift {
      transition:
       transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
       box-shadow 0.3s ease;
     }
     .hover-lift:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1) !important;
     }

     /* Efeitos dos Cards de Serviço */
     .service-card {
      cursor: pointer;
     }
     .service-bg {
      transition: transform 0.6s ease;
     }
     .service-card:hover .service-bg {
      transform: scale(1.1);
     }
     .service-line {
      width: 0;
      height: 3px;
      background-color: #ffc107;
      transition: width 0.4s ease;
     }
     .service-card:hover .service-line {
      width: 50px;
     }
     .transform-up {
      transition: transform 0.4s ease;
      transform: translateY(10px);
     }
     .service-card:hover .transform-up {
      transform: translateY(0);
     }

     /* Accordion Customizado Premium (Fix de Desaparecimento + Espaçamento) */
     .custom-accordion .accordion-item {
      transition:
       border-left 0.2s ease,
       box-shadow 0.2s ease;
      border-left: 0 solid #ffc107 !important;
     }

     /* Adiciona uma borda amarela elegante no item ativo */
     .custom-accordion .accordion-item:has(.accordion-button:not(.collapsed)) {
      border-left: 5px solid #ffc107 !important;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05) !important;
     }

     .custom-accordion .accordion-button {
      background-color: #ffffff !important;
      color: #0f172a !important; /* Garante que o título NUNCA suma ou fique branco */
      box-shadow: none !important;
      font-size: 1.15rem;
      transition: all 0.2s ease;
     }

     /* Estado Aberto/Clicado */
     .custom-accordion .accordion-button:not(.collapsed) {
      color: #0f172a !important; /* Mantém a cor escura nítida ao invés do azul do bootstrap */
      background-color: #ffffff !important;
     }

     /* Customização do ícone de seta do Bootstrap para combinar com o tema */
     .custom-accordion .accordion-button:not(.collapsed)::after {
      filter: invert(76%) sepia(85%) saturate(1243%) hue-rotate(359deg)
       brightness(107%) contrast(104%); /* Torna a seta amarela quando ativo */
     }
    `}</style>
   </main>
  </>
 );
}
