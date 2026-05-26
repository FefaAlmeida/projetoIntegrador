"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";
import { PageSkeleton } from "@/components/shared/skeleton";

export default function Guard({ role = "ANY", children }) {
 const { loading, isAuthenticated, isAdmin, isCustomer } = useAuth();
 const router = useRouter();
 const pathname = usePathname();

 const allowed =
  role === "ANY"
   ? isAuthenticated
   : role === "ADMIN"
   ? isAdmin
   : role === "CUSTOMER"
   ? isCustomer
   : false;

 useEffect(() => {
  if (loading) return;

  if (!isAuthenticated) {
   router.replace(
    `${ROUTES.LOGIN.href}?returnTo=${encodeURIComponent(pathname)}`
   );
   return;
  }

  if (!allowed) {
   toast.error("Você não tem acesso a esta área.");
   const fallback = isAdmin
    ? ROUTES.ADMIN.USERS.href
    : isCustomer
    ? ROUTES.CUSTOMER.DASHBOARD.href
    : ROUTES.HOME.href;
   router.replace(fallback);
  }
 }, [loading, isAuthenticated, allowed, isAdmin, isCustomer, pathname, router]);

 if (loading || !allowed) return <PageSkeleton />;
 return children;
}
