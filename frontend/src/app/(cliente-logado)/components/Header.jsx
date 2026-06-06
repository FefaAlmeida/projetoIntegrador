"use client";

import { logoutUsuario, getPerfil } from "@/api";
import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header() {

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function carregarUsuario() {
      try {
        const response = await getPerfil();

        if (response?.sucesso) {
          setUsuario(response.dados);
        }
      } catch (error) {
        console.error(error);
      }
    }

    carregarUsuario();
  }, []);

  async function handleLogout() {

    try {

      const response = await logoutUsuario();

      if (response?.sucesso) {
        window.location.href = "/login";
      }

    } catch (error) {
      console.error(error);
    }
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [sidebarOpen]);

  return (
    <>
      <nav
        className={`navbar fixed-top px-3 ${styles.navbar}`}
      >
        <div className="container-fluid">

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`border-0 bg-transparent shadow-none ${styles.menuButton}`}
          >
            <i
              className={`bi ${
                sidebarOpen ? "bi-x-lg" : "bi-list"
              } ${styles.menuIcon}`}
            />
          </button>


          <div className="dropdown">
                      <a
                        href="#"
                        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <img
                          src="perfil-foto.png"
                          alt="Foto de perfil"
                          width="40"
                          height="40"
                          className="rounded-circle me-2"
                        />
                        <div className="d-none d-sm-block text-start me-1">
                          <strong className={styles.userName}>
                            {usuario?.nome}
                          </strong>
                          <small className={styles.userRole}>
                            Cliente
                          </small>
                        </div>
                      </a>

                      <ul className="dropdown-menu dropdown-menu-dark text-small shadow dropdown-menu-end">
                        <li>
                          <a className="dropdown-item" href="/perfil">
                            Perfil
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <button
                            type="button"
                            className="dropdown-item text-danger"
                            onClick={handleLogout}
                          >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Sair
                          </button>
                        </li>
                      </ul>
                    </div>
      
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >

        {/* CONTAINER */}
        <div className="d-flex flex-column flex-shrink-0 p-3 h-100">
        <a
        href="/inicio-dashboard"
        className="d-flex align-items-center text-white text-decoration-none gap-2 mb-4 mt-2"
        >
        <img
            src="/logo-semEscrita.png"
            alt="Logo Luminar"
            className={styles.logoImage}
        />

        <div>
            <span className="fs-4 fw-bold">
            Luminar
            </span>
        </div>
        </a>

        <ul className="nav nav-pills flex-column mb-auto gap-2">

        <li className="nav-item">
            <a
            href="/inicio-dashboard"
            className={`nav-link text-white d-flex align-items-center gap-3 ${styles.sidebarLink}`}
            >
            <i className="bi bi-house-door-fill"></i>
            Início
            </a>
        </li>

        <li>
            <a
            href="/dashboard"
            className={`nav-link text-white d-flex align-items-center gap-3 ${styles.sidebarLink}`}
            >
            <i className="bi bi-speedometer2"></i>
            Dashboard
            </a>
        </li>

        <li>
            <a
            href="/dashboard-financeiro"
            className={`nav-link text-white d-flex align-items-center gap-3 ${styles.sidebarLink}`}
            >
            <i className="bi bi-table"></i>
            Financeiro
            </a>
        </li>

        <li>
            <a
            href="/solicitar-instalacao"
            className={`nav-link text-white d-flex align-items-center gap-3 ${styles.sidebarLink}`}
            >
            <i className="bi bi-grid-fill"></i>
            Solicitar instalação
            </a>
        </li>

        <li>
            <a
            href="/cadastrar-endereco"
            className={`nav-link text-white d-flex align-items-center gap-3 ${styles.sidebarLink}`}
            >
            <i className="bi bi-geo-alt-fill"></i>
            Cadastrar endereço
            </a>
        </li>

        <li>
            <a
            href="/chamados"
            className={`nav-link text-white d-flex align-items-center gap-3 ${styles.sidebarLink}`}
            >
            <i className="bi bi-people-fill"></i>
            Abrir chamado
            </a>
        </li>

        </ul>

          <hr className={styles.divider} />

        </div>
      </aside>

    </>
  );
}
