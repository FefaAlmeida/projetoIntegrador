export default function Header() {
  return (
    <>
      {/* HEADER */}
      <header
        className="border-bottom"
        style={{
          background: "linear-gradient(90deg,#221f20,#221f20)",
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
        }}
      >
        <div className="container-fluid px-5 d-flex flex-wrap justify-content-between align-items-center py-3">

          {/* LOGO */}
          <a
            href="/"
            className="d-flex align-items-center text-decoration-none"
          >
            <img
              src="logo-semEscrita.png"
              alt="Luminar Logo"
              width="55"
              height="55"
              className="me-2"
              style={{ objectFit: "contain" }}
            />

            <span
              className="fs-4 fw-bold"
              style={{ color: "#febd17" }}
            >
              Luminar
            </span>
          </a>

          {/* MENU */}
          <ul className="nav nav-pills align-items-center gap-3">
            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Início
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                Serviços
              </a>

              <ul
                className="dropdown-menu"
                style={{
                  backgroundColor: "#221f20",
                }}
              >
                <li>
                  <a className="dropdown-item text-white" href="#">
                    Instalação de painéis solares
                  </a>
                </li>

                <li>
                  <a className="dropdown-item text-white" href="#">
                    Monitoramento energético
                  </a>
                </li>

                <li>
                  <a className="dropdown-item text-white" href="#">
                    Manutenção
                  </a>
                </li>

                <li>
                  <a className="dropdown-item text-white" href="#">
                    Investimento energético empresarial
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                Orçamento
              </a>
            </li>

            <li className="nav-item">
              <a href="#" className="nav-link text-white">
                FAQ
              </a>
            </li>

            <li className="nav-item">
              <a
                href="#"
                className="btn fw-bold px-4 py-2"
                style={{
                  backgroundColor: "#febd17",
                  borderRadius: "12px",
                  color: "#221f20",
                }}
              >
                Login/Cadastro
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
