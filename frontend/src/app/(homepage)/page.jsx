import Image from "next/image";

export const metadata = {
 title: "Luminar — Energia solar para empresas",
 description:
  "Reduza sua conta de luz com sistemas fotovoltaicos projetados e instalados pela Luminar.",
};

const FEATURES = [
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
];

const SERVICES = [
  {
    img:
      "https://descarbonizesolucoes.com.br/blog/wp-content/uploads/2024/12/engenharia-instalacao-paineis-solares-campo-aberto.webp",
    title: "Instalação de painéis",
  },
  {
    img:
      "https://cdn.prod.website-files.com/6800d450c97b7af1e8cc4be2/681b4df93cee4c65220a1fa8_Design%20sem%20nome%20-%202025-05-07T091107.350.png",
    title: "Monitoramento energético",
  },
  {
    img:
      "https://institutosolar.com/wp-content/uploads/2019/05/Manuten%C3%A7%C3%A3o-do-painel-solar.jpg",
    title: "Manutenção preventiva",
  },
];

const FAQS = [
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
                  Projetamos, instalamos e monitoramos sistemas de energia solar fotovoltaica com foco em alta eficiência, economia e segurança. Tenha o controle total da sua geração energética com a Luminar. 
                </p>
                <div className="d-flex flex-wrap justify-content-center gap-3">
                  <a
                    href="/orcamento"
                    className="btn btn-warning btn-lg fw-bold px-5 py-3 rounded-pill customBtn shadowGlow"
                  >
                    Solicitar orçamento
                  </a>
                  <a
                    href="/faleConosco"
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
                  Ajudamos indústrias e empresas a migrarem para uma matriz energética limpa, eliminando a dependência de fontes poluentes. Nossa equipe cuida de absolutamente tudo: desde o projeto de instalação até o monitoramento contínuo e a manutenção.
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
                    Retorno do investimento em até 2 anos
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 aboutImageWrap">
                <div className="aboutImageOffset"></div>
                <div className="aboutImageBox">
                  <Image
                    src="/painelsolar.jpg"
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
                    <div
                      className="serviceBg"
                      style={{ backgroundImage: `url(${svc.img})` }}
                    ></div>
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

        {/* STATIC SIMULATION */}
        <section className="simulationSection" id="simulacao">
          <div className="simulationGlow"></div>
          <div className="container">
            <div className="row align-items-center position-relative simulationCard">
              <div className="simulationBg"></div>
              <div className="simulationOverlay"></div>

              <div className="col-lg-4 position-relative z-2 simulationContent">
                <h2 className="simulationTitle">Simule sua economia</h2>
                <p className="simulationText">
                  Descubra quanto você pode economizar com energia solar.
                </p>

                <label className="form-label text-white fw-bold mb-3">
                  Quanto você paga na sua conta de luz?
                </label>
                <input
                  type="text"
                  className="form-control simulationInput"
                  value="R$      350,00"
                  readOnly
                  aria-label="Valor atual da conta de luz"
                />

                <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
                  <a href="#simulacao" className="btn simulationPrimaryBtn">
                    Simular agora →
                  </a>
                  <a href="/orcamento" className="btn simulationSecondaryBtn">
                    Solicitar orçamento
                  </a>
                </div>
              </div>

              <div className="col-lg-4 position-relative z-2 d-flex justify-content-center">
                <div className="simulationResultCard">
                  <p className="text-secondary mb-3">Você pode economizar até</p>
                  <h3 className="simulationAmount">
                    R$ 280,00 <span>/mês</span>
                  </h3>
                  <p className="text-secondary mb-4">
                    Isso significa R$ 3.360,00 por ano!
                  </p>
                  <hr className="my-4" />
                  <p className="text-secondary lh-base m-0">
                    Retorno do investimento em aproximadamente{" "}
                    <span className="fw-bold text-warning">3 a 5 anos</span>
                  </p>
                </div>
              </div>

              <div className="col-lg-4"></div>
            </div>

            <div className="row statsRow g-4 mt-5">
              <div className="col-6 col-lg-3">
                <div className="statItem">
                  <i className="bi bi-people"></i>
                  <div>
                    <h4>+500</h4>
                    <p>Clientes satisfeitos</p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="statItem">
                  <i className="bi bi-grid-1x2"></i>
                  <div>
                    <h4>+1200</h4>
                    <p>Sistemas instalados</p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="statItem">
                  <i className="bi bi-shield-check"></i>
                  <div>
                    <h4>15 anos</h4>
                    <p>Garantia estendida</p>
                  </div>
                </div>
              </div>
              <div className="col-6 col-lg-3">
                <div className="statItem border-end-0">
                  <i className="bi bi-leaf"></i>
                  <div>
                    <h4>+2.5M</h4>
                    <p>kg de CO₂ evitados</p>
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