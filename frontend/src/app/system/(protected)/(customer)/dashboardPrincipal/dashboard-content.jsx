"use client";

import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";

export default function DashboardContent() {
 const { user } = useAuth();
 const primeiroNome = user?.nome?.split(" ")[0] || "cliente";

 return (
  <div className="container py-5">
   <div className="d-flex align-items-center gap-3 mb-4">
    <i className="bi bi-house-heart text-yellow fs-icon-lg"></i>
    <div>
     <h1 className="fw-bold m-0 text-dark-2">Olá, {primeiroNome}!</h1>
     <p className="text-secondary m-0">
      Atalhos rápidos pra você acompanhar seus orçamentos e preferências.
     </p>
    </div>
   </div>

   <div className="row g-4">
    <div className="col-md-6">
     <a
      href={ROUTES.CUSTOMER.MY_ORDERS.href}
      className="d-block text-decoration-none p-4 rounded-4 bg-white h-100 shadow-card border-soft"
     >
      <i className="bi bi-clipboard-data fs-2 mb-3 d-block text-yellow"></i>
      <h3 className="fs-5 fw-bold text-dark-2">Meus orçamentos</h3>
      <p className="text-secondary m-0 small">
       Acompanhe o status das suas solicitações.
      </p>
     </a>
    </div>
    <div className="col-md-6">
     <a
      href={ROUTES.QUOTE.href}
      className="d-block text-decoration-none p-4 rounded-4 bg-white h-100 shadow-card border-soft"
     >
      <i className="bi bi-plus-circle fs-2 mb-3 d-block text-yellow"></i>
      <h3 className="fs-5 fw-bold text-dark-2">Solicitar orçamento</h3>
      <p className="text-secondary m-0 small">
       Receba uma proposta personalizada da nossa equipe.
      </p>
     </a>
    </div>
   </div>
  </div>
 );
}
