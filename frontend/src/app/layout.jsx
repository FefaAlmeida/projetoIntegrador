import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import "./home.css";
import BootstrapClient from "./bootstrap-client";
import { Toaster } from "sonner";

export const metadata = {
 title: "Luminar",
 description: "Energia solar para reduzir sua conta de luz",
};

export default function RootLayout({ children }) {
 return (
  <html lang="pt-BR">
   <body>
    <BootstrapClient />
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
   </body>
  </html>
 );
}
