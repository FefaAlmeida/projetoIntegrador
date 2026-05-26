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

          <div className="row g-4 text-center">
            {FEATURES.map((item) => (
              <div className="col-md-4" key={item.title}>
                <div
                  className={`card border-0 shadow-sm h-100 p-5 rounded-4 bg-white ${styles.hoverLift}`}
                >
                  <div
                  className={`mb-4 mx-auto d-flex align-items-center justify-content-center rounded-3 bg-warning bg-opacity-10 ${styles.featureIconBox}`}
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
      <section
        style={{
          background: "#f2b632",
          padding: "90px 0 70px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* brilho do fundo */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.07)",
            top: "-250px",
            right: "-180px",
            filter: "blur(20px)",
          }}
        />

        <div className="container">

          {/* CARD */}
          <div
            className="row align-items-center position-relative"
            style={{
              background:
                "linear-gradient(90deg, rgba(1,12,22,1) 0%, rgba(2,23,40,1) 45%, rgba(6,31,49,0.92) 70%)",
              borderRadius: "28px",
              overflow: "hidden",
              minHeight: "360px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.22)",
            }}
          >

            {/* imagem de fundo integrada */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url('/painelsolar.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "right center",
                opacity: "0.95",
              }}
            />

            {/* overlay escuro para fusão harmoniosa */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, rgba(0,10,18,0.98) 0%, rgba(0,18,32,0.95) 35%, rgba(0,0,0,0.15) 100%)",
              }}
            />

            {/* lado esquerdo */}
            <div
              className="col-lg-4 position-relative z-2"
              style={{
                padding: "55px 40px",
              }}
            >

              <h2
                style={{
                  color: "#fff",
                  fontSize: "2.8rem",
                  fontWeight: "800",
                  lineHeight: "1.1",
                  marginBottom: "18px",
                  letterSpacing: "-1px",
                }}
              >
                Simule sua economia
              </h2>

              <p
                style={{
                  color: "rgba(255,255,255,0.78)",
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  maxWidth: "300px",
                  marginBottom: "35px",
                }}
              >
                Descubra quanto você pode economizar
                com energia solar.
              </p>

              <label
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "0.95rem",
                  marginBottom: "12px",
                  display: "block",
                }}
              >
                Quanto você paga na sua conta de luz?
              </label>

              <input
                type="text"
                placeholder="R$      350,00"
                className="form-control"
                style={{
                  height: "54px",
                  borderRadius: "14px",
                  border: "none",
                  maxWidth: "260px",
                  marginBottom: "18px",
                  paddingLeft: "18px",
                  fontSize: "1rem",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.15)",
                }}
              />

            {/* BOTÕES CTA */}
            <div
              className="d-flex align-items-center gap-3 mt-3"
              style={{
                position: "relative",
                zIndex: 5,
              }}
            >

              {/* BOTÃO SECUNDÁRIO */}
              <button
                style={{
                  width: "260px",
                  height: "54px",
                  border: "none",
                  borderRadius: "14px",
                  background:
                    "linear-gradient(90deg, #f5b400 0%, #ffc933 100%)",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "1rem",
                  boxShadow: "0 10px 30px rgba(245,180,0,0.35)",
                  transition: "0.3s",
                }}
              >
                Simular agora →
              </button>

              {/* CTA PRINCIPAL */}
              <button
                style={{
                  height: "54px",
                  padding: "0 24px",
                  borderRadius: "14px",
                  border: "2px solid #ffc933",
                  background: "#fff",
                  color: "#111",
                  fontWeight: "800",
                  fontSize: "0.95rem",
                  whiteSpace: "nowrap",
                  boxShadow: "0 8px 25px rgba(255,201,51,0.28)",
                  transition: "0.3s",
                }}
              >
                Solicitar orçamento
              </button>

            </div>

            </div>

            {/* card branco central */}
            <div className="col-lg-4 position-relative z-2 d-flex justify-content-center">

              <div
                style={{
                  background: "#fff",
                  width: "100%",
                  maxWidth: "360px",
                  borderRadius: "24px",
                  padding: "32px",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.18)",
                }}
              >

                <p
                  style={{
                    color: "#555",
                    fontSize: "0.95rem",
                    marginBottom: "15px",
                  }}
                >
                  Você pode economizar até
                </p>

                <h3
                  style={{
                    color: "#221f20",
                    fontSize: "3.2rem",
                    fontWeight: "900",
                    marginBottom: "10px",
                    lineHeight: "1",
                    letterSpacing: "-2px",
                  }}
                >
                  R$ 280,00
                  <span
                    style={{
                      color: "#111",
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    {" "}/mês
                  </span>
                </h3>

                <p
                  style={{
                    color: "#555",
                    fontSize: "0.95rem",
                    marginBottom: "28px",
                  }}
                >
                  Isso significa R$ 3.360,00 por ano!
                </p>

                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    background: "#ececec",
                    marginBottom: "24px",
                  }}
                />

                <p
                  style={{
                    color: "#555",
                    fontSize: "0.95rem",
                    lineHeight: "1.7",
                    margin: 0,
                  }}
                >
                  Retorno do investimento em aproximadamente
                  <span
                    style={{
                      color: "#f5b400",
                      fontWeight: "800",
                    }}
                  >
                    {" "}3 a 5 anos
                  </span>
                </p>

              </div>

            </div>

            {/* espaço direito */}
            <div className="col-lg-4"></div>

          </div>

      {/* ESTATÍSTICAS */}
      <div
        className="d-flex justify-content-between align-items-center flex-nowrap mt-5"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          gap: "40px",
        }}
      >

        {/* ITEM 1 */}
        <div className="d-flex align-items-center gap-2">

          <div
            style={{
              fontSize: "3rem",
              color: "#fff",
              lineHeight: "1",
            }}
          >
            <i className="bi bi-people"></i>
          </div>

          <div>
            <h4
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#000",
                marginBottom: "2px",
                lineHeight: "1",
                whiteSpace: "nowrap",
              }}
            >
              +500
            </h4>

            <p
              style={{
                color: "#111",
                fontSize: "1rem",
                margin: 0,
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              Clientes satisfeitos
            </p>
          </div>
        </div>

        {/* DIVISÓRIA */}
        <div
          style={{
            width: "1px",
            height: "80px",
            backgroundColor: "rgba(255,255,255,0.6)",
          }}
        />

        {/* ITEM 2 */}
        <div className="d-flex align-items-center gap-2">

          <div
            style={{
              fontSize: "3rem",
              color: "#fff",
              lineHeight: "1",
            }}
          >
            <i className="bi bi-grid-1x2"></i>
          </div>

          <div>
            <h4
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#000",
                marginBottom: "2px",
                lineHeight: "1",
                whiteSpace: "nowrap",
              }}
            >
              +1200
            </h4>

            <p
              style={{
                color: "#111",
                fontSize: "1rem",
                margin: 0,
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              Sistemas instalados
            </p>
          </div>
        </div>

        {/* DIVISÓRIA */}
        <div
          style={{
            width: "1px",
            height: "80px",
            backgroundColor: "rgba(255,255,255,0.6)",
          }}
        />

        {/* ITEM 3 */}
        <div className="d-flex align-items-center gap-2">

          <div
            style={{
              fontSize: "3rem",
              color: "#fff",
              lineHeight: "1",
            }}
          >
            <i className="bi bi-shield-check"></i>
          </div>

          <div>
            <h4
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#000",
                marginBottom: "2px",
                lineHeight: "1",
                whiteSpace: "nowrap",
              }}
            >
              15 anos
            </h4>

            <p
              style={{
                color: "#111",
                fontSize: "1rem",
                margin: 0,
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              Garantia estendida
            </p>
          </div>
        </div>

        {/* DIVISÓRIA */}
        <div
          style={{
            width: "1px",
            height: "80px",
            backgroundColor: "rgba(255,255,255,0.6)",
          }}
        />

        {/* ITEM 4 */}
        <div className="d-flex align-items-center gap-2">

          <div
            style={{
              fontSize: "3rem",
              color: "#fff",
              lineHeight: "1",
            }}
          >
            <i className="bi bi-leaf"></i>
          </div>

          <div>
            <h4
              style={{
                fontSize: "2.5rem",
                fontWeight: "900",
                color: "#000",
                marginBottom: "2px",
                lineHeight: "1",
                whiteSpace: "nowrap",
              }}
            >
              +2.5M
            </h4>

            <p
              style={{
                color: "#111",
                fontSize: "1rem",
                margin: 0,
                fontWeight: "500",
                whiteSpace: "nowrap",
              }}
            >
              kg de CO₂ evitados
            </p>
          </div>
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
