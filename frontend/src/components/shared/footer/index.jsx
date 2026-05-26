import styles from "./footer.module.css";

export default function Footer() {
 return (
  <footer className={styles.footer}>
   <div className="container">
    <div className="row align-items-center text-center text-lg-start">
     <div className="col-lg-3 mb-4 mb-lg-0">
      <h3 className={`fw-bold ${styles.brand}`}>Luminar</h3>
     </div>

     <div className="col-lg-3 mb-3 mb-lg-0">
      <div className="text-white">
       <i className={`bi bi-telephone-fill me-2 ${styles.icon}`} />
       (11) 99999-9999
      </div>
     </div>

     <div className="col-lg-3 mb-3 mb-lg-0">
      <div className="text-white">
       <i className={`bi bi-envelope-fill me-2 ${styles.icon}`} />
       contato@luminar.com
      </div>
     </div>

     <div className="col-lg-3">
      <div className="text-white">
       <i className={`bi bi-geo-alt-fill me-2 ${styles.icon}`} />
       São Paulo - SP
      </div>
     </div>
    </div>

    <div className={`text-center mt-4 pt-3 ${styles.copyright}`}>
     © 2026 Luminar. Todos os direitos reservados.
    </div>
   </div>
  </footer>
 );
}
