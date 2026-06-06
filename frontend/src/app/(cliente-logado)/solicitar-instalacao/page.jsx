"use client";

import { useState, useEffect } from "react";
import { solicitarInstalacao, getMinhasInstalacoes, getPerfil } from "../../../api";
import { toast } from "sonner";
import styles from "./page.module.css";

export default function SolicitarInstalacaoPage() {
  const [usuario, setUsuario] = useState(null);
  const [solicitacao, setSolicitacao] = useState(null);
  const [loadingPagina, setLoadingPagina] = useState(true);

  // Estados do formulário
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [complemento, setComplemento] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  function somenteNumeros(valor) {
    return (valor || "").replace(/\D/g, "");
  }

  // Função centralizada para injetar os dados nos inputs e na tela
  function definirDadosNaTela(dados) {
    if (!dados) {
      setSolicitacao(null);
      return;
    }
    setSolicitacao(dados);
    setCep(dados.cep || "");
    setLogradouro(dados.logradouro || dados.rua || "");
    setNumero(dados.numero || "");
    setBairro(dados.bairro || "");
    setCidade(dados.cidade || "");
    setEstado(dados.estado || dados.uf || "");
    setComplemento(dados.complemento || "");
  }

  // Helper para formatar a data que vem do banco (AAAA-MM-DD) para o padrão BR (DD/MM/AAAA)
  function formatarDataBR(dataString) {
    if (!dataString) return null;
    try {
      const apenasData = dataString.substring(0, 10);
      const [ano, mes, dia] = apenasData.split("-");
      if (!ano || !mes || !dia) return dataString;
      return `${dia}/${mes}/${ano}`;
    } catch (e) {
      return dataString;
    }
  }

  // 1. CARREGA O PERFIL DO USUÁRIO PRIMEIRO
  useEffect(() => {
    async function inicializarPagina() {
      let usuarioAtual = null;

      try {
        const perfilRes = await getPerfil();
        if (perfilRes?.sucesso && perfilRes?.dados) {
          setUsuario(perfilRes.dados);
          usuarioAtual = perfilRes.dados;
        }
      } catch (err) {
        console.error("Erro ao obter perfil do usuário:", err);
      }

      await carregarDadosInstalacao(usuarioAtual);
    }

    inicializarPagina();
  }, []);

  // 2. CARREGAMENTO DOS DADOS DE INSTALAÇÃO ISOLADO POR USUÁRIO
  async function carregarDadosInstalacao(usuarioAtual) {
    const chaveCache = usuarioAtual?.email 
      ? `luminar_solicitacao_${usuarioAtual.email}` 
      : "luminar_solicitacao_guest";

    try {
      const cacheLocal = localStorage.getItem(chaveCache);
      if (cacheLocal) {
        definirDadosNaTela(JSON.parse(cacheLocal));
      }

      const response = await getMinhasInstalacoes();
      const dadosTratados = response?.dados || response?.data || response;
      
      const solicitacaoValida = Array.isArray(dadosTratados) ? dadosTratados[0] : dadosTratados;

      if (response && (solicitacaoValida?.cep || solicitacaoValida?.logradouro || solicitacaoValida?.rua || solicitacaoValida?.id_instalacao)) {
        definirDadosNaTela(solicitacaoValida);
        localStorage.setItem(chaveCache, JSON.stringify(solicitacaoValida));
      } else {
        if (!cacheLocal) {
          definirDadosNaTela(null);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do banco:", error);
      const cacheLocal = localStorage.getItem(chaveCache);
      if (!cacheLocal) {
        definirDadosNaTela(null);
      }
    } finally {
      if (loadingPagina) setLoadingPagina(false);
    }
  }

  // 3. ENVIO DO FORMULÁRIO
  async function handleSubmit(e) {
    e.preventDefault();

    const cepLimpo = somenteNumeros(cep);
    const estadoFormatado = estado.trim().toUpperCase();

    if (!cepLimpo || !logradouro.trim() || !numero.trim() || !bairro.trim() || !cidade.trim() || !estadoFormatado) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (cepLimpo.length !== 8) {
      toast.error("CEP deve conter 8 números.");
      return;
    }

    if (estadoFormatado.length !== 2) {
      toast.error("Estado deve conter 2 letras.");
      return;
    }

    setLoadingSubmit(true);

    const payload = {
      cep: cepLimpo,
      logradouro: logradouro.trim(),
      numero: numero.trim(),
      bairro: bairro.trim(),
      cidade: cidade.trim(),
      estado: estadoFormatado,
      complemento: complemento.trim() || null,
      status: "PENDENTE",
      dataVisita: null,
      tecnico: null
    };

    const chaveCache = usuario?.email 
      ? `luminar_solicitacao_${usuario.email}` 
      : "luminar_solicitacao_guest";

    try {
      const response = await solicitarInstalacao(payload);

      if (response && (response.sucesso || response.id || response.status === 200 || response.status === 201 || response.data)) {
        toast.success("Solicitação enviada com sucesso!");
        
        const dadosDoBackend = response.dados || response.data || {};
        const dadosFinais = { ...payload, ...dadosDoBackend };
        
        definirDadosNaTela(dadosFinais);
        localStorage.setItem(chaveCache, JSON.stringify(dadosFinais));

        setTimeout(async () => {
          try {
            const checkNovo = await getMinhasInstalacoes();
            const novosDados = checkNovo?.dados || checkNovo?.data || checkNovo;
            const novaSolicitacaoValida = Array.isArray(novosDados) ? novosDados[0] : novosDados;
            
            if (checkNovo && (novaSolicitacaoValida?.cep || novaSolicitacaoValida?.logradouro || novaSolicitacaoValida?.id_instalacao)) {
              definirDadosNaTela(novaSolicitacaoValida);
              localStorage.setItem(chaveCache, JSON.stringify(novaSolicitacaoValida));
            }
          } catch (e) {
            console.log("Banco ainda processando registro, mantendo dados locais salvos na tela.");
          }
        }, 800);

      } else {
        toast.error(response?.erro || response?.mensagem || "Erro ao salvar dados.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de conexão com o servidor ao enviar.");
    } finally {
      setLoadingSubmit(false);
    }
  }

  function renderBadgeStatus(status) {
    const st = status?.toUpperCase();
    if (st === "FINALIZADA" || st === "CONCLUÍDA" || st === "CONCLUIDA") {
      return <span className="btn btn-success btn-sm px-3 rounded-pill fw-bold cursor-default pe-none">Finalizada</span>;
    }
    if (st === "PENDENTE" || st === "ANÁLISE" || st === "ANALISE" || !st) {
      return <span className={`btn btn-warning btn-sm px-3 rounded-pill fw-bold cursor-default pe-none ${styles.primaryButton}`}>Pendente</span>;
    }
    if (st === "EM_ANDAMENTO") {
      return <span className="btn btn-primary btn-sm px-3 rounded-pill fw-bold cursor-default pe-none">Em Andamento</span>;
    }
    if (st === "CANCELADA") {
      return <span className="btn btn-danger btn-sm px-3 rounded-pill fw-bold cursor-default pe-none">Cancelada</span>;
    }
    return <span className="btn btn-secondary btn-sm px-3 rounded-pill fw-bold cursor-default pe-none">{status}</span>;
  }

  if (loadingPagina) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  const dataVisitaBruta = solicitacao?.dataVisita || solicitacao?.data_visita || null;
  const dataFormatadaExibicao = formatarDataBR(dataVisitaBruta);
  
  const idDaEmpresa = solicitacao?.id_empresa || usuario?.id_empresa || null;
  const nomeDaEmpresa = solicitacao?.nome_empresa || solicitacao?.empresa?.nome || usuario?.nome_empresa || null;
  
  const tecnicoResponsavel = solicitacao?.nome_tecnico || solicitacao?.tecnico?.nome || solicitacao?.tecnico || null;

  return (
    <div className="container py-4 py-lg-5">
      <div className="row g-4 align-items-stretch">
        
        {/* ASIDE ESQUERDO (SIDEBAR INFORMATIVO) */}
        <aside className="col-lg-4">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden h-100">
            <div className={`card-body p-4 p-lg-5 text-white d-flex flex-column ${styles.sidebarCard}`}>
              
              <h1 className="display-6 fw-bold mb-5">
                {solicitacao ? "Acompanhar" : "Solicitar"} <br /> instalação
              </h1>

              <p className={`text-white-50 mb-4 ${styles.description}`}>
                {solicitacao 
                  ? "Acompanhe o andamento do seu pedido de instalação fotovoltaica e os dados do endereço cadastrado."
                  : "Informe os dados de localização onde o sistema fotovoltaico será montado para análise da nossa equipe de engenharia."
                }
              </p>

              <div className="vstack gap-3 mt-auto">
                <div className="d-flex align-items-center gap-3">
                  <div className={`rounded-circle d-flex align-items-center justify-content-center ${styles.iconCircle}`}>
                    <i className="bi bi-geo-alt-fill fs-5" />
                  </div>
                  <span>Preencha o endereço </span>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className={`rounded-circle d-flex align-items-center justify-content-center ${styles.iconCircle}`}>
                    <i className="bi bi-check-circle-fill fs-5" />
                  </div>
                  <span>Acompanhe o status </span>
                </div>
              </div>

            </div>
          </div>
        </aside>

        {/* SECTION DIREITO (CONTEÚDO DINÂMICO OU FORMULÁRIO) */}
        <section className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body p-4 p-lg-5">
              
              {solicitacao ? (
                /* --- FLUXO 1: VISUALIZAR SOLICITAÇÃO EXISTENTE --- */
                <div>
                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                    <div>
                      <h2 className={`h3 fw-bold mb-1 ${styles.title}`}>
                        Status do Pedido {solicitacao.id_instalacao ? `#${solicitacao.id_instalacao}` : ""}
                      </h2>
                      {idDaEmpresa && (
                        <p className="text-muted small mb-0">
                          <i className="bi bi-building me-1"></i>
                          Empresa Vinculada: {nomeDaEmpresa ? ` ${nomeDaEmpresa}` : ""}
                        </p>
                      )}
                    </div>
                    {renderBadgeStatus(solicitacao.status)}
                  </div>

                  <hr className="my-4 opacity-10" />

                  <div className="mb-4">
                    <h3 className="h6 fw-bold text-uppercase tracking-wider text-muted mb-5">
                      Dados do Agendamento
                    </h3>
                    <div className="row g-3 p-3 rounded-3 bg-light border">
                      <div className="col-sm-6">
                        <label className="form-label text-muted small d-block mb-1">Data da Visita</label>
                        <span className={`fw-semibold ${dataFormatadaExibicao ? "text-dark fs-5" : "text-muted fst-italic"}`}>
                          {dataFormatadaExibicao ? dataFormatadaExibicao : "Aguardando definição de data"}
                        </span>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label text-muted small d-block mb-1">Técnico Responsável</label>
                        <span className={`fw-semibold ${tecnicoResponsavel ? "text-dark fs-5" : "text-muted fst-italic"}`}>
                          {tecnicoResponsavel 
                            ? (typeof tecnicoResponsavel === "object" ? tecnicoResponsavel.nome : `${tecnicoResponsavel}`) 
                            : "Aguardando atribuição de um ADM"
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h3 className="h6 fw-bold text-uppercase tracking-wider text-muted mb-3">
                      Dados de Entrega e Montagem
                    </h3>
                    
                    <div className="row g-3">
                      <div className="col-md-4">
                        <label className="text-muted small d-block mb-1">CEP</label>
                        <span className="fw-semibold text-dark fs-5 d-block">{solicitacao.cep || cep}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="text-muted small d-block mb-1">Logradouro / Rua</label>
                        <span className="fw-semibold text-dark fs-5 d-block">{solicitacao.logradouro || logradouro}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="text-muted small d-block mb-1">Número</label>
                        <span className="fw-semibold text-dark fs-5 d-block">{solicitacao.numero || numero}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="text-muted small d-block mb-1">Bairro</label>
                        <span className="fw-semibold text-dark fs-5 d-block">{solicitacao.bairro || bairro}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="text-muted small d-block mb-1">Cidade</label>
                        <span className="fw-semibold text-dark fs-5 d-block">{solicitacao.cidade || cidade}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="text-muted small d-block mb-1">Estado</label>
                        <span className="fw-semibold text-dark fs-5 d-block text-uppercase">{solicitacao.estado || estado}</span>
                      </div>
                      {(solicitacao.complemento || complemento) && (
                        <div className="col-12">
                          <label className="text-muted small d-block mb-1">Complemento</label>
                          <span className="fw-semibold text-dark fs-5 d-block">{solicitacao.complemento || complemento}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-3 bg-light border d-flex align-items-start gap-3 mt-4">
                    <i className="bi bi-info-circle-fill text-warning fs-5 mt-1"></i>
                    <p className="text-muted small mb-0 lh-base">
                      Sua solicitação está sendo processada e analisada por um administrador. Você pode acomapanhar o status, a data da visita e o técnico responsável por aqui.
                    </p>
                  </div>
                </div>
              ) : (
                /* --- FLUXO 2: FORMULÁRIO DE CADASTRO LIMPO --- */
                <div>
                  <div className="mb-4">
                    <h2 className={`h3 fw-bold mb-2 ${styles.title}`}>
                      Dados da Instalação
                    </h2>
                    <p className="text-muted mb-0">
                      Preencha os campos obrigatórios para enviar sua solicitação de análise estrutural fotovoltaica.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-4">
                      <div className="col-md-4">
                        <label className="form-label fw-semibold">CEP *</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-3"
                          maxLength={8}
                          value={cep}
                          onChange={(e) => setCep(somenteNumeros(e.target.value).slice(0, 8))}
                          placeholder="00000000"
                          required
                        />
                      </div>

                      <div className="col-md-8">
                        <label className="form-label fw-semibold">Logradouro / Rua *</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-3"
                          maxLength={150}
                          value={logradouro}
                          onChange={(e) => setLogradouro(e.target.value)}
                          placeholder="Rua, avenida..."
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Número *</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-3"
                          maxLength={20}
                          value={numero}
                          onChange={(e) => setNumero(e.target.value)}
                          placeholder="Ex: 123"
                          required
                        />
                      </div>

                      <div className="col-md-8">
                        <label className="form-label fw-semibold">Bairro *</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-3"
                          maxLength={100}
                          value={bairro}
                          onChange={(e) => setBairro(e.target.value)}
                          placeholder="Nome do bairro"
                          required
                        />
                      </div>

                      <div className="col-md-8">
                        <label className="form-label fw-semibold">Cidade *</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-3"
                          maxLength={100}
                          value={cidade}
                          onChange={(e) => setCidade(e.target.value)}
                          placeholder="Nome da cidade"
                          required
                        />
                      </div>

                      <div className="col-md-4">
                        <label className="form-label fw-semibold">Estado *</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-3 text-uppercase"
                          maxLength={2}
                          value={estado}
                          onChange={(e) => setEstado(e.target.value)}
                          placeholder="SP"
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">Complemento</label>
                        <input
                          type="text"
                          className="form-control form-control-lg rounded-3"
                          maxLength={150}
                          value={complemento}
                          onChange={(e) => setComplemento(e.target.value)}
                          placeholder="Apto, bloco, referência..."
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-end mt-4">
                      <button
                        type="submit"
                        className={`btn btn-warning px-5 py-3 fw-bold rounded-pill shadow-sm w-100 w-sm-auto ${styles.primaryButton}`}
                        disabled={loadingSubmit}
                      >
                        {loadingSubmit ? "Processando..." : "Confirmar Solicitação"}
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        </section>

      </div>
    </div>
  );
}