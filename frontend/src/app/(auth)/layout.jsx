import PublicHeader from "@/components/shared/header/profiles/public";

export default function AuthLayout({ children }) {
 return (
  <>
   <PublicHeader />
   {children}
  </>
 );
}
