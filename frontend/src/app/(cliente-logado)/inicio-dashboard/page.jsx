"use client";
import { useEffect, useState } from "react";
import { getPerfil } from "@/api";
import styles from "./page.module.css";

const metricas = [
  {
    icon: "bi-sun-fill",
    title: "Produção solar",
    text: "Seu sistema segue operando com excelente desempenho.",
    value: "+24%",
  },
  {
    icon: "bi-cash-stack",
    title: "Economia mensal",
    text: "Continue economizando todos os meses com energia limpa.",
    value: "R$ 892",
  },
  {
    icon: "bi-globe-americas",
    title: "Impacto ambiental",
    text: "Seu sistema já evitou toneladas de CO2 no planeta.",
    value: "2.4 ton",
  },
];

export default function Page() {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarPerfil() {
      const response = await getPerfil();

      console.log(response);

      if (response?.sucesso) {
        setUsuario(response.dados);
      }
    }

    carregarPerfil();
  }, []);

  return (
    <section className={styles.page}>
      <div className={`mx-auto ${styles.container}`}>
        <div className={`d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 ${styles.topbar}`}>
          <div className="d-flex align-items-baseline gap-3">
            <p className={`m-0 ${styles.welcomeText}`}>Bem-vindo(a),</p>
            <p className={`m-0 ${styles.userName}`}>{usuario?.nome}</p>
          </div>

          <button className={`btn ${styles.dashboardButton}`}>
            <a href="/dashboard">Ver dashboard completo</a>
          </button>
        </div>

        <div className={styles.heroCard}>
          <div className={styles.glow} />

          <div className={`d-flex flex-column flex-xl-row justify-content-between align-items-center gap-5 ${styles.heroContent}`}>
            <div className="w-100">
              <p className={`mb-3 ${styles.heroEyebrow}`}>PAINEL SOLAR INTELIGENTE</p>
              <h2 className={`mb-4 ${styles.heroTitle}`}>
                Sua energia
                <br />
                em tempo real.
              </h2>
              <p className={`mb-4 ${styles.heroText}`}>
                Acompanhe geração, economia e desempenho do seu sistema de forma moderna, rápida e intuitiva.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <div className={styles.miniCard}>
                  <p className={`mb-2 ${styles.miniLabel}`}>Economia hoje</p>
                  <h3 className={`m-0 ${styles.miniValue}`}>R$ 48</h3>
                </div>

                <div className={styles.miniCard}>
                  <p className={`mb-2 ${styles.miniLabel}`}>Energia gerada</p>
                  <h3 className={`m-0 ${styles.miniValue}`}>42 kWh</h3>
                </div>
              </div>
            </div>

            <div className={styles.performanceCard}>
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <p className={`mb-2 ${styles.performanceLabel}`}>Desempenho das placas</p>
                  <h3 className={`m-0 ${styles.performanceValue}`}>82%</h3>
                </div>
              </div>

              <div className={styles.progressTrack}>
                <div className={styles.progressBar} />
              </div>

              <div className="vstack gap-4">
                {[
                  ["Produção mensal", "1.284 kWh"],
                  ["Economia total", "R$ 892"],
                  ["CO2 evitado", "2.4 ton"],
                ].map(([label, value]) => (
                  <div className="d-flex justify-content-between" key={label}>
                    <p className={`m-0 ${styles.metricLabel}`}>{label}</p>
                    <h4 className={`m-0 ${styles.metricValue}`}>{value}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoGrid}>
          {metricas.map((item) => (
            <div className={styles.infoCard} key={item.title}>
              <div className={`d-flex align-items-center justify-content-center ${styles.infoIconBox}`}>
                <i className={`bi ${item.icon} ${styles.infoIcon}`} />
              </div>

              <h3 className={`mb-3 ${styles.infoTitle}`}>{item.title}</h3>
              <p className={`mb-4 ${styles.infoText}`}>{item.text}</p>
              <h2 className={`m-0 ${styles.infoValue}`}>{item.value}</h2>
            </div>
          ))}
        </div>
      </div>
      </section>
  );
}