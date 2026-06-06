import React from 'react';
import styles from "./Header.module.css";

export default function Header() {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-dark sticky-top ${styles.navbar}`}
      >
        <div className="container">
          {/* LOGO */}
          <a className="navbar-brand d-flex align-items-center gap-2" href="/">
            <div 
              className={`d-flex align-items-center justify-content-center ${styles.logoBox}`}
            >
              <img
                src="/logo-semEscrita.png"
                alt="Luminar Logo"
                className={styles.logoImage}
              />
            </div>
            <span className={`fw-bold fs-4 ${styles.brandText}`}>
              Lumi<span className={styles.brandHighlight}>nar</span>
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
                  className={`dropdown-menu dropdown-menu-dark border-0 shadow-lg ${styles.dropdownMenu}`}
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
                <a className="nav-link text-white fw-medium px-3" href="/fale-conosco">
                  Fale Conosco
                </a>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
              <a
                href="/login"
                className={`btn fw-bold px-4 py-2 headerLoginBtn ${styles.loginButton}`}
              >
                Entrar
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
