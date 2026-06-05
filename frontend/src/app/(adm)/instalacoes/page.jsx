"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getTodasInstalacoes, atualizarInstalacao } from "../../../api"; 

export default function GerenciarInstalacoesPage() {
  const [instalacoes, setInstalacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("TODOS");

  // Estados de Paginação
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [limite] = useState(10);

  // Estados do Modal de Edição
  const [itemSelecionado, setItemSelecionado] = useState(null);
  const [statusEdicao, setStatusEdicao] = useState("");
  const [dataVisitaEdicao, setDataVisitaEdicao] = useState("");
  const [tecnicoEdicao, setTecnicoEdicao] = useState("");
  const [loadingSalvar, setLoadingSalvar] = useState(false);

  // 1. BUSCAR DADOS DO SEU CONTROLLER
  async function carregarInstalacoes() {
    try {
      setLoading(true);
      const response = await getTodasInstalacoes(paginaAtual, limite);
      
      if (response && response.sucesso) {
        setInstalacoes(response.dados || []);
        if (response.paginacao) {
          setTotalPaginas(response.paginacao.totalPaginas || 1);
        }
      } else {
        toast.error(response?.erro || "Erro ao carregar instalações.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      toast.error("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarInstalacoes();
  }, [paginaAtual]);

  // 2. FILTRAGEM LOCAL POR STATUS
  const instalacoesFiltradas = instalacoes.filter((item) => {
    if (filtroStatus === "TODOS") return true;
    const statusItem = item.status?.toUpperCase() || "ANÁLISE";
    return statusItem === filtroStatus.toUpperCase();
  });

    // 3. ABRIR MODAL (Busca os dados atualizados e garante compatibilidade do Bootstrap)
    async function abrirModalEdicao(item) {
        // Define um estado inicial rápido usando o que já temos na linha da tabela
        setItemSelecionado(item);
        setStatusEdicao(item.status || "Análise");
        setDataVisitaEdicao(item.dataVisita ? item.dataVisita.split("T")[0] : "");
        setTecnicoEdicao(item.tecnico || "");

        // Dispara a abertura visual do Modal imediatamente
        const modalElement = document.getElementById("modalEditarInstalacao");
        if (modalElement && typeof window !== "undefined" && window.bootstrap) {
        let bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
        if (!bootstrapModal) {
            bootstrapModal = new window.bootstrap.Modal(modalElement);
        }
        bootstrapModal.show();
        }

        // [Bônus de Estabilidade]: Busca o objeto completo da API por ID para garantir 
        // que o modal possua o 'id_endereco' correto caso seja necessária uma atualização profunda.
        try {
        const URL_BUSCA = `http://localhost:3002/api/instalacoes/${item.id_instalacao}`;
        const res = await fetch(URL_BUSCA, { method: "GET", credentials: "include" });
        const dadosCompletos = await res.json();
        
        if (dadosCompletos && dadosCompletos.sucesso) {
            setItemSelecionado(dadosCompletos.dados);
        }
        } catch (err) {
        console.error("Não foi possível sincronizar detalhes adicionais do item:", err);
        }
    }

  // 4. SALVAR ALTERAÇÕES
  async function handleSalvarAlteracoes(e) {
    e.preventDefault();
    if (!itemSelecionado) return;

    setLoadingSalvar(true);

    const payload = {
      status: statusEdicao,
      dataVisita: dataVisitaEdicao || null,
      tecnico: tecnicoEdicao.trim() || null
    };

    try {
      const response = await atualizarInstalacao(itemSelecionado.id_instalacao, payload);

      if (response && response.sucesso) {
        toast.success("Solicitação despachada com sucesso!");
        
        const modalElement = document.getElementById("modalEditarInstalacao");
        if (modalElement && window.bootstrap) {
          const instance = window.bootstrap.Modal.getInstance(modalElement);
          if (instance) instance.hide();
        }

        carregarInstalacoes();
      } else {
        toast.error(response?.erro || "Erro ao atualizar dados.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar alterações no servidor.");
    } finally {
      setLoadingSalvar(false);
    }
  }

  function renderBadgeStatus(status) {
    const st = status?.toLowerCase();
    if (st === "concluido" || st === "concluída") return <span className="badge bg-success px-3 py-2 rounded-pill">Concluída</span>;
    if (st === "analise" || st === "análise" || !st) return <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Em Análise</span>;
    if (st === "agendado") return <span className="badge bg-primary px-3 py-2 rounded-pill">Agendada</span>;
    return <span className="badge bg-secondary px-3 py-2 rounded-pill">{status}</span>;
  }

  return (
    <div className="min-vh-100 py-5 px-4" style={{ backgroundColor: "#ececec", fontFamily: "'Poppins', sans-serif" }}>
      <div className="container-fluid bg-white p-5 shadow-lg" style={{ borderRadius: "24px", maxWidth: "1300px" }}>
        
        {/* TOPO E FILTROS */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 border-bottom pb-4">
          <div>
            <h1 className="fw-bold m-0" style={{ color: "#221f20" }}>
              Gerenciar <span style={{ color: "#febd17" }}>Instalações</span>
            </h1>
            <p className="text-muted m-0 mt-1">Painel do Administrador para triagem e agendamentos.</p>
          </div>
          
          <div className="btn-group mt-3 mt-md-0 shadow-sm" role="group" style={{ borderRadius: "12px", overflow: "hidden" }}>
            {[
              { id: "TODOS", label: "Todos" },
              { id: "ANÁLISE", label: "Em Análise" },
              { id: "AGENDADO", label: "Agendados" },
              { id: "CONCLUIDO", label: "Concluídos" }
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                className={`btn fw-semibold px-3 py-2 ${filtroStatus === btn.id ? "btn-dark" : "btn-light border"}`}
                onClick={() => setFiltroStatus(btn.id)}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* LISTAGEM */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : instalacoesFiltradas.length === 0 ? (
          <div className="text-center py-5 rounded-3 border border-dashed bg-light">
            <i className="bi bi-folder-x fs-1 text-muted"></i>
            <p className="text-secondary fw-semibold mt-3">Nenhuma solicitação encontrada.</p>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr className="text-secondary small fw-bold text-uppercase tracking-wider">
                    <th className="ps-4 py-3">ID Solicitação</th>
                    <th className="py-3">Endereço Solicitado</th>
                    <th className="py-3">Status</th>
                    <th className="py-3">Data de Visita</th>
                    <th className="py-3">Profissional</th>
                    <th className="py-3 text-end pe-4">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {instalacoesFiltradas.map((item) => {
                    // Fallback inteligente para garantir mapeamento correto do endereço vindo da API
                    const ruaLogradouro = item.logradouro || item.rua || "Endereço não informado";
                    const numeroPredial = item.numero ? `, ${item.numero}` : "";
                    const bairroInformado = item.bairro || "Bairro não informado";
                    const cidadeEstado = item.cidade && item.estado ? `${item.cidade}/${item.estado}` : (item.cidade || item.estado || "");

                    return (
                      <tr key={item.id_instalacao}>
                        <td className="ps-4 py-3">
                          <div className="fw-bold text-dark">#{item.id_instalacao}</div>
                          <span className="text-muted small">Empresa: ID {item.id_empresa}</span>
                        </td>

                        <td className="py-3">
                          <div className="text-dark fw-semibold">{ruaLogradouro}{numeroPredial}</div>
                          <span className="text-muted small">{bairroInformado} {cidadeEstado ? `— ${cidadeEstado}` : ""}</span>
                        </td>

                        <td className="py-3">{renderBadgeStatus(item.status)}</td>

                        <td className="py-3">
                          {item.dataVisita ? (
                            <span className="fw-medium text-dark">
                              <i className="bi bi-calendar3 me-2 text-primary"></i>
                              {new Date(item.dataVisita).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                            </span>
                          ) : (
                            <span className="text-muted small italic">Não definida</span>
                          )}
                        </td>

                        <td className="py-3">
                          <span className={item.tecnico ? "fw-medium text-dark" : "text-muted small"}>
                            <i className="bi bi-person me-1"></i>
                            {item.tecnico || "Não alocado"}
                          </span>
                        </td>

                        <td className="py-3 text-end pe-4">
                          {/* Adicionado propriedades nativas data-bs como garantia adicional para abrir o modal */}
                          <button
                            className="btn btn-sm fw-bold px-3 py-2 btn-warning"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEditarInstalacao"
                            style={{ borderRadius: "10px", color: "#221f20", border: "none" }}
                            onClick={() => abrirModalEdicao(item)}
                          >
                            <i className="bi bi-gear-fill me-2"></i> Despachar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* CONTROLES DE PAGINAÇÃO */}
            {totalPaginas > 1 && (
              <div className="d-flex justify-content-center align-items-center gap-3 mt-4 border-top pt-4">
                <button
                  className="btn btn-sm btn-outline-dark fw-bold px-3 py-2"
                  disabled={paginaAtual === 1}
                  onClick={() => setPaginaAtual(prev => prev - 1)}
                  style={{ borderRadius: "8px" }}
                >
                  Anterior
                </button>
                <span className="fw-semibold text-secondary">
                  Página {paginaAtual} de {totalPaginas}
                </span>
                <button
                  className="btn btn-sm btn-outline-dark fw-bold px-3 py-2"
                  disabled={paginaAtual === totalPaginas}
                  onClick={() => setPaginaAtual(prev => prev + 1)}
                  style={{ borderRadius: "8px" }}
                >
                  Próxima
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* MODAL BOOTSTRAP */}
      <div className="modal fade" id="modalEditarInstalacao" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg" style={{ borderRadius: "20px", border: "none" }}>
            <div className="modal-header border-bottom-0 pt-4 px-4">
              <h5 className="modal-title fw-bold text-dark fs-4">Gerenciar Instalação</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            
            <form onSubmit={handleSalvarAlteracoes}>
              <div className="modal-body px-4 pb-4">
                {itemSelecionado && (
                  <p className="text-muted small mb-4">
                    Editando a ordem <strong>#{itemSelecionado.id_instalacao}</strong> vinculada à empresa <strong>{itemSelecionado.id_empresa}</strong>.
                  </p>
                )}

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Alterar Status</label>
                  <select
                    className="form-select p-3"
                    style={{ borderRadius: "10px" }}
                    value={statusEdicao}
                    onChange={(e) => setStatusEdicao(e.target.value)}
                  >
                    <option value="Análise">Em Análise Técnica</option>
                    <option value="Agendado">Visita Agendada</option>
                    <option value="Concluido">Instalação Concluída</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Data do Agendamento</label>
                  <input
                    type="date"
                    className="form-control p-3"
                    style={{ borderRadius: "10px" }}
                    value={dataVisitaEdicao}
                    onChange={(e) => setDataVisitaEdicao(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-secondary">Técnico Encarregado</label>
                  <input
                    type="text"
                    className="form-control p-3"
                    placeholder="Insira o nome do operador"
                    style={{ borderRadius: "10px" }}
                    value={tecnicoEdicao}
                    onChange={(e) => setTecnicoEdicao(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn fw-bold w-100 py-3 mt-2"
                  disabled={loadingSalvar}
                  style={{
                    backgroundColor: "#febd17",
                    color: "#221f20",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "1rem"
                  }}
                >
                  {loadingSalvar ? "Salvando..." : "Confirmar Atualização"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}