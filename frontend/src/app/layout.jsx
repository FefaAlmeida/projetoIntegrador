import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./bootstrap-client";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";
import "./home.css";
import Header from "../components/public/Header";
import Footer from "../components/public/Footer";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata = {
 title: "Luminar",
 description: "Energia solar para reduzir sua conta de luz",
};

export default function RootLayout({ children }) {
 return (
  <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
   <body>
    <BootstrapClient />
    <Header/>
    {children}
    <Footer/>
   </body>
  </html>
 );
}
