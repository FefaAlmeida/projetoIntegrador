"use client";

import { usePathname } from "next/navigation";

const ROTAS_SEM_BOTAO_AUTH = ["/login", "/cadastro"];

const HEADER_STYLE = {
 background: "linear-gradient(90deg,#221f20,#221f20)",
 boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
 position: "sticky",
 top: 0,
 zIndex: 1030,
};

export default function PublicHeader() {
 const pathname = usePathname();
 const esconderBotaoAuth = ROTAS_SEM_BOTAO_AUTH.includes(pathname);

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

     <li className="nav-item dropdown">
      <a
       className="nav-link dropdown-toggle text-white"
       href="#"
       role="button"
       data-bs-toggle="dropdown"
      >
       Serviços
      </a>
      <ul className="dropdown-menu" style={{ backgroundColor: "#221f20" }}>
       <li>
        <a className="dropdown-item text-white" href="#">
         Instalação de painéis solares
        </a>
       </li>
       <li>
        <a className="dropdown-item text-white" href="#">
         Monitoramento energético
        </a>
       </li>
       <li>
        <a className="dropdown-item text-white" href="#">
         Manutenção
        </a>
       </li>
       <li>
        <a className="dropdown-item text-white" href="#">
         Investimento energético empresarial
        </a>
       </li>
      </ul>
     </li>

     <li className="nav-item">
      <a href="/orcamento" className="nav-link text-white">
       Orçamento
      </a>
     </li>

     <li className="nav-item">
      <a href="/faleConosco" className="nav-link text-white">
       Fale conosco
      </a>
     </li>

     {!esconderBotaoAuth && (
      <li className="nav-item">
       <a
        href="/login"
        className="btn fw-bold px-4 py-2"
        style={{
         backgroundColor: "#febd17",
         borderRadius: "12px",
         color: "#221f20",
        }}
       >
        Login/Cadastro
       </a>
      </li>
     )}
    </ul>
   </div>
  </header>
 );
}
