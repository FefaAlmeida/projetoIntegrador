"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import {
  getDashboardAlertas,
  getDashboardGrafico,
  getDashboardResumo,
} from "@/api";
import styles from "./dashboard.module.css";

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function criarDadosDashboardVazios() {
  return {
    energiaGerada: 0,
    consumoMensal: 0,
    economiaGerada: 0,
    economiaMensal: 0,
    eficiencia: 0,
    totalAlertas: 0,
    statusOperacional: "Sem dados",
  };
}

export default function DashboardPage() {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [dadosDashboard, setDadosDashboard] = useState(() => criarDadosDashboardVazios());
  
  // Iniciamos com os 6 meses padrão zerados de forma explícita e numérica
  const [dadosGrafico, setDadosGrafico] = useState({ 
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"], 
    valores: [0, 0, 0, 0, 0, 0] 
  });
  const [alertasReais, setAlertasReais] = useState([]);
  const [abrirMenu, setAbrirMenu] = useState(false);

  // 1. CARGA DE DADOS DA API
  async function carregarDashboardReal() {
    try {
      const [resumoResponse, graficoResponse, alertasResponse] = await Promise.all([
        getDashboardResumo(),
        getDashboardGrafico(),
        getDashboardAlertas(),
      ]);

      if (resumoResponse?.sucesso) {
        const resumo = resumoResponse.dados;
        setDadosDashboard({
          energiaGerada: Math.round(resumo.energiaGeradaMes || 0),
          consumoMensal: Math.round(resumo.consumoMensal || 0),
          economiaGerada: Math.round(resumo.economiaGerada || 0),
          economiaMensal: Math.round(resumo.economiaMensal || 0),
          eficiencia: Math.round(resumo.eficienciaMedia || 0),
          totalAlertas: resumo.totalAlertas || 0,
          statusOperacional: resumo.statusOperacional || "Tudo em dia",
        });
      }

      // 🔥 TRATAMENTO E ALINHAMENTO DO GRÁFICO (Garante o desenho da linha)
      if (graficoResponse?.sucesso && graficoResponse.dados) {
        const mesesPadrao = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
        const apiLabels = graficoResponse.dados.labels || [];
        const apiValores = graficoResponse.dados.valores || [];

        // Força a criação de um array de 6 posições casado com os meses fixos do eixo X
        const valoresTratados = mesesPadrao.map((mes, index) => {
          // Busca se o mês atual existe dentro do que a API retornou
          const apiIndex = apiLabels.findIndex(
            (label) => label && label.toLowerCase().includes(mes.toLowerCase())
          );

          // Se achou na API pega o valor convertido em Number, senão joga 0 para fechar o gráfico
          if (apiIndex !== -1) {
            return Number(apiValores[apiIndex] || 0);
          }
          
          // Fallback caso a API mande os valores puramente sequenciais sem nome dos meses
          if (apiLabels.length === 0 && apiValores[index] !== undefined) {
            return Number(apiValores[index] || 0);
          }

          return 0;
        });

        setDadosGrafico({
          labels: mesesPadrao, // Garante 6 labels no eixo X
          valores: valoresTratados // Garante 6 valores correspondentes no eixo Y
        });
      }

      if (alertasResponse?.sucesso) {
        setAlertasReais(alertasResponse.dados || []);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do dashboard:", error);
    }
  }

  // INTERVALO DE ATUALIZAÇÃO (Pooling de 10 segundos)
  useEffect(() => {
    carregarDashboardReal();
    const intervalo = setInterval(() => {
      carregarDashboardReal();
    }, 10000);
    return () => clearInterval(intervalo);
  }, []);

  // 2. CICLO DE VIDA DO GRÁFICO (Sincronizado e Reativo)
  useEffect(() => {
    if (!canvasRef.current) return;

    // Se o gráfico já existe, atualiza os dados internamente e renderiza a mudança
    if (chartRef.current) {
      chartRef.current.data.labels = dadosGrafico.labels;
      chartRef.current.data.datasets[0].data = dadosGrafico.valores;
      chartRef.current.update();
      return;
    }

    // Instancia o gráfico do zero
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: dadosGrafico.labels,
        datasets: [
          {
            label: "Energia Produzida (kWh)",
            data: dadosGrafico.valores,
            borderColor: "#febd17",
            backgroundColor: "rgba(254, 189, 23, 0.08)",
            borderWidth: 3,
            pointBackgroundColor: "#febd17",
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.3,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true, // Começa do zero para traçar a linha corretamente de forma ascendente/descendente
            grid: { color: "rgba(0, 0, 0, 0.04)" },
            ticks: { font: { family: "Poppins", size: 12 }, color: "#757575" },
          },
          x: {
            grid: { display: false },
            ticks: { font: { family: "Poppins", size: 12 }, color: "#757575" },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [dadosGrafico]);

  const cards = [
    {
      icon: "bi-lightning-charge-fill",
      isPremium: true,
      titulo: "Energia gerada",
      valor: dadosDashboard.energiaGerada,
      unidade: "kWh",
      descricao: "Produção total do mês",
    },
    {
      icon: "bi-battery-charging",
      isPremium: false,
      titulo: "Consumo mensal",
      valor: dadosDashboard.consumoMensal,
      unidade: "kWh",
      descricao: "Consumo energético atual",
    },
    {
      icon: "bi-cash-stack",
      isPremium: false,
      titulo: "Economia gerada",
      valor: formatarMoeda(dadosDashboard.economiaGerada),
      descricao: "Economia acumulada",
    },
    {
      icon: "bi-exclamation-triangle-fill",
      isPremium: false,
      isAlertCard: dadosDashboard.totalAlertas > 0,
      titulo: "Alertas das placas",
      valor: dadosDashboard.totalAlertas,
      descricao: dadosDashboard.totalAlertas > 0 ? "Existem placas requerendo atenção técnica" : "Nenhum alerta ativo nas últimas 24h",
    },
  ];

  const alertas = alertasReais.length > 0
    ? alertasReais.map((alerta) => ({
        icon: alerta.tipo === "BAIXA_EFICIENCIA" ? "bi-exclamation-circle-fill" : "bi-tools",
        isCritical: alerta.tipo === "BAIXA_EFICIENCIA",
        title: alerta.titulo,
        desc: alerta.descricao,
      }))
    : [
        {
          icon: "bi-check-circle-fill",
          isSuccess: true,
          title: "Nenhum alerta encontrado",
          desc: "Todos os módulos fotovoltaicos operando dentro da normalidade.",
        },
      ];

  return (
    <section className={styles.page}>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />

      <div className={`mx-auto ${styles.container}`}>
        
        {/* BARRA SUPERIOR COM BOTÃO SELECT */}
        <div className={`d-flex justify-content-between align-items-center ${styles.topbar}`}>
          <div className="position-relative">
            <button
              onClick={() => setAbrirMenu(!abrirMenu)}
              className={styles.menuSelectorBtn}
            >
              <i className="bi bi-grid-1x2-fill text-warning"></i>
              <span>Monitoramento Geral</span>
              <i className={`bi ${abrirMenu ? "bi-chevron-up" : "bi-chevron-down"} ms-auto`} />
            </button>

            {abrirMenu && (
              <div className={styles.dashboardMenu}>
                {["Placa 1", "Placa 2", "Placa 3"].map((item) => (
                  <div key={item} className={styles.menuItem}>
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CARDS SUPERIORES */}
        <div className={`${styles.topCardsGrid} mb-4`}>
          {cards.map((card) => (
            <div 
              className={`${card.isPremium ? styles.cardPremium : styles.cardStandard} ${card.isAlertCard ? styles.cardAlertHighlight : ""}`} 
              key={card.titulo}
            >
              {card.isPremium && <div className={styles.premiumGlow} />}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className={card.isPremium ? styles.iconBoxPremium : styles.iconBoxStandard}>
                  <i className={`bi ${card.icon}`} />
                </div>
                <span className={`${styles.badgeIndicator} ${card.isAlertCard ? styles.badgeAlert : card.isPremium ? styles.badgePremium : ''}`}>
                  {card.isAlertCard ? 'Atenção' : 'Check'}
                </span>
              </div>

              <p className={card.isPremium ? styles.labelPremium : styles.labelStandard}>{card.titulo}</p>
              <h2 className={card.isPremium ? styles.valuePremium : styles.valueStandard}>
                {card.valor}
                {card.unidade && <span className={styles.unitText}> {card.unidade}</span>}
              </h2>
              <p className={`${styles.cardDescription} ${card.isAlertCard ? 'text-danger fw-medium' : ''}`}>
                {card.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* GRID PRINCIPAL */}
        <div className={styles.mainGrid}>
          <div className="d-flex flex-column gap-4">
            
            {/* CARD DO GRÁFICO */}
            <div className={styles.cardStandard}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <span className={styles.heroEyebrow}>MÉTRICAS DETALHADAS</span>
                  <h4 className={styles.blockTitle}>Resumo do monitoramento</h4>
                </div>
                <span className={styles.timeBadge}>Histórico</span>
              </div>

              <div className={styles.chartArea}>
                <canvas ref={canvasRef} />
              </div>

              {/* MINI BOXES INFERIORES DO GRÁFICO */}
              <div className={`${styles.infoBoxesGrid} mt-4`}>
                <div className={styles.miniBox}>
                  <p className={styles.miniBoxLabel}>Eficiência Média</p>
                  <h3 className={styles.miniBoxValue}>{dadosDashboard.eficiencia}%</h3>
                  <span className={dadosDashboard.eficiencia >= 90 ? styles.statusTextSuccess : styles.statusTextWarning}>
                    {dadosDashboard.eficiencia >= 90 ? "● Alto desempenho" : "● Abaixo do esperado"}
                  </span>
                </div>

                <div className={styles.miniBox}>
                  <p className={styles.miniBoxLabel}>Economia Mensal</p>
                  <h3 className={styles.miniBoxValue} style={{ color: '#00e676' }}>{formatarMoeda(dadosDashboard.economiaMensal)}</h3>
                  <span className={styles.statusTextMuted}>Últimos 30 dias</span>
                </div>

                <div className={styles.miniBox}>
                  <p className={styles.miniBoxLabel}>Status Operacional</p>
                  <h3 className={styles.miniBoxValue}>{dadosDashboard.statusOperacional}</h3>
                  <span className={dadosDashboard.totalAlertas > 0 ? styles.statusTextWarning : styles.statusTextSuccess}>
                    {dadosDashboard.totalAlertas > 0 ? "● Requer atenção" : "● Sistema ativo"}
                  </span>
                </div>
              </div>
            </div>

            {/* CARD DE ALERTAS */}
            <div className={styles.cardStandard}>
              <h4 className={`${styles.blockTitle} mb-4`}>Alertas e Ocorrências Ativas</h4>
              <div className="vstack gap-3">
                {alertas.map((item, index) => (
                  <div key={index} className={styles.alertCardRow}>
                    <div className="d-flex align-items-center gap-3">
                      <div className={`${styles.alertIconBox} ${item.isCritical ? styles.alertBoxCritical : item.isSuccess ? styles.alertBoxSuccess : styles.alertBoxWarning}`}>
                        <i className={`bi ${item.icon}`} />
                      </div>
                      <div>
                        <div className={styles.alertRowTitle}>{item.title}</div>
                        <p className={styles.alertRowDesc}>{item.desc}</p>
                      </div>
                    </div>
                    <i className="bi bi-chevron-right text-muted ms-auto" />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}