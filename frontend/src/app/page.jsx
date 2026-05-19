"use client";

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <header className="bg-dark">
     <div className="container-fluid px-5 d-flex flex-wrap justify-content-between align-items-center py-3">    
        
        <a
          href="/"
          className="d-flex align-items-center text-decoration-none"
        >
          {/* LOGO */}
        <img
        src="/logo-semEscrita.png"
        alt="Luminar Logo"
        width="45"
        height="45"
        style={{ 
          objectFit: "contain",
          marginRight: "14px"
        }}
      />

          {/* NOME */}
          <span className="fs-4 fw-bold text-warning">
            Luminar
          </span>
        </a>

        <ul className="nav nav-pills align-items-center">
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

            <ul className="dropdown-menu dropdown-menu-dark">
              <li>
                <a className="dropdown-item" href="#">
                  Instalação de painéis solares
                </a>
              </li>

              <li>
                <a className="dropdown-item" href="#">
                  Monitoramento energético
                </a>
              </li>

              <li>
                <a className="dropdown-item" href="#">
                  Manutenção
                </a>
              </li>

              <li>
                <a className="dropdown-item" href="#">
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

          <li className="nav-item ms-2">
            <a
              href="#"
              className="btn btn-warning fw-bold"
            >
              Login/Cadastro
            </a>
          </li>
        </ul>
      </div>
    </header>

  <div className="bg-light">


  {/* CARROSSEL */}
<div 
  className="position-relative overflow-hidden pt-0 px-3 pb-3 p-md-5 text-center text-white" 
  style={{ 
    // Substitua o link abaixo pela URL da sua imagem real (ex: /images/background.jpg)
    backgroundImage: 'linear-gradient(rgba(33, 37, 41, 0.8), rgba(33, 37, 41, 0.85)), url("https://moduloenergia.com/wp-content/uploads/telha-solar-ou-painel-solar-qual-o-melhor.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '12px'
  }}
>
  <div className="col-md-6 p-lg-5 mx-auto my-5 position-relative" style={{ zIndex: 2 }}>
    {/* Título Principal com Destaque Amarelo */}
    <h1 className="display-3 fw-bold mb-3 text-uppercase tracking-wide">
      Projetado para <span style={{ color: '#FFC107' }}>Empresas</span>
    </h1>
    
    {/* Subtítulo */}
    <h3 className="fw-light mb-5 fs-4" style={{ color: '#e9ecef' }}>
      Consiga tudo o que quiser com o luminar.
    </h3>
  </div>
</div>

{/* HERO */}
<section className="py-5 bg-light">
  <div className="container">
    <div className="row align-items-center g-5">

      {/* TEXTO */}
      <div className="col-lg-6">

        <h1
          className="display-4 fw-bold mb-4"
          style={{
            color: "#1a1a1a",
            lineHeight: "1.2",
          }}
        >
          Energia solar para reduzir sua conta de luz
        </h1>

        <p
          className="lead"
          style={{
            color: "#6c757d",
            maxWidth: "540px",
          }}
        >
          Projetamos e instalamos sistemas de energia solar
          fotovoltaica para residências, comércios e
          indústrias com alta eficiência e economia garantida.
        </p>

        <div className="d-flex flex-wrap gap-3 mt-4">

          <button
            className="btn btn-warning btn-lg fw-bold px-4"
            style={{
              borderRadius: "12px",
            }}
          >
            Solicitar orçamento
          </button>

          <button
            className="btn btn-outline-dark btn-lg fw-bold px-4"
            style={{
              borderRadius: "12px",
            }}
          >
            Simular economia
          </button>

        </div>

      </div>

      {/* IMAGEM */}
      <div className="col-lg-6 text-center">

        <img
          src="painelsolar.jpg"
          className="img-fluid shadow"
          alt="Painel solar"
          style={{
            borderRadius: "24px",
            maxHeight: "500px",
            objectFit: "cover",
          }}
        />

      </div>

    </div>
  </div>
</section>

  {/* DIFERENCIAIS */}
  <section className="py-5 bg-white">
    <div className="container">

      <div className="text-center mb-5">
        <h2
          className="fw-bold"
          style={{
            fontSize: "2.7rem",
            color: "#212529",
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: "1px",
          }}
        >
          Nossos Diferenciais
        </h2>

        <div
          className="mx-auto mt-3"
          style={{
            width: "90px",
            height: "5px",
            backgroundColor: "#FFC107",
            borderRadius: "10px",
          }}
        ></div>
      </div>

      <div className="row g-4">

        {/* CARD */}
        <div className="col-md-4">
          <div
            className="card border-0 shadow-lg h-100 text-center p-4 rounded-4"
            style={{
              transition: "0.3s",
            }}
          >
            <div
              className="mx-auto mb-4 d-flex align-items-center justify-content-center"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#FFC107",
              }}
            >
              <i className="bi bi-cash-coin fs-2 text-dark"></i>
            </div>

            <h4 className="fw-bold mb-3">
              Economia Real
            </h4>

            <p className="text-secondary">
              Economize até 95% na conta de energia com soluções eficientes.
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100 text-center p-4 rounded-4">

            <div
              className="mx-auto mb-4 d-flex align-items-center justify-content-center"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#FFC107",
              }}
            >
              <i className="bi bi-lightning-charge fs-2 text-dark"></i>
            </div>

            <h4 className="fw-bold mb-3">
              Tecnologia Moderna
            </h4>

            <p className="text-secondary">
              Equipamentos modernos com alta eficiência e durabilidade.
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="col-md-4">
          <div className="card border-0 shadow-lg h-100 text-center p-4 rounded-4">

            <div
              className="mx-auto mb-4 d-flex align-items-center justify-content-center"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "#FFC107",
              }}
            >
              <i className="bi bi-headset fs-2 text-dark"></i>
            </div>

            <h4 className="fw-bold mb-3">
              Suporte Especializado
            </h4>

            <p className="text-secondary">
              Atendimento técnico rápido e suporte completo para você.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/* SERVIÇOS */}
<section
  className="py-5"
  style={{
    backgroundColor: "#FFC107",
  }}
>
  <div className="container">

    <div className="text-center mb-5">

      <h2
        className="fw-bold text-dark"
        style={{
          fontSize: "3rem",
        }}
      >
        Serviços
      </h2>

      <p className="text-dark">
        Soluções completas em energia solar.
      </p>

    </div>

  <div className="row gx-5 gy-4">


      {/* CARD */}
       <div className="col-md-3">
          <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
              className="card-img-top"
              alt=""
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />

            <div className="card-body text-center">

              <a
                href="/instalacao"
                className="text-decoration-none text-dark"
              >
                <h5 className="fw-bold">
                  Instalação de painéis solares
                </h5>
              </a>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
              className="card-img-top"
              alt=""
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />

            <div className="card-body text-center">

              <a
                href="/monitoramento"
                className="text-decoration-none text-dark"
              >
                <h5 className="fw-bold">
                  Monitoramento energético
                </h5>
              </a>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
              className="card-img-top"
              alt=""
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />

            <div className="card-body text-center">

              <a
                href="/manutencao"
                className="text-decoration-none text-dark"
              >
                <h5 className="fw-bold">
                  Manutenção
                </h5>
              </a>

            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04"
              className="card-img-top"
              alt=""
              style={{
                height: "220px",
                objectFit: "cover",
              }}
            />

            <div className="card-body text-center">

              <a
                href="/empresarial"
                className="text-decoration-none text-dark"
              >
                <h5 className="fw-bold">
                  Investimento empresarial
                </h5>
              </a>

            </div>
          </div>
        </div>
    </div>
  </div>
</section>


  {/* ORÇAMENTO CRIATIVO */}
<section
  className="position-relative overflow-hidden py-5"
  style={{
    background:
      "#221f20",
  }}
>
  <div className="container position-relative">

    <div className="row align-items-center g-5">

      <div className="col-lg-7">

        <span className="badge bg-warning text-dark px-4 py-2 mb-4 fs-6">
          Simule sua economia
        </span>

        <h2
          className="fw-bold text-white mb-4"
          style={{
            fontSize: "3.5rem",
            lineHeight: "1.2",
          }}
        >
          Transforme luz solar em economia real
        </h2>

        <p
          className="text-light"
          style={{
            fontSize: "1.2rem",
            maxWidth: "650px",
            lineHeight: "1.8",
          }}
        >
          Descubra quanto você pode economizar utilizando energia
          solar. Nossa equipe cria uma solução personalizada para sua
          residência ou empresa.
        </p>

        <div className="d-flex flex-wrap gap-3 mt-4">

          <button className="btn btn-warning btn-lg fw-bold px-5 py-3 shadow">
            Solicitar orçamento
          </button>

          <button className="btn btn-outline-light btn-lg fw-bold px-5 py-3">
            Falar com especialista
          </button>

        </div>

      </div>

      <div className="col-lg-5 text-center">

        <div
          className="bg-warning rounded-circle mx-auto d-flex align-items-center justify-content-center shadow-lg"
          style={{
            width: "320px",
            height: "320px",
          }}
        >
          <div>

            <h1
              className="fw-bold text-dark"
              style={{
                fontSize: "4rem",
              }}
            >
              95%
            </h1>

            <p className="fw-bold text-dark fs-5">
              de economia
            </p>

          </div>
        </div>

      </div>

    </div>
  </div>
</section>

  {/* FAQ */}
  <section className="py-5 bg-light">
    <div className="container">

      <h2 className="text-center fw-bold mb-5">
        Perguntas Frequentes
      </h2>

      <div
        className="accordion accordion-flush shadow rounded-4 overflow-hidden"
        id="accordionFlushExample"
      >

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
            >
              Como funciona a energia solar?
            </button>
          </h2>

          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              A energia solar converte a luz do sol em energia elétrica.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
            >
              Quanto posso economizar?
            </button>
          </h2>

          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Você pode economizar até 95% na conta de energia.
            </div>
          </div>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed fw-bold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
            >
              Vocês fazem manutenção?
            </button>
          </h2>

          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              Sim, realizamos manutenção preventiva e corretiva.
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/* FOOTER */}
  <footer className="bg-dark text-light py-4">
    <div className="container d-flex flex-wrap justify-content-between align-items-center">

      <p className="mb-0 text-secondary">
        © 2025 Luminar
      </p>

      <ul className="nav">

        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            Início
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            Serviços
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link text-white">
            Orçamento
          </a>
        </li>

        <li className="nav-item">
          <a href="#" className="nav-link text-warning fw-bold">
            Login
          </a>
        </li>

      </ul>
    </div>
  </footer>

</div>
</>
  )}


