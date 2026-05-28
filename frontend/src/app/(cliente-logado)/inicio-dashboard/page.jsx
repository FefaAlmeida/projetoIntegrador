"use client";

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          fontFamily: "'Poppins', sans-serif",
          padding: "40px",
        }}
      >
        <div
          style={{
            maxWidth: "1450px",
            margin: "0 auto",
          }}
        >

          {/* TOPBAR */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "45px",
            }}
          >

            {/* ESQUERDA */}
            <div>
              <p
                style={{
                  color: "#8f8f8f",
                  marginBottom: "8px",
                  fontSize: "1rem",
                }}
              >
                Bem-vinda,
              </p>

              <h1
                style={{
                  fontSize: "3.7rem",
                  color: "#221f20",
                  margin: 0,
                  fontWeight: "700",
                  letterSpacing: "-2px",
                  lineHeight: "1",
                }}
              >
                Natalia.
              </h1>
            </div>

            {/* BOTÃO */}
            <button
              style={{
                border: "none",
                background: "#febd17",
                color: "#221f20",
                height: "58px",
                padding: "0 28px",
                borderRadius: "18px",
                fontWeight: "600",
                fontSize: "1rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                cursor: "pointer",
              }}
            >
              Ver relatório completo
            </button>
          </div>

          {/* HERO CARD */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #050505 0%, #101010 100%)",
              borderRadius: "36px",
              padding: "55px",
              position: "relative",
              overflow: "hidden",
              marginBottom: "35px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            }}
          >

            {/* BRILHO */}
            <div
              style={{
                position: "absolute",
                width: "500px",
                height: "500px",
                background:
                  "radial-gradient(circle, rgba(255,180,0,0.35) 0%, rgba(0,0,0,0) 70%)",
                top: "-220px",
                right: "-100px",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "50px",
              }}
            >

              {/* TEXTO */}
              <div style={{ width: "50%" }}>

                <p
                  style={{
                    color: "#ffb400",
                    fontWeight: "600",
                    marginBottom: "18px",
                    fontSize: "1rem",
                  }}
                >
                  PAINEL SOLAR INTELIGENTE
                </p>

                <h2
                  style={{
                    color: "#fff",
                    fontSize: "4.2rem",
                    lineHeight: "1.05",
                    marginBottom: "22px",
                    letterSpacing: "-3px",
                  }}
                >
                  Sua energia
                  <br />
                  em tempo real.
                </h2>

                <p
                  style={{
                    color: "#febd17",
                    fontSize: "1.15rem",
                    lineHeight: "34px",
                    maxWidth: "620px",
                    marginBottom: "35px",
                  }}
                >
                  Acompanhe geração, economia e desempenho do seu sistema
                  de forma moderna, rápida e intuitiva.
                </p>

                {/* MINI INFO */}
                <div
                  style={{
                    display: "flex",
                    gap: "18px",
                  }}
                >

                  {/* CARD */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "22px",
                      padding: "20px 24px",
                      minWidth: "190px",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <p
                      style={{
                        color: "#9f9f9f",
                        marginBottom: "10px",
                        fontSize: "0.95rem",
                      }}
                    >
                      Economia hoje
                    </p>

                    <h3
                      style={{
                        color: "#fff",
                        margin: 0,
                        fontSize: "2.2rem",
                        fontWeight: "700",
                      }}
                    >
                      R$ 48
                    </h3>
                  </div>

                  {/* CARD */}
                  <div
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "22px",
                      padding: "20px 24px",
                      minWidth: "190px",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <p
                      style={{
                        color: "#9f9f9f",
                        marginBottom: "10px",
                        fontSize: "0.95rem",
                      }}
                    >
                      Energia gerada
                    </p>

                    <h3
                      style={{
                        color: "#fff",
                        margin: 0,
                        fontSize: "2.2rem",
                        fontWeight: "700",
                      }}
                    >
                      42 kWh
                    </h3>
                  </div>
                </div>
              </div>

              {/* DIREITA */}
              <div
                style={{
                  width: "420px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "32px",
                  padding: "35px",
                  backdropFilter: "blur(14px)",
                }}
              >

                {/* TOPO */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "40px",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "#8f8f8f",
                        marginBottom: "8px",
                      }}
                    >
                      Desempenho
                    </p>

                    <h3
                      style={{
                        color: "#fff",
                        fontSize: "2.8rem",
                        margin: 0,
                      }}
                    >
                      82%
                    </h3>
                  </div>

                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      borderRadius: "22px",
                      background: "rgba(255,180,0,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i
                      className="bi bi-lightning-charge-fill"
                      style={{
                        color: "#ffb400",
                        fontSize: "2rem",
                      }}
                    />
                  </div>
                </div>

                {/* BARRA */}
                <div
                  style={{
                    width: "100%",
                    height: "12px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    marginBottom: "30px",
                  }}
                >
                  <div
                    style={{
                      width: "82%",
                      height: "100%",
                      background:
                        "linear-gradient(90deg, #ffb400 0%, #ffd34d 100%)",
                      borderRadius: "20px",
                    }}
                  />
                </div>

                {/* ITENS */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >

                  {/* ITEM */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        color: "#9f9f9f",
                        margin: 0,
                      }}
                    >
                      Produção mensal
                    </p>

                    <h4
                      style={{
                        color: "#fff",
                        margin: 0,
                      }}
                    >
                      1.284 kWh
                    </h4>
                  </div>

                  {/* ITEM */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        color: "#9f9f9f",
                        margin: 0,
                      }}
                    >
                      Economia total
                    </p>

                    <h4
                      style={{
                        color: "#fff",
                        margin: 0,
                      }}
                    >
                      R$ 892
                    </h4>
                  </div>

                  {/* ITEM */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        color: "#9f9f9f",
                        margin: 0,
                      }}
                    >
                      CO₂ evitado
                    </p>

                    <h4
                      style={{
                        color: "#fff",
                        margin: 0,
                      }}
                    >
                      2.4 ton
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GRID */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "28px",
            }}
          >

            {/* CARD */}
            <div
              style={{
                background: "#fff",
                borderRadius: "28px",
                padding: "32px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid #ececec",
              }}
            >
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background: "rgba(255,180,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "26px",
                }}
              >
                <i
                  className="bi bi-sun-fill"
                  style={{
                    color: "#ffb400",
                    fontSize: "1.5rem",
                  }}
                />
              </div>

              <h3
                style={{
                  fontSize: "1.4rem",
                  color: "#111",
                  marginBottom: "14px",
                }}
              >
                Produção solar
              </h3>

              <p
                style={{
                  color: "#7a7a7a",
                  lineHeight: "30px",
                  marginBottom: "22px",
                }}
              >
                Seu sistema segue operando com excelente desempenho.
              </p>

              <h2
                style={{
                  color: "#111",
                  margin: 0,
                  fontSize: "2.8rem",
                }}
              >
                +24%
              </h2>
            </div>

            {/* CARD */}
            <div
              style={{
                background: "#fff",
                borderRadius: "28px",
                padding: "32px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid #ececec",
              }}
            >
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background: "rgba(255,180,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "26px",
                }}
              >
                <i
                  className="bi bi-cash-stack"
                  style={{
                    color: "#ffb400",
                    fontSize: "1.5rem",
                  }}
                />
              </div>

              <h3
                style={{
                  fontSize: "1.4rem",
                  color: "#111",
                  marginBottom: "14px",
                }}
              >
                Economia mensal
              </h3>

              <p
                style={{
                  color: "#7a7a7a",
                  lineHeight: "30px",
                  marginBottom: "22px",
                }}
              >
                Continue economizando todos os meses com energia limpa.
              </p>

              <h2
                style={{
                  color: "#111",
                  margin: 0,
                  fontSize: "2.8rem",
                }}
              >
                R$ 892
              </h2>
            </div>

            {/* CARD */}
            <div
              style={{
                background: "#fff",
                borderRadius: "28px",
                padding: "32px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                border: "1px solid #ececec",
              }}
            >
              <div
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background: "rgba(255,180,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "26px",
                }}
              >
                <i
                  className="bi bi-globe-americas"
                  style={{
                    color: "#ffb400",
                    fontSize: "1.5rem",
                  }}
                />
              </div>

              <h3
                style={{
                  fontSize: "1.4rem",
                  color: "#111",
                  marginBottom: "14px",
                }}
              >
                Impacto ambiental
              </h3>

              <p
                style={{
                  color: "#7a7a7a",
                  lineHeight: "30px",
                  marginBottom: "22px",
                }}
              >
                Seu sistema já evitou toneladas de CO₂ no planeta.
              </p>

              <h2
                style={{
                  color: "#111",
                  margin: 0,
                  fontSize: "2.8rem",
                }}
              >
                2.4 ton
              </h2>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}