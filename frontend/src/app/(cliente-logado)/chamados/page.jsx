"use client";

import React, { useState, useEffect } from 'react';
import styles from "./page.module.css";
import { abrirChamado, getMeusChamados, cancelarChamadoCliente } from "../../../api";

export default function ChamadosPage() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado do formulário baseado nos campos da Luminar
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipo: "",
    assunto: "", 
    descricao: ""
  });

  useEffect(() => {
    carregarChamados();
  }, []);

  const carregarChamados = async () => {
    setLoading(true);
    try {
      const res = await getMeusChamados();
      if (res && Array.isArray(res.dados)) {
        setChamados(res.dados);
      } else if (Array.isArray(res)) {
        setChamados(res);
      } else {
        setChamados([]);
      }
    } catch (error) {
      console.error("Erro ao carregar chamados:", error);
      setChamados([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCriarChamado = async (e) => {
    e.preventDefault();
    if (!formData.assunto.trim() || !formData.descricao.trim()) {
      return alert("Por favor, preencha o título e a descrição do problema.");
    }

    try {
      await abrirChamado(formData);
      setFormData({ nome: "", email: "", telefone: "", tipo: "", assunto: "", descricao: "" });
      setIsModalOpen(false); // Fecha a modal após o sucesso
      alert("Chamado técnico aberto com sucesso!");
      carregarChamados(); 
    } catch (error) {
      alert("Erro ao abrir chamado. Tente novamente.");
    }
  };

  const handleCancelar = async (id) => {
    if (!confirm("Deseja realmente cancelar este chamado?")) return;
    try {
      await cancelarChamadoCliente(id);
      alert("Chamado cancelado com sucesso.");
      carregarChamados();
    } catch (error) {
      alert("Não foi possível cancelar o chamado.");
    }
  };

  return (
    <>
      <div className={`d-flex flex-column min-vh-100 ${styles.page}`}>
        <main className={`flex-grow-1 py-5 px-3 ${styles.main}`}>
          
          <div className={`container p-4 ${styles.shell}`}>
            
            {/* CABEÇALHO DO PAINEL */}
            <div className="d-flex justify-content-between align-items-center border-bottom pb-4 mb-4">
              <div>
                <h1 className={`fw-bold m-0 ${styles.pageTitle}`}>
                  Suporte & <span className={styles.highlight}>Chamados</span>
                </h1>
                <p className="text-secondary m-0 small mt-1">
                  Gerencie e acompanhe suas solicitações técnicas Luminar.
                </p>
              </div>
              <button 
                className={`btn fw-bold px-4 py-2 ${styles.openModalButton}`}
                onClick={() => setIsModalOpen(true)}
              >
                <i className="bi bi-plus-lg me-2"></i> Abrir Chamado
              </button>
            </div>

            {/* LISTAGEM DE CHAMADOS EM CARDS ELEGANTES */}
            {loading ? (
              <div className="text-center py-5 text-secondary">
                <div className="spinner-border text-warning mb-3" role="status"></div>
                <p>Buscando seus chamados...</p>
              </div>
            ) : chamados.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                <i className="bi bi-folder-x fs-1 text-muted"></i>
                <p className="mt-3">Nenhum chamado aberto encontrado para esta conta.</p>
              </div>
            ) : (
              <div className="row g-4">
                {chamados.map((chamado) => (
                  <div className="col-md-6 col-lg-4" key={chamado.id}>
                    <div className={`card h-100 p-4 border-0 position-relative ${styles.chamadoCard}`}>
                      
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className={`fw-bold small ${styles.cardId}`}>#{chamado.id}</span>
                        <div className="d-flex gap-2">
                          {chamado.prioridade && (
                            <span className={`${styles.badge} ${styles[chamado.prioridade.toUpperCase()]}`}>
                              {chamado.prioridade}
                            </span>
                          )}
                          <span className={`${styles.badge} ${styles[chamado.status.toUpperCase()]}`}>
                            {chamado.status}
                          </span>
                        </div>
                      </div>

                      <h4 className={`h5 fw-bold mb-2 ${styles.cardTitle}`}>{chamado.assunto}</h4>
                      <p className={`small mb-4 ${styles.cardDesc}`}>{chamado.descricao}</p>

                      <div className="mt-auto pt-3 border-top d-flex justify-content-end">
                        {chamado.status === "ABERTO" ? (
                          <button
                            onClick={() => handleCancelar(chamado.id)}
                            className={`btn btn-sm ${styles.cancelButton}`}
                          >
                            Cancelar Solicitação
                          </button>
                        ) : (
                          <span className="text-muted small italic">Em análise técnica</span>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* JANELA MODAL (ABRIR CHAMADO) */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={`shadow-lg border-0 ${styles.modalShell}`}>
            
            <div className={`p-4 d-flex justify-content-between align-items-center ${styles.modalHeader}`}>
              <h3 className="m-0 fw-bold text-white h5">
                Nova Solicitação de <span className={styles.highlight}>Suporte</span>
              </h3>
              <button 
                className={styles.closeModalButton} 
                onClick={() => setIsModalOpen(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="p-4">
              <form onSubmit={handleCriarChamado}>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-secondary">Nome</label>
                    <input
                      type="text"
                      className={`form-control ${styles.field}`}
                      placeholder="Seu nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-secondary">E-mail</label>
                    <input
                      type="email"
                      className={`form-control ${styles.field}`}
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-secondary">Telefone</label>
                    <input
                      type="text"
                      className={`form-control ${styles.field}`}
                      placeholder="(00) 00000-0000"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-secondary">Tipo do chamado</label>
                    <select
                      className={`form-select ${styles.field}`}
                      value={formData.tipo}
                      onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                    >
                      <option value="">Selecione...</option>
                      <option value="manutencao">Manutenção</option>
                      <option value="limpeza">Limpeza</option>
                      <option value="emergencia">Emergência</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold small text-secondary">Título do problema</label>
                  <input
                    type="text"
                    className={`form-control ${styles.field}`}
                    placeholder="Ex: Inversor piscando luz vermelha"
                    value={formData.assunto}
                    onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold small text-secondary">Descrição detalhada</label>
                  <textarea
                    className={`form-control ${styles.field} ${styles.textarea}`}
                    rows="4"
                    placeholder="Descreva o que houve com o máximo de detalhes..."
                    value={formData.descricao}
                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className={`btn fw-bold w-100 py-3 ${styles.submitButton}`}>
                  Enviar Chamado Técnico
                </button>
              </form>
            </div>

          </div>
        </div>
      )}
    </>
  );
}