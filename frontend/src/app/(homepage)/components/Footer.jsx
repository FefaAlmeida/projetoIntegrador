import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer
        className={styles.footer}
      >
        <div className="container">
          <div className="footer-main">
            {/* LOGO */}
            <div className="footer-brand">
              <h3
                className={`fw-bold m-0 ${styles.brandTitle}`}
              >
                Luminar
              </h3>
            </div>

            <div className="footer-contact-list">
              {/* TELEFONE */}
              <div className="footer-contact-item text-white">
                <span className="footer-contact-icon">
                  <i className="bi bi-telephone-fill"></i>
                </span>
                <span className="footer-contact-text">(11) 94002-8922</span>
              </div>

              {/* EMAIL */}
              <div className="footer-contact-item footer-contact-email text-white">
                <span className="footer-contact-icon">
                  <i className="bi bi-envelope-fill"></i>
                </span>
                <span className="footer-contact-text">
                  luminar.energia.solar14@gmail.com
                </span>
              </div>

              {/* LOCAL */}
              <div className="footer-contact-item text-white">
                <span className="footer-contact-icon">
                  <i className="bi bi-geo-alt-fill"></i>
                </span>
                <span className="footer-contact-text">São Paulo - SP</span>
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div
            className={`footer-copyright text-center ${styles.copyright}`}
          >
            © 2026 Luminar. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
