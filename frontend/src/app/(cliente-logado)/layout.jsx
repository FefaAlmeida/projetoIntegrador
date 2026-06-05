import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";
import "../(homepage)/home.css";
import BootstrapClient from "../bootstrap-client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export const metadata = {
  title: "Painel do Cliente",
  description: "Sistema do cliente Luminar",
};

export default function SistemaLayout({ children }) {
  return (
    <>
      <BootstrapClient />

      <ProtectedRoute>
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
      </ProtectedRoute>
    </>
  );
}