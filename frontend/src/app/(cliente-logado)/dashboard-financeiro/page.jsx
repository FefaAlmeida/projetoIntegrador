"use client";

import { useEffect, useState } from "react";
import { getDashboardFinanceiro, pagarParcela } from "@/api";
import { toast } from "sonner";
import "./financeiro.css";

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

function criarFinanceiroVazio() {
  return {
    idPagamento: null,
    parcelasPagas: 0,
    totalParcelas: 0,
    parcelasRestantes: 0,
    valorPago: 0,
    valorRestante: 0,
    statusPagamento: "Sem pagamentos",
    formaPagamento: "-",
    ultimoPagamento: "-",
    proximoVencimento: "-",
    valorParcela: 0,
    historico: [],
  };
}

function montarHistoricoFinanceiro(historico) {
  if (!historico || historico.length === 0) {
    return [];
  }

  return historico.map((item) => {
    const pago = item.status_pagamento === "PAGO";

    return {
      icon: pago ? "bi-check-circle" : "bi-cash-stack",
      color: pago ? "#48b96c" : "#febd17",
      text: pago
        ? `Pagamento da parcela #${String(item.numero_parcela || "").padStart(2, "0")} confirmado`
        : `Parcela #${String(item.numero_parcela || "").padStart(2, "0")} ${item.status_pagamento?.toLowerCase()}`,
      date: pago
        ? `${item.data_pagamento || "Data não informada"}`
        : `Vence em ${item.data_vencimento || "data não informada"}`,
    };
  });
}

export default function FinanceiroPage() {
  const [financeiro, setFinanceiro] = useState(() => criarFinanceiroVazio());
  const [pagando, setPagando] = useState(false);

  async function carregarFinanceiro() {
    try {
      const response = await getDashboardFinanceiro();

      if (!response?.sucesso) return;

      const dados = response.dados;

      setFinanceiro({
        idPagamento: dados.idPagamento || null,
        parcelasPagas: dados.parcelasPagas || 0,
        totalParcelas: dados.totalParcelas || 0,
        parcelasRestantes: dados.parcelasRestantes || 0,
        valorPago: dados.valorPago || 0,
        valorRestante: dados.valorRestante || 0,
        statusPagamento: dados.statusPagamento || "Sem pagamentos",
        formaPagamento: dados.formaPagamento || "-",
        ultimoPagamento: dados.ultimoPagamento || "-",
        proximoVencimento: dados.proximoVencimento || "-",
        valorParcela: dados.valorParcela || 0,
        historico: montarHistoricoFinanceiro(dados.historico),
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    carregarFinanceiro();
  }, []);

  async function handlePagarAgora() {
    if (!financeiro.idPagamento) {
      toast.error("Nenhuma parcela pendente para pagar.");
      return;
    }

    setPagando(true);

    try {
      const response = await pagarParcela(financeiro.idPagamento);

      if (response?.sucesso) {
        toast.success("Pagamento realizado com sucesso!");
        await carregarFinanceiro();
      } else {
        toast.error(response?.erro || "Erro ao realizar pagamento.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão com o servidor.");
    } finally {
      setPagando(false);
    }
  }

  return (
    <div className="financeiro-page">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />

      {/* CARDS SUPERIORES */}
      <div className="financeiro-top-cards">
        <div className="financeiro-card financeiro-card-border">
          <div className="financeiro-icon-box">
            <i className="bi bi-wallet2 financeiro-icon" />
          </div>

          <p className="financeiro-label">Parcelas</p>
          <h2 className="financeiro-value">
            {financeiro.parcelasPagas} / {financeiro.totalParcelas}
          </h2>
          <p className="financeiro-subtitle">
            {financeiro.parcelasRestantes} restantes
          </p>
          <p className="financeiro-link">Ver detalhes →</p>
        </div>

        <div className="financeiro-card financeiro-card-border">
          <div className="financeiro-icon-box">
            <i className="bi bi-cash-stack financeiro-icon" />
          </div>

          <p className="financeiro-label">Valores</p>
          <h2 className="financeiro-value">
            {formatarMoeda(financeiro.valorPago + financeiro.valorRestante)}
          </h2>
          <p className="financeiro-subtitle">
            Pago: {formatarMoeda(financeiro.valorPago)}
          </p>
          <p className="financeiro-link">
            Restante: {formatarMoeda(financeiro.valorRestante)}
          </p>
        </div>

        <div className="financeiro-card financeiro-card-border">
          <div className="financeiro-icon-box">
            <i className="bi bi-exclamation-circle financeiro-icon" />
          </div>

          <p className="financeiro-label">Status pagamento</p>

          <div className="financeiro-status">
            <h2 className="financeiro-value">{financeiro.statusPagamento}</h2>
            <span className="financeiro-badge">OK</span>
          </div>

          <p className="financeiro-subtitle">
            Nenhum atraso registrado
          </p>

          <p className="financeiro-link">Histórico →</p>
        </div>

        <div className="financeiro-card">
          <div className="financeiro-icon-box">
            <i className="bi bi-credit-card-2-front financeiro-icon" />
          </div>

          <p className="financeiro-label">Pagamento</p>
          <h2 className="financeiro-value">{financeiro.formaPagamento}</h2>
          <p className="financeiro-subtitle">
            Último: {financeiro.ultimoPagamento}
          </p>
          <p className="financeiro-link">
            Vence em: {financeiro.proximoVencimento}
          </p>
        </div>
      </div>

      {/* GRID PRINCIPAL */}
      <div className="financeiro-grid">

        {/* ESQUERDA */}
        <div>
          <div className="financeiro-banner">
            <h2 className="financeiro-banner-title">
              Pagamentos em dia!
            </h2>

            <p className="financeiro-banner-text">
              Sua compra das placas está regular.
              <br />
              Continue acompanhando as próximas parcelas.
            </p>

            <button className="financeiro-btn-primary">
              Ver contrato
            </button>
          </div>

          <div className="financeiro-panel financeiro-history">
            <h3 className="financeiro-panel-title">
              Histórico financeiro
            </h3>

            {financeiro.historico.length === 0 ? (
              <p className="financeiro-history-date">
                Nenhum histórico financeiro encontrado.
              </p>
            ) : (
              financeiro.historico.map((item, i) => (
                <div
                  key={i}
                  className={`financeiro-history-item ${
                    i !== financeiro.historico.length - 1 ? "financeiro-history-border" : ""
                  }`}
                >
                  <div className="financeiro-history-content">
                    <div className="financeiro-history-icon-box">
                      <i
                        className={`bi ${item.icon} financeiro-history-icon`}
                        style={{ color: item.color }}
                      />
                    </div>

                    <div>
                      <p className="financeiro-history-text">
                        {item.text}
                      </p>

                      <p className="financeiro-history-date">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <i className="bi bi-chevron-right financeiro-chevron" />
                </div>
              ))
            )}

            <p className="financeiro-link">
              Ver histórico completo →
            </p>
          </div>
        </div>

        {/* DIREITA */}
        <div>
          <div className="financeiro-panel financeiro-invoice">
            <div className="financeiro-header-row">
              <h3 className="financeiro-panel-title">
                Próxima parcela
              </h3>

              <p className="financeiro-small-link">
                Ver todas →
              </p>
            </div>

            <div className="financeiro-next-payment">
              <div>
                <p className="financeiro-next-label">
                  Vencimento
                </p>

                <h2 className="financeiro-next-title financeiro-next-title-spacing">
                  {financeiro.proximoVencimento}
                </h2>

                <p className="financeiro-next-label">
                  Valor da parcela
                </p>

                <h2 className="financeiro-next-title financeiro-next-title-top">
                  {formatarMoeda(financeiro.valorParcela)}
                </h2>
              </div>

              <div>
                <button
                  className="financeiro-btn-pay"
                  onClick={handlePagarAgora}
                  disabled={pagando || !financeiro.idPagamento}
                >
                  {pagando ? "Processando..." : "Pagar agora"}
                </button>

                <p className="financeiro-boleto">
                  Ver boleto
                </p>
              </div>
            </div>
          </div>

          <div className="financeiro-panel financeiro-access">
            <h3 className="financeiro-panel-title">
              Acesso rápido
            </h3>

            <div className="financeiro-access-grid">
              {[
                {
                  icon: "bi-file-earmark-text",
                  text: "Contrato",
                },
                {
                  icon: "bi-credit-card",
                  text: "Pagamento",
                },
                {
                  icon: "bi-receipt",
                  text: "Parcelas",
                },
                {
                  icon: "bi-clock-history",
                  text: "Histórico",
                },
                {
                  icon: "bi-gear",
                  text: "Configurações",
                },
                {
                  icon: "bi-shield-lock",
                  text: "Segurança",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="financeiro-access-card"
                >
                  <i
                    className={`bi ${item.icon} financeiro-access-icon`}
                  />

                  <p className="financeiro-access-text">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}