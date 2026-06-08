"use client";
import { useEffect, useState } from "react";
import { getPerfil } from "@/api";
import styles from "./page.module.css";

const metricas = [
  {
    icon: "bi-inbox-fill",
    title: "Mensagens",
    text: "Acompanhe chamados e contatos recebidos pela equipe.",
    value: "+24%",
  },
  {
    icon: "bi-calendar-check",
    title: "Instalações",
    text: "Organize agendamentos e despachos técnicos.",
    value: "82%",
  },
  {
    icon: "bi-cash-stack",
    title: "Financeiro",
    text: "Monitore pagamentos e andamento dos contratos.",
    value: "R$ 892",
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
        </div>

        <div className={styles.heroCard}>
          <div className={styles.glow} />

          <div className={`d-flex flex-column flex-xl-row justify-content-between align-items-center gap-5 ${styles.heroContent}`}>
            <div className="w-100">
              <p className={`mb-3 ${styles.heroEyebrow}`}>PAINEL ADMINISTRATIVO</p>
              <h2 className={`mb-4 ${styles.heroTitle}`}>
                Gestão Luminar
                <br />
                em tempo real.
              </h2>
              <p className={`mb-4 ${styles.heroText}`}>
                Acompanhe mensagens, instalações e indicadores para manter o atendimento da equipe organizado.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <div className={styles.miniCard}>
                  <p className={`mb-2 ${styles.miniLabel}`}>Chamados hoje</p>
                  <h3 className={`m-0 ${styles.miniValue}`}>12</h3>
                </div>

                <div className={styles.miniCard}>
                  <p className={`mb-2 ${styles.miniLabel}`}>Instalações</p>
                  <h3 className={`m-0 ${styles.miniValue}`}>8</h3>
                </div>
              </div>
            </div>

            <div className={styles.performanceCard}>
              <div className="d-flex justify-content-between mb-4">
                <div>
                  <p className={`mb-2 ${styles.performanceLabel}`}>Operação</p>
                  <h3 className={`m-0 ${styles.performanceValue}`}>82%</h3>
                </div>

                <div className={`d-flex align-items-center justify-content-center ${styles.performanceIconBox}`}>
                  <i className={`bi bi-speedometer2 ${styles.performanceIcon}`} />
                </div>
              </div>

              <div className={styles.progressTrack}>
                <div className={styles.progressBar} />
              </div>

              <div className="vstack gap-4">
                {[
                  ["Mensagens pendentes", "12"],
                  ["Instalações em análise", "8"],
                  ["Contratos ativos", "24"],
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