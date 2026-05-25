"use client";

import { useAuth } from "@/hooks/use-auth";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div
      className="container py-5"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <div className="d-flex align-items-center gap-3 mb-4">
        <i
          className="bi bi-speedometer2"
          style={{ color: "#febd17", fontSize: "2.4rem" }}
        ></i>
        <div>
          <h1 className="fw-bold m-0" style={{ color: "#221f20" }}>
            Painel administrativo
          </h1>
          <p className="text-secondary m-0">
            Bem-vindo, {user?.nome?.split(" ")[0] || "admin"}.
          </p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <a
            href="/user/admin/users"
            className="d-block text-decoration-none p-4 rounded-4 bg-white h-100"
            style={{
              boxShadow: "0 12px 30px rgba(34,31,32,0.08)",
              border: "1px solid #ececec",
            }}
          >
            <i
              className="bi bi-people-fill fs-2 mb-3 d-block"
              style={{ color: "#febd17" }}
            ></i>
            <h3 className="fs-5 fw-bold" style={{ color: "#221f20" }}>
              Usuários
            </h3>
            <p className="text-secondary m-0 small">
              Gerenciar contas de clientes e administradores.
            </p>
          </a>
        </div>
        <div className="col-md-6">
          <a
            href="/user/admin/orders"
            className="d-block text-decoration-none p-4 rounded-4 bg-white h-100"
            style={{
              boxShadow: "0 12px 30px rgba(34,31,32,0.08)",
              border: "1px solid #ececec",
            }}
          >
            <i
              className="bi bi-clipboard-data fs-2 mb-3 d-block"
              style={{ color: "#febd17" }}
            ></i>
            <h3 className="fs-5 fw-bold" style={{ color: "#221f20" }}>
              Orçamentos
            </h3>
            <p className="text-secondary m-0 small">
              Acompanhar pedidos de orçamento dos clientes.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
