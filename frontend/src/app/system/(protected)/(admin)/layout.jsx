import Guard from "@/components/guard";
import AdminHeader from "@/components/shared/header/profiles/admin";
import Footer from "@/components/shared/footer";

export default function AdminLayout({ children }) {
 return (
  <Guard role="ADMIN">
   <AdminHeader />
   {children}
   <Footer />
  </Guard>
 );
}
