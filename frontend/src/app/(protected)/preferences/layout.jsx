"use client";

import AdminHeader from "@/components/shared/header/admin-header";
import CustomerHeader from "@/components/shared/header/customer-header";
import Footer from "@/components/shared/footer";
import { useAuth } from "@/hooks/use-auth";

export default function PreferencesLayout({ children }) {
 const { isAdmin } = useAuth();
 return (
  <>
   {isAdmin ? <AdminHeader /> : <CustomerHeader />}
   {children}
   <Footer />
  </>
 );
}
