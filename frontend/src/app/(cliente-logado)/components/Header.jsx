"use client";

import { logoutUsuario, getPerfil } from "@/api";
import React, { useEffect, useState } from "react";

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
        className="navbar fixed-top px-3"
        style={{
          height: "78px",
          background: "#221f20",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          zIndex: 9999,
        }}
      >
        <div className="container-fluid">

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="border-0 bg-transparent shadow-none"
            style={{
              outline: "none",
            }}
          >
            <i
              className={`bi ${
                sidebarOpen ? "bi-x-lg" : "bi-list"
              }`}
              style={{
                color: "#fff",
                fontSize: "2rem",
              }}
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
                          src="https://github.com/mdo.png"
                          alt="Foto de perfil"
                          width="40"
                          height="40"
                          className="rounded-circle me-2"
                        />
                        <div className="d-none d-sm-block text-start me-1">
                          <strong style={{ display: "block", fontSize: "0.95rem" }}>
                            {usuario?.nome}
                          </strong>
                          <small style={{ color: "#b5b5b5", display: "block", marginTop: "-2px" }}>
                            Cliente
                          </small>
                        </div>
                      </a>

                      <ul className="dropdown-menu dropdown-menu-dark text-small shadow dropdown-menu-end">
                        <li>
                          <a className="dropdown-item" href="#">
                            Meu painel
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Configurações
                          </a>
                        </li>
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
        style={{
          position: "fixed",
          top: "78px",
          left: sidebarOpen ? "0" : "-290px",
          width: "290px",
          height: "calc(100vh - 78px)",
          background: "#221f20",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          transition: "0.35s ease",
          zIndex: 9998,
        }}
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
            style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            objectFit: "cover",
            padding: "4px",
            }}
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
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-house-door-fill"></i>
            Início
            </a>
        </li>

        <li>
            <a
            href="/dashboard"
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-speedometer2"></i>
            Dashboard
            </a>
        </li>

        <li>
            <a
            href="/dashboard-financeiro"
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-table"></i>
            Financeiro
            </a>
        </li>

        <li>
            <a
            href="/instalacoes"
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-grid-fill"></i>
            Instalações
            </a>
        </li>

        <li>
            <a
            href="/chamados"
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-people-fill"></i>
            Abrir chamado
            </a>
        </li>

        </ul>

          <hr
            style={{
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          />

        </div>
      </aside>

    <style jsx>{`
    .sidebar-link {
        border-radius: 14px;
        padding: 14px 18px;
        transition: all 0.3s ease;
    }

    .sidebar-link:hover {
        background: linear-gradient(135deg, #febd17, #e5a900);
        color: #221f20 !important;
        transform: translateX(4px);
    }

    .sidebar-link:hover i {
        color: #221f20 !important;
    }
    `}</style>
    </>
  );
}