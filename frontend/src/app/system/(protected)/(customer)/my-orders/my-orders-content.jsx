"use client";

import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";

export default function MyOrdersContent() {
 const { user } = useAuth();
 const primeiroNome = user?.nome?.split(" ")[0];

 return (
  <div className="container py-5">
   <div className="d-flex align-items-center gap-3 mb-4">
    <i className="bi bi-clipboard-data text-yellow fs-icon-lg"></i>
    <div>
     <h1 className="fw-bold m-0 text-dark-2">Meus orçamentos</h1>
     <p className="text-secondary m-0">
      {primeiroNome ? `Olá, ${primeiroNome}. ` : ""}
      Acompanhe aqui as solicitações que você enviou.
     </p>
    </div>
   </div>

   <div className="p-5 rounded-4 text-center bg-white shadow-card border-dashed-soft">
    <i className="bi bi-inbox fs-1 d-block mb-3 text-yellow"></i>
    <h2 className="fs-5 fw-bold text-dark-2">
     Você ainda não tem orçamentos
    </h2>
    <p className="text-secondary mb-4">
     Solicite um novo orçamento e acompanhe o andamento por aqui.
    </p>
    <a
     href={ROUTES.QUOTE.href}
     className="btn btn-yellow fw-bold px-4 py-2 rounded-pill"
    >
     Solicitar orçamento
    </a>
   </div>
  </div>
 );
}
