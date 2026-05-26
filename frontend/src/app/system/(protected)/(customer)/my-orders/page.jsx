"use client";

import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";

export default function MyOrdersContent() {
  const { user } = useAuth();
  const primeiroNome = user?.nome?.split(" ")[0];

  return (
    <div className="container py-5">
      {/* HEADER */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle"
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: "#f5b82e20",
          }}
        >
          <i
            className="bi bi-clipboard-data fs-3"
            style={{ color: "#f5b82e" }}
          ></i>
        </div>

        <div>
          <h1 className="fw-bold m-0" style={{ color: "#221f20" }}>
            Meus orçamentos
          </h1>

          <p className="text-secondary m-0">
            {primeiroNome ? `Olá, ${primeiroNome}. ` : ""}
            Acompanhe aqui as solicitações que você enviou.
          </p>
        </div>
      </div>

      {/* CARD */}
      <div
        className="bg-white rounded-4 text-center p-5 shadow-sm border"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <div
          className="d-flex justify-content-center align-items-center rounded-circle mx-auto mb-3"
          style={{
            width: "90px",
            height: "90px",
            backgroundColor: "#f5b82e15",
          }}
        >
          <i
            className="bi bi-inbox fs-1"
            style={{ color: "#f5b82e" }}
          ></i>
        </div>

        <h2 className="fs-4 fw-bold mb-2" style={{ color: "#221f20" }}>
          Você ainda não tem orçamentos
        </h2>

        <p className="text-secondary mb-4">
          Solicite um novo orçamento e acompanhe o andamento por aqui.
        </p>

        <a
          href={ROUTES.QUOTE.href}
          className="btn fw-bold px-4 py-3 rounded-pill"
          style={{
            backgroundColor: "#f5b82e",
            color: "#221f20",
            minWidth: "260px",
          }}
        >
          Solicitar orçamento
        </a>
      </div>
    </div>
  );
}