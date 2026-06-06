"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getTodasInstalacoes, atualizarInstalacao, getTecnicos } from "../../../api"; 
import styles from "./page.module.css";

export default function GerenciarInstalacoesPage() {
  const [instalacoes, setInstalacoes] = useState([]);
  const [listaTecnicos, setListaTecnicos] = useState([]); 
  const [buscaEmpresa, setBuscaEmpresa] = useState(""); 
  const [filtroStatus, setFiltroStatus] = useState(""); 
  const [filtroData, setFiltroData] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);
  
  const [statusEdicao, setStatusEdicao] = useState("PENDENTE");
  const [tecnicoEdicao, setTecnicoEdicao] = useState(""); 
  const [dataVisitaEdicao, setDataVisitaEdicao] = useState(""); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
    carregarInstalacoes();
    carregarTecnicos(); 
  }, []);

  async function carregarInstalacoes() {
    setLoading(true);
    try {
      const response = await getTodasInstalacoes();
      const dadosTratados = response?.dados || response?.data || response;
      
      if (response && (response.sucesso || Array.isArray(dadosTratados))) {
        setInstalacoes(Array.isArray(dadosTratados) ? dadosTratados : []);
      } else {
        toast.error(response?.erro || response?.mensagem || "Erro ao carregar instalações.");
      }
    } catch (error) {
      console.error(error);
      tratarErroServidor(error);
    } finally {
      setLoading(false);
    }
  }

  async function carregarTecnicos() {
    try {
      const response = await getTecnicos(1, 100); 
      const dadosTratados = response?.dados || response?.tecnicos || response;
      if (Array.isArray(dadosTratados)) {
        const ativos = dadosTratados.filter(t => (t.status_tecnico || t.status || "").toUpperCase() === "ATIVO");
        setListaTecnicos(ativos);
      }
    } catch (error) {
      console.error("Erro ao carregar lista de técnicos:", error);
    }
  }

  const instalacoesFiltradas = instalacoes.filter((inst) => {
    const empresa = inst.nome_empresa || inst.id_empresa || "";
    const bateEmpresa = String(empresa).toLowerCase().includes(buscaEmpresa.toLowerCase());

    const statusItem = (inst.status || inst.STATUS || "PENDENTE").toUpperCase();
    const bateStatus = filtroStatus === "" || statusItem === filtroStatus.toUpperCase();

    const dataBruta = inst.dataVisita || inst.data_visita || "";
    const dataItemFormatada = dataBruta.substring(0, 10); 
    const bateData = filtroData === "" || dataItemFormatada === filtroData;

    return bateEmpresa && bateStatus && bateData;
  });

  function fecharModal() {
    if (typeof window !== "undefined") {
      const modalElement = document.getElementById("modalGerenciarInstalacao");
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
      if (modalElement && bootstrap) {
        const instance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        instance.hide();
      }
    }
  }

  function abrirModalEditar(instalacao) {
    setItemSelecionado(instalacao);
    const statusBanco = (instalacao.status || instalacao.STATUS || "PENDENTE").toUpperCase();
    setStatusEdicao(statusBanco);
    setTecnicoEdicao(instalacao.id_tecnico || instalacao.id_prof || "");

    let dataFormatada = "";
    const dataBruta = instalacao.dataVisita || instalacao.data_visita;
    if (dataBruta) {
      dataFormatada = dataBruta.substring(0, 10);
    }
    setDataVisitaEdicao(dataFormatada);
  }

  async function handleSalvarInstalacao(e) {
    e.preventDefault();

    if (!statusEdicao || statusEdicao.trim() === "") {
      toast.warning("Por favor, selecione um Status Técnico.");
      return;
    }
    if (!tecnicoEdicao) {
      toast.warning("Por favor, selecione o Técnico Responsável.");
      return;
    }
    if (!dataVisitaEdicao) {
      toast.warning("Por favor, selecione a Data de instalação.");
      return;
    }

    setLoading(true);

    try {
      const dadosForm = {
        ...itemSelecionado,
        status: statusEdicao, 
        tecnico: tecnicoEdicao, 
        dataVisita: dataVisitaEdicao 
      };

      const idInstalacao = itemSelecionado.id_instalacao || itemSelecionado.id || itemSelecionado.ID_INSTALACAO;
      const response = await atualizarInstalacao(idInstalacao, dadosForm);

      if (response && (response.sucesso || response.status === 200 || response.data)) {
        toast.success("Instalação atualizada com sucesso.");
        fecharModal();
        carregarInstalacoes();
      } else {
        toast.error(response?.erro || response?.mensagem || "Erro ao atualizar instalação.");
      }
    } catch (error) {
      console.error(error);
      tratarErroServidor(error);
    } finally {
      setLoading(false);
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

  function renderBadgeStatus(status) {
    const st = status?.toUpperCase();
    if (st === "FINALIZADA") {
      return <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill fw-bold">Finalizada</span>;
    }
    if (st === "PENDENTE" || !st) {
      return <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-3 py-2 rounded-pill fw-bold">Pendente</span>;
    }
    if (st === "EM_ANDAMENTO") {
      return <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-bold">Em Andamento</span>;
    }
    if (st === "CANCELADA") {
      return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 rounded-pill fw-bold">Cancelada</span>;
    }
    return <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle px-3 py-2 rounded-pill fw-bold">{status}</span>;
  }

  return (
    <div className={`min-vh-100 py-5 px-4 ${styles.page}`}>
      <div className={`container-fluid bg-white p-5 shadow-lg ${styles.shell}`}>
        
        {/* BLOCO SUPERIOR: APENAS TÍTULO E SUBTÍTULO */}
        <div className="mb-4 border-bottom pb-4">
          <h1 className={`fw-bold m-0 ${styles.title}`}>
            Gerenciar <span className={styles.highlight}>Instalações</span>
          </h1>
          <p className="text-muted m-0 mt-1">Acompanhamento de solicitações e atribuição técnica da Luminar.</p>
        </div>

        {/* BARRA ÚNICA DE FILTROS (STATUS + DATA + PESQUISA ALINHADA À DIREITA) */}
        <div className="d-flex flex-column flex-md-row gap-3 mb-4 align-items-md-center justify-content-start">
          {/* Filtro de Status */}
          <div style={{ minWidth: "180px" }}>
            <select
              className={`form-select shadow-sm ${styles.selectFilter}`}
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              disabled={loading}
            >
              <option value="">Todos os status</option>
              <option value="PENDENTE">Pendente</option>
              <option value="EM_ANDAMENTO">Em Andamento</option>
              <option value="FINALIZADA">Finalizada</option>
              <option value="CANCELADA">Cancelada</option>
            </select>
          </div>

          {/* Filtro de Data */}
          <div className="input-group shadow-sm" style={{ maxWidth: "260px" }}>
            <span className="input-group-text bg-white text-muted small fw-medium border-end-0">Data:</span>
            <input
              type="date"
              className={`form-control border-start-0 ${styles.dateFilter}`}
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              disabled={loading}
            />
            {filtroData && (
              <button 
                className="btn btn-outline-secondary border-start-0 bg-white text-muted" 
                onClick={() => setFiltroData("")}
                title="Limpar data"
              >
                <i className="bi bi-x-circle"></i>
              </button>
            )}
          </div>

          {/* BARRA DE PESQUISA (Empurrada para a direita usando ms-md-auto) */}
          <div className={`input-group shadow-sm ms-md-auto ${styles.filterGroup}`} style={{ maxWidth: "340px" }}>
            <span className="input-group-text bg-white border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-1"
              placeholder="Pesquisar por empresa..."
              value={buscaEmpresa}
              onChange={(e) => setBuscaEmpresa(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* TABELA DE LISTAGEM */}
        {loading && instalacoes.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-muted mt-2">Buscando informações no servidor...</p>
          </div>
        ) : instalacoesFiltradas.length === 0 ? (
          <div className="text-center py-5 rounded-3 border border-dashed bg-light">
            <i className="bi bi-funnel fs-1 text-muted"></i>
            <p className="text-secondary fw-semibold mt-3">Nenhum resultado corresponde aos filtros aplicados.</p>
            <button 
              className="btn btn-sm btn-secondary mt-2 px-3"
              onClick={() => { setBuscaEmpresa(""); setFiltroStatus(""); setFiltroData(""); }}
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr className="text-secondary small fw-bold text-uppercase tracking-wider">
                  <th className="ps-4 py-3">ID</th>
                  <th className="py-3">Cidade / UF</th>
                  <th className="py-3">Logradouro</th>
                  <th className="py-3">Empresa</th>
                  <th className="py-3">Técnico</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-end pe-4">Alterações</th>
                </tr>
              </thead>
              <tbody>
                {instalacoesFiltradas.map((inst) => {
                  const idItem = inst.id_instalacao || inst.id || inst.ID_INSTALACAO;
                  const cidadeItem = inst.cidade || inst.CIDADE || "—";
                  const estadoItem = inst.estado || inst.uf || inst.ESTADO || "";
                  const ruaItem = inst.logradouro || inst.rua || inst.LOGRADOURO || "—";
                  const numeroItem = inst.numero || inst.NUMERO || "";
                  const empresaItem = inst.nome_empresa || inst.id_empresa || "—";
                  const tecnicoItem = inst.nome_tecnico || inst.tecnico || "Não atribuído";
                  const statusItem = inst.status || inst.STATUS || "PENDENTE";

                  return (
                    <tr key={idItem} className={styles.tableRow}>
                      <td className="ps-4 py-3 fw-bold text-dark">#{idItem}</td>
                      <td className="py-3 fw-semibold text-dark">{cidadeItem} {estadoItem ? `— ${estadoItem}` : ""}</td>
                      <td className="py-3 text-secondary">{ruaItem}{numeroItem ? `, ${numeroItem}` : ""}</td>
                      <td className="py-3 text-dark fw-medium">{empresaItem}</td>
                      <td className="py-3 text-secondary small">{tecnicoItem}</td>
                      <td className="py-3">{renderBadgeStatus(statusItem)}</td>
                      <td className="py-3 text-end pe-4">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modalGerenciarInstalacao"
                          className={`btn btn-sm btn-light border fw-bold px-3 py-2 ${styles.btnActionEdit}`}
                          onClick={() => abrirModalEditar(inst)}
                          disabled={loading}
                        >
                          <i className="bi bi-gear-fill me-1"></i> Despachar / Editar
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL DE ATUALIZAÇÃO / GERENCIAMENTO */}
      <div className="modal fade" id="modalGerenciarInstalacao" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className={`modal-content ${styles.modalContent}`}>
            <div className="modal-header border-bottom-0 pt-4 px-4 pb-2">
              <h5 className="modal-title fw-bold text-dark fs-4">Despachar Solicitação</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" disabled={loading}></button>
            </div>
            
            <form onSubmit={handleSalvarInstalacao}>
              <div className="modal-body px-4 pb-4">
                {itemSelecionado && (
                  <div className="p-3 bg-light rounded-3 mb-4 border border-dashed text-start">
                    <p className="m-0 small text-secondary">
                      <i className="bi bi-geo-alt-fill text-warning me-1"></i> 
                      <strong>Local da Montagem:</strong> {itemSelecionado.logradouro || itemSelecionado.rua || itemSelecionado.LOGRADOURO}, {itemSelecionado.numero || itemSelecionado.NUMERO} — {itemSelecionado.bairro || ""}, {itemSelecionado.cidade || itemSelecionado.CIDADE}/{itemSelecionado.estado || itemSelecionado.uf}
                    </p>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Status Técnico *</label>
                  <select
                    className={`form-select p-3 ${styles.modalField}`}
                    value={statusEdicao}
                    onChange={(e) => setStatusEdicao(e.target.value)}
                    disabled={loading}
                  >
                    <option value="">Selecione o status...</option>
                    <option value="PENDENTE">Pendente</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="FINALIZADA">Finalizada</option>
                    <option value="CANCELADA">Cancelada</option>
                  </select>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-7 col-12">
                    <label className="form-label fw-bold small text-secondary">Selecionar Técnico Responsável *</label>
                    <select
                      className={`form-select p-3 ${styles.modalField}`}
                      value={tecnicoEdicao}
                      onChange={(e) => setTecnicoEdicao(e.target.value)}
                      disabled={loading}
                    >
                      <option value="">Selecione um profissional...</option>
                      {listaTecnicos.map((tec) => {
                        const idTecnico = tec.id_tecnico || tec.id;
                        const nomeTecnico = tec.nome_completo || tec.nome || tec.Nome;
                        return (
                          <option key={idTecnico} value={idTecnico}>
                            {nomeTecnico}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-md-5 col-12">
                    <label className="form-label fw-bold small text-secondary">Data de instalação *</label>
                    <input
                      type="date"
                      className={`form-control p-3 ${styles.modalField}`}
                      value={dataVisitaEdicao}
                      onChange={(e) => setDataVisitaEdicao(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <button type="submit" className={`btn fw-bold w-100 py-3 mt-2 ${styles.submitButton}`} disabled={loading}>
                  {loading ? "Processando..." : "Salvar Alterações na Instalação"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}