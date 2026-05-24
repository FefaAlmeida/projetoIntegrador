import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./bootstrap-client";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";

import { Toaster } from "react-hot-toast";

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
        <Header/>
        <BootstrapClient />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily: "'Poppins', sans-serif",
              borderRadius: "12px",
              padding: "14px 18px",
              fontSize: "0.95rem",
              fontWeight: 500,
              boxShadow: "0 10px 30px rgba(34, 31, 32, 0.18)",
            },
            success: {
              iconTheme: { primary: "#febd17", secondary: "#221f20" },
              style: { background: "#221f20", color: "#fff" },
            },
            error: {
              iconTheme: { primary: "#fff", secondary: "#dc3545" },
              style: { background: "#dc3545", color: "#fff" },
            },
          }}
        />
        {children}
        <Footer/>
      </body>
    </html>
  );
}