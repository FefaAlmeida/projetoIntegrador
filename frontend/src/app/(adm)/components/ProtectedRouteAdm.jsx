"use client";

import { useEffect, useState } from "react";
import { getPerfil } from "@/api";

export default function ProtectedRouteAdm({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verificarAdmin() {
      try {
        const response = await getPerfil();

        if (!response?.sucesso) {
          window.location.href = "/login";
          return;
        }

        if (response.dados?.tipo_usuario !== "ADMIN") {
          window.location.href = "/inicio-dashboard";
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        window.location.href = "/login";
      }
    }

    verificarAdmin();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return children;
}
