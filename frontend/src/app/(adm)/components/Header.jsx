"use client";

import React, { useEffect, useState } from "react";

export default function Header() {

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
      {/* NAVBAR */}
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

          {/* BOTÃO SIDEBAR */}
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

        {/* LOGO DIREITA */}
        <a
        className="navbar-brand d-flex align-items-center gap-2 text-decoration-none m-0"
        href="#"
        >
        <span
            style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: "1.8rem",
            letterSpacing: "-1px",
            }}
        >
            Luminar
        </span>

        <img
            src="/logo-semEscrita.png"
            alt="Logo Luminar"
            style={{
            width: "40px",
            height: "40px",
            borderRadius: "14px",
            objectFit: "cover",
            padding: "4px",
            }}
        />
        </a>
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
        href="/"
        className="d-flex align-items-center text-white text-decoration-none gap-2"
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
            href="#"
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-house-door-fill"></i>
            Home
            </a>
        </li>

        <li>
            <a
            href="#"
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-speedometer2"></i>
            Dashboard
            </a>
        </li>

        <li>
            <a
            href="#"
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-table"></i>
            Orders
            </a>
        </li>

        <li>
            <a
            href="#"
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-grid-fill"></i>
            Products
            </a>
        </li>

        <li>
            <a
            href="#"
            className="nav-link sidebar-link text-white d-flex align-items-center gap-3"
            >
            <i className="bi bi-people-fill"></i>
            Customers
            </a>
        </li>

        </ul>

          <hr
            style={{
              borderColor: "rgba(255, 255, 255, 0.08)",
            }}
          />

          {/* PROFILE */}
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width="40"
                height="40"
                className="rounded-circle me-3"
              />

              <div>
                <strong
                  style={{
                    display: "block",
                    fontSize: "0.95rem",
                  }}
                >
                  Natalia
                </strong>

                <small
                  style={{
                    color: "#b5b5b5",
                  }}
                >
                  Cliente
                </small>
              </div>
            </a>

            <ul className="dropdown-menu dropdown-menu-dark text-small shadow">

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
                <a className="dropdown-item" href="#">
                  Perfil
                </a>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a className="dropdown-item" href="#">
                  Sair
                </a>
              </li>
            </ul>
          </div>

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