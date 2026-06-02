"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ChamadosPage() {
    const [abrirOrdenar, setAbrirOrdenar] = useState(false);
    const [ordenacao, setOrdenacao] = useState("Mais recentes");
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [hoveredItem, setHoveredItem] = useState("");

    const mensagens = {
        1: [
            {
                avatar: "JS",
                nome: "João Silva",
                email: "joaosilva@email.com",
                categoria: "Contato",
                data: "Hoje, 10:32",
                mensagem: "Olá! Gostaria de saber mais sobre os planos disponíveis para empresas.",
                destaque: true,
            },
            {
                avatar: "AM",
                nome: "Ana Martins",
                email: "ana.martins@email.com",
                categoria: "Suporte",
                data: "Hoje, 09:15",
                mensagem: "Estou com dificuldades para acessar minha conta. Pode me ajudar?",
            },
            {
                avatar: "CR",
                nome: "Carlos Roberto",
                email: "carlosr@email.com",
                categoria: "Dúvida",
                data: "Ontem, 16:45",
                mensagem: "Qual o prazo de cancelamento do serviço?",
            },
        ],
        2: [
            {
                avatar: "LF",
                nome: "Lucas Ferreira",
                email: "lucas@email.com",
                categoria: "Financeiro",
                data: "Hoje, 08:12",
                mensagem: "Preciso atualizar os dados da minha cobrança.",
                destaque: true,
            },
            {
                avatar: "MP",
                nome: "Mariana Pereira",
                email: "mariana@email.com",
                categoria: "Comercial",
                data: "Ontem, 13:40",
                mensagem: "Gostaria de alterar meu plano atual.",
            },
            {
                avatar: "TG",
                nome: "Thiago Gomes",
                email: "thiago@email.com",
                categoria: "Atendimento",
                data: "Ontem, 11:02",
                mensagem: "Não estou conseguindo emitir minha fatura.",
            },
        ],
        3: [
            {
                avatar: "RB",
                nome: "Rafael Barbosa",
                email: "rafael@email.com",
                categoria: "Suporte",
                data: "22/05, 18:30",
                mensagem: "Meu acesso expirou mesmo após o pagamento.",
                destaque: true,
            },
            {
                avatar: "EC",
                nome: "Eduarda Costa",
                email: "eduarda@email.com",
                categoria: "Contato",
                data: "22/05, 15:14",
                mensagem: "Quero entender melhor os recursos premium.",
            },
            {
                avatar: "VN",
                nome: "Vinicius Nunes",
                email: "vinicius@email.com",
                categoria: "Financeiro",
                data: "21/05, 09:45",
                mensagem: "Como solicito reembolso?",
            },
        ],
    };

    return (
        <>
            {/* CONTAINER PRINCIPAL DA PÁGINA */}
            <main
                style={{
                    background: "#f7f7f7",
                    minHeight: "100vh",

                    /* ESPAÇAMENTO INTERNO */
                    padding: "40px",

                    /* FONTE GLOBAL */
                    fontFamily: "Inter, Arial",

                    /* REMOVE O ESPAÇO EM BRANCO */
                    width: "100%",
                    overflowX: "hidden",

                    /* SUAVIZA O MOVIMENTO DA SIDEBAR */
                    transition: "all 0.3s ease",
                }}
            >
                {/* ÁREA CENTRAL DO CONTEÚDO */}
                <div
                    
                >
                    {/* TOPO */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: "28px",
                        }}
                    >
                        <div>
                            <h1
                                style={{
                                    fontSize: "54px",
                                    fontWeight: "800",
                                    margin: 0,
                                    color: "#221f20",
                                }}
                            >
                                Mensagens
                            </h1>
                            <p
                                style={{
                                    marginTop: "10px",
                                    color: "#7a7a7a",
                                    fontSize: "17px",
                                }}
                            >
                                Centralize e gerencie todas as mensagens recebidas.
                            </p>
                        </div>

                        <button
                            style={{
                                background: "#febd17",
                                border: "none",
                                height: "52px",
                                padding: "0 26px",
                                borderRadius: "14px",
                                fontWeight: "700",
                                fontSize: "15px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            {/* Bootstrap Icon: Sliders */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8zm9.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1z" />
                            </svg>
                            Filtros
                        </button>
                    </div>

                    {/* CARD PRINCIPAL */}
                    <div style={{ borderRadius: "32px", padding: "0" }}>

                        {/* ABAS / INDICADORES */}
                        <div
                            style={{
                                background: "#fff",
                                borderRadius: "18px",
                                padding: "26px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                border: "1px solid #ececec",
                                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center" }}>
                                {/* TODAS */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "18px",
                                        paddingBottom: "18px",
                                        borderBottom: "3px solid #febd17",
                                        paddingRight: "40px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "50%",
                                            background: "#fff6d8",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#febd17"
                                        }}
                                    >
                                        {/* Bootstrap Icon: Chat Left Text */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#221f20" }}>
                                            23
                                        </h2>
                                        <span style={{ fontSize: "16px", color: "#444" }}>Todas</span>
                                    </div>
                                </div>

                                {/* DIVISOR */}
                                <div style={{ width: "1px", height: "72px", background: "#ececec", margin: "0 20px" }}></div>

                                {/* PENDENTES */}
                                <div style={{ display: "flex", alignItems: "center", gap: "18px", paddingRight: "40px" }}>
                                    <div
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "50%",
                                            background: "#f5f5f5",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#7a7a7a"
                                        }}
                                    >
                                        {/* Bootstrap Icon: Clock */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#221f20" }}>
                                            17
                                        </h2>
                                        <span style={{ fontSize: "16px", color: "#444" }}>Pendentes</span>
                                    </div>
                                </div>

                                {/* DIVISOR */}
                                <div style={{ width: "1px", height: "72px", background: "#ececec", margin: "0 20px" }}></div>

                                {/* CONCLUÍDAS */}
                                <div style={{ display: "flex", alignItems: "center", gap: "18px", paddingRight: "40px" }}>
                                    <div
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "50%",
                                            background: "#f5f5f5",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#7a7a7a"
                                        }}
                                    >
                                        {/* Bootstrap Icon: Check Circle */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#221f20" }}>
                                            6
                                        </h2>
                                        <span style={{ fontSize: "16px", color: "#444" }}>Concluídas</span>
                                    </div>
                                </div>

                                {/* DIVISOR */}
                                <div style={{ width: "1px", height: "72px", background: "#ececec", margin: "0 20px" }}></div>

                                {/* SPAM */}
                                <div style={{ display: "flex", alignItems: "center", gap: "18px", paddingRight: "40px" }}>
                                    <div
                                        style={{
                                            width: "58px",
                                            height: "58px",
                                            borderRadius: "50%",
                                            background: "#f5f5f5",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "#7a7a7a"
                                        }}
                                    >
                                        {/* Bootstrap Icon: Trash3 */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5m3.5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5m3.5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0v-8a.5.5 0 0 1 .5-.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "800", color: "#221f20" }}>
                                            0
                                        </h2>
                                        <span style={{ fontSize: "16px", color: "#444" }}>Spam</span>
                                    </div>
                                </div>
                            </div>

                            {/* BOTÃO ORDENAR */}
                            <div style={{ position: "relative" }}>
                                <button
                                    style={{
                                        height: "54px",
                                        border: "1px solid #dddddd",
                                        background: "#fff",
                                        borderRadius: "14px",
                                        padding: "0 24px",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                        fontSize: "15px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px"
                                    }}
                                    onClick={() => setAbrirOrdenar(!abrirOrdenar)}
                                >
                                    {/* Bootstrap Icon: Arrows Expand */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708zM8 10.5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V11a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                    {ordenacao}
                                    {/* Bootstrap Icon: Chevron Down */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" style={{ marginLeft: "4px" }}>
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                    </svg>
                                </button>

                                {abrirOrdenar && (
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: "65px",
                                            right: 0,
                                            width: "240px",
                                            background: "#fff",
                                            borderRadius: "18px",
                                            padding: "14px",
                                            boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
                                            border: "1px solid #ececec",
                                            zIndex: 99,
                                        }}
                                    >
                                        {["Mais recentes", "Mais antigas", "A-Z", "Z-A"].map((item) => (
                                            <button
                                                key={item}
                                                onClick={() => {
                                                    setOrdenacao(item);
                                                    setAbrirOrdenar(false);
                                                }}
                                                onMouseEnter={() => setHoveredItem(item)}
                                                onMouseLeave={() => setHoveredItem("")}
                                                style={{
                                                    width: "100%",
                                                    height: "48px",
                                                    border: "none",
                                                    borderRadius: "12px",
                                                    textAlign: "left",
                                                    paddingLeft: "18px",
                                                    fontWeight: "600",
                                                    cursor: "pointer",
                                                    marginBottom: "8px",
                                                    transition: "0.2s",
                                                    background: hoveredItem === item ? "#fff7dc" : "transparent",
                                                }}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* LISTA DE MENSAGENS */}
                        <div
                            style={{
                                marginTop: "24px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "18px",
                            }}
                        >
                            {mensagens[paginaAtual].map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: "#fff",
                                        borderRadius: "18px",
                                        minHeight: "120px",
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "0 22px",
                                        position: "relative",
                                        border: "1px solid #ececec",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                                        opacity: index === 2 ? 0.75 : 1,
                                    }}
                                >
                                    {/* BARRA LATERAL */}
                                    <div
                                        style={{
                                            position: "absolute",
                                            left: 0,
                                            top: 0,
                                            width: "4px",
                                            height: "100%",
                                            borderRadius: "18px 0 0 18px",
                                            background: item.destaque ? "#febd17" : "#d9d9d9",
                                        }}
                                    ></div>

                                    {/* BOLINHA */}
                                    <div
                                        style={{
                                            width: "10px",
                                            height: "10px",
                                            borderRadius: "50%",
                                            marginRight: "18px",
                                            background: item.destaque ? "#febd17" : "#bdbdbd",
                                        }}
                                    ></div>

                                    {/* AVATAR */}
                                    <div
                                        style={{
                                            width: "68px",
                                            height: "68px",
                                            borderRadius: "50%",
                                            background: item.destaque ? "#fff5d6" : "#f3f3f3",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: "800",
                                            fontSize: "20px",
                                            color: item.destaque ? "#febd17" : "#221f20",
                                            marginRight: "24px",
                                        }}
                                    >
                                        {item.avatar}
                                    </div>

                                    {/* INFORMAÇÕES */}
                                    <div style={{ flex: 1, padding: "20px 0" }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "flex-start",
                                            }}
                                        >
                                            <div>
                                                <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#221f20" }}>
                                                    {item.nome}
                                                </h3>
                                                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "8px" }}>
                                                    <span style={{ color: "#7b7b7b", fontSize: "15px" }}>{item.email}</span>
                                                    <span style={{ color: "#b0b0b0", fontSize: "14px" }}>•</span>
                                                    <span style={{ color: "#7b7b7b", fontSize: "15px" }}>{item.categoria}</span>
                                                </div>
                                            </div>
                                            <span style={{ color: "#7b7b7b", fontSize: "15px" }}>{item.data}</span>
                                        </div>
                                        <p style={{ marginTop: "14px", fontSize: "17px", color: "#221f20", marginBotton: 0 }}>
                                            {item.mensagem}
                                        </p>
                                    </div>

                                    {/* BOTÕES DE AÇÃO */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginLeft: "30px" }}>
                                        <button
                                            style={{
                                                height: "46px",
                                                padding: "0 22px",
                                                borderRadius: "12px",
                                                border: "1px solid #f0d47d",
                                                background: "#fffdfa",
                                                color: "#febd17",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                                fontSize: "15px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px"
                                            }}
                                        >
                                            {/* Bootstrap Icon: Dash Circle */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                                            </svg>
                                            Pendente
                                        </button>

                                        <button
                                            style={{
                                                height: "46px",
                                                padding: "0 24px",
                                                borderRadius: "12px",
                                                border: "1px solid #d8d8d8",
                                                background: "#fff",
                                                color: "#221f20",
                                                fontWeight: "600",
                                                cursor: "pointer",
                                                fontSize: "15px",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "8px"
                                            }}
                                        >
                                            {/* Bootstrap Icon: Check2 */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0" />
                                            </svg>
                                            Concluído
                                        </button>

                                        <button
                                            style={{
                                                border: "none",
                                                background: "transparent",
                                                color: "#777",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: "4px"
                                            }}
                                        >
                                            {/* Bootstrap Icon: Three Dots Vertical */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PAGINAÇÃO */}
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "35px" }}>
                            {[1, 2, 3].map((numero) => (
                                <button
                                    key={numero}
                                    onClick={() => setPaginaAtual(numero)}
                                    style={{
                                        width: "42px",
                                        height: "42px",
                                        borderRadius: "10px",
                                        border: "1px solid #ececec",
                                        fontWeight: "700",
                                        cursor: "pointer",
                                        background: paginaAtual === numero ? "#febd17" : "#fff",
                                    }}
                                >
                                    {numero}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}
