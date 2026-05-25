"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";

export default function AdminLayout({ children }) {
  const { loading, isAdmin, isAuthenticated } = useAuth();
  const router = useRouter();
  const avisouRef = useRef(false);

  useEffect(() => {
    if (loading || !isAuthenticated) return;
    if (!isAdmin) {
      if (!avisouRef.current) {
        toast.error("Você não tem acesso a esta área.");
        avisouRef.current = true;
      }
      router.replace("/user/customer");
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  if (loading || !isAdmin) return null;
  return children;
}
