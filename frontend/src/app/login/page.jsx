'use client'; // Avisa o Next.js que essa tela roda no navegador e tem interações

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  const validarLocal = () => {
    const emailTrim = email.trim();
    if (!emailTrim) {
      toast.error('Informe seu e-mail');
      return false;
    }
    if (!EMAIL_REGEX.test(emailTrim)) {
      toast.error('Formato de e-mail inválido');
      return false;
    }
    if (!senha) {
      toast.error('Informe sua senha');
      return false;
    }
    if (senha.length < 6) {
      toast.error('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validarLocal()) return;

    setCarregando(true);
    const loadingId = toast.loading('Verificando credenciais...');

    try {
      const resposta = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), senha }),
      });

      const contentType = resposta.headers.get('content-type') || '';
      const resultado = contentType.includes('application/json') ? await resposta.json() : {};

      if (!resposta.ok) {
        throw new Error(resultado.mensagem || 'Falha na autenticação');
      }

      localStorage.setItem('@luminar:token', resultado.dados.token);
      localStorage.setItem('@luminar:user', JSON.stringify(resultado.dados.usuario));
      window.dispatchEvent(new Event('auth-changed'));

      toast.success(`Bem-vindo(a), ${resultado.dados.usuario.nome || 'usuário'}!`, { id: loadingId });
      router.push('/');
    } catch (err) {
      const msg = err.message.includes('Failed to fetch')
        ? 'Não foi possível conectar ao servidor. O backend está ligado?'
        : err.message;
      toast.error(msg, { id: loadingId });
    } finally {
      setCarregando(false);
    }
  };

  // 3. ESTRUTURA VISUAL DA SUA TELA
  return (
    <>
  
      <div
        className="container-fluid min-vh-100 d-flex align-items-center position-relative overflow-hidden p-0"
        style={{
          backgroundColor: "#ffffff",
          fontFamily: "'Poppins', sans-serif",
          marginTop: "-1px",
        }}
      >

        {/* ONDA ROXA SUPERIOR ESQUERDA */}
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
            <path
              d="M0 0H500C400 120 250 50 150 180C70 260 0 220 0 300V0Z"
              fill="#FFC107"
              opacity="0.2"
            />
            <path
              d="M0 0H450C350 90 220 30 120 140C50 210 0 180 0 250V0Z"
              fill="#FFC107"
              opacity="0.4"
            />
            <path
              d="M0 0H400C300 70 200 10 100 110C40 170 0 140 0 200V0Z"
              fill="#FFC107"
            />
          </svg>
        </div>

        {/* ONDA ROXA INFERIOR DIREITA */}
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
            <path
              d="M0 0H500C400 120 250 50 150 180C70 260 0 220 0 300V0Z"
              fill="#221f20"
              opacity="0.2"
            />
            <path
              d="M0 0H450C350 90 220 30 120 140C50 210 0 180 0 250V0Z"
              fill="#221f20"
              opacity="0.4"
            />
            <path
              d="M0 0H400C300 70 200 10 100 110C40 170 0 140 0 200V0Z"
              fill="#221f20"
            />
          </svg>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div
          className="container position-relative px-4 px-md-5"
          style={{ zIndex: 2 }}
        >
          <div className="row align-items-center gy-5">

            {/* COLUNA DA ESQUERDA (IMAGEM E MARKETING) */}
            <div
              className="col-lg-6 position-relative d-flex flex-column justify-content-center"
              style={{
                minHeight: "650px",
              }}
            >
              {/* BLOB DA IMAGEM */}
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
                <img
                  src="/painelsolar.jpg"
                  alt="Painel Solar Luminar"
                  style={{
                    width: "120%",
                    height: "120%",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* TEXTO INFORMATIVO */}
              <div
                className="text-start"
                style={{
                  maxWidth: "620px",
                  marginTop: "20px",
                  paddingLeft: "8px",
                }}
              >
                <h1
                  style={{
                    fontSize: "4.2rem",
                    lineHeight: "1",
                    fontWeight: "900",
                    marginBottom: "18px",
                    color: "#221f20",
                  }}
                >
                  Energia{" "}
                  <span style={{ color: "#f5bd31" }}>
                    Solar
                  </span>
                </h1>

                <p
                  style={{
                    fontSize: "2rem",
                    color: "#221f20",
                    lineHeight: "1.15",
                    margin: 0,
                  }}
                >
                  Reduza sua conta de luz com tecnologia limpa e sustentável
                </p>
              </div>
            </div>

            {/* COLUNA DA DIREITA (O FORMULÁRIO DE LOGIN DE FATO) */}
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
                {/* TÍTULO INTERNO */}
                <h2
                  className="fs-3 fw-normal mb-5"
                  style={{ color: "#221f20" }}
                >
                  <strong style={{ color: "#221f20", fontWeight: "700" }}>
                    Entrar
                  </strong>{" "}
                  na sua conta
                </h2>

                {/* FORMULÁRIO CONECTADO À FUNÇÃO HANDLELOGIN */}
                <form onSubmit={handleLogin} noValidate>

                  {/* CAMPO DE E-MAIL */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary mb-2">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} // Salva o e-mail no state a cada letra digitada
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: "#221f20",
                        borderBottomWidth: "2px",
                        fontSize: "1.05rem",
                        paddingBottom: "12px",
                      }}
                    />
                  </div>

                  {/* CAMPO DE SENHA */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary mb-2">
                      Senha
                    </label>
                    <input
                      type="password"
                      required
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)} // Salva a senha no state a cada letra digitada
                      className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                      style={{
                        borderColor: "#221f20",
                        borderBottomWidth: "2px",
                        fontSize: "1.05rem",
                        paddingBottom: "12px",
                      }}
                    />
                  </div>

                  {/* BOTÃO SUBMIT DINÂMICO */}
                  <button
                    type="submit"
                    disabled={carregando} // Desativa o botão enquanto a API pensa, evitando cliques duplos
                    className="btn w-100 py-3 rounded-pill fw-bold shadow-sm mb-3"
                    style={{
                      backgroundColor: "#febd17",
                      color: "#221f20",
                      border: "none",
                      letterSpacing: "0.5px",
                      transition: "0.3s",
                      cursor: "pointer",
                      fontSize: "1rem",
                      fontWeight: "700",
                    }}
                  >
                    {/* Altera o texto se estiver enviando a requisição */}
                    {carregando ? 'Verificando dados...' : 'Entrar'}
                  </button>

                  {/* LINKS EXTRAS */}
                  <div className="text-center mb-2">
                    <a
                      href="#forgot"
                      className="text-decoration-none small"
                      style={{
                        color: "#f5bd31",
                        fontSize: "0.9rem",
                        fontWeight: "700",
                      }}
                    >
                      Esqueceu a senha?
                    </a>
                  </div>

                  <div className="text-center">
                    <a
                      href="/cadastro"
                      className="text-decoration-none small"
                      style={{
                        color: "#f5bd31",
                        fontSize: "0.95rem",
                        transition: "0.3s",
                        fontWeight: "700",
                      }}
                    >
                      Não tem uma conta? Crie uma!
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}