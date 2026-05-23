'use client'; // Avisa o Next.js que essa tela roda no navegador

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function RegisterPage() {
  // 1. MEMÓRIA DA TELA (States)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const tipo = "CLIENTE";
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const router = useRouter();

  // 2. FUNÇÃO DE REGISTRO
  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');
    
    // Validação básica de senhas no Front
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem!');
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch('http://localhost:3001/api/auth/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, tipo, senha }), 
      });

      // Lendo o Content-Type de forma segura
      const contentType = resposta.headers.get("content-type");
      let resultado = {};
      
      if (contentType && contentType.includes("application/json")) {
        resultado = await resposta.json();
      }

      if (!resposta.ok) {
        // Se o backend retornou um erro estruturado, exibe a "mensagem", senão usa o fallback
        throw new Error(resultado.mensagem || 'Erro interno no servidor (500). Verifique o console do Backend.');
      }

      // SE DEU CERTO:
      alert('Conta criada com sucesso!');
      router.push('/login'); 

    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setErro("Não foi possível conectar ao servidor. O backend está ligado?");
      } else {
        setErro(err.message);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <>
      <Header/>

      <div
        className="container-fluid min-vh-100 d-flex align-items-center position-relative overflow-hidden p-0"
        style={{
          backgroundColor: "#ffffff",
          fontFamily: "'Poppins', sans-serif",
          marginTop: "-1px",
        }}
      >

        {/* ONDA AMARELA SUPERIOR ESQUERDA */}
        <div
          className="position-absolute top-0 start-0 w-50"
          style={{ zIndex: 1, pointerEvents: "none" }}
        >
          <svg
            viewBox="0 0 500 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "auto" }}
          >
            <path d="M0 0H500C400 120 250 50 150 180C70 260 0 220 0 300V0Z" fill="#FFC107" opacity="0.2" />
            <path d="M0 0H450C350 90 220 30 120 140C50 210 0 180 0 250V0Z" fill="#FFC107" opacity="0.4" />
            <path d="M0 0H400C300 70 200 10 100 110C40 170 0 140 0 200V0Z" fill="#FFC107" />
          </svg>
        </div>

        {/* ONDA ESCURA INFERIOR DIREITA */}
        <div
          className="position-absolute bottom-0 end-0 w-50"
          style={{ zIndex: 1, pointerEvents: "none" }}
        >
          <svg
            viewBox="0 0 500 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              width: "100%",
              height: "auto",
              transform: "rotate(180deg)",
            }}
          >
            <path d="M0 0H500C400 120 250 50 150 180C70 260 0 220 0 300V0Z" fill="#221f20" opacity="0.2" />
            <path d="M0 0H450C350 90 220 30 120 140C50 210 0 180 0 250V0Z" fill="#221f20" opacity="0.4" />
            <path d="M0 0H400C300 70 200 10 100 110C40 170 0 140 0 200V0Z" fill="#221f20" />
          </svg>
        </div>

        <div className="container position-relative px-4 px-md-5" style={{ zIndex: 2 }}>
          <div className="row align-items-center gy-5">

            {/* COLUNA DA ESQUERDA */}
            <div className="col-lg-6 d-flex flex-column justify-content-center" style={{ minHeight: "650px" }}>
              <div
                className="mx-auto mx-lg-0 mb-4 d-flex align-items-center justify-content-center position-relative"
                style={{
                  width: "100%",
                  maxWidth: "520px",
                  height: "340px",
                  borderRadius: "43% 57% 41% 59% / 57% 45% 55% 43%",
                  boxShadow: "0 18px 40px #756f72",
                  overflow: "hidden",
                  background: "#fff",
                }}
              >
                <img src="/painelsolar.jpg" alt="Cadastro Luminar" style={{ width: "120%", height: "120%", objectFit: "contain" }} />
              </div>

              <div className="text-start" style={{ maxWidth: "620px", marginTop: "20px", paddingLeft: "8px" }}>
                <h1 style={{ fontSize: "4.2rem", lineHeight: "1", fontWeight: "900", marginBottom: "18px", color: "#221f20" }}>
                  Junte-se à <span style={{ color: "#f5bd31" }}>Luminar</span>
                </h1>
                <p style={{ fontSize: "2rem", color: "#221f20", lineHeight: "1.15", margin: 0 }}>
                  Comece sua jornada rumo à independência energética hoje mesmo.
                </p>
              </div>
            </div>

            {/* COLUNA DO FORMULÁRIO (CADASTRO) */}
            <div className="col-lg-5 offset-lg-1 d-flex justify-content-center justify-content-lg-end">
              <div
                className="bg-white p-5 rounded-4"
                style={{
                  width: "100%",
                  maxWidth: "470px",
                  boxShadow: "0 25px 50px #756f72",
                  border: "1px solid #221f20",
                }}
              >
                <h2 className="fs-3 fw-normal mb-5" style={{ color: "#221f20" }}>
                  <strong style={{ color: "#221f20", fontWeight: "700" }}>Criar conta</strong>
                </h2>

                <form onSubmit={handleRegister}>
                  {erro && (
                    <div className="alert alert-danger py-2 small text-center" role="alert">
                      {erro}
                    </div>
                  )}

                  {/* CAMPO NOME */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary mb-2">Nome Completo</label>
                    <input
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{ borderColor: "#221f20", borderBottomWidth: "2px", fontSize: "1.05rem", paddingBottom: "12px" }}
                    />
                  </div>

                  {/* CAMPO E-MAIL */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary mb-2">E-mail</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{ borderColor: "#221f20", borderBottomWidth: "2px", fontSize: "1.05rem", paddingBottom: "12px" }}
                    />
                  </div>

                  {/* CAMPO SENHA */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary mb-2">Senha</label>
                    <input
                      type="password"
                      required
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{ borderColor: "#221f20", borderBottomWidth: "2px", fontSize: "1.05rem", paddingBottom: "12px" }}
                    />
                  </div>

                  {/* CAMPO CONFIRMAR SENHA */}
                  <div className="mb-5">
                    <label className="form-label small fw-bold text-secondary mb-2">Confirmar Senha</label>
                    <input
                      type="password"
                      required
                      value={confirmarSenha}
                      onChange={(e) => setConfirmarSenha(e.target.value)}
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{ borderColor: "#221f20", borderBottomWidth: "2px", fontSize: "1.05rem", paddingBottom: "12px" }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={carregando}
                    className="btn w-100 py-3 rounded-pill fw-bold shadow-sm mb-4"
                    style={{
                      backgroundColor: "#febd17",
                      color: "#221f20",
                      border: "none",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                  >
                    {carregando ? 'Criando conta...' : 'Cadastrar agora'}
                  </button>

                  <div className="text-center">
                    <span className="small text-muted">Já tem uma conta? </span>
                    <a
                      href="/login"
                      className="text-decoration-none small"
                      style={{ color: "#f5bd31", fontWeight: "700" }}
                    >
                      Faça login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}