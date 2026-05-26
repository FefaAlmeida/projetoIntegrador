"use client";

import AdminHeader from "@/components/shared/header/profiles/admin";
import CustomerHeader from "@/components/shared/header/profiles/customer";
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
