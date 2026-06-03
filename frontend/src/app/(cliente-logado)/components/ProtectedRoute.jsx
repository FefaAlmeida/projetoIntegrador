"use client";

import { useEffect, useState } from "react";
import { getPerfil } from "../../../api";

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