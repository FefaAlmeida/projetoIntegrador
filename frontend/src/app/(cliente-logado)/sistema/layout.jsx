import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "../../globals.css";
import "../../home.css";

import BootstrapClient from "../../bootstrap-client";

import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Painel do Cliente",
  description: "Sistema do cliente Luminar",
};

export default function SistemaLayout({ children }) {
  return (
    <>
      <BootstrapClient />

      <Header />

      <main
        style={{
          minHeight: "100vh",
          paddingTop: "90px",
          backgroundColor: "#f5f7fb",
        }}
      >
        {children}
      </main>

      <Footer />
    </>
  );
}