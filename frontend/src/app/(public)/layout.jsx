import PublicHeader from "@/components/shared/header/profiles/public";

export default function PublicLayout({ children }) {
 return (
  <>
   <PublicHeader />
   {children}
  </>
 );
}
