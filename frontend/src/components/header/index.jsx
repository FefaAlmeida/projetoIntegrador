"use client";

import { useAuth } from "@/hooks/use-auth";
import PublicHeader from "./public-header";
import CustomerHeader from "./customer-header";
import AdminHeader from "./admin-header";

export default function Header() {
  const { loading, isAdmin, isCustomer } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          height: 84,
          background: "linear-gradient(90deg,#221f20,#221f20)",
          position: "sticky",
          top: 0,
          zIndex: 1030,
        }}
      />
    );
  }
  if (isAdmin) return <AdminHeader />;
  if (isCustomer) return <CustomerHeader />;
  return <PublicHeader />;
}
