"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CustomerHeader from "@/components/shared/header/profiles/customer";
import Footer from "@/components/shared/footer";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";
import { PageSkeleton } from "@/components/shared/skeleton";

export default function CustomerLayout({ children }) {
 const { loading, isCustomer, isAuthenticated } = useAuth();
 const router = useRouter();

 useEffect(() => {
  if (loading || !isAuthenticated) return;
  if (!isCustomer) {
   toast.error("Você não tem acesso a esta área.");
   router.replace(ROUTES.ADMIN.USERS.href);
  }
 }, [loading, isAuthenticated, isCustomer, router]);

 if (loading || !isCustomer) return <PageSkeleton />;
 return (
  <>
   <CustomerHeader />
   {children}
   <Footer />
  </>
 );
}
