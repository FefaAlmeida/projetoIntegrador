"use client";

import { useAuth } from "@/hooks/use-auth";

const HEADER_STYLE = {
  background: "linear-gradient(90deg,#221f20,#221f20)",
  boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
  position: "sticky",
  top: 0,
  zIndex: 1030,
};

const AVATAR_PILL_STYLE = {
  backgroundColor: "#febd17",
  borderRadius: "12px",
  color: "#221f20",
  fontWeight: 700,
};

const AVATAR_CIRCLE_STYLE = {
  width: 30,
  height: 30,
  borderRadius: "50%",
  backgroundColor: "#221f20",
  color: "#febd17",
  fontSize: "0.85rem",
  fontWeight: 800,
};

const DROPDOWN_STYLE = {
  backgroundColor: "#221f20",
  borderRadius: "14px",
  minWidth: 220,
  overflow: "hidden",
};

export default function CustomerHeader() {
  const { user, logout } = useAuth();
  const primeiroNome = user?.nome?.split(" ")[0] || "Conta";
  const inicial = (user?.nome || user?.email || "?").charAt(0).toUpperCase();

  return (
    <header className="border-bottom" style={HEADER_STYLE}>
      <div className="container-fluid px-5 d-flex flex-wrap justify-content-between align-items-center py-3">
        <a href="/" className="d-flex align-items-center text-decoration-none">
          <img
            src="/logo-semEscrita.png"
            alt="Luminar Logo"
            width="55"
            height="55"
            className="me-2"
            style={{ objectFit: "contain" }}
          />
          <span className="fs-4 fw-bold" style={{ color: "#febd17" }}>
            Luminar
          </span>
        </a>

        <ul className="nav nav-pills align-items-center gap-3">
          <li className="nav-item">
            <a href="/" className="nav-link text-white">
              Início
            </a>
          </li>

          <li className="nav-item">
            <a
              href="/user/customer/orders"
              className="nav-link text-white"
            >
              Meus orçamentos
            </a>
          </li>

          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center gap-2 px-3 py-2"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              style={AVATAR_PILL_STYLE}
            >
              <span
                className="d-flex align-items-center justify-content-center"
                style={AVATAR_CIRCLE_STYLE}
              >
                {inicial}
              </span>
              Olá, {primeiroNome}
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end shadow-lg border-0 mt-2"
              style={DROPDOWN_STYLE}
            >
              <li
                className="px-3 py-2"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="small text-white-50">Logado como</div>
                <div
                  className="text-white fw-bold text-truncate"
                  style={{ maxWidth: 200 }}
                >
                  {user?.email}
                </div>
              </li>
              <li>
                <a
                  className="dropdown-item text-white py-2"
                  href="/user/preferences"
                >
                  <i
                    className="bi bi-gear-fill me-2"
                    style={{ color: "#febd17" }}
                  ></i>
                  Preferências
                </a>
              </li>
              <li>
                <hr
                  className="dropdown-divider my-1"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                />
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => logout()}
                  className="dropdown-item text-white py-2"
                  style={{ background: "transparent", border: "none" }}
                >
                  <i
                    className="bi bi-box-arrow-right me-2"
                    style={{ color: "#febd17" }}
                  ></i>
                  Sair
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
}
