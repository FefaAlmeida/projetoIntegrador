import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
 title: "Fale conosco — Luminar",
 description: "Tire dúvidas, peça orçamentos ou saiba mais sobre energia solar.",
};

const FEATURES = [
 { icon: "bi-headset", title: "Atendimento Especializado" },
 { icon: "bi-sun", title: "Energia Sustentável" },
 { icon: "bi-lightning-charge", title: "Resposta Rápida" },
];

export default function ContactPage() {
 return (
  <div className={`d-flex flex-column min-vh-100 ${styles.shell}`}>
   <main className={`flex-grow-1 px-3 ${styles.main}`}>
    <div
     className={`container overflow-hidden shadow-lg p-0 mx-auto bg-dark-custom rounded-xl ${styles.card}`}
    >
     <div className="row g-0">
      <div
       className={`col-lg-5 text-white d-flex flex-column justify-content-center bg-gradient-dark ${styles.left}`}
      >
       <h1 className={`fw-bold mb-3 ${styles.title}`}>
        <span className="text-yellow">Fale Conosco</span>
       </h1>

       <p className="mb-5 text-white text-opacity-75 lh-relaxed">
        Tem dúvidas, precisa de um orçamento ou quer saber mais sobre energia
        solar? Estamos prontos para te atender!
       </p>

       <form>
        <div className="mb-3">
         <input
          type="text"
          className={`form-control border-0 ${styles.field}`}
          placeholder="Nome completo"
         />
        </div>

        <div className="mb-3">
         <input
          type="email"
          className={`form-control border-0 ${styles.field}`}
          placeholder="E-mail"
         />
        </div>

        <div className="mb-3">
         <input
          type="text"
          className={`form-control border-0 ${styles.field}`}
          placeholder="Telefone (opcional)"
         />
        </div>

        <div className="mb-4">
         <textarea
          className={`form-control border-0 ${styles.textarea}`}
          rows="5"
          placeholder="Sua mensagem"
         ></textarea>
        </div>

        <button className={`btn btn-yellow fw-bold w-100 py-3 ${styles.submit}`}>
         <i className="bi bi-send me-2"></i>
         Enviar mensagem
        </button>
       </form>
      </div>

      <div
       className={`col-lg-7 position-relative d-flex flex-column justify-content-between ${styles.right}`}
      >
       <div className={`text-center ${styles.logoWrap}`}>
        <Image
         src="/logo-luminar-removebg-preview.png"
         alt="Luminar"
         width={381}
         height={140}
         className="img-fluid object-fit-contain"
        />
       </div>

       <div className="row text-center text-white mt-auto">
        {FEATURES.map((f) => (
         <div className="col-md-4 mb-4" key={f.title}>
          <div
           className={`mx-auto mb-3 d-flex align-items-center justify-content-center ${styles.featureIcon}`}
          >
           <i className={`bi ${f.icon}`}></i>
          </div>
          <h4 className="fw-bold mb-3">{f.title}</h4>
         </div>
        ))}
       </div>
      </div>
     </div>
    </div>
   </main>
  </div>
 );
}
