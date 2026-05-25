import QuoteForm from "./quote-form";
import styles from "./page.module.css";

export const metadata = {
 title: "Solicitar orçamento — Luminar",
 description:
  "Receba um orçamento personalizado de energia solar para sua casa ou empresa.",
};

export default function QuotePage() {
 return (
  <div className={styles.shell}>
   <div className="container">
    <div className={styles.header}>
     <h1 className={styles.title}>
      Solicite seu <span className={styles.titleAccent}>orçamento</span>
     </h1>
     <p className={styles.subtitle}>
      Conte um pouco sobre seu imóvel e consumo. Em até 24h nossa equipe entra em
      contato com uma proposta sob medida.
     </p>
    </div>

    <div className={styles.card}>
     <QuoteForm />
    </div>
   </div>
  </div>
 );
}
