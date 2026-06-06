import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../globals.css";
import BootstrapClient from "../bootstrap-client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRouteAdm from "./components/ProtectedRouteAdm";
import styles from "./layout.module.css";

export const metadata = {
  title: "Painel Administrativo",
  description: "Sistema administrativo Luminar",
};

export default function SistemaLayout({ children }) {
  return (
    <>
      <BootstrapClient />

      <ProtectedRouteAdm>
        <Header />

        <main className={styles.main}>
          {children}
        </main>

        <Footer />
      </ProtectedRouteAdm>
    </>
  );
}
