"use client";

import { useAuth } from "@/hooks/use-auth";

export default function CustomerOrdersPage() {
  const { user } = useAuth();

  return (
    <div className="container py-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="d-flex align-items-center gap-3 mb-4">
        <i
          className="bi bi-clipboard-data"
          style={{ color: "#febd17", fontSize: "2.4rem" }}
        ></i>
        <div>
          <h1 className="fw-bold m-0" style={{ color: "#221f20" }}>
            Meus orçamentos
          </h1>
          <p className="text-secondary m-0">
            {user?.nome?.split(" ")[0]
              ? `Olá, ${user.nome.split(" ")[0]}. `
              : ""}
            Acompanhe aqui as solicitações que você enviou.
          </p>
        </div>
      </div>

      <div
        className="p-5 rounded-4 text-center bg-white"
        style={{
          boxShadow: "0 12px 30px rgba(34,31,32,0.08)",
          border: "1px dashed #ececec",
        }}
      >
        <i
          className="bi bi-inbox fs-1 d-block mb-3"
          style={{ color: "#febd17" }}
        ></i>
        <h2 className="fs-5 fw-bold" style={{ color: "#221f20" }}>
          Você ainda não tem orçamentos
        </h2>
        <p className="text-secondary mb-4">
          Solicite um novo orçamento e acompanhe o andamento por aqui.
        </p>
        <a
          href="/orcamento"
          className="btn fw-bold px-4 py-2 rounded-pill"
          style={{
            backgroundColor: "#febd17",
            color: "#221f20",
            border: "none",
          }}
        >
          Solicitar orçamento
        </a>
      </div>
    </div>
  );
}
