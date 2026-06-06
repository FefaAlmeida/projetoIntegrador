"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getTecnicos, criarTecnico, atualizarTecnico, inativarTecnico } from "../../../api";
import styles from "./page.module.css";

export default function GerenciarTecnicosPage() {
  // Estados de Listagem e Controle de Interface
  const [tecnicos, setTecnicos] = useState([]);
  const [buscaNome, setBuscaNome] = useState("");
  const [loading, setLoading] = useState(false);

  // Estados de Controle do Modal Híbrido (Criar / Editar)
  const [modoModal, setModoModal] = useState("CRIAR"); 
  const [itemSelecionado, setItemSelecionado] = useState(null);
  
  // Estados dos Campos do Formulário
  const [nomeEdicao, setNomeEdicao] = useState("");
  const [telefoneEdicao, setTelefoneEdicao] = useState("");
  const [emailEdicao, setEmailEdicao] = useState("");
  const [statusEdicao, setStatusEdicao] = useState("ATIVO");

  // Estado para o Modal de Confirmação de Inativação
  const [tecnicoParaInativar, setTecnicoParaInativar] = useState(null);

  useEffect(() => {
    // Importação dinâmica do Bootstrap JS para garantir que funcione no lado do cliente
    if (typeof window !== "undefined") {
      require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }
    carregarTecnicos();
  }, []);

  async function carregarTecnicos() {
    setLoading(true);
    try {
      const response = await getTecnicos();
      if (response && response.sucesso) {
        setTecnicos(response.dados || []);
      } else {
        toast.error(response?.erro || response?.mensagem || "Erro ao carregar técnicos.");
      }
    } catch (error) {
      console.error(error);
      tratarErroServidor(error);
    } finally {
      setLoading(false);
    }
  }

  // FILTRAGEM FRONT-END AUXILIAR SOBRE OS DADOS DO BACKEND
  const tecnicosFiltrados = tecnicos.filter((tecnico) =>
    tecnico.nome?.toLowerCase().includes(buscaNome.toLowerCase())
  );

  // FUNÇÕES AUXILIARES PARA MANIPULAR OS MODAIS DO BOOTSTRAP VIA JS
  function fecharModal() {
    if (typeof window !== "undefined") {
      const modalElement = document.getElementById("modalGerenciarTecnico");
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
      if (modalElement && bootstrap) {
        const instance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        instance.hide();
      }
    }
  }

  function fecharModalConfirmacao() {
    if (typeof window !== "undefined") {
      const modalElement = document.getElementById("modalConfirmarInativar");
      const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
      if (modalElement && bootstrap) {
        const instance = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        instance.hide();
      }
    }
  }

  // GATILHOS DE ABERTURA E PREPARAÇÃO DE ESTADO
  function abrirModalCriar() {
    setModoModal("CRIAR");
    setItemSelecionado(null);
    setNomeEdicao("");
    setTelefoneEdicao("");
    setEmailEdicao("");
    setStatusEdicao("ATIVO");
  }

  function abrirModalEditar(tecnico) {
    setModoModal("EDITAR");
    setItemSelecionado(tecnico);
    setNomeEdicao(tecnico.nome || "");
    setTelefoneEdicao(tecnico.telefone || "");
    setEmailEdicao(tecnico.email || "");
    setStatusEdicao(tecnico.status || "ATIVO");
  }

  function gatilhoInativar(id) {
    setTecnicoParaInativar(id);
  }

  // 2. SUBMIT DO FORMULÁRIO (CRIAR OU ATUALIZAR BACKEND)
  async function handleSalvarTecnico(e) {
    e.preventDefault();

    // Validações de Front-end com base na sua estrutura padrão
    if (!nomeEdicao || !emailEdicao || !telefoneEdicao) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const nomeTrim = nomeEdicao.trim();
    if (nomeTrim.length < 2) {
      toast.error("O nome deve ter pelo menos 2 caracteres.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEdicao.trim())) {
      toast.error("Formato de email inválido.");
      return;
    }

    setLoading(true);

    try {
      const dadosForm = {
        nome: nomeTrim,
        email: emailEdicao.trim().toLowerCase(),
        telefone: telefoneEdicao.trim(),
        status: statusEdicao
      };

      if (modoModal === "CRIAR") {
        const response = await criarTecnico(dadosForm);

        if (response && response.sucesso) {
          toast.success("Técnico cadastrado com sucesso.");
          fecharModal();
          carregarTecnicos(); // Recarrega a lista do servidor
        } else {
          toast.error(response?.erro || response?.mensagem || "Erro ao cadastrar técnico.");
        }
      } else {
        // Atualização de registro existente passando o ID do item selecionado
        const response = await atualizarTecnico(itemSelecionado.id_tecnico, dadosForm);

        if (response && response.sucesso) {
          toast.success("Cadastro atualizado com sucesso.");
          fecharModal();
          carregarTecnicos(); // Recarrega a lista do servidor
        } else {
          toast.error(response?.erro || response?.mensagem || "Erro ao atualizar técnico.");
        }
      }
    } catch (error) {
      console.error(error);
      tratarErroServidor(error);
    } finally {
      setLoading(false);
    }
  }

  // 3. CONFIRMAÇÃO DE INATIVAÇÃO NO BACKEND
  async function handleInativarConfirmado() {
    if (!tecnicoParaInativar) return;

    setLoading(true);
    try {
      const response = await inativarTecnico(tecnicoParaInativar);

      if (response && response.sucesso) {
        toast.success("Técnico inativado com sucesso.");
        fecharModalConfirmacao();
        carregarTecnicos(); // Atualiza a tabela com o novo status vindo do banco
        setTecnicoParaInativar(null);
      } else {
        toast.error(response?.erro || response?.mensagem || "Erro ao inativar técnico.");
      }
    } catch (error) {
      console.error(error);
      tratarErroServidor(error);
    } finally {
      setLoading(false);
    }
  }

  // Centralização do tratamento de erro baseado na sua tratativa padrão do axios
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
        
        {/* TOPO E BARRA DE PESQUISA */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 border-bottom pb-4">
          <div>
            <h1 className={`fw-bold m-0 ${styles.title}`}>
              Gerenciar <span className={styles.highlight}>Técnicos</span>
            </h1>
            <p className="text-muted m-0 mt-1">Técnicos da Luminar responsáveis pelas instalações.</p>
          </div>
          
          <div className="d-flex flex-column flex-sm-row gap-3 mt-3 mt-md-0 align-items-sm-center">
            <div className={`input-group shadow-sm ${styles.searchGroup}`} style={{ minWidth: "280px" }}>
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-1"
                placeholder="Pesquisar técnico por nome..."
                value={buscaNome}
                onChange={(e) => setBuscaNome(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              data-bs-toggle="modal"
              data-bs-target="#modalGerenciarTecnico"
              className={`btn btn-dark fw-bold px-4 py-2 shadow-sm text-nowrap ${styles.btnMain}`}
              onClick={abrirModalCriar}
              disabled={loading}
            >
              <i className="bi bi-person-plus-fill me-2"></i> Adicionar Técnico
            </button>
          </div>
        </div>

        {/* TABELA DE LISTAGEM / RETORNO DO BACKEND */}
        {loading && tecnicos.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
            <p className="text-muted mt-2">Buscando informações no servidor...</p>
          </div>
        ) : tecnicosFiltrados.length === 0 ? (
          <div className="text-center py-5 rounded-3 border border-dashed bg-light">
            <i className="bi bi-people fs-1 text-muted"></i>
            <p className="text-secondary fw-semibold mt-3">Nenhum técnico encontrado.</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr className="text-secondary small fw-bold text-uppercase tracking-wider">
                  <th className="ps-4 py-3">ID</th>
                  <th className="py-3">Nome do Técnico</th>
                  <th className="py-3">E-mail</th>
                  <th className="py-3">Telefone</th>
                  <th className="py-3">Status</th>
                  <th className="py-3 text-end pe-4">Alterações</th>
                </tr>
              </thead>
              <tbody>
                {tecnicosFiltrados.map((tecnico) => (
                  <tr key={tecnico.id_tecnico} className={styles.tableRow}>
                    <td className="ps-4 py-3 fw-bold text-dark">#{tecnico.id_tecnico}</td>
                    <td className="py-3 fw-semibold text-dark">{tecnico.nome}</td>
                    <td className="py-3 text-secondary">{tecnico.email}</td>
                    <td className="py-3 text-dark fw-medium">{tecnico.telefone}</td>
                    <td className="py-3">{renderBadgeStatus(tecnico.status)}</td>
                    <td className="py-3 text-end pe-4">
                      <div className="d-flex gap-2 justify-content-end">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modalGerenciarTecnico"
                          className={`btn btn-sm btn-light border fw-bold px-3 py-2 ${styles.btnActionEdit}`}
                          onClick={() => abrirModalEditar(tecnico)}
                          disabled={loading}
                        >
                          <i className="bi bi-pencil-square me-1"></i> Editar
                        </button>
                        
                        {tecnico.status?.toUpperCase() === "ATIVO" && (
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#modalConfirmarInativar"
                            className={`btn btn-sm btn-outline-danger fw-bold px-3 py-2 ${styles.btnActionDelete}`}
                            onClick={() => gatilhoInativar(tecnico.id_tecnico)}
                            disabled={loading}
                          >
                            <i className="bi bi-person-dash-fill me-1"></i> Inativar
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

      {/* MODAL HÍBRIDO (CRIAR / EDITAR INTEGRADO AO COFRE DE LOADING) */}
      <div className="modal fade" id="modalGerenciarTecnico" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className={`modal-content ${styles.modalContent}`}>
            <div className="modal-header border-bottom-0 pt-4 px-4 pb-2">
              <h5 className="modal-title fw-bold text-dark fs-4">
                {modoModal === "CRIAR" ? "Cadastrar Técnico" : "Atualizar Cadastro"}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" disabled={loading}></button>
            </div>
            
            <form onSubmit={handleSalvarTecnico}>
              <div className="modal-body px-4 pb-4">
                
                {/* LINHA 1: NOME + STATUS */}
                <div className="row g-3 mb-3">
                  <div className={modoModal === "EDITAR" ? "col-md-8 col-12" : "col-12"}>
                    <label className="form-label fw-bold small text-secondary">Nome Completo</label>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      className={`form-control p-3 ${styles.modalField}`}
                      placeholder="Insira o nome do profissional"
                      value={nomeEdicao}
                      onChange={(e) => setNomeEdicao(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  {modoModal === "EDITAR" && (
                    <div className="col-md-4 col-12">
                      <label className="form-label fw-bold small text-secondary">Status no Sistema</label>
                      <select
                        className={`form-select p-3 ${styles.modalField}`}
                        value={statusEdicao}
                        onChange={(e) => setStatusEdicao(e.target.value)}
                        disabled={loading}
                      >
                        <option value="ATIVO">Ativo</option>
                        <option value="INATIVO">Inativo</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* LINHA 2: EMAIL + TELEFONE */}
                <div className="row g-3 mb-4">
                  <div className="col-md-7 col-12">
                    <label className="form-label fw-bold small text-secondary">E-mail Corporativo</label>
                    <input
                      type="email"
                      required
                      maxLength={100}
                      className={`form-control p-3 ${styles.modalField}`}
                      placeholder="nome.sobrenome@empresa.com"
                      value={emailEdicao}
                      onChange={(e) => setEmailEdicao(e.target.value)}
                      disabled={loading}
                    />
                  </div>

                  <div className="col-md-5 col-12">
                    <label className="form-label fw-bold small text-secondary">Telefone de Contato</label>
                    <input
                      type="text"
                      required
                      maxLength={20}
                      className={`form-control p-3 ${styles.modalField}`}
                      placeholder="Ex: (11) 99999-9999"
                      value={telefoneEdicao}
                      onChange={(e) => setTelefoneEdicao(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`btn fw-bold w-100 py-3 mt-2 ${styles.submitButton}`}
                  disabled={loading}
                >
                  {loading ? "Processando..." : modoModal === "CRIAR" ? "Cadastrar Profissional" : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL DE CONFIRMAÇÃO DIALÓGICA DE INATIVAÇÃO */}
      <div className="modal fade" id="modalConfirmarInativar" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" style={{maxWidth: "400px"}}>
          <div className={`modal-content text-center p-4 ${styles.modalConfirmContent}`}>
            <div className="modal-body">
              <div className="text-danger mb-3">
                <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: "3rem" }}></i>
              </div>
              <h5 className="fw-bold text-dark mb-2">Confirmar Inativação</h5>
              <p className="text-muted small mb-4">
                Tem certeza que deseja inativar este técnico?
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

    </div>
  );
}