"use client";
import { useEffect, useState } from "react";
import { 
  getPerfil, 
  getTodosChamadosSistema, 
  getEmpresas, 
  getFinanceiroAdmin,
  getFaleConosco,
  getTodasInstalacoes,
  getTecnicos
} from "@/api";
import styles from "./page.module.css";

export default function PageAdm() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [ultimaAtualizacao, setUltimaAtualizacao] = useState("");

  // Estados dos contadores principais
  const [totalClientes, setTotalClientes] = useState(0);
  const [chamadosCriticos, setChamadosCriticos] = useState(0);
  const [faturamentoMensal, setFaturamentoMensal] = useState(0);

  // Mini cards do topo
  const [totalTecnicos, setTotalTecnicos] = useState(0);
  const [instalacoesPendentes, setInstalacoesPendentes] = useState(0);

  // Estado para o feed do Fale Conosco (Substituindo a eficiência)
  const [mensagensFaleConosco, setMensagensFaleConosco] = useState([]);

  useEffect(() => {
    async function carregarDadosGerenciais() {
      try {
        // 1. Chamados abertos
        const resChamados = await getTodosChamadosSistema(1, 100);
        if (resChamados?.sucesso || resChamados?.chamados) {
          const lista = resChamados.chamados || resChamados.dados || [];
          const abertos = lista.filter(c => c.status === "ABERTO" || c.status_chamado === "ABERTO").length;
          setChamadosCriticos(abertos);
        }

        // 2. Total Real de Empresas Cadastradas
        const resEmpresas = await getEmpresas(1, 1000);
        if (resEmpresas?.total) {
          setTotalClientes(resEmpresas.total);
        } else if (resEmpresas?.empresas) {
          setTotalClientes(resEmpresas.empresas.length);
        } else if (resEmpresas?.dados) {
          setTotalClientes(resEmpresas.dados.length);
        } else if (Array.isArray(resEmpresas)) {
          setTotalClientes(resEmpresas.length);
        }

        // 3. Faturamento com parcelas pagas
        const resFinanceiro = await getFinanceiroAdmin(1, 100, "PAGO");
        if (resFinanceiro?.parcelas || resFinanceiro?.dados) {
          const listaPac = resFinanceiro.parcelas || resFinanceiro.dados || [];
          const totalPago = listaPac.reduce((acc, curr) => acc + (Number(curr.valor) || 0), 0);
          setFaturamentoMensal(totalPago);
        }

        // 4. Instalações Pendentes
        const resInstalacoes = await getTodasInstalacoes(1, 1000);
        if (resInstalacoes?.instalacoes || resInstalacoes?.dados) {
          const listaInst = resInstalacoes.instalacoes || resInstalacoes.dados || [];
          const pendentes = listaInst.filter(inst => {
            const statusStr = String(inst.status || inst.status_instalacao || "").toUpperCase();
            return statusStr === "PENDENTE" || statusStr === "EM_ANDAMENTO";
          }).length;
          setInstalacoesPendentes(pendentes);
        } else if (Array.isArray(resInstalacoes)) {
          const pendentes = resInstalacoes.filter(inst => {
            const statusStr = String(inst.status || inst.status_instalacao || "").toUpperCase();
            return statusStr === "PENDENTE" || statusStr === "EM_ANDAMENTO";
          }).length;
          setInstalacoesPendentes(pendentes);
        }

        // 5. Buscar quantidade de técnicos
        const resTecnicos = await getTecnicos(1, 1000);
        if (resTecnicos?.total) {
          setTotalTecnicos(resTecnicos.total);
        } else if (resTecnicos?.tecnicos) {
          setTotalTecnicos(resTecnicos.tecnicos.length);
        } else if (resTecnicos?.dados) {
          setTotalTecnicos(resTecnicos.dados.length);
        } else if (Array.isArray(resTecnicos)) {
          setTotalTecnicos(resTecnicos.length);
        }

        // 6. Mensagens do Fale Conosco (Alimentando o quadrado lateral)
        const resFaleConosco = await getFaleConosco(1, 5);
        if (resFaleConosco?.mensagens || resFaleConosco?.dados) {
          setMensagensFaleConosco(resFaleConosco.mensagens || resFaleConosco.dados || []);
        } else if (Array.isArray(resFaleConosco)) {
          setMensagensFaleConosco(resFaleConosco.slice(0, 5));
        }

        setUltimaAtualizacao(
          new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        );
      } catch (error) {
        console.error("Erro ao processar as métricas do painel adm:", error);
      }
    }

    async function iniciarPerfil() {
      try {
        const resPerfil = await getPerfil();
        if (resPerfil?.sucesso || resPerfil?.usuario) {
          setUsuario(resPerfil.dados || resPerfil.usuario);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setCarregando(false);
      }
    }

    iniciarPerfil();
    carregarDadosGerenciais();

    const intervalo = setInterval(() => {
      carregarDadosGerenciais();
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  if (carregando) {
    return (
      <div className={styles.loadingContainer}>
        <div className="spinner-border text-warning" role="status" />
      </div>
    );
  }

  const existemChamados = chamadosCriticos > 0;

  const metricasGerenciais = [
    {
      icon: "bi-people-fill",
      title: "Clientes Ativos",
      text: "Total de empresas cadastradas na plataforma.",
      value: `${totalClientes} empresas`,
    },
    {
      icon: existemChamados ? "bi-exclamation-triangle-fill" : "bi-shield-check",
      title: "Suporte Técnico",
      text: existemChamados 
        ? "Existem solicitações de manutenção aguardando retorno." 
        : "Nenhuma pendência crítica ou chamado aberto no momento.",
      value: existemChamados ? `${chamadosCriticos} Aberto(s)` : "Fila Zerada",
      isAlert: existemChamados,
    },
    {
      icon: "bi-cash-coin",
      title: "Receita Consolidada",
      text: "Faturamento do somatório de parcelas liquidadas no sistema.",
      value: `R$ ${faturamentoMensal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
    },
  ];

  return (
    <section className={styles.page}>
      <div className={`mx-auto ${styles.container}`}>
        
        {/* BARRA SUPERIOR */}
        <div className={`d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 ${styles.topbar}`}>
          <div className="d-flex align-items-baseline gap-2">
            <span className={styles.welcomeText}>Painel do Administrador:</span>
            <span className={styles.userName}>{usuario?.nome || "Gestor"}</span>
          </div>

          <button className={styles.dashboardButton}>
            <a href="/empresas">Gerenciar Clientes</a>
          </button>
        </div>

        {/* CARD HERO PRINCIPAL */}
        <div className={styles.heroCard}>
          <div className={styles.glow} />

          <div className={`d-flex flex-column flex-xl-row justify-content-between align-items-stretch gap-5 ${styles.heroContent}`}>
            <div className="d-flex flex-column justify-content-between w-100">
              <div>
                <p className={styles.heroEyebrow}>SISTEMA DE GESTÃO</p>
                <h2 className={styles.heroTitle}>
                  Monitoramento
                  <br />
                  da Rede Luminar.
                </h2>
                <p className={styles.heroText}>
                  Controle a eficiência operacional do sistema, supervisione o controle financeiro e coordene o despacho de técnicos de manutenção.
                </p>
              </div>

              {/* MINI CARDS DO TOPO: Técnicos & Instalações Pendentes */}
              <div className="d-flex flex-wrap gap-3 mt-4">
                <div className={styles.miniCard}>
                  <p className={styles.miniLabel}>Técnicos</p>
                  <h3 className={styles.miniValue}>{totalTecnicos} <span className={styles.miniUnit}></span></h3>
                </div>

                <div className={styles.miniCard}>
                  <p className={styles.miniLabel}>Instalações Pendentes</p>
                  <h3 className={styles.miniValue} style={{ color: instalacoesPendentes > 0 ? "#ffc107" : "#fff" }}>
                    {instalacoesPendentes} <span className={styles.miniUnit}></span>
                  </h3>
                </div>
              </div>
            </div>

            {/* QUADRADO DA DIREITA: Mensagens Recentes do Fale Conosco */}
            <div className={styles.performanceCard} style={{ minWidth: "360px" }}>
              <div className="mb-2">
                <p className={styles.performanceLabel}>Mensagens Recentes (Fale Conosco)</p>
              </div>

              <div className="vstack gap-2 overflow-auto" style={{ maxHeight: "180px", paddingRight: "5px" }}>
                {mensagensFaleConosco.length === 0 ? (
                  <p className={styles.heroText} style={{ fontSize: "0.85rem", opacity: 0.7 }}>
                    Nenhuma mensagem recebida recentemente.
                  </p>
                ) : (
                  mensagensFaleConosco.map((msg, index) => (
                    <div 
                      key={msg.id || index} 
                      style={{ 
                        borderBottom: "1px solid #222", 
                        paddingBottom: "8px",
                        marginBottom: "4px" 
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <strong style={{ color: "#fff", fontSize: "0.85rem" }}>
                          {msg.nome || msg.usuario?.nome || "Usuário"}
                        </strong>
                        <span className="badge bg-secondary" style={{ fontSize: "0.7rem" }}>
                          {msg.status || "Pendente"}
                        </span>
                      </div>
                      <p style={{ color: "#b0b0b0", fontSize: "0.8rem", margin: "3px 0 0 0", lineBreak: "anywhere" }}>
                        {msg.mensagem || msg.texto || "Sem conteúdo na mensagem."}
                      </p>
                    </div>
                  ))
                )}
              </div>
              
              {ultimaAtualizacao && (
                <div className="mt-3 pt-2" style={{ borderTop: "1px solid #222", fontSize: "0.75rem", color: "#666" }}>
                  Sincronizado às {ultimaAtualizacao}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* GRID DE TRÊS CARDS GERENCIAIS INFERIORES */}
        <div className={styles.infoGrid}>
          {metricasGerenciais.map((item) => (
            <div className={styles.infoCard} key={item.title}>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className={styles.infoIconBox}>
                  <i className={`bi ${item.icon} ${styles.infoIcon}`} />
                </div>
                <span className={`${styles.badgeIndicator} ${item.isAlert ? styles.badgeAlert : ''}`}>
                  {item.isAlert ? 'Atenção' : 'Estável'}
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