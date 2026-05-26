import Image from "next/image";
import styles from "./page.module.css";

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
    <main className={styles.main}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <span
                className={`badge bg-warning text-dark px-3 py-2 mb-4 rounded-pill fw-bold ${styles.heroBadge}`}
              >
                PROJETADO PARA EMPRESAS
              </span>
              <h1 className="display-3 fw-bolder text-white mb-4 lh-1">
                Energia inteligente para <br />
                <span className="text-warning">reduzir sua conta de luz</span>
              </h1>
              <p className="lead text-light mb-5 px-md-5 fw-light fs-4">
                Projetamos e instalamos sistemas de energia solar fotovoltaica com alta
                eficiência e economia garantida. Consiga tudo o que quiser com a
                Luminar.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <button
                  className={`btn btn-warning btn-lg fw-bold px-5 py-3 rounded-pill ${styles.customBtn} ${styles.shadowGlow}`}
                >
                  Solicitar orçamento
                </button>
                <button
                  className={`btn btn-outline-light btn-lg fw-bold px-5 py-3 rounded-pill ${styles.customBtnOutline}`}
                >
                  Simular economia
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className={`bg-white ${styles.section}`}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 pe-lg-5">
              <h2 className={`fw-bold mb-4 text-dark display-6 lh-sm ${styles.sectionTitle}`}>
                Faça a transição para o futuro da energia
              </h2>
              <p className={`text-secondary fs-5 mb-4 ${styles.aboutText}`}>
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
            <div className={`col-lg-6 ${styles.aboutImageWrap}`}>
              <div className={styles.aboutImageOffset}></div>
              <div className={styles.aboutImageBox}>
                <Image
                  src="/painelsolar.jpg"
                  alt="Instalação de Painel solar"
                  fill
                  sizes="(max-width: 992px) 90vw, 50vw"
                  className={styles.aboutImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`bg-light ${styles.section}`}>
        <div className="container">
          <div className="text-center mb-5 pb-3">
            <h2 className={`fw-bold text-dark display-6 ${styles.sectionTitle}`}>
              Nossos Diferenciais
            </h2>
            <div className={styles.titleBar}></div>
          </div>

          <div className="row g-4">
            {FEATURES.map((item) => (
              <div className="col-md-4" key={item.title}>
                <div
                  className={`card border-0 shadow-sm h-100 p-5 rounded-4 bg-white ${styles.hoverLift}`}
                >
                  <div
                    className={`mb-4 d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 ${styles.featureIconBox}`}
                  >
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
      <section className={styles.sectionDark}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <h2 className={`fw-bold text-white mb-2 display-6 ${styles.sectionTitle}`}>
                Nossos Serviços
              </h2>
              <div className={styles.titleBarLeft}></div>
            </div>
          </div>

          <div className="row g-4">
            {SERVICES.map((svc) => (
              <div className="col-lg-4 col-md-6" key={svc.title}>
                <div
                  className={`card border-0 rounded-4 overflow-hidden h-100 position-relative shadow-lg ${styles.serviceCard}`}
                >
                  <div
                    className={styles.serviceBg}
                    style={{ backgroundImage: `url(${svc.img})` }}
                  ></div>
                  <div className={styles.serviceOverlay}></div>
                  <div className={`card-body ${styles.serviceBody}`}>
                    <h3 className={`fw-bold text-white ${styles.serviceTitle}`}>
                      {svc.title}
                    </h3>
                    <div className={styles.serviceLine}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`bg-warning ${styles.ctaSection}`}>
        <div className={styles.ctaCircle1}></div>
        <div className={styles.ctaCircle2}></div>

        <div className="container position-relative z-2">
          <div
            className={`bg-dark rounded-5 shadow-lg d-flex flex-column flex-lg-row align-items-center justify-content-between ${styles.ctaBox}`}
          >
            <div className={`text-center text-lg-start mb-4 mb-lg-0 ${styles.ctaCopy}`}>
              <h2 className={`fw-bolder text-white mb-3 ${styles.ctaTitle}`}>
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
                className={`btn btn-warning btn-lg fw-bold px-5 py-3 rounded-pill text-dark fs-5 ${styles.customBtn} ${styles.shadowGlowDark}`}
              >
                Solicitar Orçamento Agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`bg-white ${styles.section}`}>
        <div className={`container ${styles.faqContainer}`}>
          <div className="text-center mb-5">
            <h2 className={`fw-bold text-dark display-6 ${styles.sectionTitle}`}>
              Perguntas Frequentes
            </h2>
            <div className={styles.titleBar}></div>
          </div>

          <div className="accordion" id="accordionFAQ">
            {FAQS.map((faq, idx) => (
              <div
                className={`accordion-item shadow-sm ${styles.faqItem}`}
                key={faq.q}
              >
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button collapsed fw-bold p-4 ${styles.faqButton}`}
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
                  <div
                    className={`accordion-body px-4 pb-4 pt-3 text-secondary ${styles.faqBody}`}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
