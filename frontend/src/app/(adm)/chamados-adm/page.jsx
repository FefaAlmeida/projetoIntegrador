"use client";

import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import styles from "./page.module.css";
import { 
  getTodosChamadosSistema, 
  responderChamadoAdmin, 
  getChamadoPorId, 
  getEmpresa,
  getTecnicos // Importado para buscar os técnicos cadastrados
} from "../../../api";

export default function AdminChamadosPage() {

  // DICIONÁRIOS DE TRADUÇÃO VISUAL
  const MAPA_CATEGORIAS = {
    MANUTENCAO: "Manutenção",
    LIMPEZA: "Limpeza",
    EMERGENCIA: "Emergência",
    OUTROS: "Outros Assuntos"
  };

  const MAPA_STATUS = {
    ABERTO: "Aberto",
    EM_ANDAMENTO: "Em Andamento",
    FINALIZADO: "Finalizado",
    CANCELADO: "Cancelado"
  };

  const MAPA_PRIORIDADES = {
    BAIXA: "Baixa",
    MEDIA: "Média",
    ALTA: "Alta"
  };

  const [chamados, setChamados] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [paginacao, setPaginacao] = useState({});
  const [tecnicos, setTecnicos] = useState([]); // Armazena a lista de técnicos do sistema
  const [filtroStatus, setFiltroStatus] = useState("TODOS");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [chamadoDetalhado, setChamadoDetalhado] = useState(null);
  
  // ESTADO QUE ARMAZENA O NOME REAL DA EMPRESA
  const [nomeEmpresa, setNomeEmpresa] = useState("Carregando...");

  // Estado do Formulário de Resposta do Administrador
  const [formResposta, setFormResposta] = useState({
    status_chamado: "ABERTO",
    prioridade: "MEDIA",
    id_tecnico: "", // Adicionado para gerenciar a vinculação do técnico
    resposta_admin: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
    carregarListaTecnicos();
  }, []);

  useEffect(() => {
    carregarChamadosGlobal();
  }, [paginaAtual]);

  const carregarChamadosGlobal = async () => {
    setLoading(true);
    try {
      const res = await getTodosChamadosSistema(paginaAtual);
      if (res && res.sucesso) {
        setChamados(res.dados || []);
        setPaginacao(res.paginacao || {});
      } else if (Array.isArray(res)) {
        setChamados(res);
      } else {
        setChamados([]);
        toast.error(res?.erro || res?.mensagem || "Erro ao carregar o painel de chamados.");
      }
    } catch (error) {
      console.error("Erro ao carregar chamados no ADM:", error);
      tratarErroServidor(error);
      setChamados([]);
    } finally {
      setLoading(false);
    }
  };

  const carregarListaTecnicos = async () => {
    try {
      // Busca até 100 técnicos para preencher o select sem paginação visual complexa
      const res = await getTecnicos(1, 100);
      if (res && res.sucesso) {
        setTecnicos(res.dados || []);
      } else if (Array.isArray(res)) {
        setTecnicos(res);
      }
    } catch (error) {
      console.error("Erro ao buscar lista de técnicos:", error);
    }
  };

  const handleVisualizarEEditarChamado = async (id) => {
    setLoading(true);
    setNomeEmpresa("Buscando empresa..."); // Reseta o texto enquanto busca
    try {
      const res = await getChamadoPorId(id);
      if (res && res.sucesso) {
        const dados = res.dados;
        setChamadoDetalhado(dados);
        
        // Preenche o formulário com o que já está salvo ou valores padrão
        setFormResposta({
          status_chamado: dados?.status_chamado ? obterStatusTratado(dados.status_chamado) : "ABERTO",
          prioridade: dados?.prioridade ? dados.prioridade.toUpperCase() : "MEDIA",
          id_tecnico: dados?.id_tecnico || "", // Vincula o id do técnico salvo se houver
          resposta_admin: dados?.resposta_admin || ""
        });

        // --- BUSCA DIRETA UTILIZANDO SUA FUNÇÃO getEmpresa DA API ---
        if (dados?.id_empresa) {
          try {
            const resEmpresa = await getEmpresa(dados.id_empresa);
            if (resEmpresa && resEmpresa.sucesso) {
              setNomeEmpresa(resEmpresa.dados.nome_empresa || "Nome não cadastrado");
            } else {
              setNomeEmpresa(`Empresa #${dados.id_empresa}`);
            }
          } catch (err) {
            console.error("Erro ao buscar nome da empresa:", err);
            setNomeEmpresa(`Empresa #${dados.id_empresa}`);
          }
        } else {
          setNomeEmpresa("Não Informada");
        }

      } else {
        toast.error(res?.erro || "Não foi possível carregar os detalhes do chamado.");
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do chamado:", error);
      tratarErroServidor(error);
    } finally {
      setLoading(false);
    }
  };

  function fecharModalDetalhes() {
    if (typeof window !== "undefined" && window.bootstrap) {
      const modalElement = document.getElementById("modalDetalhesChamadoAdmin");
      if (modalElement) {
        const instance = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
        instance.hide();
      }
    }
  }

  const handleSalvarRespostaAdmin = async (e) => {
    e.preventDefault();
    if (!chamadoDetalhado) return;

    const statusAtual = obterStatusTratado(chamadoDetalhado.status_chamado);
    if (statusAtual === "FINALIZADO" || statusAtual === "CANCELADO") {
      return toast.error("Não é possível responder ou alterar chamados já finalizados ou cancelados.");
    }

    if (!formResposta.resposta_admin.trim()) {
      return toast.error("Por favor, insira um parecer ou resposta técnica para o cliente.");
    }

    setSubmitting(true);
    try {
      const response = await responderChamadoAdmin(chamadoDetalhado.id_chamado, formResposta);
      
      if (response && response.sucesso) {
        toast.success(`Chamado #${chamadoDetalhado.id_chamado} atualizado com sucesso!`);
        fecharModalDetalhes();
        carregarChamadosGlobal();
      } else {
        toast.error(response?.erro || response?.mensagem || "Erro ao atualizar chamado.");
      }
    } catch (error) {
      tratarErroServidor(error);
    } finally {
      setSubmitting(false);
    }
  };

  function tratarErroServidor(error) {
    if (error.response && error.response.data) {
      const apiError = error.response.data.erro || error.response.data.mensagem || error.response.data.mensage;
      toast.error(apiError || "Erro de conexão com o servidor.");
    } else {
      toast.error("Erro de conexão com o servidor.");
    }
  }

  const obterStatusTratado = (status) => {
    if (!status) return "ABERTO";
    return status.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
  };

  const totalFilaAbertos = chamados.filter(c => obterStatusTratado(c.status_chamado) === "ABERTO").length;
  const totalEmAtendimento = chamados.filter(c => obterStatusTratado(c.status_chamado) === "EM_ANDAMENTO").length;
  const totalGeralChamados = chamados.length;

  const chamadosFiltrados = chamados.filter(c => {
    const statusAtuais = obterStatusTratado(c.status_chamado);
    if (filtroStatus === "TODOS") return true;
    
    const filtroNormalizado = filtroStatus.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
    return statusAtuais === filtroNormalizado;
  });

  return (
    <>
      <div className={styles.page}>
        <div className={`container ${styles.container}`}>
          
          {/* TOPBAR / HEADER */}
          <div className={`d-flex justify-content-between align-items-center ${styles.topbar}`}>
            <div>
              <span className={styles.welcomeText}>Painel de Controle Técnico</span>
              <h1 className={styles.userName}>
                Gerenciamento de <span className={styles.highlight}>Chamados Técnicos</span>
              </h1>
            </div>
          </div>

          {/* CARDS INDICADORES GLOBAIS */}
          <div className="row g-4 mb-5">
            <div className="col-12 col-md-4">
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: 'rgba(29, 78, 216, 0.08)', color: '#1d4ed8' }}>
                  <i className="bi bi-envelope-fill"></i>
                </div>
                <div>
                  <span className={styles.metricLabel}>Abertos</span>
                  <h3 className={styles.metricValue}>{totalFilaAbertos}</h3>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: 'rgba(180, 83, 9, 0.08)', color: '#b45309' }}>
                  <i className="bi bi-gear-wide-connected"></i>
                </div>
                <div>
                  <span className={styles.metricLabel}>Em Atendimento</span>
                  <h3 className={styles.metricValue}>{totalEmAtendimento}</h3>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className={styles.metricCard}>
                <div className={styles.metricIcon} style={{ background: 'rgba(124, 58, 237, 0.08)', color: '#7c3aed' }}>
                  <i className="bi bi-clipboard-data-fill"></i>
                </div>
                <div>
                  <span className={styles.metricLabel}>Total</span>
                  <h3 className={styles.metricValue}>{totalGeralChamados}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* FILTROS E MESA DE TRABALHO */}
          <div className={`bg-white ${styles.shell}`}>
            <div className={`d-flex flex-wrap justify-content-between align-items-center p-4 border-bottom gap-3 ${styles.filterBar}`}>
              <div className="d-flex gap-2">
                {["TODOS", "ABERTO", "EM_ANDAMENTO", "FINALIZADO", "CANCELADO"].map((status) => (
                  <button
                    key={status}
                    className={`${styles.filterBtn} ${filtroStatus === status ? styles.filterBtnActive : ""}`}
                    onClick={() => setFiltroStatus(status)}
                  >
                    {status === "TODOS" ? "TODOS" : (MAPA_STATUS[status] || status).toUpperCase()}
                  </button>
                ))}
              </div>
              <span className="text-muted small fw-medium">Mostrando {chamadosFiltrados.length} ocorrências encontradas</span>
            </div>

            {/* TABELA ADMINISTRATIVA */}
            {loading && chamados.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                <div className="spinner-border text-primary mb-3" role="status"></div>
                <p className="m-0 small">Buscando requisições dos clientes na base...</p>
              </div>
            ) : chamadosFiltrados.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                <div className="bi bi-folder2-open fs-2 text-muted mb-2 d-block"></div>
                <p className="m-0 small">Nenhuma solicitação aguarda essa classificação.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className={`table align-middle m-0 text-dark ${styles.customTable}`}>
                  <thead>
                    <tr className="text-secondary small fw-bold">
                      <th className="px-4 py-3">ID</th>
                      <th className="py-3">Tipo</th>
                      <th className="py-3">Problema</th>
                      <th className="py-3">Prioridade</th>
                      <th className="py-3">Status</th>
                      <th className="px-4 py-3 text-end"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {chamadosFiltrados.map((chamado) => {
                      const statusTratado = obterStatusTratado(chamado.status_chamado);
                      const prioridadeTratada = chamado.prioridade ? chamado.prioridade.toUpperCase() : "";
                      const isBloqueado = statusTratado === "FINALIZADO" || statusTratado === "CANCELADO";

                      return (
                        <tr key={chamado.id_chamado} className={styles.tableRow}>
                          <td className="px-4 py-3 fw-bold text-secondary">#{chamado.id_chamado}</td>
                          <td className="py-3 small fw-semibold text-uppercase text-muted">
                            {MAPA_CATEGORIAS[chamado.tipo_chamado] || chamado.tipo_chamado}
                          </td>
                          <td className="py-3 fw-semibold text-dark">
                            {chamado.titulo}
                            <span className="d-block text-muted fw-normal small truncate" style={{ maxWidth: '280px' }}>
                              {chamado.descricao}
                            </span>
                          </td>
                          <td className="py-3">
                            {prioridadeTratada ? (
                              <span className={`${styles.badge} ${styles[prioridadeTratada]}`}>
                                {MAPA_PRIORIDADES[prioridadeTratada] || chamado.prioridade}
                              </span>
                            ) : (
                              <span className="text-muted small italic">Não Definida</span>
                            )}
                          </td>
                          <td className="py-3">
                            <span className={`${styles.badge} ${styles[statusTratado] || styles.ABERTO}`}>
                              {MAPA_STATUS[statusTratado] || chamado.status_chamado || "Aberto"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <button
                              data-bs-toggle="modal"
                              data-bs-target="#modalDetalhesChamadoAdmin"
                              onClick={() => handleVisualizarEEditarChamado(chamado.id_chamado)}
                              className={`btn btn-sm px-3 ${styles.btnDetails}`}
                            >
                              {isBloqueado ? (
                                <>
                                  <i className="bi bi-eye me-1"></i> Visualizar
                                </>
                              ) : (
                                <>
                                  <i className="bi bi-pencil-square me-1"></i> Responder
                                </>
                              )}
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
                      >{n}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

        </div>
      </div>

      {/* MODAL: VISUALIZAR DETALHES E SALVAR RESPOSTA (ADMINISTRADOR) */}
      <div className="modal fade" id="modalDetalhesChamadoAdmin" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" style={{ maxWidth: "780px" }}>
          <div className={`modal-content ${styles.modalContenedorBase}`}>
            
            {/* CABEÇALHO FIXO PREMIUM */}
            <div className="p-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: "#111827", borderBottom: "none" }}>
              <h5 className="modal-title fw-bold text-white m-0">
                Chamado <span style={{ color: "#febd17" }}>#{chamadoDetalhado?.id_chamado}</span>
              </h5>
              <button type="button" className={styles.closeModalButton} data-bs-dismiss="modal" aria-label="Close">
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            {/* CORPO DO MODAL */}
            <div className={`modal-body ${styles.modalBodyCustom} p-4 bg-light text-dark`}>
              
              {/* Bloco Superior de Informações */}
              <div className="d-flex flex-wrap gap-3 mb-4 bg-white p-3 rounded-4 shadow-sm justify-content-between align-items-center">
                <div style={{ flex: "1 1 160px" }}>
                  <span className="text-secondary small d-block mb-1">Categoria Informada</span>
                  <strong className="text-uppercase small text-dark d-block">
                    {MAPA_CATEGORIAS[chamadoDetalhado?.tipo_chamado] || chamadoDetalhado?.tipo_chamado}
                  </strong>
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <span className="text-secondary small d-block mb-1">Status Atual</span>
                  <div>
                    <span className={`${styles.badge} ${styles[obterStatusTratado(chamadoDetalhado?.status_chamado)] || styles.ABERTO}`}>
                      {MAPA_STATUS[obterStatusTratado(chamadoDetalhado?.status_chamado)] || chamadoDetalhado?.status_chamado || "Aberto"}
                    </span>
                  </div>
                </div>
                <div style={{ flex: "1 1 160px" }}>
                  <span className="text-secondary small d-block mb-1">Empresa Solicitante</span>
                  <strong className="small text-dark text-uppercase d-block">{nomeEmpresa}</strong>
                </div>
              </div>

              {/* Problema Relatado */}
              <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
                <h6 className="fw-bold text-secondary mb-2 small text-uppercase tracking-wider">Problema Relatado pelo Usuário</h6>
                <p className="fw-semibold text-dark mb-2">{chamadoDetalhado?.titulo}</p>
                <p className="text-muted small mb-0" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', wordBreak: 'break-word' }}>
                  {chamadoDetalhado?.descricao}
                </p>
              </div>

              {/* FORMULÁRIO DE INTERVENÇÃO */}
              <form onSubmit={handleSalvarRespostaAdmin} className="d-flex flex-column gap-3">
                <div className="bg-white p-4 rounded-4 shadow-sm border border-warning-subtle">
                  <h6 className="fw-bold text-dark mb-3 small text-uppercase tracking-wider d-flex align-items-center">
                    <i className="bi bi-patch-check-fill text-warning me-2 fs-5"></i> Detalhes Técnicos
                  </h6>

                  {/* SELETORES EM LINHA: PRIORIDADE, STATUS E TÉCNICO */}
                  <div className="row g-3 mb-3">
                    <div className="col-12 col-md-4">
                      <label className="form-label fw-semibold small text-secondary">Definir nível de prioridade</label>
                      <select 
                        className="form-select"
                        style={{ borderRadius: "10px", fontSize: "0.9rem" }}
                        value={formResposta.prioridade}
                        onChange={(e) => setFormResposta({ ...formResposta, prioridade: e.target.value })}
                        disabled={obterStatusTratado(chamadoDetalhado?.status_chamado) === "FINALIZADO" || obterStatusTratado(chamadoDetalhado?.status_chamado) === "CANCELADO"}
                      >
                        <option value="BAIXA">Baixa</option>
                        <option value="MEDIA">Média</option>
                        <option value="ALTA">Alta</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-4">
                      <label className="form-label fw-semibold small text-secondary">Mudar status</label>
                      <select 
                        className="form-select"
                        style={{ borderRadius: "10px", fontSize: "0.9rem" }}
                        value={formResposta.status_chamado}
                        onChange={(e) => setFormResposta({ ...formResposta, status_chamado: e.target.value })}
                        disabled={obterStatusTratado(chamadoDetalhado?.status_chamado) === "FINALIZADO" || obterStatusTratado(chamadoDetalhado?.status_chamado) === "CANCELADO"}
                      >
                        <option value="ABERTO">Aberto (Em Triagem)</option>
                        <option value="EM_ANDAMENTO">Em Atendimento</option>
                        <option value="FINALIZADO">Finalizar Solicitação</option>
                        {obterStatusTratado(chamadoDetalhado?.status_chamado) === "CANCELADO" && (
                          <option value="CANCELADO">Cancelado pelo Cliente</option>
                        )}
                      </select>
                    </div>

                    {/* NOVO SELECT: ATRIBUIR TÉCNICO RESPONSÁVEL */}
                    <div className="col-12 col-md-4">
                      <label className="form-label fw-semibold small text-secondary">Atribuir técnico responsável</label>
                      <select 
                        className="form-select"
                        style={{ borderRadius: "10px", fontSize: "0.9rem" }}
                        value={formResposta.id_tecnico}
                        onChange={(e) => setFormResposta({ ...formResposta, id_tecnico: e.target.value })}
                        disabled={obterStatusTratado(chamadoDetalhado?.status_chamado) === "FINALIZADO" || obterStatusTratado(chamadoDetalhado?.status_chamado) === "CANCELADO"}
                      >
                        <option value="">Não Designado / Sem Técnico</option>
                        {tecnicos.map((tec) => (
                          <option key={tec.id_tecnico || tec.id} value={tec.id_tecnico || tec.id}>
                            {tec.nome} {tec.especialidade ? `(${tec.especialidade})` : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="form-label fw-semibold small text-secondary">Resposta ao Cliente *</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      style={{ resize: "none", borderRadius: "12px", fontSize: "0.9rem" }}
                      placeholder={obterStatusTratado(chamadoDetalhado?.status_chamado) === "CANCELADO" ? "Este chamado foi cancelado pelo cliente e não aceita respostas." : "Escreva a resolução técnica..."}
                      value={formResposta.resposta_admin}
                      onChange={(e) => setFormResposta({ ...formResposta, resposta_admin: e.target.value })}
                      required={obterStatusTratado(chamadoDetalhado?.status_chamado) !== "FINALIZADO" && obterStatusTratado(chamadoDetalhado?.status_chamado) !== "CANCELADO"}
                      disabled={obterStatusTratado(chamadoDetalhado?.status_chamado) === "FINALIZADO" || obterStatusTratado(chamadoDetalhado?.status_chamado) === "CANCELADO"}
                    ></textarea>
                  </div>
                </div>

                {/* BOTÕES DE AÇÃO INTERNOS */}
                <div className="d-flex justify-content-end gap-2 pt-2 pb-1">
                  <button type="button" className={styles.btnSecondaryStyle} data-bs-dismiss="modal">
                    Voltar ao Painel
                  </button>
                  {obterStatusTratado(chamadoDetalhado?.status_chamado) !== "FINALIZADO" && obterStatusTratado(chamadoDetalhado?.status_chamado) !== "CANCELADO" && (
                    <button type="submit" className="btn btn-dark fw-bold px-4" style={{ borderRadius: "12px", backgroundColor: "#221f20" }} disabled={submitting}>
                      {submitting ? "Gravando..." : "Salvar e Notificar Cliente"}
                    </button>
                  )}
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}