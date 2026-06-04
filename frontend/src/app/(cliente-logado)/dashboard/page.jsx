"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import {
  getDashboardAlertas,
  getDashboardGrafico,
  getDashboardResumo,
} from "@/api";
import "./dashboard.css";

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
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [alertasReais, setAlertasReais] = useState([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
        datasets: [
          {
            label: "Energia",
            data: dadosGrafico,
            borderColor: "#febd17",
            backgroundColor: "rgba(254, 189, 23, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.data.datasets[0].data = dadosGrafico;
    chartRef.current.update();
  }, [dadosGrafico]);

  async function carregarDashboardReal() {
    try {
      const [resumoResponse, graficoResponse, alertasResponse] = await Promise.all([
        getDashboardResumo(),
        getDashboardGrafico(),
        getDashboardAlertas(),
      ]);

      if (!resumoResponse?.sucesso) return;

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

      if (graficoResponse?.sucesso && graficoResponse.dados?.valores?.length > 0) {
        setDadosGrafico(graficoResponse.dados.valores);
      }

      if (alertasResponse?.sucesso) {
        setAlertasReais(alertasResponse.dados || []);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    carregarDashboardReal();
  }, []);

  useEffect(() => {
    const intervalo = setInterval(async () => {
      await carregarDashboardReal();
    }, 30000);

    return () => clearInterval(intervalo);
  }, []);

  const [abrirMenu, setAbrirMenu] = useState(false);

  const cards = [
    {
      icon: "bi-lightning-charge-fill",
      iconBg: "bg-warning bg-opacity-25",
      iconColor: "text-warning",
      titulo: "Energia gerada",
      valor: dadosDashboard.energiaGerada,
      unidade: "kWh",
      descricao: "Produção total do mês",
      botao: "Ver detalhes",
    },
    {
      icon: "bi-battery-charging",
      iconBg: "bg-light",
      titulo: "Consumo mensal",
      valor: dadosDashboard.consumoMensal,
      unidade: "kWh",
      descricao: "Consumo energético atual",
      botao: "Ver consumo",
    },
    {
      icon: "bi-cash-stack",
      iconBg: "bg-warning bg-opacity-25",
      iconColor: "text-warning",
      titulo: "Economia gerada",
      valor: formatarMoeda(dadosDashboard.economiaGerada),
      descricao: "Economia acumulada",
      botao: "Ver economia",
    },
    {
      icon: "bi-exclamation-triangle",
      iconBg: "bg-danger bg-opacity-10",
      iconColor: "text-danger",
      titulo: "Alertas das placas",
      valor: dadosDashboard.totalAlertas,
      descricao:
        dadosDashboard.totalAlertas > 0
          ? "Verifique placas com baixa eficiência"
          : "Nenhum alerta ativo",
      descricaoClass: "text-danger fw-semibold",
      botao: "Ver alertas",
      btnClass: "btn-dark",
    },
  ];

  const alertas =
    alertasReais.length > 0
      ? alertasReais.map((alerta) => ({
          icon: alerta.tipo === "BAIXA_EFICIENCIA" ? "bi-exclamation-circle" : "bi-tools",
          color: alerta.tipo === "BAIXA_EFICIENCIA" ? "danger" : "warning",
          title: alerta.titulo,
          desc: alerta.descricao,
        }))
      : [
          {
            icon: "bi-check-circle",
            color: "success",
            title: "Nenhum alerta encontrado",
            desc: "Quando houver dados do backend, eles aparecerão aqui.",
          },
        ];

  return (
    <div className="dashboard-layout-container">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />

      {/* TOPO */}
      <div className="mb-4">
        <div className="position-relative d-inline-block">
          <button
            onClick={() => setAbrirMenu(!abrirMenu)}
            className="btn btn-light border shadow-sm fw-bold px-4 py-3 d-flex align-items-center gap-2"
          >
            <i className="bi bi-grid text-warning"></i>
            Monitoramento Geral
            <i className={`bi ${abrirMenu ? "bi-chevron-up" : "bi-chevron-down"}`} />
          </button>

          {abrirMenu && (
            <div className="dashboard-menu">
              {["Placa 1", "Placa 2", "Placa 3"].map((item) => (
                <div key={item} className="menu-item">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GRID DOS CARDS SUPERIORES (Estilo idêntico ao financeiro para evitar bugs) */}
      <div className="dashboard-top-cards-grid mb-4">
        {cards.map((card) => (
          <div className="card dashboard-card h-100" key={card.titulo}>
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <div className={`${card.iconBg} rounded-4 p-3 d-inline-flex mb-3`}>
                  <i className={`bi ${card.icon} fs-3 ${card.iconColor || ""}`} />
                </div>
                <p className="text-muted mb-1">{card.titulo}</p>
                <h2 className="fw-bold mb-2">
                  {card.valor}
                  {card.unidade && <small className="text-muted ms-1 fs-6">{card.unidade}</small>}
                </h2>
                <p className={`${card.descricaoClass || "text-muted"} small mb-3`}>
                  {card.descricao}
                </p>
              </div>
              <button className={`btn ${card.btnClass || "btn-outline-warning"} w-100 mt-auto`}>
                {card.botao}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* GRID PRINCIPAL (Esquerda / Direita) */}
      <div className="dashboard-main-grid">
        {/* ESQUERDA */}
        <div className="d-flex flex-column gap-4">
          <div className="card dashboard-card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Resumo do monitoramento</h4>
                <span className="badge bg-light text-dark border">Últimos 6 meses</span>
              </div>

              <div className="chart-area">
                <canvas className="monitoring-chart" ref={canvasRef} />
              </div>

              <div className="dashboard-info-boxes-grid mt-4">
                <div className="info-box">
                  <p className="text-muted mb-1">Eficiência</p>
                  <h3 className="fw-bold">{dadosDashboard.eficiencia}%</h3>
                  <small className="text-muted">
                    {dadosDashboard.eficiencia >= 90 ? "Alto desempenho" : "Abaixo do esperado"}
                  </small>
                </div>

                <div className="info-box">
                  <p className="text-muted mb-1">Economia mensal</p>
                  <h3 className="fw-bold">{formatarMoeda(dadosDashboard.economiaMensal)}</h3>
                  <small className="text-muted">Últimos 30 dias</small>
                </div>

                <div className="info-box">
                  <p className="text-muted mb-1">Status operacional</p>
                  <h3 className="fw-bold">{dadosDashboard.statusOperacional}</h3>
                  <small
                    className={`fw-bold ${
                      dadosDashboard.totalAlertas > 0 ? "text-warning" : "text-success"
                    }`}
                  >
                    {dadosDashboard.totalAlertas > 0
                      ? "Sistema precisa de atenção"
                      : "Sistema funcionando"}
                  </small>
                </div>
              </div>
            </div>
          </div>

          <div className="card dashboard-card">
            <div className="card-body">
              <h4 className="fw-bold mb-4">Alertas e monitoramento</h4>
              {alertas.map((item) => (
                <div key={item.title} className="alert-card">
                  <div className="d-flex align-items-center gap-3">
                    <i className={`bi ${item.icon} text-${item.color} fs-4`} />
                    <div>
                      <div className="fw-bold">{item.title}</div>
                      <small className="text-muted">{item.desc}</small>
                    </div>
                  </div>
                  <i className="bi bi-chevron-right" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* DIREITA */}
        <div className="d-flex flex-column gap-4">
          <div className="card dashboard-card dashboard-actions">
            <div className="card-body">
              <h4 className="fw-bold mb-4">Ações rápidas</h4>
              {[
                "Monitoramento em tempo real",
                "Configuração das placas",
                "Relatórios energéticos",
                "Central de ajuda",
                "Ver alertas",
                "Energia gerada",
              ].map((acao) => (
                <button
                  key={acao}
                  className="btn btn-light border w-100 mb-3 text-start quick-btn"
                >
                  {acao}
                </button>
              ))}
            </div>
          </div>

          <div className="card dashboard-card dashboard-billing">
            <div className="card-body text-center d-flex flex-column justify-content-between p-4">
              <h4 className="fw-bold text-start mb-3">Próxima cobrança</h4>
              <div>
                <i className="bi bi-calendar-event text-warning fs-1"></i>
                <h2 className="mt-2 fw-bold">10/06/2024</h2>
                <h3 className="text-success fw-semibold">R$ 179,90</h3>
                <p className="text-muted small">Plano Monitoramento Premium</p>
              </div>
              <button className="btn btn-outline-warning w-100 mt-2">
                Ver detalhes da cobrança
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}