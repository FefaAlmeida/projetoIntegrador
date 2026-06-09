"use client";

import React, { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Chart from "chart.js/auto";
import styles from "./page.module.css";
import { getFinanceiroAdmin, atualizarStatusPagamento } from "../../../api";

export default function AdminFinanceiroPage() {

  // DICIONÁRIOS DE TRADUÇÃO VISUAL
  const MAPA_STATUS = {
    PENDENTE: "Pendente",
    PAGO: "Pago",
    ATRASADO: "Atrasado",
  };

  const MAPA_TIPOS = {
    INSTALACAO: "Instalação",
    PLACAS: "Placas",
  };

  const MAPA_FORMAS = {
    BOLETO: "Boleto",
    PIX: "Pix",
    CARTAO: "Cartão",
  };

  const [pagamentos, setPagamentos] = useState([]);
  const [resumo, setResumo] = useState({
    totalRecebido: 0,
    totalPendente: 0,
    totalAtrasado: 0,
    qtdRecebidos: 0,
    qtdPendentes: 0,
    qtdAtrasados: 0,
    totalRegistros: 0,
  });
  const [serieMensal, setSerieMensal] = useState({ labels: [], recebido: [], aReceber: [] });
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginacao, setPaginacao] = useState({});
  const [filtroStatus, setFiltroStatus] = useState("TODOS");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [pagamentoDetalhado, setPagamentoDetalhado] = useState(null);
  const [novoStatus, setNovoStatus] = useState("PENDENTE");

  // REFS DO GRÁFICO
  const lineCanvasRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  useEffect(() => {
    carregarFinanceiro();
  }, [paginaAtual, filtroStatus]);

  useEffect(() => {
    carregarAnalytics();
  }, []);

  const carregarFinanceiro = async () => {
    setLoading(true);
    try {
      const statusQuery = filtroStatus === "TODOS" ? "" : filtroStatus;
      const res = await getFinanceiroAdmin(paginaAtual, 10, statusQuery);

      if (res && res.sucesso) {
        setPagamentos(res.dados || []);
        setPaginacao(res.paginacao || {});
        if (res.resumo) setResumo(res.resumo);
      } else {
        setPagamentos([]);
        toast.error(res?.erro || res?.mensagem || "Erro ao carregar o painel financeiro.");
      }
    } catch (error) {
      console.error("Erro ao carregar financeiro no ADM:", error);
      tratarErroServidor(error);
      setPagamentos([]);
    } finally {
      setLoading(false);
    }
  };

  // Busca todos os lançamentos (sem filtro) para alimentar o gráfico histórico.
  const carregarAnalytics = async () => {
    try {
      const res = await getFinanceiroAdmin(1, 1000, "");
      if (res?.sucesso) {
        setSerieMensal(construirSerieMensal(res.dados || []));
      }
    } catch (error) {
      console.error("Erro ao carregar analytics financeiro:", error);
    }
  };

  const abrirDetalhes = (pagamento) => {
    setPagamentoDetalhado(pagamento);
    setNovoStatus((pagamento.status_pagamento || "PENDENTE").toUpperCase());
  };

  function fecharModalDetalhes() {
    if (typeof window !== "undefined" && window.bootstrap) {
      const modalElement = document.getElementById("modalDetalhesPagamento");
      if (modalElement) {
        const instance =
          window.bootstrap.Modal.getInstance(modalElement) ||
          new window.bootstrap.Modal(modalElement);
        instance.hide();
      }
    }
  }

  const handleSalvarStatus = async (e) => {
    e.preventDefault();
    if (!pagamentoDetalhado) return;

    const statusAtual = (pagamentoDetalhado.status_pagamento || "").toUpperCase();
    if (novoStatus === statusAtual) {
      return toast.info("A situação selecionada já é a atual.");
    }

    setSubmitting(true);
    try {
      const response = await atualizarStatusPagamento(
        pagamentoDetalhado.id_pagamento,
        novoStatus
      );

      if (response && response.sucesso) {
        toast.success(
          `Parcela #${pagamentoDetalhado.id_pagamento} atualizada com sucesso!`
        );

        setPagamentos((prev) =>
          prev.map((p) =>
            p.id_pagamento === pagamentoDetalhado.id_pagamento
              ? {
                  ...p,
                  status_pagamento: novoStatus,
                  data_pagamento: novoStatus === "PAGO" ? new Date().toISOString() : null,
                }
              : p
          )
        );

        fecharModalDetalhes();
        carregarFinanceiro(); // Sincroniza os indicadores do topo
        carregarAnalytics();  // Sincroniza o gráfico
      } else {
        toast.error(response?.erro || response?.mensagem || "Erro ao atualizar pagamento.");
      }
    } catch (error) {
      tratarErroServidor(error);
    } finally {
      setSubmitting(false);
    }
  };

  function tratarErroServidor(error) {
    if (error.response && error.response.data) {
      const apiError = error.response.data.erro || error.response.data.mensagem;
      toast.error(apiError || "Erro de conexão com o servidor.");
    } else {
      toast.error("Erro de conexão com o servidor.");
    }
  }

  // FORMATADORES
  const formatarMoeda = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(valor) || 0);

  // Formato compacto (ex: R$ 57,2 mil) para caber bem nos cards
  const formatarMoedaCompacta = (valor) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Number(valor) || 0);

  const formatarData = (data) => {
    if (!data) return "—";
    const apenasData = String(data).substring(0, 10);
    const [ano, mes, dia] = apenasData.split("-");
    if (!ano || !mes || !dia) return "—";
    return `${dia}/${mes}/${ano}`;
  };

  const obterStatus = (status) => (status ? status.toUpperCase() : "PENDENTE");

  // INDICADORES CALCULADOS
  const carteiraTotal = resumo.totalRecebido + resumo.totalPendente + resumo.totalAtrasado;
  const taxaRecebimento = carteiraTotal > 0 ? (resumo.totalRecebido / carteiraTotal) * 100 : 0;
  const inadimplencia = carteiraTotal > 0 ? (resumo.totalAtrasado / carteiraTotal) * 100 : 0;
  const ticketMedio = resumo.totalRegistros > 0 ? carteiraTotal / resumo.totalRegistros : 0;

  // ============ 📊 NOVO CICLO DE VIDA DO GRÁFICO (UNIFICADO) ============
  useEffect(() => {
    if (!lineCanvasRef.current) return;
    
    const ctx = lineCanvasRef.current.getContext("2d");

    // Cria a instância diretamente com os dados reativos da serieMensal
    lineChartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: serieMensal.labels,
        datasets: [
          {
            label: "Recebido",
            data: serieMensal.recebido,
            backgroundColor: "#16a34a",
            hoverBackgroundColor: "#15803d",
            borderRadius: 8,
            borderSkipped: false,
            maxBarThickness: 38,
          },
          {
            label: "A Receber",
            data: serieMensal.aReceber,
            backgroundColor: "#3b82f6",
            hoverBackgroundColor: "#2563eb",
            borderRadius: 8,
            borderSkipped: false,
            maxBarThickness: 38,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { intersect: false, mode: "index" },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#111111",
            titleColor: "#ffffff",
            bodyColor: "#e5e5e5",
            padding: 14,
            cornerRadius: 12,
            boxPadding: 6,
            usePointStyle: true,
            titleFont: { family: "Poppins", size: 13, weight: "600" },
            bodyFont: { family: "Poppins", size: 12 },
            callbacks: {
              label: (item) => `  ${item.dataset.label}: ${formatarMoeda(item.parsed.y)}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            border: { display: false },
            grid: { color: "rgba(0, 0, 0, 0.05)" },
            ticks: {
              font: { family: "Poppins", size: 11 },
              color: "#9a9a9a",
              maxTicksLimit: 6,
              padding: 8,
              callback: (v) => formatarMoedaCompacta(v),
            },
          },
          x: {
            border: { display: false },
            grid: { display: false },
            ticks: { font: { family: "Poppins", size: 12, weight: "500" }, color: "#757575" },
          },
        },
      },
    });

    // Sempre limpa o gráfico antigo antes de criar um novo na próxima atualização
    return () => {
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
        lineChartRef.current = null;
      }
    };
  }, [serieMensal]); // 🌟 Renderiza na hora de forma automática sempre que a API trouxer novos dados

  // Totais do período exibido no gráfico (para a legenda em chips)
  const totalRecebidoPeriodo = serieMensal.recebido.reduce((s, v) => s + (Number(v) || 0), 0);
  const totalAReceberPeriodo = serieMensal.aReceber.reduce((s, v) => s + (Number(v) || 0), 0);

  return (
    <>
      <section className={styles.page}>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />

        <div className={styles.container}>

          {/* TOPBAR */}
          <div className={styles.topbar}>
            <span className={styles.welcomeText}>Painel Administrativo</span>
            <h1 className={styles.userName}>
              Controle <span className={styles.highlight}>Financeiro</span>
            </h1>
          </div>

          {/* CARDS KPI */}
          <div className={`${styles.topCardsGrid} mb-4`}>

            {/* PREMIUM — TOTAL RECEBIDO */}
            <div className={styles.cardPremium}>
              <div className={styles.premiumGlow} />
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className={styles.iconBoxPremium}>
                  <i className="bi bi-cash-coin" />
                </div>
                <span className={`${styles.badgeIndicator} ${styles.badgePremium}`}>Recebido</span>
              </div>
              <p className={styles.labelPremium}>TOTAL RECEBIDO</p>
              <h2 className={styles.valuePremium}>{formatarMoeda(resumo.totalRecebido)}</h2>
              <p className={styles.cardDescriptionPremium}>{resumo.qtdRecebidos} parcela(s) quitada(s)</p>
            </div>

            {/* A RECEBER */}
            <div className={styles.cardStandard}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className={styles.iconBoxStandard} style={{ color: "#2563eb", background: "rgba(37,99,235,0.08)" }}>
                  <i className="bi bi-hourglass-split" />
                </div>
                <span className={`${styles.badgeIndicator} ${styles.badgeInfo}`}>Pendente</span>
              </div>
              <p className={styles.labelStandard}>A Receber</p>
              <h2 className={styles.valueStandard}>{formatarMoeda(resumo.totalPendente)}</h2>
              <p className={styles.cardDescription}>{resumo.qtdPendentes} parcela(s) em aberto</p>
            </div>

            {/* EM ATRASO */}
            <div className={`${styles.cardStandard} ${resumo.totalAtrasado > 0 ? styles.cardAlertHighlight : ""}`}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className={styles.iconBoxStandard} style={{ color: "#dc2626", background: "rgba(220,38,38,0.08)" }}>
                  <i className="bi bi-exclamation-octagon-fill" />
                </div>
                <span className={`${styles.badgeIndicator} ${resumo.totalAtrasado > 0 ? styles.badgeAlert : ""}`}>
                  {resumo.totalAtrasado > 0 ? "Atenção" : "Em dia"}
                </span>
              </div>
              <p className={styles.labelStandard}>Em Atraso</p>
              <h2 className={styles.valueStandard}>{formatarMoeda(resumo.totalAtrasado)}</h2>
              <p className={styles.cardDescription}>{resumo.qtdAtrasados} parcela(s) vencida(s)</p>
            </div>

            {/* TAXA DE RECEBIMENTO */}
            <div className={styles.cardStandard}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className={styles.iconBoxStandard} style={{ color: "#7c3aed", background: "rgba(124,58,237,0.08)" }}>
                  <i className="bi bi-graph-up-arrow" />
                </div>
                <span className={styles.badgeIndicator}>{resumo.totalRegistros} lanç.</span>
              </div>
              <p className={styles.labelStandard}>Taxa de Recebimento</p>
              <h2 className={styles.valueStandard}>{taxaRecebimento.toFixed(1)}%</h2>
              <p className={styles.cardDescription}>da carteira total já recebida</p>
            </div>

          </div>

          {/* GRÁFICO DE FLUXO DE CAIXA */}
          <div className={`${styles.mainGrid} mb-4`}>
            <div className={styles.cardStandard}>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <span className={styles.heroEyebrow}>FLUXO DE CAIXA</span>
                  <h4 className={styles.blockTitle}>Recebido x A Receber por mês</h4>
                </div>
                <span className={styles.timeBadge}>Próximos meses</span>
              </div>

              {/* Legenda em chips com o total do período */}
              <div className={styles.chartLegend}>
                <div className={styles.legendChip}>
                  <span className={styles.legendChipDot} style={{ background: "#16a34a" }} />
                  <span className={styles.legendChipText}>
                    <span className={styles.legendChipLabel}>Recebido no período</span>
                    <span className={styles.legendChipValue}>{formatarMoeda(totalRecebidoPeriodo)}</span>
                  </span>
                </div>
                <div className={styles.legendChip}>
                  <span className={styles.legendChipDot} style={{ background: "#3b82f6" }} />
                  <span className={styles.legendChipText}>
                    <span className={styles.legendChipLabel}>A receber no período</span>
                    <span className={styles.legendChipValue}>{formatarMoeda(totalAReceberPeriodo)}</span>
                  </span>
                </div>
              </div>

              <div className={styles.chartArea}>
                <canvas ref={lineCanvasRef} />
              </div>

              <div className={`${styles.infoBoxesGrid} mt-4`}>
                <div className={styles.miniBox}>
                  <p className={styles.miniBoxLabel}>Ticket Médio</p>
                  <h3 className={styles.miniBoxValue}>{formatarMoeda(ticketMedio)}</h3>
                  <span className={styles.statusTextMuted}>Por lançamento</span>
                </div>

                <div className={styles.miniBox}>
                  <p className={styles.miniBoxLabel}>Carteira Total</p>
                  <h3 className={styles.miniBoxValue} style={{ color: "#16a34a" }}>{formatarMoeda(carteiraTotal)}</h3>
                  <span className={styles.statusTextMuted}>Valor geral emitido</span>
                </div>

                <div className={styles.miniBox}>
                  <p className={styles.miniBoxLabel}>Inadimplência</p>
                  <h3 className={styles.miniBoxValue}>{inadimplencia.toFixed(1)}%</h3>
                  <span className={inadimplencia > 10 ? styles.statusTextWarning : styles.statusTextSuccess}>
                    {inadimplencia > 10 ? "● Acima do ideal" : "● Sob controle"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* FILTROS E TABELA */}
          <div className={`bg-white ${styles.shell}`}>
            <div className={`d-flex flex-wrap justify-content-between align-items-center p-4 border-bottom gap-3 ${styles.filterBar}`}>
              <div className="d-flex gap-2 flex-wrap">
                {["TODOS", "PENDENTE", "PAGO", "ATRASADO"].map((status) => (
                  <button
                    key={status}
                    className={`${styles.filterBtn} ${filtroStatus === status ? styles.filterBtnActive : ""}`}
                    onClick={() => {
                      setPaginaAtual(1);
                      setFiltroStatus(status);
                    }}
                  >
                    {status === "TODOS" ? "TODOS" : (MAPA_STATUS[status] || status).toUpperCase()}
                  </button>
                ))}
              </div>
              <span className="text-muted small fw-medium">
                Mostrando {pagamentos.length} lançamento(s)
              </span>
            </div>

            {loading && pagamentos.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                <div className="spinner-border text-primary mb-3" role="status"></div>
                <p className="m-0 small">Carregando lançamentos financeiros...</p>
              </div>
            ) : pagamentos.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                <div className="bi bi-folder2-open fs-2 text-muted mb-2 d-block"></div>
                <p className="m-0 small">Nenhum lançamento encontrado para esta classificação.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className={`table align-middle m-0 text-dark ${styles.customTable}`}>
                  <thead>
                    <tr className="text-secondary small fw-bold">
                      <th className="px-4 py-3">ID</th>
                      <th className="py-3">Empresa</th>
                      <th className="py-3">Tipo</th>
                      <th className="py-3">Parcela</th>
                      <th className="py-3">Vencimento</th>
                      <th className="py-3">Valor</th>
                      <th className="py-3">Status</th>
                      <th className="px-4 py-3 text-end"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagamentos.map((pag) => {
                      const status = obterStatus(pag.status_pagamento);
                      return (
                        <tr key={pag.id_pagamento} className={styles.tableRow}>
                          <td className="px-4 py-3 fw-bold text-secondary">#{pag.id_pagamento}</td>
                          <td className="py-3 fw-semibold text-dark text-uppercase small">
                            {pag.nome_empresa || `Empresa #${pag.id_empresa}`}
                          </td>
                          <td className="py-3">
                            <span className={styles.tipoBadge}>
                              {MAPA_TIPOS[pag.tipo_pagamento] || pag.tipo_pagamento}
                            </span>
                          </td>
                          <td className="py-3 small text-muted fw-semibold">
                            {pag.numero_parcela && pag.quantidade_parcelas
                              ? `${pag.numero_parcela}/${pag.quantidade_parcelas}`
                              : "—"}
                          </td>
                          <td className="py-3 small text-muted">{formatarData(pag.data_vencimento)}</td>
                          <td className={`py-3 ${styles.valor}`}>{formatarMoeda(pag.valor)}</td>
                          <td className="py-3">
                            <span className={`${styles.badge} ${styles[status] || styles.PENDENTE}`}>
                              {MAPA_STATUS[status] || status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#modalDetalhesPagamento"
                              onClick={() => abrirDetalhes(pag)}
                              className={`btn btn-sm px-3 ${styles.btnDetails}`}
                            >
                              <i className="bi bi-pencil-square me-1"></i> Gerenciar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {paginacao.totalPaginas > 1 && (
              <nav className="d-flex justify-content-center py-4 border-top">
                <ul className="pagination gap-2 m-0 border-0">
                  {Array.from({ length: paginacao.totalPaginas }, (_, i) => i + 1).map((n) => (
                    <li key={n} className="page-item">
                      <button
                        onClick={() => setPaginaAtual(n)}
                        className={`page-link border-0 shadow-sm fw-bold rounded-3 ${paginaAtual === n ? "bg-warning text-dark" : "text-dark"}`}
                      >
                        {n}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

        </div>
      </section>

      {/* MODAL: DETALHES E GESTÃO DO PAGAMENTO */}
      <div className="modal fade" id="modalDetalhesPagamento" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "640px" }}>
          <div className={`modal-content ${styles.modalContenedorBase}`}>

            {/* CABEÇALHO */}
            <div className="p-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: "#111827" }}>
              <h5 className="modal-title fw-bold text-white m-0">
                Parcela <span style={{ color: "#febd17" }}>#{pagamentoDetalhado?.id_pagamento}</span>
              </h5>
              <button type="button" className={styles.closeModalButton} data-bs-dismiss="modal" aria-label="Close">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* CORPO */}
            <div className="modal-body p-4 bg-light text-dark">

              <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="text-secondary small d-block mb-1">Empresa</span>
                    <strong className="text-dark text-uppercase d-block">
                      {pagamentoDetalhado?.nome_empresa || `Empresa #${pagamentoDetalhado?.id_empresa}`}
                    </strong>
                  </div>
                  <span className={`${styles.badge} ${styles[obterStatus(pagamentoDetalhado?.status_pagamento)] || styles.PENDENTE}`}>
                    {MAPA_STATUS[obterStatus(pagamentoDetalhado?.status_pagamento)] || pagamentoDetalhado?.status_pagamento}
                  </span>
                </div>

                <div className="row g-3">
                  <div className="col-6 col-md-4">
                    <span className="text-secondary small d-block mb-1">Valor</span>
                    <strong className="text-dark">{formatarMoeda(pagamentoDetalhado?.valor)}</strong>
                  </div>
                  <div className="col-6 col-md-4">
                    <span className="text-secondary small d-block mb-1">Tipo</span>
                    <strong className="text-dark small text-uppercase">
                      {MAPA_TIPOS[pagamentoDetalhado?.tipo_pagamento] || pagamentoDetalhado?.tipo_pagamento}
                    </strong>
                  </div>
                  <div className="col-6 col-md-4">
                    <span className="text-secondary small d-block mb-1">Forma</span>
                    <strong className="text-dark small text-uppercase">
                      {MAPA_FORMAS[pagamentoDetalhado?.forma_pagamento] || pagamentoDetalhado?.forma_pagamento || "—"}
                    </strong>
                  </div>
                  <div className="col-6 col-md-4">
                    <span className="text-secondary small d-block mb-1">Parcela</span>
                    <strong className="text-dark small">
                      {pagamentoDetalhado?.numero_parcela && pagamentoDetalhado?.quantidade_parcelas
                        ? `${pagamentoDetalhado.numero_parcela} de ${pagamentoDetalhado.quantidade_parcelas}`
                        : "—"}
                    </strong>
                  </div>
                  <div className="col-6 col-md-4">
                    <span className="text-secondary small d-block mb-1">Vencimento</span>
                    <strong className="text-dark small">{formatarData(pagamentoDetalhado?.data_vencimento)}</strong>
                  </div>
                  <div className="col-6 col-md-4">
                    <span className="text-secondary small d-block mb-1">Pagamento</span>
                    <strong className="text-dark small">{formatarData(pagamentoDetalhado?.data_pagamento)}</strong>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSalvarStatus} className="d-flex flex-column gap-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border border-warning-subtle">
                  <h6 className="fw-bold text-dark mb-3 small text-uppercase d-flex align-items-center">
                    <i className="bi bi-patch-check-fill text-warning me-2 fs-5"></i> Atualizar Situação
                  </h6>
                  <label className="form-label fw-semibold small text-secondary">Definir nova situação da parcela</label>
                  <select
                    className="form-select"
                    style={{ borderRadius: "10px", fontSize: "0.9rem" }}
                    value={novoStatus}
                    onChange={(e) => setNovoStatus(e.target.value)}
                  >
                    <option value="PENDENTE">Pendente</option>
                    <option value="PAGO">Pago (Confirmar recebimento)</option>
                    <option value="ATRASADO">Atrasado</option>
                  </select>
                  <p className="text-muted small mb-0 mt-2">
                    Ao marcar como <strong>Pago</strong>, a data de pagamento é registrada como hoje automaticamente.
                  </p>
                </div>

                <div className="d-flex justify-content-end gap-2 pt-1">
                  <button type="button" className={styles.btnSecondaryStyle} data-bs-dismiss="modal">
                    Voltar ao Painel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-dark fw-bold px-4"
                    style={{ borderRadius: "12px", backgroundColor: "#221f20" }}
                    disabled={submitting}
                  >
                    {submitting ? "Gravando..." : "Salvar Alteração"}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============ HELPERS ============
function construirSerieMensal(lista) {
  const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const mapa = new Map();

  for (const p of lista) {
    const ref = p.data_vencimento || p.data_pagamento;
    if (!ref) continue;

    const ym = String(ref).substring(0, 7); // YYYY-MM
    if (!mapa.has(ym)) mapa.set(ym, { recebido: 0, aReceber: 0 });

    const bucket = mapa.get(ym);
    const valor = Number(p.valor) || 0;

    if ((p.status_pagamento || "").toUpperCase() === "PAGO") {
      bucket.recebido += valor;
    } else {
      bucket.aReceber += valor;
    }
  }

  const chaves = [...mapa.keys()].sort().slice(-6);

  if (chaves.length === 0) {
    return { labels: [], recebido: [], aReceber: [] };
  }

  return {
    labels: chaves.map((ym) => {
      const [ano, mes] = ym.split("-");
      return `${nomesMeses[parseInt(mes, 10) - 1]}/${ano.slice(-2)}`;
    }),
    recebido: chaves.map((ym) => mapa.get(ym).recebido),
    aReceber: chaves.map((ym) => mapa.get(ym).aReceber),
  };
}

