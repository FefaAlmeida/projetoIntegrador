import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function RegisterPage() {
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

      {/* 1. ONDA ROXA SUPERIOR ESQUERDA */}
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

      {/* 2. ONDA ROXA INFERIOR DIREITA */}
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

         {/* COLUNA DA ESQUERDA */}
        <div
          className="col-lg-6 position-relative d-flex flex-column justify-content-center"
          style={{ minHeight: "650px" }}
        >

          {/* BLOB */}
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
              alt="Imagem"
              style={{
                width: "120%",
                height: "120%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* TEXTO */}
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

        {/* COLUNA DA DIREITA */}
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

            {/* TÍTULO */}
            <h2
              className="fs-3 fw-normal mb-5"
              style={{ color: "#221f20" }}
            >
              <strong
                style={{
                  color: "#221f20",
                  fontWeight: "700",
                }}
              >
                Criar
              </strong>{" "}
              sua conta
            </h2>

            <form>

              {/* NOME COMPLETO */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary mb-2">
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                  style={{
                    borderColor: "#221f20",
                    borderBottomWidth: "2px",
                    fontSize: "1.05rem",
                    paddingBottom: "12px",
                  }}
                />
              </div>

              {/* EMAIL */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                  style={{
                    borderColor: "#221f20",
                    borderBottomWidth: "2px",
                    fontSize: "1.05rem",
                    paddingBottom: "12px",
                  }}
                />
              </div>

              {/* SENHA */}
              <div className="mb-4">
                <label className="form-label small fw-bold text-secondary mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                  style={{
                    borderColor: "#221f20",
                    borderBottomWidth: "2px",
                    fontSize: "1.05rem",
                    paddingBottom: "12px",
                  }}
                />
              </div>

              {/* CONFIRME A SENHA */}
              <div className="mb-5">
                <label className="form-label small fw-bold text-secondary mb-2">
                  Confirme sua Senha
                </label>
                <input
                  type="password"
                  className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                  style={{
                    borderColor: "#221f20",
                    borderBottomWidth: "2px",
                    fontSize: "1.05rem",
                    paddingBottom: "12px",
                  }}
                />
              </div>

              {/* BOTÃO CADASTRAR */}
              <button
                type="submit"
                className="btn w-100 py-3 rounded-pill fw-bold shadow-sm mb-4"
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
                Cadastrar agora
              </button>

              {/* RETORNAR PARA O LOGIN */}
              <div className="text-center">
                <a
                  href="/login"
                  className="text-decoration-none small"
                  style={{
                    color: "#f5bd31",
                    fontSize: "0.95rem",
                    transition: "0.3s",
                    fontWeight: "700",
                  }}
                >
                  Já tem uma conta? Faça login!
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