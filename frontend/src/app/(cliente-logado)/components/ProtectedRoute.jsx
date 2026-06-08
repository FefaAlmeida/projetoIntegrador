"use client";

import { useEffect, useState } from "react";
import { getPerfil, getMinhaEmpresa } from "../../../api";

export default function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function verificarLogin() {

      try {

        const response = await getPerfil();

        if (!response?.sucesso) {
          window.location.href = "/login";
          return;
        }

        // Clientes só acessam as páginas internas após cadastrar uma empresa.
        // Admins não possuem empresa vinculada e ficam livres dessa exigência.
        if (response.dados?.tipo_usuario !== "ADMIN") {

          const empresa = await getMinhaEmpresa();

          if (!empresa?.sucesso) {
            window.location.href = "/cadastrar-empresa";
            return;
          }
        }

        setLoading(false);

      } catch (error) {

        window.location.href = "/login";

      }
    }

    verificarLogin();

  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return children;
}
