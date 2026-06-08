"use client";

import React, { useState, useEffect } from "react";
import { getFaleConosco, responderFaleConosco } from "../../../api";
import { toast } from "sonner";
import "./mensagens.css";

export default function ChamadosPage() {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [mensagens, setMensagens] = useState([]);
    const [paginacao, setPaginacao] = useState({});
    const [loading, setLoading] = useState(true);
    const [mensagemSelecionada, setMensagemSelecionada] = useState(null);
    const [resposta, setResposta] = useState("");
    const [enviandoResposta, setEnviandoResposta] = useState(false);
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("TODAS"); // TODAS | PENDENTE | RESPONDIDO
    const [ordem, setOrdem] = useState("RECENTES"); // RECENTES | ANTIGAS

    useEffect(() => {
        carregarMensagens();
    }, [paginaAtual]);

    async function carregarMensagens() {
        setLoading(true);
        try {
            const response = await getFaleConosco(paginaAtual);
            if (response.sucesso) {
                setMensagens(response.dados);
                setPaginacao(response.paginacao);
            } else {
                toast.error(response.erro || "Erro ao carregar mensagens.");
            }
        } catch (error) {
            toast.error("Erro ao conectar com o servidor.");
        } finally {
            setLoading(false);
        }
    }

    async function handleEnviarResposta() {
        if (!resposta.trim()) {
            toast.error("Digite uma resposta antes de enviar.");
            return;
        }

        setEnviandoResposta(true);
        try {
            const response = await responderFaleConosco(mensagemSelecionada.id_contato, resposta);
            if (response.sucesso) {
                toast.success("Resposta enviada com sucesso por e-mail!");
                setMensagemSelecionada(null);
                setResposta("");
                carregarMensagens();
            } else {
                toast.error(response.erro || "Erro ao enviar resposta.");
            }
        } catch (error) {
            toast.error("Erro técnico ao enviar e-mail.");
        } finally {
            setEnviandoResposta(false);
        }
    }

    const getInitials = (name) => {
        if (!name) return "??";
        const names = name.split(' ');
        if (names.length >= 2) return (names[0][0] + names[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    const formatarData = (dataStr) => {
        if (!dataStr) return "";
        const data = new Date(dataStr);
        return data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="mensagens-container">
            {/* MODAL DE RESPOSTA */}
            {mensagemSelecionada && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal-content">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h2 className="fw-extrabold m-0">Responder Cliente</h2>
                            <button 
                                onClick={() => setMensagemSelecionada(null)}
                                className="btn-close shadow-none"
                            ></button>
                        </div>

                        <div className="modal-mensagem-original shadow-sm">
                            <p className="small text-muted mb-1">Mensagem de <strong>{mensagemSelecionada.nome_completo}</strong>:</p>
                            <p className="m-0 text-dark italic">"{mensagemSelecionada.mensagem}"</p>
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Sua Resposta</label>
                            <textarea
                                className="form-control border-light shadow-sm resposta-textarea"
                                rows="5"
                                value={resposta}
                                onChange={(e) => setResposta(e.target.value)}
                                placeholder="A resposta será enviada para o e-mail do cliente..."
                            />
                        </div>

                        <div className="d-flex gap-3">
                            <button
                                onClick={() => setMensagemSelecionada(null)}
                                className="btn btn-light flex-grow-1 py-3 fw-bold shadow-sm btn-modal-cancelar"
                            >Cancelar</button>
                            <button
                                onClick={handleEnviarResposta}
                                disabled={enviandoResposta}
                                className="btn btn-luminar flex-grow-1 py-3"
                            >
                                {enviandoResposta ? "Enviando e-mail..." : "Enviar Resposta"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container-fluid p-0">
                {/* TOPO */}
                <div className="mensagens-header mb-5">
                    <h1 className="mb-2">Mensagens</h1>
                    <p className="m-0">Centralize e gerencie todas as mensagens recebidas pelo Fale Conosco.</p>
                </div>

                {/* CARD DE RESUMO */}
                <div className="stats-card d-inline-flex align-items-center shadow-sm mb-4">
                    <div className="stats-icon me-3">
                        <i className="bi bi-chat-left-dots-fill fs-4"></i>
                    </div>
                    <div>
                        <h2 className="m-0 fw-bold">{paginacao.total || 0}</h2>
                        <span className="text-muted">Total de Mensagens</span>
                    </div>
                </div>

                {/* LISTA DE MENSAGENS */}
                <div className="row g-4">
                    {loading ? (
                        <div className="col-12 text-center py-5">
                            <div className="spinner-border text-warning" role="status"></div>
                            <p className="mt-3 text-muted">Buscando mensagens no banco de dados...</p>
                        </div>
                    ) : mensagens.length === 0 ? (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted fs-5">Nenhuma mensagem recebida ainda.</p>
                        </div>
                    ) : (
                        mensagens.map((item) => (
                            <div key={item.id_contato} className="col-12">
                                <div className={`mensagem-item shadow-sm d-flex align-items-center ${item.status_contato === 'RESPONDIDO' ? 'respondido' : ''}`}>
                                    {item.status_contato === 'PENDENTE' && <div className="mensagem-item-pendente-bar"></div>}
                                    
                                    <div className={`avatar-mensagens me-4 d-none d-md-flex ${item.status_contato === 'PENDENTE' ? 'avatar-pendente' : 'avatar-respondido'}`}>
                                        {getInitials(item.nome_completo)}
                                    </div>

                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start mb-1">
                                            <h3 className="h5 fw-bold m-0">{item.nome_completo}</h3>
                                            <span className="small text-muted">{formatarData(item.data_contato)}</span>
                                        </div>
                                        <p className="small text-muted mb-3">{item.email} • {item.telefone || "Sem telefone"}</p>
                                        <p className="mb-0 text-dark fs-6">{item.mensagem}</p>
                                        
                                        {item.resposta_adm && (
                                            <div className="resposta-box shadow-sm mt-3">
                                                <p className="m-0 small"><strong>Sua resposta:</strong> {item.resposta_adm}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="ms-4">
                                        {item.status_contato === 'PENDENTE' ? (
                                            <button
                                                onClick={() => setMensagemSelecionada(item)}
                                                className="btn btn-luminar px-4 py-2"
                                            >Responder</button>
                                        ) : (
                                            <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 fs-6">Respondido</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* PAGINAÇÃO */}
                {paginacao.totalPaginas > 1 && (
                    <nav className="mt-5 d-flex justify-content-center">
                        <ul className="pagination gap-2 border-0">
                            {Array.from({ length: paginacao.totalPaginas }, (_, i) => i + 1).map((n) => (
                                <li key={n} className={`page-item ${paginaAtual === n ? 'active' : ''}`}>
                                    <button 
                                        onClick={() => setPaginaAtual(n)} 
                                        className={`page-link border-0 shadow-sm fw-bold pagination-button ${paginaAtual === n ? 'bg-warning text-dark' : 'text-dark'}`}
                                    >{n}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    );
}