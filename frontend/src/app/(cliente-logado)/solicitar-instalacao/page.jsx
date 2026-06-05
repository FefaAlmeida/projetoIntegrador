"use client";

import { useState, useEffect } from "react";
import { solicitarInstalacao, getMinhaInstalacao, getPerfil } from "../../../api";
import { toast } from "sonner";

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

      // Só busca os dados de instalação após tentar saber quem é o usuário
      await carregarDadosInstalacao(usuarioAtual);
    }

    inicializarPagina();
  }, []);

  // 2. CARREGAMENTO DOS DADOS DE INSTALAÇÃO ISOLADO POR USUÁRIO
  async function carregarDadosInstalacao(usuarioAtual) {
    // Define a chave única do localStorage usando o e-mail do usuário (se logado)
    const chaveCache = usuarioAtual?.email 
      ? `luminar_solicitacao_${usuarioAtual.email}` 
      : "luminar_solicitacao_guest";

    try {
      // Tenta recuperar do localStorage específico deste usuário
      const cacheLocal = localStorage.getItem(chaveCache);
      if (cacheLocal) {
        definirDadosNaTela(JSON.parse(cacheLocal));
      }

      const response = await getMinhaInstalacao();
      const dadosTratados = response?.dados || response?.data || response;
      
      if (response && (dadosTratados?.cep || dadosTratados?.logradouro || dadosTratados?.rua)) {
        definirDadosNaTela(dadosTratados);
        // Sincroniza o cache local específico do usuário com o banco
        localStorage.setItem(chaveCache, JSON.stringify(dadosTratados));
      } else {
        // Se o banco retornar 404/vazio e não houver cache para ESTE usuário, limpamos a tela
        if (!cacheLocal) {
          definirDadosNaTela(null);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar dados do banco:", error);
      // Se a API der 404 porque o usuário novo não tem instalação, limpamos a tela se não houver cache dele
      const cacheLocal = localStorage.getItem(chaveCache);
      if (!cacheLocal) {
        definirDadosNaTela(null);
      }
    } finally {
      setLoadingPagina(false);
    }
  }

  // 3. ENVIO DO FORMULÁRIO (SALVANDO NO CACHE ISOLADO)
  async function handleSubmit(e) {
    e.preventDefault();

    if (!cep || !logradouro || !numero || !bairro || !cidade || !estado) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoadingSubmit(true);

    const payload = {
      cep: cep.trim(),
      logradouro: logradouro.trim(),
      numero: numero.trim(),
      bairro: bairro.trim(),
      cidade: city => cidade.trim(),
      cidade: cidade.trim(),
      estado: estado.trim().toUpperCase(),
      complemento: complemento.trim() || null,
      status: "Análise",
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
        
        const dadosFinais = response.dados && Object.keys(response.dados).length > 2 ? response.dados : payload;
        
        definirDadosNaTela(dadosFinais);
        
        // SALVA NO CACHE LOCAL ISOLADO DO USUÁRIO
        localStorage.setItem(chaveCache, JSON.stringify(dadosFinais));

        try {
          const checkNovo = await getMinhaInstalacao();
          const novosDados = checkNovo?.dados || checkNovo?.data || checkNovo;
          if (checkNovo && (novosDados?.cep || novosDados?.logradouro)) {
            definirDadosNaTela(novosDados);
            localStorage.setItem(chaveCache, JSON.stringify(novosDados));
          }
        } catch (e) {
          console.log("Banco ainda processando registro, mantendo dados locais salvos na tela.");
        }

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
    const st = status?.toLowerCase();
    if (st === "concluido" || st === "concluída") return <span className="badge bg-success px-3 py-2 rounded-pill">Concluída</span>;
    if (st === "analise" || st === "pendente" || !st) return <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">Em Análise Técnica</span>;
    if (st === "agendado") return <span className="badge bg-primary px-3 py-2 rounded-pill">Visita Agendada</span>;
    return <span className="badge bg-secondary px-3 py-2 rounded-pill">{status}</span>;
  }

  if (loadingPagina) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: "#ececec" }}>
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        backgroundColor: "#ececec",
        overflowX: "hidden",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <main className="flex-grow-1 py-5 px-3" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div
          className="container shadow-lg p-0 overflow-hidden"
          style={{ maxWidth: "1100px", borderRadius: "28px", backgroundColor: "#ffffff" }}
        >
          <div className="row g-0">
            
            {/* ESQUERDA */}
            <div className="col-lg-5 text-white d-flex flex-column justify-content-center p-5" style={{ backgroundColor: "#221f20" }}>
              <h1 className="fw-bold mb-4" style={{ fontSize: "3rem", lineHeight: "1.1" }}>
                {solicitacao ? "Acompanhar" : "Solicitar"} <br />
                <span style={{ color: "#febd17" }}>Instalação</span>
              </h1>

              <p className="mb-4" style={{ color: "#d4d4d4", fontSize: "1.1rem", lineHeight: "1.7" }}>
                {solicitacao 
                  ? "Acompanhe o andamento do seu pedido de instalação fotovoltaica e os dados do endereço cadastrado."
                  : "Informe os dados de localização onde o sistema fotovoltaico será montado para análise da nossa equipe de engenharia."
                }
              </p>

              <div className="mt-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px", backgroundColor: "rgba(254, 189, 23, 0.2)", color: "#febd17" }}>
                    <i className="bi bi-geo-alt fs-4"></i>
                  </div>
                  <span>Mapeamento via satélite</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: "45px", height: "45px", backgroundColor: "rgba(254, 189, 23, 0.2)", color: "#febd17" }}>
                    <i className="bi bi-shield-check fs-4"></i>
                  </div>
                  <span>Garantia estrutural Luminar</span>
                </div>
              </div>
            </div>

            {/* DIREITA */}
            <div className="col-lg-7 p-5">
              {solicitacao ? (
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-3">
                    <h2 className="fw-bold m-0" style={{ color: "#221f20" }}>Status do Pedido</h2>
                    {renderBadgeStatus(solicitacao.status)}
                  </div>

                  <p className="text-secondary small fw-bold text-uppercase tracking-wider mb-3">Dados do Agendamento</p>
                  <div className="row g-4 mb-5 p-4 rounded-3 border" style={{ backgroundColor: "#fdfdfd" }}>
                    <div className="col-md-6">
                      <label className="text-muted d-block small mb-1">
                        <i className="bi bi-calendar-event me-2 text-warning"></i>Data da Visita
                      </label>
                      <span className={`fw-semibold fs-5 ${solicitacao.dataVisita ? "text-dark" : "text-muted fs-6 italic"}`}>
                        {solicitacao.dataVisita ? solicitacao.dataVisita : "Aguardando definição de data"}
                      </span>
                    </div>

                    <div className="col-md-6">
                      <label className="text-muted d-block small mb-1">
                        <i className="bi bi-person-badge me-2 text-warning"></i>Técnico Responsável
                      </label>
                      <span className={`fw-semibold fs-5 ${solicitacao.tecnico ? "text-dark" : "text-muted fs-6"}`}>
                        {solicitacao.tecnico ? solicitacao.tecnico : "Aguardando atribuição de um ADM"}
                      </span>
                    </div>
                  </div>

                  <p className="text-secondary small fw-bold text-uppercase tracking-wider mb-4">Dados de Entrega e Montagem</p>

                  <div className="row g-4 mb-5">
                    <div className="col-md-6">
                      <label className="text-muted d-block small mb-1">CEP</label>
                      <span className="fw-semibold text-dark fs-5">{solicitacao.cep || cep}</span>
                    </div>

                    <div className="col-md-6">
                      <label className="text-muted d-block small mb-1">Número</label>
                      <span className="fw-semibold text-dark fs-5">{solicitacao.numero || numero}</span>
                    </div>

                    <div className="col-12">
                      <label className="text-muted d-block small mb-1">Logradouro / Rua</label>
                      <span className="fw-semibold text-dark fs-5">{solicitacao.logradouro || logradouro}</span>
                    </div>

                    <div className="col-md-6">
                      <label className="text-muted d-block small mb-1">Bairro</label>
                      <span className="fw-semibold text-dark fs-5">{solicitacao.bairro || bairro}</span>
                    </div>

                    <div className="col-md-6">
                      <label className="text-muted d-block small mb-1">Cidade / UF</label>
                      <span className="fw-semibold text-dark fs-5">
                        {(solicitacao.cidade || cidade)} — {(solicitacao.estado || estado)}
                      </span>
                    </div>

                    {(solicitacao.complemento || complemento) && (
                      <div className="col-12">
                        <label className="text-muted d-block small mb-1">Complemento</label>
                        <span className="fw-semibold text-dark fs-5">{solicitacao.complemento || complemento}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-3 bg-light border border-dashed d-flex align-items-start">
                    <i className="bi bi-info-circle text-warning fs-4 me-3 mt-1"></i>
                    <p className="text-secondary small m-0" style={{ lineHeight: "1.5" }}>
                      Sua solicitação está sendo processada por nosso departamento de engenharia. Você receberá uma notificação assim que a visita técnica for completamente agendada.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="fw-bold mb-5" style={{ color: "#221f20" }}>Dados do Endereço</h2>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">CEP *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="00000-000"
                        maxLength="9"
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold small text-secondary">Número *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ex: 123"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Logradouro / Rua *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Rua, Avenida..."
                      value={logradouro}
                      onChange={(e) => setLogradouro(e.target.value)}
                      style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold small text-secondary">Bairro *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Seu bairro"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label fw-bold small text-secondary">Cidade *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Sua cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                      />
                    </div>

                    <div className="col-md-4 mb-3">
                      <label className="form-label fw-bold small text-secondary">Estado (UF) *</label>
                      <input
                        type="text"
                        className="form-control text-uppercase"
                        placeholder="SP"
                        maxLength="2"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-bold small text-secondary">Complemento</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Apto, Bloco, Casa (Opcional)"
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      style={{ borderRadius: "10px", padding: "12px", border: "1px solid #ddd" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn fw-bold w-100 py-3 mt-2"
                    disabled={loadingSubmit}
                    style={{
                      backgroundColor: "#febd17",
                      color: "#221f20",
                      borderRadius: "14px",
                      fontSize: "1.1rem",
                      border: "none",
                      boxShadow: "0 4px 15px rgba(254, 189, 23, 0.3)",
                    }}
                  >
                    {loadingSubmit ? "Processando..." : "Confirmar Solicitação"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}