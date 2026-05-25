"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function UserHub() {
  const { loading, isAdmin, isCustomer } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (isAdmin) router.replace("/user/admin");
    else if (isCustomer) router.replace("/user/customer");
    else router.replace("/");
  }, [loading, isAdmin, isCustomer, router]);

  return null;
}
