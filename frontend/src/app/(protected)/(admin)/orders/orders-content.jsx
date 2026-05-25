"use client";

import { useMemo, useState } from "react";
import Pagination from "@/components/shared/pagination";
import { formatDate } from "@/utils/format";
import styles from "./page.module.css";

const PAGE_SIZE = 5;

const STATUS = {
 PENDENTE: { label: "Pendente", className: "bg-warning text-dark" },
 EM_ANALISE: { label: "Em análise", className: "bg-info text-dark" },
 APROVADO: { label: "Aprovado", className: "bg-success" },
 RECUSADO: { label: "Recusado", className: "bg-danger" },
};

// TODO: substituir por GET /orcamentos?pagina=&limite= quando integrar
const MOCK_ORDERS = [
 { id: 1001, cliente: "Ana Beatriz Souza", cidade: "São Paulo - SP", consumo: 320, status: "PENDENTE", criadoEm: "2026-05-12" },
 { id: 1002, cliente: "Bruno Carvalho", cidade: "Campinas - SP", consumo: 450, status: "EM_ANALISE", criadoEm: "2026-05-13" },
 { id: 1003, cliente: "Daniel Lopes", cidade: "Belo Horizonte - MG", consumo: 280, status: "APROVADO", criadoEm: "2026-05-14" },
 { id: 1004, cliente: "Eduarda Silva", cidade: "Curitiba - PR", consumo: 520, status: "RECUSADO", criadoEm: "2026-05-15" },
 { id: 1005, cliente: "Felipe Araújo", cidade: "Rio de Janeiro - RJ", consumo: 610, status: "PENDENTE", criadoEm: "2026-05-16" },
 { id: 1006, cliente: "Henrique Pereira", cidade: "Porto Alegre - RS", consumo: 380, status: "APROVADO", criadoEm: "2026-05-18" },
 { id: 1007, cliente: "Isabela Rocha", cidade: "Salvador - BA", consumo: 290, status: "EM_ANALISE", criadoEm: "2026-05-19" },
 { id: 1008, cliente: "João Vitor", cidade: "Fortaleza - CE", consumo: 410, status: "PENDENTE", criadoEm: "2026-05-20" },
 { id: 1009, cliente: "Larissa Tavares", cidade: "Recife - PE", consumo: 350, status: "APROVADO", criadoEm: "2026-05-22" },
 { id: 1010, cliente: "Marcos Vinícius", cidade: "Brasília - DF", consumo: 720, status: "PENDENTE", criadoEm: "2026-05-24" },
];

export default function OrdersContent() {
 const [page, setPage] = useState(1);
 const totalPages = Math.ceil(MOCK_ORDERS.length / PAGE_SIZE);
 const slice = useMemo(
  () => MOCK_ORDERS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  [page],
 );

 return (
  <div className={`container py-5 ${styles.shell}`}>
   <div className="d-flex align-items-center gap-3 mb-4">
    <i className={`bi bi-clipboard-data ${styles.iconAccent}`}></i>
    <div>
     <h1 className={`fw-bold m-0 ${styles.title}`}>Orçamentos</h1>
     <p className="text-secondary m-0">
      {MOCK_ORDERS.length} solicitações recebidas.
     </p>
    </div>
   </div>

   <div className="table-responsive bg-white rounded-4 shadow-sm">
    <table className="table mb-0 align-middle">
     <thead className="table-light">
      <tr>
       <th scope="col">#</th>
       <th scope="col">Cliente</th>
       <th scope="col">Cidade</th>
       <th scope="col">Consumo (kWh)</th>
       <th scope="col">Status</th>
       <th scope="col">Recebido em</th>
      </tr>
     </thead>
     <tbody>
      {slice.map((o) => {
       const status = STATUS[o.status] || STATUS.PENDENTE;
       return (
        <tr key={o.id}>
         <td>{o.id}</td>
         <td>{o.cliente}</td>
         <td>{o.cidade}</td>
         <td>{o.consumo.toLocaleString("pt-BR")}</td>
         <td>
          <span className={`badge ${status.className}`}>{status.label}</span>
         </td>
         <td>{formatDate(o.criadoEm)}</td>
        </tr>
       );
      })}
     </tbody>
    </table>
   </div>

   <Pagination page={page} totalPages={totalPages} onChange={setPage} />
  </div>
 );
}
