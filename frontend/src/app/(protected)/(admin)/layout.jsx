"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AdminHeader from "@/components/shared/header/profiles/admin";
import Footer from "@/components/shared/footer";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";
import { PageSkeleton } from "@/components/shared/skeleton";

export default function AdminLayout({ children }) {
 const { loading, isAdmin, isAuthenticated } = useAuth();
 const router = useRouter();

 useEffect(() => {
  if (loading || !isAuthenticated) return;
  if (!isAdmin) {
   toast.error("Você não tem acesso a esta área.");
   router.replace(ROUTES.CUSTOMER.DASHBOARD.href);
  }
 }, [loading, isAuthenticated, isAdmin, router]);

 if (loading || !isAdmin) return <PageSkeleton />;
 return (
  <>
   <AdminHeader />
   {children}
   <Footer />
  </>
 );
}
