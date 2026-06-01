import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

export default function HomepageLayout({ children }) {
 return (
  <div className="d-flex flex-column min-vh-100">
   <Header />
   <main className="flex-grow-1">
    {children}
    <Toaster
      richColors
      closeButton
      toastOptions={{
        style: {
          width: "420px",
          padding: "18px",
          fontSize: "16px",
          borderRadius: "16px",
        },
      }}
    />
   </main>
   <Footer />
  </div>
 );
}
