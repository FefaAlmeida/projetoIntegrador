import Guard from "@/components/guard";
import AdminHeader from "@/components/shared/header/profiles/admin";

export default function AdminLayout({ children }) {
 return (
  <Guard role="ADMIN">
   <AdminHeader />
   {children}
  </Guard>
 );
}
