import DashboardContent from "./dashboard-content";

export const metadata = {
 title: "Dashboard — Luminar",
 description: "Painel do cliente Luminar com atalhos para orçamentos e preferências.",
};

export default function CustomerDashboardPage() {
 return <>
      <div
        style={{
          backgroundColor: "#000",
          minHeight: "100vh",
          color: "white",
          fontFamily: "Arial",
          padding: "30px 60px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          {/* LOGO */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "45px",
                height: "45px",
                border: "2px solid #ffb400",
                borderRadius: "50%",
              }}
            ></div>

            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "28px",
                }}
              >
                SOLARIS
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#ffb400",
                  fontSize: "12px",
                  letterSpacing: "2px",
                }}
              >
                ENERGIA SOLAR
              </p>
            </div>
          </div>

          {/* MENU */}
          <div
            style={{
              display: "flex",
              gap: "40px",
              fontSize: "18px",
            }}
          >
            <label>Soluções</label>
            <label>Benefícios</label>
            <label>Como funciona</label>
            <label>Depoimentos</label>
            <label>Sobre nós</label>
          </div>

          {/* BOTÃO */}
          <button
            style={{
              background: "transparent",
              border: "1px solid #ffb400",
              color: "#ffb400",
              padding: "15px 25px",
              borderRadius: "12px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Fale com um especialista
          </button>
        </div>

        {/* HERO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          {/* TEXTO */}
          <div style={{ width: "50%" }}>
            <h1
              style={{
                fontSize: "90px",
                lineHeight: "95px",
                marginBottom: "30px",
              }}
            >
              Sua energia,
              <br />
              <span style={{ color: "#ffb400" }}>seu futuro.</span>
            </h1>

            <p
              style={{
                fontSize: "22px",
                color: "#cfcfcf",
                lineHeight: "40px",
                width: "90%",
                marginBottom: "40px",
              }}
            >
              A energia solar que transforma sua casa, seu negócio
              e o planeta. Economia todos os dias, sustentabilidade
              para sempre.
            </p>

            <button
              style={{
                backgroundColor: "#ffb400",
                border: "none",
                padding: "20px 35px",
                borderRadius: "14px",
                fontSize: "18px",
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: "50px",
              }}
            >
              Conheça nossas soluções
            </button>

            {/* CLIENTES */}
            <div
              style={{
                borderLeft: "2px solid #ffb400",
                paddingLeft: "20px",
              }}
            >
              <h2
                style={{
                  color: "#ffb400",
                  fontSize: "45px",
                  margin: 0,
                }}
              >
                +1.500
              </h2>

              <p
                style={{
                  marginTop: "10px",
                  color: "#d6d6d6",
                  fontSize: "20px",
                }}
              >
                clientes satisfeitos
              </p>
            </div>
          </div>

          {/* IMAGEM */}
          <div
            style={{
              width: "50%",
              position: "relative",
            }}
          >
            {/* BRILHO */}
            <div
              style={{
                width: "650px",
                height: "650px",
                background:
                  "radial-gradient(circle, rgba(255,180,0,0.7) 0%, rgba(0,0,0,0) 70%)",
                position: "absolute",
                top: "-100px",
                right: "-100px",
                zIndex: 0,
              }}
            ></div>

            {/* CASA */}
            <img
              src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1974&auto=format&fit=crop"
              alt="Casa solar"
              style={{
                width: "100%",
                borderRadius: "25px",
                position: "relative",
                zIndex: 1,
              }}
            />
          </div>
        </div>

        {/* LOGOS */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "80px",
            marginBottom: "60px",
            color: "#8a8a8a",
            fontSize: "35px",
            fontWeight: "bold",
          }}
        >
          <label>vivo</label>
          <label>ambev</label>
          <label>Coca-Cola</label>
          <label>natura</label>
          <label>Localiza</label>
          <label>Magalu</label>
        </div>

        {/* CARDS */}
        <div
          style={{
            backgroundColor: "#0d0d0d",
            border: "1px solid #1e1e1e",
            borderRadius: "30px",
            padding: "40px",
            display: "flex",
            justifyContent: "space-between",
            gap: "30px",
          }}
        >
          {/* CARD 1 */}
          <div style={{ width: "25%" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                border: "2px solid #ffb400",
                borderRadius: "50%",
                marginBottom: "20px",
              }}
            ></div>

            <h3
              style={{
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              Energia limpa
              <br />
              e renovável
            </h3>

            <p
              style={{
                color: "#c7c7c7",
                lineHeight: "30px",
                fontSize: "18px",
              }}
            >
              Um futuro melhor começa com escolhas inteligentes hoje.
            </p>
          </div>

          {/* CARD 2 */}
          <div style={{ width: "25%" }}>
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              Economia garantida
            </h3>

            <p
              style={{
                color: "#c7c7c7",
                lineHeight: "30px",
                fontSize: "18px",
              }}
            >
              Reduza sua conta de luz e invista no que realmente importa.
            </p>
          </div>

          {/* CARD 3 */}
          <div style={{ width: "25%" }}>
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              Segurança e tecnologia
            </h3>

            <p
              style={{
                color: "#c7c7c7",
                lineHeight: "30px",
                fontSize: "18px",
              }}
            >
              Sistemas de alta performance e monitoramento inteligente.
            </p>
          </div>

          {/* CARD 4 */}
          <div style={{ width: "25%" }}>
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "20px",
                color: "#ffb400",
              }}
            >
              Dica Solaris
            </h3>

            <p
              style={{
                color: "#c7c7c7",
                lineHeight: "30px",
                fontSize: "18px",
                marginBottom: "20px",
              }}
            >
              Aproveite o sol todos os dias e transforme luz em economia.
            </p>

            <button
              style={{
                background: "transparent",
                border: "none",
                color: "#ffb400",
                fontSize: "18px",
                cursor: "pointer",
                padding: 0,
              }}
            >
              Saiba mais →
            </button>
          </div>
        </div>
      </div>
 </>
}
