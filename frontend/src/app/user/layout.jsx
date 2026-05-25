"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function UserLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace(`/login?returnTo=${encodeURIComponent(pathname)}`);
    }
  }, [loading, isAuthenticated, pathname, router]);

  if (loading || !isAuthenticated) {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border" role="status" style={{ color: "#febd17" }}>
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return children;
}
