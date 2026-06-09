"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getEmpresas, inativarEmpresa, reativarEmpresa } from "../../../api";
import styles from "./page.module.css";

export default function GerenciarEmpresasPage() {
  // Estados de Listagem e Controle de Interface
  const [empresas, setEmpresas] = useState([]);
  const [buscaNome, setBuscaNome] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("TODOS"); 
  const [loading, setLoading] = useState(false);

  // Estado para Visualização de Detalhes
  const [empresaDetalhe, setEmpresaDetalhe] = useState(null);

  // Estados para os Modais de Confirmação
  const [empresaParaInativar, setEmpresaParaInativar] = useState(null);
  const [empresaParaReativar, setEmpresaParaReativar] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
    carregarEmpresas();
  }, []);

  async function carregarEmpresas() {
    setLoading(true);
    try {
      const response = await getEmpresas(1, 1000); 
      
      if (response) {
        let dadosBrutos = [];

        // 1. Identifica onde estão os dados na resposta da API
        if (response.empresas && Array.isArray(response.empresas)) {
          dadosBrutos = response.empresas;
        } else if (response.dados && Array.isArray(response.dados)) {
          dadosBrutos = response.dados;
        } else if (Array.isArray(response)) {
          dadosBrutos = response;
        } else if (response.total && response.sucesso) {
          dadosBrutos = response.dados || response.empresas || [];
        }

        // 2. TRADUÇÃO/MAPEAMENTO: Adapta o formato do Banco de Dados para o Front-end
        const empresasTratadas = dadosBrutos.map((empresa) => ({
          id_empresa: empresa.id_empresa || empresa.id,
          nome: empresa.nome_empresa || empresa.nome,
          email: empresa.email_principal || empresa.email,
          telefone: empresa.telefone_principal || empresa.telefone,
          status: empresa.status_empresa 
            ? (empresa.status_empresa.toUpperCase() === "ATIVA" ? "ATIVO" : "INATIVO")
            : (empresa.status || "INATIVO")
        }));

        setEmpresas(empresasTratadas);

      } else {
        toast.error("Erro ao carregar empresas: Resposta inválida do servidor.");
      }
    } catch (error) {
      console.error(error);
      tratarErroServidor(error);
    } finally {
      setLoading(false);
    }
  }

  // FILTRAGEM FRONT-END
  const empresasFiltradas = empresas.filter((empresa) => {
    const correspondeNome = empresa?.nome?.toLowerCase().includes(buscaNome.toLowerCase());
    const correspondeStatus = filtroStatus === "TODOS" || empresa?.status?.toUpperCase() === filtroStatus;
    
    return correspondeNome && correspondeStatus;
  });

  function fecharModal(idModal) {
    if (typeof window !== "undefined") {
      const modalElement = document.getElementById(idModal);
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
      if (modalElement && bootstrap) {
        const instance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        instance.hide();
      }
    }
  }

  // Abre o modal de visualização e seta os dados da empresa escolhida
  function abrirModalDetalhes(empresa) {
    setEmpresaDetalhe(empresa);
  }

  function gatilhoInativar(id) {
    setEmpresaParaInativar(id);
  }

  function gatilhoReativar(id) {
    setEmpresaParaReativar(id);
  }

  async function handleInativarConfirmado() {
    if (!empresaParaInativar) return;

    setLoading(true);
    try {
      const response = await inativarEmpresa(empresaParaInativar);

      if (response && response.sucesso) {
        toast.success("Empresa inativada com sucesso.");
        fecharModal("modalConfirmarInativar");
        await carregarEmpresas(); 
        setEmpresaParaInativar(null);
      } else {
        toast.error(response?.erro || response?.mensagem || "Erro ao inativar empresa.");
      }
    } catch (error) {
      console.error(error);
      tratarErroServidor(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleReativarConfirmado() {
    if (!empresaParaReativar) return;

    setLoading(true);
    try {
      const response = await reativarEmpresa(empresaParaReativar);

      if (response && response.sucesso) {
        toast.success("Empresa reativada com sucesso!");
        fecharModal("modalConfirmarReativar");
        await carregarEmpresas();
        setEmpresaParaReativar(null);
      } else {
        toast.error(response?.erro || response?.mensagem || "Erro ao reativar empresa.");
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
      const apiError = error.response.data.erro || error.response.data.mensagem || error.response.data.mensage;
      toast.error(apiError || "Erro de conexão com o servidor.");
    } else {
      toast.error("Erro de conexão com o servidor.");
    }
  }

  function renderBadgeStatus(status) {
    const st = status?.toUpperCase();
    if (st === "ATIVO") {
      return <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill fw-bold">Ativo</span>;
    }
    return <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-3 py-2 rounded-pill fw-bold">Inativo</span>;
  }

  return (
    <div className={`min-vh-100 py-5 px-4 ${styles.page}`}>
      <div className={`container-fluid bg-white p-5 shadow-lg ${styles.shell}`}>
        
        {/* TOPO E BARRA DE FILTROS */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 border-bottom pb-4">
          <div>
            <h1 className={`fw-bold m-0 ${styles.title}`}>
              Gerenciar <span className={styles.highlight}>Empresas</span>
            </h1>
            <p className="text-muted m-0 mt-1">Painel de controle do administrador para visualização e status de parceiros jurídicos.</p>
          </div>
          
          <div className="d-flex flex-column flex-sm-row gap-3 mt-3 mt-md-0 align-items-sm-center">
            {/* Barra de Pesquisa por Nome */}
            <div className={`input-group shadow-sm ${styles.searchGroup}`} style={{ minWidth: "300px" }}>
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-1"
                placeholder="Pesquisar por razão social..."
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Filtro Seletor de Status */}
            <div className="shadow-sm rounded" style={{ minWidth: "150px" }}>
              <select
                className="form-select fw-semibold text-secondary py-2"
                style={{ height: "100%", cursor: "pointer" }}
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                disabled={loading}
              >
                <option value="TODOS">Todos</option>
                <option value="ATIVO">Ativos</option>
                <option value="INATIVO">Inativos</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABELA DE LISTAGEM */}
        {loading && empresas.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-muted mt-2">Buscando informações no servidor...</p>
          </div>
        ) : empresasFiltradas.length === 0 ? (
          <div className="text-center py-5 rounded-3 border border-dashed bg-light">
            <i className="bi bi-building fs-1 text-muted"></i>
            <p className="text-secondary fw-semibold mt-3">Nenhuma empresa encontrada com os filtros aplicados.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr className="text-secondary small fw-bold text-uppercase tracking-wider">
                  <th className="ps-4 py-3">ID</th>
                  <th className="py-3">Razão Social / Nome</th>
                  <th className="py-3">E-mail de Contato</th>
                  <th className="py-3">Telefone</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-end pe-4"></th>
                </tr>
              </thead>
              <tbody>
                {empresasFiltradas.map((empresa) => (
                  <tr key={empresa?.id_empresa || empresa?.id} className={styles.tableRow}>
                    <td className="ps-4 py-3 fw-bold text-dark">#{empresa?.id_empresa || empresa?.id}</td>
                    <td className="py-3 fw-semibold text-dark">{empresa?.nome}</td>
                    <td className="py-3 text-secondary">{empresa?.email}</td>
                    <td className="py-3 text-dark fw-medium">{empresa?.telefone}</td>
                    <td className="py-3">{renderBadgeStatus(empresa?.status)}</td>
                    <td className="py-3 text-end pe-4">
                      <div className="d-flex gap-2 justify-content-end">
                        
                        {/* Botão Detalhes */}
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modalVisualizarEmpresa"
                          className="btn btn-sm btn-light border fw-bold px-3 py-2"
                          onClick={() => abrirModalDetalhes(empresa)}
                          disabled={loading}
                        >
                          <i className="bi bi-eye-fill me-1"></i> Detalhes
                        </button>
                        
                        {/* Botão Inativar (Visível se Ativa) */}
                        {empresa?.status?.toUpperCase() === "ATIVO" && (
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#modalConfirmarInativar"
                            className="btn btn-sm btn-outline-danger fw-bold px-3 py-2"
                            onClick={() => gatilhoInativar(empresa.id_empresa || empresa.id)}
                            disabled={loading}
                          >
                            <i className="bi bi-building-dash-fill me-1"></i> Inativar
                          </button>
                        )}

                        {/* Botão Reativar (Visível se Inativa) */}
                        {empresa?.status?.toUpperCase() === "INATIVO" && (
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#modalConfirmarReativar"
                            className="btn btn-sm btn-outline-success fw-bold px-3 py-2"
                            onClick={() => gatilhoReativar(empresa.id_empresa || empresa.id)}
                            disabled={loading}
                          >
                            <i className="bi bi-building-check me-1"></i> Reativar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: VISUALIZAR DETALHES */}
      <div className="modal fade" id="modalVisualizarEmpresa" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content p-2">
            <div className="modal-header border-bottom-0 pt-3 px-3">
              <h5 className="modal-title fw-bold text-dark fs-4">
                <i className="bi bi-building me-2 text-secondary"></i>Detalhes da Empresa
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <div className="modal-body px-3 pb-3">
              {empresaDetalhe ? (
                <div className="d-flex flex-column gap-3">
                  <div className="bg-light p-3 rounded-3 border">
                    <span className="text-uppercase text-muted fw-bold d-block small mb-1">ID do Registro</span>
                    <span className="fw-mono text-dark fw-bold">#{empresaDetalhe.id_empresa || empresaDetalhe.id}</span>
                  </div>

                  <div>
                    <span className="text-muted fw-semibold small d-block mb-1">Razão Social / Nome Fantasia</span>
                    <input type="text" className="form-control bg-light" readOnly value={empresaDetalhe.nome || ""} />
                  </div>

                  <div>
                    <span className="text-muted fw-semibold small d-block mb-1">E-mail de Contato</span>
                    <input type="text" className="form-control bg-light" readOnly value={empresaDetalhe.email || ""} />
                  </div>

                  <div className="row g-2">
                    <div className="col-7">
                      <span className="text-muted fw-semibold small d-block mb-1">Telefone / Ramal</span>
                      <input type="text" className="form-control bg-light" readOnly value={empresaDetalhe.telefone || ""} />
                    </div>
                    <div className="col-5">
                      <span className="text-muted fw-semibold small d-block mb-1">Status Atual</span>
                      <div className="pt-1">{renderBadgeStatus(empresaDetalhe.status)}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted text-center">Nenhum dado selecionado.</p>
              )}
              
              <div className="mt-4">
                <button type="button" className="btn btn-secondary w-100 fw-bold py-2" data-bs-dismiss="modal">
                  Fechar Visualização
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: CONFIRMAÇÃO DE INATIVAÇÃO */}
      <div className="modal fade" id="modalConfirmarInativar" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px" }}>
          <div className="modal-content text-center p-4">
            <div className="modal-body">
              <div className="text-danger mb-3">
                <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: "3rem" }}></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Confirmar Inativação</h5>
              <p className="text-muted small mb-4">
                Tem certeza que deseja alterar o status desta empresa para **Inativo**? Esta ação afetará temporariamente os acessos integrados do cliente.
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <button 
                  type="button" 
                  className="btn btn-light border px-4 fw-bold" 
                  data-bs-dismiss="modal"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger px-4 fw-bold shadow-sm" 
                  onClick={handleInativarConfirmado}
                  disabled={loading}
                >
                  {loading ? "Inativando..." : "Sim, Inativar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: CONFIRMAÇÃO DE REATIVAÇÃO */}
      <div className="modal fade" id="modalConfirmarReativar" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px" }}>
          <div className="modal-content text-center p-4">
            <div className="modal-body">
              <div className="text-success mb-3">
                <i className="bi bi-check-circle-fill" style={{ fontSize: "3rem" }}></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Confirmar Reativação</h5>
              <p className="text-muted small mb-4">
                Tem certeza que deseja reativar o status desta empresa para **Ativo**? Os acessos e painéis do cliente serão restabelecidos imediatamente.
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <button 
                  type="button" 
                  className="btn btn-light border px-4 fw-bold" 
                  data-bs-dismiss="modal"
                  disabled={loading}
                >
                  Cancelar
                </button>
                <button 
                  type="button" 
                  className="btn btn-success px-4 fw-bold shadow-sm" 
                  onClick={handleReativarConfirmado}
                  disabled={loading}
                >
                  {loading ? "Reativando..." : "Sim, Reativar"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}