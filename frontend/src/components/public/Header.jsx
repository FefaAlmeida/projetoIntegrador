import React from 'react';

export default function Header() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark sticky-top"
        style={{
          backgroundColor: "#221f20",
          padding: "15px 0",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <div className="container">
          {/* LOGO */}
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <div 
              className="d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
            >
              <img
                src="/logo-semEscrita.png"
                alt="Luminar Logo"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
            <span className="fw-bold fs-4" style={{ letterSpacing: "-0.5px" }}>
              Lumi<span style={{ color: "#febd17" }}>nar</span>
            </span>
          </a>

          {/* HAMBURGER BUTTON */}
          <button
            className="navbar-toggler border-0 shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* MENU ITEMS */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto gap-lg-3">
              <li className="nav-item">
                <a className="nav-link text-white fw-medium px-3" href="/">
                  Início
                </a>
              </li>
              
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white fw-medium px-3"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Serviços
                </a>
                <ul 
                  className="dropdown-menu dropdown-menu-dark border-0 shadow-lg"
                  style={{ backgroundColor: "#1a1718", borderRadius: "12px", padding: "10px" }}
                >
                  <li><a className="dropdown-item py-2 px-3 rounded-2" href="/servicos/instalacao">Instalação de painéis</a></li>
                  <li><a className="dropdown-item py-2 px-3 rounded-2" href="/servicos/monitoramento">Monitoramento</a></li>
                  <li><a className="dropdown-item py-2 px-3 rounded-2" href="/servicos/manutencao">Manutenção</a></li>
                </ul>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white fw-medium px-3" href="/orcamento">
                  Orçamento
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link text-white fw-medium px-3" href="/faleConosco">
                  Fale Conosco
                </a>
              </li>
            </ul>

            {/* CTA BUTTONS */}
            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              <a 
                href="/login" 
                className="btn text-white fw-bold px-4 py-2 border-0"
                style={{ fontSize: "0.9rem" }}
              >
                Entrar
              </a>
              <a
                href="/cadastrar"
                className="btn fw-bold px-4 py-2"
                style={{
                  backgroundColor: "#febd17",
                  color: "#221f20",
                  borderRadius: "50px",
                  fontSize: "0.9rem",
                  transition: "0.3s",
                }}
              >
                Cadastrar
              </a>
            </div>
          </div>
        </div>
      </nav>
      {/* Bootstrap Icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      />
    </>
  );
}
