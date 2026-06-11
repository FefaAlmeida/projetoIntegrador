import Image from "next/image";

export const metadata = {
  title: "Luminar — Energia solar para empresas",
  description:
    "Otimize os custos operacionais da sua empresa com sistemas fotovoltaicos de alta eficiência projetados e monitorados pela Luminar.",
};

const FEATURES = [
  {
    icon: "bi-cash-coin",
    title: "Investimento Facilitado",
    text: "Na Luminar, você pode parcelar o investimento nas placas solares, eliminando a necessidade de grandes aportes financeiros de uma só vez.",
  },
  {
    icon: "bi-lightning-charge",
    title: "Monitoramento Inteligente",
    text: "Acompanhe o desempenho energético da sua empresa em tempo real. Nosso sistema identifica falhas automaticamente e emite alertas instantâneos para evitar qualquer perda na sua produção.",
  },
  {
    icon: "bi-headset",
    title: "Suporte Prático",
    text: "Tenha acesso rápido e direto à nossa equipe técnica para solicitar manutenções, tirar dúvidas e garantir que sua operação nunca fique sem energia.",
  },
];

const SERVICES = [
  {
    img: "https://descarbonizesolucoes.com.br/blog/wp-content/uploads/2024/12/engenharia-instalacao-paineis-solares-campo-aberto.webp",
    title: "Instalação de painéis",
  },
  {
    img: "https://cdn.prod.website-files.com/6800d450c97b7af1e8cc4be2/681b4df93cee4c65220a1fa8_Design%20sem%20nome%20-%202025-05-07T091107.350.png",
    title: "Monitoramento energético",
  },
  {
    img: "tecnico-marcelo.jpg",
    title: "Manutenção técnica",
  },
];

const FAQS = [
  {
    q: "Como funciona a energia solar?",
    a: "A energia solar converte a luz do sol em energia elétrica através dos painéis fotovoltaicos. Essa energia passa por um inversor e fica pronta para ser usada na sua empresa,  reduzindo drasticamente a sua dependência da rede elétrica tradicional.",
  },
  {
    q: "Como funciona o monitoramento inteligente?",
    a: "O desempenho do seu sistema é acompanhado ininterruptamente através de sensores integrados aos inversores. O sistema monitora informações essenciais como eficiência e geração de energia, além de identificar automaticamente qualquer anomalia ou queda de desempenho na sua usina.",
  },
  {
    q: "Quanto tempo leva para o sistema ser instalado e começar a gerar economia?",
    a: "O prazo médio total varia entre 20 a 30 dias. Esse período engloba desde a engenharia detalhada do projeto e a instalação física do sistema até a etapa final de vistoria e liberação da usina para funcionamento.",
  },
];

export default function Home() {
  return (
    <>
      <main className="main">
        {/* HERO */}
        <section className="hero">
          <div className="container heroInner">
            <div className="row justify-content-center text-center">
              <div className="col-lg-9 col-xl-8">
                <span className="badge bg-warning text-dark px-3 py-2 mb-4 rounded-pill fw-bold heroBadge">
                  PROJETADO PARA EMPRESAS
                </span>
                <h1 className="display-3 fw-bolder text-white mb-4 lh-1">
                  Energia inteligente <br /> e sustentável <br />
                  <span className="text-warning">para a sua empresa</span>
                </h1>
                <p className="lead text-light mb-5 px-md-5 fw-light fs-4">
                  Projetamos, instalamos e monitoramos sistemas de energia solar
                  fotovoltaica com foco em alta eficiência, economia e
                  segurança. Tenha o controle total da sua geração energética
                  com a Luminar.
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <a
                    href="/orcamento"
                    className="btn btn-warning btn-lg fw-bold px-5 py-3 rounded-pill customBtn shadowGlow"
                  >
                    Solicitar orçamento
                  </a>
                  <a
                    href="/fale-conosco"
                    className="btn btn-outline-light btn-lg fw-bold px-5 py-3 rounded-pill customBtnOutline"
                  >
                    Entrar em contato
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section bg-white">
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6 pe-lg-5">
                <h2 className="fw-bold mb-4 text-dark display-6 lh-sm sectionTitle">
                  Faça a transição para o futuro da energia
                </h2>
                <p className="text-secondary fs-5 mb-4 aboutText">
                  Ajudamos indústrias e empresas a migrarem para uma matriz
                  energética limpa, eliminando a dependência de fontes
                  poluentes. Nossa equipe cuida de absolutamente tudo: desde o
                  projeto de instalação até o monitoramento contínuo e a
                  manutenção.
                </p>
                <ul className="list-unstyled mt-4">
                  <li className="d-flex align-items-center mb-3 text-secondary">
                    <i className="bi bi-check-circle-fill text-warning fs-4 me-3"></i>
                    Instalação rápida mediante solicitação
                  </li>
                  <li className="d-flex align-items-center mb-3 text-secondary">
                    <i className="bi bi-check-circle-fill text-warning fs-4 me-3"></i>
                    Monitoramento inteligente do sistema
                  </li>
                  <li className="d-flex align-items-center text-secondary">
                    <i className="bi bi-check-circle-fill text-warning fs-4 me-3"></i>
                    Assistência técnica especializada
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 aboutImageWrap">
                <div className="aboutImageOffset"></div>
                <div className="aboutImageBox">
                  <Image
                    src="/painel-empresa.webp"
                    alt="Instalação de painel solar"
                    fill
                    sizes="(max-width: 992px) 90vw, 50vw"
                    className="aboutImage"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="section bg-light">
          <div className="container">
            <div className="text-center mb-5 pb-3">
              <h2 className="fw-bold text-dark display-6 sectionTitle">
                Nossos Diferenciais
              </h2>
              <div className="titleBar"></div>
            </div>

            <div className="row g-4 text-center">
              {FEATURES.map((item) => (
                <div className="col-md-4" key={item.title}>
                  <div className="card border-0 shadow-sm h-100 p-5 rounded-4 bg-white hoverLift">
                    <div className="featureIconBox mb-4 mx-auto d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10">
                      <i className={`bi ${item.icon} fs-1 text-warning`}></i>
                    </div>
                    <h4 className="fw-bold mb-3 text-dark">{item.title}</h4>
                    <p className="text-secondary m-0 lh-base">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="sectionDark">
          <div className="container">
            <div className="d-flex justify-content-between align-items-end mb-5">
              <div>
                <h2 className="fw-bold text-white mb-2 display-6 sectionTitle">
                  Nossos Serviços
                </h2>
                <div className="titleBarLeft"></div>
              </div>
            </div>

            <div className="row g-4">
              {SERVICES.map((svc) => (
                <div className="col-lg-4 col-md-6" key={svc.title}>
                  <article className="card border-0 rounded-4 overflow-hidden h-100 position-relative shadow-lg serviceCard">
                    <img className="serviceBg" src={svc.img} alt="" />
                    <div className="serviceOverlay"></div>
                    <div className="card-body serviceBody">
                      <h3 className="fw-bold text-white serviceTitle">
                        {svc.title}
                      </h3>
                      <div className="serviceLine"></div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: PREVISIBILIDADE E RETORNO FINANCEIRO */}
        <section className="simulationSection" id="retorno">
          <div className="simulationGlow"></div>
          <div className="container">
            <div className="row align-items-center position-relative simulationCard">
              <div className="simulationBg"></div>
              <div className="simulationOverlay"></div>

              {/* Lado Esquerdo: Mensagem Institucional B2B */}
              <div className="col-lg-6 position-relative z-2 simulationContent">
                <h2 className="simulationTitle">
                  A escolha inteligente para o seu negócio
                </h2>
                <p className="simulationText">
                  Reduza drasticamente os custos operacionais da sua empresa ou
                  indústria, blindando sua operação contra os aumentos
                  constantes nas tarifas de energia.
                </p>

                <div className="mt-4 pt-2">
                  <div className="d-flex align-items-center gap-2 text-white mb-3">
                    <i className="bi bi-patch-check-fill text-warning fs-5"></i>
                    <span className="fw-semibold">
                      Matriz energética 100% limpa e renovável
                    </span>
                  </div>
                  <div className="d-flex align-items-center gap-2 text-white mb-4">
                    <i className="bi bi-patch-check-fill text-warning fs-5"></i>
                    <span className="fw-semibold">
                      Monitoramento ativo contra falhas e suporte ágil
                    </span>
                  </div>
                </div>

                <div className="d-flex flex-wrap align-items-center gap-3 mt-4">
                  <a
                    href="/fale-conosco"
                    className="btn simulationPrimaryBtn text-decoration-none"
                  >
                    Fale com um Especialista →
                  </a>
                </div>
              </div>

              {/* Lado Direito: Quadro Informativo de Economia */}
              <div className="col-lg-4 position-relative z-2 d-flex justify-content-center">
                <div className="simulationResultCard w-100">
                  <p className="text-secondary mb-2 fw-medium text-uppercase small tracking-wider">
                    Investimento Inteligente
                  </p>
                  <h3 className="simulationAmount simulationAmountCompact">
                    Até 72x
                  </h3>
                  <p className="text-secondary mb-4 fw-semibold text-dark-emphasis">
                    Parcelamento facilitado e estruturado para que a própria
                    economia pague o investimento.
                  </p>
                  <hr className="my-4" />
                  <p className="text-secondary lh-base m-0">
                    E ainda:{" "}
                    <span className="fw-bold text-warning">
                      comece a pagar só daqui 60 dias
                    </span>
                    , garantindo a preservação do capital de giro da sua
                    empresa.
                  </p>
                </div>
              </div>

              <div className="col-lg-4"></div>
            </div>

            {/* Métricas de Sucesso (Mantidas exatamente como no seu layout original) */}
            <div className="row statsRow g-4 mt-5">
              <div className="col-6 col-lg-3">
                <div className="statItem">
                  <i className="bi bi-people"></i>
                  <div>
                    <h4>99%</h4>
                    <p>De índice de satisfação</p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="statItem">
                  <i className="bi bi-grid-1x2"></i>
                  <div>
                    <h4>+2000</h4>
                    <p>Sistemas instalados</p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="statItem">
                  <i className="bi bi-shield-check"></i>
                  <div>
                    <h4>100%</h4>
                    <p>De confiança na Luminar</p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="statItem border-end-0">
                  <i className="bi bi-star"></i>
                  <div>
                    <h4>Nota 5</h4>
                    <p>No atendimento ao cliente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section bg-white">
          <div className="container faqContainer">
            <div className="text-center mb-5">
              <h2 className="fw-bold text-dark display-6 sectionTitle">
                Perguntas Frequentes
              </h2>
              <div className="titleBar"></div>
            </div>

            <div className="accordion" id="accordionFAQ">
              {FAQS.map((faq, idx) => (
                <div className="accordion-item shadow-sm faqItem" key={faq.q}>
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed fw-bold p-4 faqButton"
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
                    <div className="accordion-body px-4 pb-4 pt-3 text-secondary faqBody">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
