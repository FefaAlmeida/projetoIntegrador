import Guard from "@/components/guard";
import CustomerHeader from "@/components/shared/header/profiles/customer";

export default function CustomerLayout({ children }) {
 return (
  <Guard role="CUSTOMER">
   <CustomerHeader />
   {children}
  </Guard>
 );
}
