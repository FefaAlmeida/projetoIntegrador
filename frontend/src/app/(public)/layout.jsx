import PublicHeader from "@/components/shared/header/public-header";
import Footer from "@/components/shared/footer";

export default function PublicLayout({ children }) {
 return (
  <>
   <PublicHeader />
   {children}
   <Footer />
  </>
 );
}
