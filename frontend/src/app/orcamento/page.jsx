import QuoteForm from "./quote-form";
import styles from "./page.module.css";

export const metadata = {
 title: "Solicitar orçamento — Luminar",
 description:
  "Receba um orçamento personalizado de energia solar para sua casa ou empresa.",
};

export default function QuotePage() {
 return (
  <div className={`bg-soft ${styles.shell}`}>
   <div className="container">
    <div className={`text-center ${styles.header}`}>
     <h1 className={`text-dark-2 ${styles.title}`}>
      Solicite seu <span className="text-yellow">orçamento</span>
     </h1>
     <p className="text-muted-custom fs-5 lh-base m-0">
      Conte um pouco sobre seu imóvel e consumo. Em até 24h nossa equipe entra em
      contato com uma proposta sob medida.
     </p>
    </div>

    <div className={`bg-white shadow-card border-soft rounded-lg-custom ${styles.card}`}>
     <QuoteForm />
    </div>
   </div>
  </div>
 );
}
