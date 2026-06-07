"use client";
import { useEffect, useState } from "react";
import { getPerfil, obterDadosGeraisDashboard } from "@/api";
import styles from "./page.module.css";

export default function Page() {
  const [usuario, setUsuario] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [sistemaInstalado, setSistemaInstalado] = useState(false);

  useEffect(() => {
    // 1. Criamos a função responsável por buscar os dados do Back-end
    async function carregarDadosDashboard() {
      try {
        const resDash = await obterDadosGeraisDashboard();
        console.log("Atualização em tempo real:", resDash);

        if (resDash?.sucesso && resDash.instalado) {
          setDashboard(resDash.dados);
          setSistemaInstalado(true);
        } else {
          setSistemaInstalado(false);
        }
      } catch (error) {
        console.error("Erro ao atualizar dados em tempo real:", error);
      }
    }

    // 2. Carrega o Perfil (apenas uma vez ao entrar na página)
    async function iniciarPerfil() {
      try {
        const resPerfil = await getPerfil();
        if (resPerfil?.sucesso) setUsuario(resPerfil.dados);
      } catch (e) {
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }

    // Executa a primeira carga assim que entra na tela
    iniciarPerfil();
    carregarDadosDashboard();

    // 3. Configura o setInterval para atualizar os dados a cada 5 segundos (5000ms)
    const intervalo = setInterval(() => {
      carregarDadosDashboard();
    }, 10000); 

    // 4. IMPORTANTE: Limpa o intervalo se o usuário sair da página (evita vazamento de memória)
    return () => clearInterval(intervalo);
  }, []);

  if (carregando) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-border text-warning" role="status" />
      </div>
    );
  }

  if (!sistemaInstalado) {
    return (
      <section className={styles.page}>
        <div className={`mx-auto ${styles.container}`}>
          <div className={styles.blockedCard}>
            <div className={styles.blockedGlow} />
            <i className="bi bi-shield-exclamation text-warning display-4 mb-3 d-block"></i>
            <h2 className={styles.blockedTitle}>Aguardando Ativação Técnica</h2>
            <p className={styles.blockedText}>
              Seu painel inteligente e o monitoramento em tempo real estarão disponíveis assim que a equipe técnica finalizar a instalação física e ativação das suas placas solares.
            </p>
            <div className="mt-4">
              <a href="/solicitar-instalacao" className={styles.blockedButton}>
                Acompanhar Status da Instalação
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const metricasDinamicas = [
    {
      icon: "bi-sun-fill",
      title: "Placas do Sistema",
      text: "Quantidade de módulos fotovoltaicos ativos e em operação monitorada.",
      value: `${dashboard?.placasAtivas} / ${dashboard?.placasTotais}`,
    },
    {
      icon: "bi-exclamation-triangle-fill",
      title: "Alertas do Sistema",
      text: dashboard?.alertasCriticos > 0 ? "Existem anomalias operacionais requerendo atenção técnica." : "Nenhum alerta ou anomalia emitido nas últimas 24h.",
      value: dashboard?.alertasCriticos > 0 ? `${dashboard.alertasCriticos} Ativo(s)` : "Operação Normal",
      isAlert: dashboard?.alertasCriticos > 0
    },
    {
      icon: "bi-globe-americas",
      title: "Sustentabilidade",
      text: "Volume estimado de emissão de CO2 evitado na atmosfera terrestre.",
      value: `${dashboard?.co2Evitado} ton`,
    },
  ];

  return (
    <section className={styles.page}>
      <div className={`mx-auto ${styles.container}`}>
        
        {/* BARRA SUPERIOR */}
        <div className={`d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 ${styles.topbar}`}>
          <div className="d-flex align-items-baseline gap-2">
            <span className={styles.welcomeText}>Olá,</span>
            <span className={styles.userName}>{usuario?.nome || "Cliente"}</span>
          </div>

          <button className={styles.dashboardButton}>
            <a href="/dashboard/placas">Acessar painel detalhado</a>
          </button>
        </div>

        {/* CARD HERO PRINCIPAL */}
        <div className={styles.heroCard}>
          <div className={styles.glow} />

          <div className={`d-flex flex-column flex-xl-row justify-content-between align-items-stretch gap-5 ${styles.heroContent}`}>
            <div className="d-flex flex-column justify-content-between w-100">
              <div>
                <p className={styles.heroEyebrow}>SISTEMA INTELIGENTE</p>
                <h2 className={styles.heroTitle}>
                  Sua energia
                  <br />
                  em tempo real.
                </h2>
                <p className={styles.heroText}>
                  Acompanhe a geração ativa, métricas de eficiência agregadas e o retorno ecológico do seu investimento de forma automatizada.
                </p>
              </div>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <div className={styles.miniCard}>
                  <p className={styles.miniLabel}>Módulos Instalados</p>
                  <h3 className={styles.miniValue}>{dashboard?.placasTotais} <span className={styles.miniUnit}>un</span></h3>
                </div>

                <div className={styles.miniCard}>
                  <p className={styles.miniLabel}>Geração Acumulada</p>
                  <h3 className={styles.miniValue}>{dashboard?.energiaTotalGerada} <span className={styles.miniUnit}>kWh</span></h3>
                </div>
              </div>
            </div>

            {/* QUADRADO PRETO PRINCIPAL (DESEMPENHO GERAL) */}
            <div className={styles.performanceCard}>
              <div className="mb-3">
                <p className={styles.performanceLabel}>Eficiência Operacional</p>
                <h3 className={styles.performanceValue}>{dashboard?.eficienciaSistema}%</h3>
              </div>

              {/* BARRA DE PROGRESSO DINÂMICA */}
              <div className={styles.progressTrack}>
                <div 
                  className={styles.progressBar} 
                  style={{ width: `${dashboard?.eficienciaSistema}%` }} 
                />
              </div>

              <div className="vstack gap-3 mt-2">
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Módulos Totais</span>
                  <span className={styles.metricValue}>{dashboard?.placasTotais} un</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Energia Produzida</span>
                  <span className={styles.metricValue}>{dashboard?.energiaTotalGerada} kWh</span>
                </div>
                <div className={styles.metricRow}>
                  <span className={styles.metricLabel}>Economia Estimada</span>
                  <span className={styles.metricValue} style={{ color: '#00e676' }}>R$ {dashboard?.economiaMensal}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* GRID DE TRÊS CARDS INFERIORES */}
        <div className={styles.infoGrid}>
          {metricasDinamicas.map((item) => (
            <div className={styles.infoCard} key={item.title}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className={styles.infoIconBox}>
                  <i className={`bi ${item.icon} ${styles.infoIcon}`} />
                </div>
                <span className={`${styles.badgeIndicator} ${item.isAlert ? styles.badgeAlert : ''}`}>
                  {item.isAlert ? 'Atenção' : 'Check'}
                </span>
              </div>

              <h3 className={styles.infoTitle}>{item.title}</h3>
              <p className={styles.infoText}>{item.text}</p>
              <h2 className={styles.infoValue}>{item.value}</h2>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}