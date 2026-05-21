import React from 'react';
import Header from "../../components/Header";

export default function LoginPage() {
return (
  <>
    <Header />

    <div
      className="container-fluid min-vh-100 d-flex align-items-center position-relative overflow-hidden p-0"
      style={{
        backgroundColor: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
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
            fill="#4a148c"
            opacity="0.2"
          />
          <path
            d="M0 0H450C350 90 220 30 120 140C50 210 0 180 0 250V0Z"
            fill="#7c4dff"
            opacity="0.4"
          />
          <path
            d="M0 0H400C300 70 200 10 100 110C40 170 0 140 0 200V0Z"
            fill="#1a0633"
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
            fill="#4a148c"
            opacity="0.2"
          />
          <path
            d="M0 0H450C350 90 220 30 120 140C50 210 0 180 0 250V0Z"
            fill="#7c4dff"
            opacity="0.4"
          />
          <path
            d="M0 0H400C300 70 200 10 100 110C40 170 0 140 0 200V0Z"
            fill="#1a0633"
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
        style={{
            minHeight: "650px",
        }}
        >

        {/* BLOB */}
        <div
            className="mx-auto mx-lg-0 mb-4 d-flex align-items-center justify-content-center position-relative"
            style={{
            width: "100%",
            maxWidth: "520px",
            height: "340px",
            background:
                "linear-gradient(135deg, #4a148c 0%, #1a0633 100%)",
            borderRadius: "43% 57% 41% 59% / 57% 45% 55% 43%",
            boxShadow: "0 18px 40px rgba(26,6,51,0.22)",
            }}
        >
            {/* ELEMENTOS INTERNOS */}
            <svg
            width="100%"
            height="100%"
            className="position-absolute top-0 start-0"
            >
            <circle cx="80" cy="80" r="1.5" fill="#fff" opacity="0.6" />
            <circle cx="120" cy="60" r="2" fill="#fff" opacity="0.8" />
            <circle cx="280" cy="70" r="1" fill="#fff" opacity="0.5" />
            <circle cx="320" cy="110" r="2" fill="#fff" opacity="0.7" />

            <line
                x1="150"
                y1="50"
                x2="135"
                y2="65"
                stroke="#fff"
                strokeWidth="1.5"
                opacity="0.4"
                strokeLinecap="round"
            />

            <line
                x1="220"
                y1="70"
                x2="200"
                y2="90"
                stroke="#fff"
                strokeWidth="1.5"
                opacity="0.6"
                strokeLinecap="round"
            />

            {/* LUA */}
            <circle cx="240" cy="110" r="28" fill="#febd17" />

            <path
                d="M100 130C120 110 150 110 170 125C190 115 220 115 240 130"
                stroke="#7c4dff"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.3"
                fill="none"
            />

            <path
                d="M0 280Q150 180 300 240T450 280Z"
                fill="#4a148c"
                opacity="0.5"
            />

            <path
                d="M0 280Q200 220 450 250Z"
                fill="#1a0633"
            />
            </svg>
        </div>

        {/* TEXTO */}
        <div
            className="text-start"
            style={{
            maxWidth: "620px",
            marginTop: "5px",
            paddingLeft: "8px",
            }}
        >
            <h1
            style={{
                fontSize: "4.2rem",
                lineHeight: "1",
                fontWeight: "900",
                marginBottom: "18px",
                color: "#111",
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
                color: "#444",
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
                boxShadow: "0 25px 50px rgba(0,0,0,0.08)",
                border: "2px solid rgba(26,6,51,0.12)",
              }}
            >

              {/* TÍTULO */}
              <h2
                className="fs-3 fw-normal mb-5"
                style={{ color: "#6c757d" }}
              >
                <strong
                  style={{
                    color: "#221f20",
                    fontWeight: "700",
                  }}
                >
                  Login
                </strong>{" "}
                your account
              </h2>

              <form>

                {/* USERNAME */}
                <div className="mb-4">
                  <label className="form-label small fw-semibold text-secondary mb-2">
                    Username
                  </label>

                  <input
                    type="text"
                    className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                    style={{
                      borderColor: "#dee2e6",
                      borderBottomWidth: "2px",
                      fontSize: "1.05rem",
                      paddingBottom: "12px",
                    }}
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label className="form-label small fw-semibold text-secondary mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    className="form-control border-0 border-bottom rounded-0 px-0 shadow-none"
                    style={{
                      borderColor: "#dee2e6",
                      borderBottomWidth: "2px",
                      fontSize: "1.05rem",
                      paddingBottom: "12px",
                    }}
                  />
                </div>

                {/* ESQUECEU SENHA */}
                <div className="text-center mb-4">
                  <a
                    href="#forgot"
                    className="text-decoration-none small"
                    style={{
                      color: "#8d8d8d",
                      fontSize: "0.9rem",
                    }}
                  >
                    Forgot password?
                  </a>
                </div>

                {/* BOTÃO / FRASE */}
                <div className="text-center mb-4">
                  <a
                    href="/register"
                    className="text-decoration-none fw-medium"
                    style={{
                      color: "#4a148c",
                      fontSize: "0.95rem",
                      transition: "0.3s",
                    }}
                  >
                    Don’t have an account? Create one
                  </a>
                </div>

                {/* BOTÃO LOGIN */}
                <button
                  type="submit"
                  className="btn w-100 py-3 rounded-pill text-white fw-medium shadow-sm"
                  style={{
                    backgroundColor: "#1a0633",
                    border: "none",
                    letterSpacing: "0.5px",
                    transition: "0.3s",
                    cursor: "pointer",
                    fontSize: "1rem",
                  }}
                >
                  Login
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>

    </div>
  </>
  );
}