import PublicHeader from "@/components/shared/header/profiles/public";
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
