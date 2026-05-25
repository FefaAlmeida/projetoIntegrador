"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";
import { PageSkeleton } from "@/components/shared/skeleton";

export default function ProtectedLayout({ children }) {
 const { isAuthenticated, loading } = useAuth();
 const router = useRouter();
 const pathname = usePathname();

 useEffect(() => {
  if (!loading && !isAuthenticated) {
   router.replace(`${ROUTES.LOGIN.href}?returnTo=${encodeURIComponent(pathname)}`);
  }
 }, [loading, isAuthenticated, pathname, router]);

 if (loading || !isAuthenticated) return <PageSkeleton />;

 return children;
}
