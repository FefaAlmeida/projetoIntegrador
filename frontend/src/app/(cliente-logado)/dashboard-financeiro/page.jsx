"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import styles from "./page.module.css";
import { 
  getFinanceiroCliente, 
  inicializarParcelamentoCliente, 
  alterarFormaPagamentoCliente, 
  pagarParcelaCliente 
} from "../../../api";

export default function ClienteFinanceiroPage() {
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

  // ESTADOS DO PAINEL
  const [pagamentos, setPagamentos] = useState([]);
  const [resumo, setResumo] = useState({
    totalRecebido: 0, // No ponto de vista do cliente: "Total Pago"
    totalPendente: 0,
    totalAtrasado: 0,
    qtdRecebidos: 0,
    qtdPendentes: 0,
    qtdAtrasados: 0,
    totalRegistros: 0,
  });
  
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginacao, setPaginacao] = useState({});
  const [filtroStatus, setFiltroStatus] = useState("TODOS");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // CONTROLE DE SETUP INICIAL (ORÇAMENTO APROVADO SEM PARCELAS)
  const [requerSetup, setRequerSetup] = useState(false);
  const [dadosOrcamento, setDadosOrcamento] = useState(null);
  const [setupParcelas, setSetupParcelas] = useState(1);
  const [setupMetodo, setSetupMetodo] = useState("BOLETO");

  // GESTÃO DE ALTERAÇÃO GLOBAL DE PAGAMENTO
  const [metodoGlobal, setMetodoGlobal] = useState("BOLETO");

  // DETALHES DA PARCELA SELECIONADA
  const [pagamentoDetalhado, setPagamentoDetalhado] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
  }, []);

  useEffect(() => {
    carregarFinanceiro();
  }, [paginaAtual, filtroStatus]);

  const carregarFinanceiro = async () => {
    setLoading(true);
    try {
      const statusQuery = filtroStatus === "TODOS" ? "" : filtroStatus;
      const res = await getFinanceiroCliente(paginaAtual, 12, statusQuery);

      if (res && res.sucesso) {
        if (res.requerSetup) {
          setRequerSetup(true);
          setDadosOrcamento(res.orcamento || null);
        } else {
          setRequerSetup(false);
          setPagamentos(res.dados || []);
          setPaginacao(res.paginacao || {});
          if (res.resumo) setResumo(res.resumo);
          
          // Define a forma de pagamento atual baseada na primeira pendente se houver
          const primeiraParcelaValida = res.dados?.find(p => p.forma_pagamento);
          if (primeiraParcelaValida) {
            setMetodoGlobal(primeiraParcelaValida.forma_pagamento);
          }
        }
      } else {
        toast.error(res?.erro || res?.mensagem || "Erro ao carregar seu extrato financeiro.");
      }
    } catch (error) {
      console.error("Erro ao carregar financeiro do cliente:", error);
      tratarErroServidor(error);
    } finally {
      setLoading(false);
    }
  };

  // REALIZA O PARCELAMENTO INICIAL
  const handleExecutarSetup = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await inicializarParcelamentoCliente({
        quantidade_parcelas: Number(setupParcelas),
        forma_pagamento: setupMetodo
      });

      if (res && res.sucesso) {
        toast.success("Plano de parcelamento gerado com sucesso!");
        setRequerSetup(false);
        carregarFinanceiro();
      } else {
        toast.error(res?.erro || res?.mensagem || "Erro ao inicializar parcelas.");
      }
    } catch (error) {
      tratarErroServidor(error);
    } finally {
      setSubmitting(false);
    }
  };

  // ALTERA A FORMA DE PAGAMENTO DE TODAS AS PARCELAS EM ABERTO
  const handleAlterarFormaGlobal = async () => {
    setSubmitting(true);
    try {
      const res = await alterarFormaPagamentoCliente(metodoGlobal);
      if (res && res.sucesso) {
        toast.success(`Forma de pagamento atualizada para ${MAPA_FORMAS[metodoGlobal]} nas parcelas abertas.`);
        fecharModalGenerico("modalMetodoPagamento");
        carregarFinanceiro();
      } else {
        toast.error(res?.erro || res?.mensagem || "Erro ao atualizar forma de pagamento.");
      }
    } catch (error) {
      tratarErroServidor(error);
    } finally {
      setSubmitting(false);
    }
  };

  // REALIZA / SIMULA O PAGAMENTO DA PARCELA
  const handlePagarParcela = async (idPagamento) => {
    setSubmitting(true);
    try {
      const res = await pagarParcelaCliente(idPagamento);
      if (res && res.sucesso) {
        toast.success("Pagamento confirmado com sucesso!");
        fecharModalGenerico("modalDetalhesPagamento");
        carregarFinanceiro();
      } else {
        toast.error(res?.erro || res?.mensagem || "Erro ao processar transação.");
      }
    } catch (error) {
      tratarErroServidor(error);
    } finally {
      setSubmitting(false);
    }
  };

  const abrirDetalhes = (pagamento) => {
    setPagamentoDetalhado(pagamento);
  };

  function fecharModalGenerico(idModal) {
    if (typeof window !== "undefined" && window.bootstrap) {
      const modalElement = document.getElementById(idModal);
      if (modalElement) {
        const instance =
          window.bootstrap.Modal.getInstance(modalElement) ||
          new window.bootstrap.Modal(modalElement);
        instance.hide();
      }
    }
  }

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
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(valor) || 0);

  const formatarData = (data) => {
    if (!data) return "—";
    const apenasData = String(data).substring(0, 10);
    const [ano, mes, dia] = apenasData.split("-");
    if (!ano || !mes || !dia) return "—";
    return `${dia}/${mes}/${ano}`;
  };

  const obterStatus = (status) => (status ? status.toUpperCase() : "PENDENTE");

  if (loading && pagamentos.length === 0 && !requerSetup) {
    return (
      <div className="text-center py-5 text-secondary style={{ marginTop: '100px' }}">
        <div className="spinner-border text-warning mb-3" role="status"></div>
        <p className="m-0 small">Carregando seus dados financeiros...</p>
      </div>
    );
  }

  return (
    <>
      <section className={styles.page}>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

        <div className={styles.container}>
          
          {/* TOPBAR */}
          <div className={styles.topbar}>
            <h1 className={styles.userName}>
            Painel <span className={styles.highlight}>Financeiro</span>
            </h1>
          </div>

          {/* FLUXO 1: CLIENTE PRECISA FAZER O SETUP DO PARCELAMENTO */}
          {requerSetup ? (
            <div className={`${styles.cardStandard} p-5 text-dark`}>
              <div className="row align-items-center">
                <div className="col-md-7">
                  <span className={styles.heroEyebrow}>ORÇAMENTO APROVADO!</span>
                  <h3 className="fw-bold mb-3">Defina as condições do seu pagamento</h3>
                  <p className="text-muted mb-4">
                    Seu projeto foi aprovado no valor de <strong>{formatarMoeda(dadosOrcamento?.valor_total)}</strong>. 
                    Escolha abaixo em quantas parcelas deseja dividir e a modalidade padrão de cobrança para gerarmos seu carnê.
                  </p>

                  <form onSubmit={handleExecutarSetup} className="row g-3">
                  
                  <div className="col-sm-6">
                    <label className="form-label small fw-semibold text-secondary">Parcelar em:</label>
                    <select 
                      className="form-select" 
                      value={setupParcelas} 
                      onChange={(e) => setSetupParcelas(e.target.value)}
                      style={{ borderRadius: "12px", padding: "10px" }}
                    >
                      {/* Expandimos o array para conter prazos maiores ideais para investimentos altos */}
                      {[1, 2, 3, 4, 5, 6, 10, 12, 24, 36, 48, 60, 72].map(n => (
                        <option key={n} value={n}>
                          {n}x de {formatarMoeda(dadosOrcamento?.valor_total / n)}
                        </option>
                      ))}
                    </select>
                  </div>

                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold text-secondary">Forma de Pagamento:</label>
                      <select 
                        className="form-select" 
                        value={setupMetodo} 
                        onChange={(e) => setSetupMetodo(e.target.value)}
                        style={{ borderRadius: "12px", padding: "10px" }}
                      >
                        <option value="BOLETO">Boleto Bancário</option>
                        <option value="PIX">Pix (Instantâneo)</option>
                        <option value="CARTAO">Cartão de Crédito</option>
                      </select>
                    </div>

                    <div className="col-12 pt-3">
                      <button 
                        type="submit" 
                        className="btn btn-dark fw-bold px-5" 
                        style={{ borderRadius: "12px", height: "46px", backgroundColor: "#221f20" }}
                        disabled={submitting}
                      >
                        {submitting ? "Gerando parcelas..." : "Confirmar e Gerar Faturas"}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="col-md-5 text-center d-none d-md-block">
                  <div className="p-4 bg-light rounded-4 border border-warning-subtle mx-lg-5">
                    <i className="bi bi-wallet2 text-warning display-3 mb-3 d-block"></i>
                    <span className="text-secondary small d-block">VALOR TOTAL DO INVESTIMENTO</span>
                    <h2 className="fw-bold text-dark m-0">{formatarMoeda(dadosOrcamento?.valor_total)}</h2>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* FLUXO 2: PAINEL FINANCEIRO PADRÃO COM CARDS E TABELA */
            <>
              {/* CARDS KPI */}
              <div className={`${styles.topCardsGrid} mb-4`}>
                {/* TOTAL PAGO */}
                <div className={styles.cardPremium}>
                  <div className={styles.premiumGlow} />
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className={styles.iconBoxPremium}>
                      <i className="bi bi-check-circle-fill" />
                    </div>
                    <span className={`${styles.badgeIndicator} ${styles.badgePremium}`}>Pago</span>
                  </div>
                  <p className={styles.labelPremium}>TOTAL QUITADO</p>
                  <h2 className={styles.valuePremium}>{formatarMoeda(resumo.totalRecebido)}</h2>
                  <p className={styles.cardDescriptionPremium}>{resumo.qtdRecebidos} faturas pagas</p>
                </div>

                {/* A PAGAR (PENDENTE) */}
                <div className={styles.cardStandard}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className={styles.iconBoxStandard} style={{ color: "#2563eb", background: "rgba(37,99,235,0.08)" }}>
                      <i className="bi bi-clock-history" />
                    </div>
                    <span className={`${styles.badgeIndicator} ${styles.badgeInfo}`}>Em aberto</span>
                  </div>
                  <p className={styles.labelStandard}>A Pagar (Agendado)</p>
                  <h2 className={styles.valueStandard}>{formatarMoeda(resumo.totalPendente)}</h2>
                  <p className={styles.cardDescription}>{resumo.qtdPendentes} parcelas pendentes</p>
                </div>

                {/* FATURAS ATRASADAS */}
                <div className={`${styles.cardStandard} ${resumo.totalAtrasado > 0 ? styles.cardAlertHighlight : ""}`}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className={styles.iconBoxStandard} style={{ color: "#dc2626", background: "rgba(220,38,38,0.08)" }}>
                      <i className="bi bi-exclamation-triangle-fill" />
                    </div>
                    <span className={`${styles.badgeIndicator} ${resumo.totalAtrasado > 0 ? styles.badgeAlert : ""}`}>
                      {resumo.totalAtrasado > 0 ? "Vencido" : "Em dia"}
                    </span>
                  </div>
                  <p className={styles.labelStandard}>Total em Atraso</p>
                  <h2 className={styles.valueStandard}>{formatarMoeda(resumo.totalAtrasado)}</h2>
                  <p className={styles.cardDescription}>{resumo.qtdAtrasados} parcelas vencidas</p>
                </div>

                {/* GERENCIAR MÉTODOS DE COBRANÇA */}
                <div className={styles.cardStandard} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className={styles.iconBoxStandard} style={{ color: "#7c3aed", background: "rgba(124,58,237,0.08)" }}>
                      <i className="bi bi-credit-card-2-front" />
                    </div>
                    <span className="small text-muted fw-bold">Configuração</span>
                  </div>
                  <div>
                    <p className={styles.labelStandard} style={{ margin: 0 }}>Meio de Pagamento</p>
                    <h5 className="fw-bold mb-1 mt-1 text-dark">Alterar forma padrão</h5>
                  </div>
                  <button 
                    data-bs-toggle="modal" 
                    data-bs-target="#modalMetodoPagamento"
                    className="btn btn-sm btn-outline-dark w-100 fw-bold mt-2" 
                    style={{ borderRadius: "10px", fontSize: '0.8rem' }}
                  >
                    <i className="bi bi-gear me-1"></i> Configurar Carteira
                  </button>
                </div>
              </div>

              {/* BARRA DE FILTROS E HISTÓRICO */}
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
                        {status === "TODOS" ? "TODAS AS PARCELAS" : (MAPA_STATUS[status] || status).toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <span className="text-muted small fw-medium">
                    {resumo.totalRegistros} parcela(s) no total
                  </span>
                </div>

                {/* CONTEÚDO DA TABELA */}
                {pagamentos.length === 0 ? (
                  <div className="text-center py-5 text-secondary">
                    <div className="bi bi-wallet2 fs-2 text-muted mb-2 d-block"></div>
                    <p className="m-0 small">Nenhuma fatura encontrada com este status.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className={`table align-middle m-0 text-dark ${styles.customTable}`}>
                      <thead>
                        <tr className="text-secondary small fw-bold">
                          <th className="px-4 py-3">Código</th>
                          <th className="py-3">Tipo de Fatura</th>
                          <th className="py-3">Nº Parcela</th>
                          <th className="py-3">Vencimento</th>
                          <th className="py-3">Forma</th>
                          <th className="py-3">Valor</th>
                          <th className="py-3">Situação</th>
                          <th className="px-4 py-3 text-end">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagamentos.map((pag) => {
                          const status = obterStatus(pag.status_pagamento);
                          return (
                            <tr key={pag.id_pagamento} className={styles.tableRow}>
                              <td className="px-4 py-3 fw-bold text-secondary">#{pag.id_pagamento}</td>
                              <td className="py-3">
                                <span className={styles.tipoBadge}>
                                  {MAPA_TIPOS[pag.tipo_pagamento] || pag.tipo_pagamento}
                                </span>
                              </td>
                              <td className="py-3 small text-dark fw-semibold">
                                {pag.numero_parcela && pag.quantidade_parcelas
                                  ? `${pag.numero_parcela}ª de ${pag.quantidade_parcelas}`
                                  : "—"}
                              </td>
                              <td className="py-3 small text-muted">{formatarData(pag.data_vencimento)}</td>
                              <td className="py-3 small text-muted fw-semibold">
                                {MAPA_FORMAS[pag.forma_pagamento] || pag.forma_pagamento || "—"}
                              </td>
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
                                  <i className="bi bi-eye-fill me-1"></i> Visualizar
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* PAGINAÇÃO */}
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
            </>
          )}
        </div>
      </section>

      {/* MODAL 1: DETALHES DA PARCELA / PAGAMENTO */}
      <div className="modal fade" id="modalDetalhesPagamento" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "580px" }}>
          <div className={`modal-content ${styles.modalContenedorBase}`}>
            <div className="p-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: "#111827" }}>
              <h5 className="modal-title fw-bold text-white m-0">
                Fatura <span style={{ color: "#febd17" }}>#{pagamentoDetalhado?.id_pagamento}</span>
              </h5>
              <button type="button" className={styles.closeModalButton} data-bs-dismiss="modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body p-4 bg-light text-dark">
              <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <span className="text-secondary small d-block mb-1">Categoria de Cobrança</span>
                    <strong className="text-dark text-uppercase d-block">
                      {MAPA_TIPOS[pagamentoDetalhado?.tipo_pagamento] || pagamentoDetalhado?.tipo_pagamento}
                    </strong>
                  </div>
                  <span className={`${styles.badge} ${styles[obterStatus(pagamentoDetalhado?.status_pagamento)] || styles.PENDENTE}`}>
                    {MAPA_STATUS[obterStatus(pagamentoDetalhado?.status_pagamento)] || pagamentoDetalhado?.status_pagamento}
                  </span>
                </div>

                <hr className="my-3 text-muted opacity-25" />

                <div className="row g-3">
                  <div className="col-6">
                    <span className="text-secondary small d-block mb-1">Valor da Parcela</span>
                    <h4 className="text-dark fw-bold m-0">{formatarMoeda(pagamentoDetalhado?.valor)}</h4>
                  </div>
                  <div className="col-6">
                    <span className="text-secondary small d-block mb-1">Nº Parcela</span>
                    <strong className="text-dark">
                      {pagamentoDetalhado?.numero_parcela}/{pagamentoDetalhado?.quantidade_parcelas}
                    </strong>
                  </div>
                  <div className="col-6">
                    <span className="text-secondary small d-block mb-1">Data de Vencimento</span>
                    <strong className="text-dark">{formatarData(pagamentoDetalhado?.data_vencimento)}</strong>
                  </div>
                  <div className="col-6">
                    <span className="text-secondary small d-block mb-1">Meio Escolhido</span>
                    <strong className="text-dark">{MAPA_FORMAS[pagamentoDetalhado?.forma_pagamento] || "—"}</strong>
                  </div>
                  {pagamentoDetalhado?.status_pagamento === "PAGO" && (
                    <div className="col-12">
                      <div className="p-3 bg-success-subtle rounded-3 text-success small fw-semibold">
                        <i className="bi bi-patch-check-fill me-2"></i>
                        Pago em {formatarData(pagamentoDetalhado?.data_pagamento)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SE A PARCELA ESTIVER EM ABERTO/ATRASADA, EXIBE O BOTÃO DE EFETUAR PAGAMENTO */}
              {obterStatus(pagamentoDetalhado?.status_pagamento) !== "PAGO" && (
                <div className="bg-white p-4 rounded-4 shadow-sm border border-warning-subtle text-center">
                  <h6 className="fw-bold mb-3">Deseja liquidar esta parcela agora?</h6>
                  <button
                    type="button"
                    onClick={() => handlePagarParcela(pagamentoDetalhado.id_pagamento)}
                    className="btn btn-warning w-100 fw-bold"
                    style={{ borderRadius: "12px", height: "44px" }}
                    disabled={submitting}
                  >
                    {submitting ? "Processando transação..." : `Pagar com ${MAPA_FORMAS[pagamentoDetalhado?.forma_pagamento]}`}
                  </button>
                </div>
              )}

              <div className="d-flex justify-content-end gap-1 mt-4">
                <button type="button" className={styles.btnSecondaryStyle} data-bs-dismiss="modal">
                  Voltar ao Painel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL 2: CONFIGURAÇÃO GLOBAL DE MEIO DE PAGAMENTO */}
      <div className="modal fade" id="modalMetodoPagamento" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "450px" }}>
          <div className={`modal-content ${styles.modalContenedorBase}`}>
            <div className="p-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: "#111827" }}>
              <h5 className="modal-title fw-bold text-white m-0">
                Meio de Cobrança
              </h5>
              <button type="button" className={styles.closeModalButton} data-bs-dismiss="modal">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="modal-body p-4 bg-light text-dark">
              <div className="bg-white p-4 rounded-4 shadow-sm mb-3">
                <label className="form-label fw-semibold small text-secondary">Alterar forma de pagamento futura:</label>
                <select 
                  className="form-select"
                  value={metodoGlobal}
                  onChange={(e) => setMetodoGlobal(e.target.value)}
                  style={{ borderRadius: "10px" }}
                >
                  <option value="BOLETO">Boleto</option>
                  <option value="PIX">Pix</option>
                  <option value="CARTAO">Cartão de Crédito</option>
                </select>
                <p className="text-muted small mb-0 mt-3">
                  ⚠️ <strong>Aviso:</strong> Esta alteração só se aplica a parcelas que ainda estão <strong>Pendentes</strong> ou <strong>Atrasadas</strong>. Faturas já pagas não sofrem alteração.
                </p>
              </div>

              <div className="d-flex justify-content-end gap-2 pt-2">
                <button type="button" className={styles.btnSecondaryStyle} data-bs-dismiss="modal">
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAlterarFormaGlobal}
                  className="btn btn-dark fw-bold px-4"
                  style={{ borderRadius: "12px", backgroundColor: "#221f20" }}
                  disabled={submitting}
                >
                  {submitting ? "Salvando..." : "Salvar Alteração"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}