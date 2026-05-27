export default function Footer() {
  return (
    <>
      <footer
        style={{
          marginTop: "auto",
          background: "linear-gradient(90deg,#221f20,#221f20)",
          padding: "35px 0",
        }}
      >
        <div className="container">
          <div className="row align-items-center text-center text-lg-start">
            {/* LOGO */}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <h3
                className="fw-bold"
                style={{
                  color: "#febd17",
                }}
              >
                Luminar
              </h3>
            </div>

            {/* TELEFONE */}
            <div className="col-lg-3 mb-3 mb-lg-0">
              <div className="text-white">
                <i
                  className="bi bi-telephone-fill me-2"
                  style={{ color: "#febd17" }}
                ></i>
                (11) 99999-9999
              </div>
            </div>

            {/* EMAIL */}
            <div className="col-lg-3 mb-3 mb-lg-0">
              <div className="text-white">
                <i
                  className="bi bi-envelope-fill me-2"
                  style={{ color: "#febd17" }}
                ></i>
                contato@luminar.com
              </div>
            </div>

            {/* LOCAL */}
            <div className="col-lg-3">
              <div className="text-white">
                <i
                  className="bi bi-geo-alt-fill me-2"
                  style={{ color: "#febd17" }}
                ></i>
                São Paulo - SP
              </div>
            </div>
          </div>

          {/* COPYRIGHT */}
          <div
            className="text-center mt-4 pt-3"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.1)",
              color: "#bdbdbd",
              fontSize: "14px",
            }}
          >
            © 2026 Luminar. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </>
  );
}
