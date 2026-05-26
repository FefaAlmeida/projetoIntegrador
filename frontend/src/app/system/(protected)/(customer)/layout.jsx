import Guard from "@/components/guard";
import CustomerHeader from "@/components/shared/header/profiles/customer";
import Footer from "@/components/shared/footer";

export default function CustomerLayout({ children }) {
 return (
  <Guard role="CUSTOMER">
   <CustomerHeader />
   {children}
   <Footer />
  </Guard>
 );
}
