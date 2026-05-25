"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";

export default function CustomerLayout({ children }) {
  const { loading, isCustomer, isAuthenticated } = useAuth();
  const router = useRouter();
  const avisouRef = useRef(false);

  useEffect(() => {
    if (loading || !isAuthenticated) return;
    if (!isCustomer) {
      if (!avisouRef.current) {
        toast.error("Você não tem acesso a esta área.");
        avisouRef.current = true;
      }
      router.replace("/user/admin");
    }
  }, [loading, isAuthenticated, isCustomer, router]);

  if (loading || !isCustomer) return null;
  return children;
}
