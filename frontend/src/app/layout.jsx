import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./bootstrap-client";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthProvider } from "@/providers/auth-provider";
import { ToastProvider } from "@/providers/toast-provider";
import "./globals.css";
import "@/components/shared/header/header.css";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata = {
 title: "OfficeTech",
 description: "Site corporativo OfficeTech",
};

export default function RootLayout({ children }) {
 return (
  <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
   <body>
    <AuthProvider>
     <BootstrapClient />
     <ToastProvider />
     {children}
    </AuthProvider>
   </body>
  </html>
 );
}
