"use client";

import { useMemo, useState } from "react";
import Pagination from "@/components/shared/pagination";
import { USER_TYPE } from "@/constants/enums";

const PAGE_SIZE = 5;

// TODO: substituir por GET /usuarios?pagina=&limite= quando integrar
const MOCK_USERS = [
 { id: 1, nome: "Ana Beatriz Souza", email: "ana@example.com", tipo: USER_TYPE.CLIENTE, criadoEm: "2026-01-12" },
 { id: 2, nome: "Bruno Carvalho", email: "bruno@example.com", tipo: USER_TYPE.CLIENTE, criadoEm: "2026-01-15" },
 { id: 3, nome: "Carla Mendes", email: "carla@example.com", tipo: USER_TYPE.ADMIN, criadoEm: "2026-02-02" },
 { id: 4, nome: "Daniel Lopes", email: "daniel@example.com", tipo: USER_TYPE.CLIENTE, criadoEm: "2026-02-08" },
 { id: 5, nome: "Eduarda Silva", email: "eduarda@example.com", tipo: USER_TYPE.CLIENTE, criadoEm: "2026-02-22" },
 { id: 6, nome: "Felipe Araújo", email: "felipe@example.com", tipo: USER_TYPE.CLIENTE, criadoEm: "2026-03-01" },
 { id: 7, nome: "Giovana Lima", email: "giovana@example.com", tipo: USER_TYPE.ADMIN, criadoEm: "2026-03-10" },
 { id: 8, nome: "Henrique Pereira", email: "henrique@example.com", tipo: USER_TYPE.CLIENTE, criadoEm: "2026-03-18" },
 { id: 9, nome: "Isabela Rocha", email: "isabela@example.com", tipo: USER_TYPE.CLIENTE, criadoEm: "2026-04-04" },
 { id: 10, nome: "João Vitor", email: "joao@example.com", tipo: USER_TYPE.CLIENTE, criadoEm: "2026-04-16" },
];

export default function UsersContent() {
 const [page, setPage] = useState(1);
 const totalPages = Math.ceil(MOCK_USERS.length / PAGE_SIZE);
 const slice = useMemo(
  () => MOCK_USERS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
  [page],
 );

 return (
  <div className="container py-5">
   <div className="d-flex align-items-center gap-3 mb-4">
    <i className="bi bi-people-fill text-yellow"></i>
    <div>
     <h1 className="fw-bold m-0 text-dark-2">Usuários</h1>
     <p className="text-secondary m-0">
      {MOCK_USERS.length} usuários cadastrados.
     </p>
    </div>
   </div>

   <div className="table-responsive bg-white rounded-4 shadow-sm">
    <table className="table mb-0 align-middle">
     <thead className="table-light">
      <tr>
       <th scope="col">#</th>
       <th scope="col">Nome</th>
       <th scope="col">E-mail</th>
       <th scope="col">Tipo</th>
       <th scope="col">Cadastro</th>
      </tr>
     </thead>
     <tbody>
      {slice.map((u) => (
       <tr key={u.id}>
        <td>{u.id}</td>
        <td>{u.nome}</td>
        <td>{u.email}</td>
        <td>
         <span
          className={`badge ${
           u.tipo === USER_TYPE.ADMIN ? "bg-dark" : "bg-warning text-dark"
          }`}
         >
          {u.tipo}
         </span>
        </td>
        <td>{new Date(u.criadoEm).toLocaleDateString("pt-BR")}</td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>

   <Pagination page={page} totalPages={totalPages} onChange={setPage} />
  </div>
 );
}
