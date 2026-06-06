"use client";

import React, { useState } from "react";
import { criarFaleConosco } from "../../../api";
import { toast } from "sonner";
import styles from "./page.module.css";

export default function FaleConosco() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); // Impede o reload da página

    // Validação usando as chaves corretas do seu estado
    if (
      !formData.nome.trim() ||
      !formData.email.trim() ||
      !formData.mensagem.trim()
    ) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Formato de email inválido.");
      return;
    }

    setLoading(true);

    try {
      const response = await criarFaleConosco({
      nome_completo: formData.nome, // Passa o valor do seu state para a chave que o backend espera
      email: formData.email,
      telefone: formData.telefone,
      mensagem: formData.mensagem
    });

      if (response.sucesso) {
        setShowModal(true);
        setModalLoading(true);
        setResultado(null);

        setTimeout(() => {
          setResultado(response.dados);
          setModalLoading(false);
        }, 5000);

        toast.success("Mensagem enviada com sucesso!");

        // Limpa o formulário resetando o estado
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          mensagem: "",
        });
      } else {
        toast.error(response.erro || "Erro ao enviar mensagem.");
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        className={`d-flex flex-column min-vh-100 ${styles.page}`}
      >
        {/* CONTEÚDO */}
        <main className={`flex-grow-1 py-9 px-3 ${styles.main}`}>
          <div
            className={`container overflow-hidden shadow-lg p-0 ${styles.shell}`}
          >
            <div className="row g-0">
              {/* ESQUERDA */}
              <div
                className={`col-lg-5 text-white d-flex flex-column justify-content-center ${styles.formPanel}`}
              >
                {/* TÍTULO */}
                <h1
                  className={`fw-bold mb-3 ${styles.title}`}
                >
                  <span className={styles.highlight}>Fale Conosco</span>
                </h1>

                <p
                  className={`mb-5 ${styles.description}`}
                >
                  Tem dúvidas, sugestões ou deseja conhecer melhor a Luminar? Estamos prontos para te atender!
                </p>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                  {/* INPUT NOME */}
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control border-0 ${styles.input}`}
                      placeholder="Nome completo"
                      value={formData.nome}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nome: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* INPUT EMAIL */}
                  <div className="mb-3">
                    <input
                      type="email"
                      className={`form-control border-0 ${styles.input}`}
                      placeholder="E-mail"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* INPUT TELEFONE */}
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control border-0 ${styles.input}`}
                      placeholder="Telefone (opcional)"
                      value={formData.telefone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          telefone: e.target.value,
                        })
                      }
                    />
                  </div>

                  {/* TEXTAREA MENSAGEM */}
                  <div className="mb-4">
                    <textarea
                      className={`form-control border-0 ${styles.textarea}`}
                      rows="4"
                      placeholder="Sua mensagem"
                      value={formData.mensagem}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mensagem: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>

                  {/* BOTÃO DE SUBMIT */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn fw-bold w-100 py-2 ${styles.submitButton}`}
                  >
                    <i className="bi bi-send me-2"></i>
                    {loading ? "Enviando..." : "Enviar mensagem"}
                  </button>
                </form>
              </div>

              {/* DIREITA */}
              <div
                className={`col-lg-7 position-relative d-flex flex-column justify-content-between ${styles.imagePanel}`}
              >
                {/* LOGO CENTRAL */}
                <div className={`text-center ${styles.logoWrap}`}>
                  <img
                    src="logo-luminar-removebg-preview.png"
                    alt="Luminar"
                    className={`img-fluid ${styles.logo}`}
                  />
                </div>

                {/* FEATURES */}
                <div className="row text-center text-white mt-auto">
                  <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
                  />
                  <div className="col-md-4 mb-4">
                    <div
                      className={`mx-auto mb-3 d-flex align-items-center justify-content-center ${styles.featureIcon}`}
                    >
                      <i className="bi bi-headset"></i>
                    </div>
                    <h4 className="fw-bold mb-3">Atendimento Especializado</h4>
                  </div>

                  <div className="col-md-4 mb-4">
                    <div
                      className={`mx-auto mb-3 d-flex align-items-center justify-content-center ${styles.featureIcon}`}
                    >
                      <i className="bi bi-sun"></i>
                    </div>
                    <h4 className="fw-bold mb-3">Energia <br /> Sustentável</h4>
                  </div>

                  <div className="col-md-4 mb-4">
                    <div
                      className={`mx-auto mb-3 d-flex align-items-center justify-content-center ${styles.featureIcon}`}
                    >
                      <i className="bi bi-lightning-charge"></i>
                    </div>
                    <h4 className="fw-bold mb-3">Resposta <br /> Rápida</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}