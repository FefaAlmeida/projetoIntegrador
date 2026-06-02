"use client";

import "./financeiro.css";

export default function FinanceiroPage() {
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
          <h2 className="financeiro-value">8 / 12</h2>
          <p className="financeiro-subtitle">4 restantes</p>
          <p className="financeiro-link">Ver detalhes →</p>
        </div>

        <div className="financeiro-card financeiro-card-border">
          <div className="financeiro-icon-box">
            <i className="bi bi-cash-stack financeiro-icon" />
          </div>

          <p className="financeiro-label">Valores</p>
          <h2 className="financeiro-value">R$ 4.800</h2>
          <p className="financeiro-subtitle">Pago: R$ 3.200</p>
          <p className="financeiro-link">Restante: R$ 1.600</p>
        </div>

        <div className="financeiro-card financeiro-card-border">
          <div className="financeiro-icon-box">
            <i className="bi bi-exclamation-circle financeiro-icon" />
          </div>

          <p className="financeiro-label">Status pagamento</p>

          <div className="financeiro-status">
            <h2 className="financeiro-value">Em dia</h2>
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
          <h2 className="financeiro-value">PIX</h2>
          <p className="financeiro-subtitle">
            Último: 02/06/2026
          </p>
          <p className="financeiro-link">
            Vence em: 15/06/2026
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

            {[
              {
                icon: "bi-check-circle",
                color: "#48b96c",
                text: "Pagamento da parcela #08 confirmado",
                date: "02/06/2026 às 10:32",
              },
              {
                icon: "bi-cash-stack",
                color: "#febd17",
                text: "Nova parcela gerada",
                date: "01/06/2026 às 09:15",
              },
              {
                icon: "bi-credit-card",
                color: "#666",
                text: "Pagamento realizado via PIX",
                date: "15/05/2026 às 14:22",
              },
              {
                icon: "bi-file-earmark-text",
                color: "#7b61ff",
                text: "Contrato atualizado",
                date: "01/05/2026 às 08:00",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`financeiro-history-item ${
                  i !== 3 ? "financeiro-history-border" : ""
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
            ))}

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
                  15/06/2026
                </h2>

                <p className="financeiro-next-label">
                  Valor da parcela
                </p>

                <h2 className="financeiro-next-title financeiro-next-title-top">
                  R$ 400,00
                </h2>
              </div>

              <div>
                <button className="financeiro-btn-pay">
                  Pagar agora
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