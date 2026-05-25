"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";
import { PageSkeleton } from "@/components/shared/skeleton";
import styles from "./page.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PreferencesContent() {
 const { user, loading, logout, updateProfile } = useAuth();

 const [nome, setNome] = useState("");
 const [email, setEmail] = useState("");
 const [salvandoDados, setSalvandoDados] = useState(false);

 const [senhaAtual, setSenhaAtual] = useState("");
 const [novaSenha, setNovaSenha] = useState("");
 const [confirmarSenha, setConfirmarSenha] = useState("");
 const [salvandoSenha, setSalvandoSenha] = useState(false);

 useEffect(() => {
  if (user) {
   setNome(user.nome || "");
   setEmail(user.email || "");
  }
 }, [user]);

 if (loading || !user) return <PageSkeleton withHeader={false} />;

 const salvarDados = async (e) => {
  e.preventDefault();
  const nomeTrim = nome.trim();
  const emailTrim = email.trim();

  if (nomeTrim.length < 2)
   return toast.error("O nome deve ter pelo menos 2 caracteres");
  if (!EMAIL_REGEX.test(emailTrim))
   return toast.error("Formato de e-mail inválido");

  if (nomeTrim === user.nome && emailTrim.toLowerCase() === user.email) {
   return toast.info("Nada para salvar");
  }

  setSalvandoDados(true);
  await updateProfile({ nome: nomeTrim, email: emailTrim });
  setSalvandoDados(false);
 };

 const salvarSenha = async (e) => {
  e.preventDefault();

  if (!senhaAtual) return toast.error("Informe sua senha atual");
  if (novaSenha.length < 6)
   return toast.error("A nova senha deve ter pelo menos 6 caracteres");
  if (novaSenha !== confirmarSenha)
   return toast.error("As senhas não coincidem");
  if (senhaAtual === novaSenha)
   return toast.error("A nova senha precisa ser diferente da atual");

  setSalvandoSenha(true);
  const { ok } = await updateProfile({ senhaAtual, novaSenha });
  setSalvandoSenha(false);
  if (!ok) return;

  setSenhaAtual("");
  setNovaSenha("");
  setConfirmarSenha("");
 };

 const inicial = (user?.nome || user?.email || "?").charAt(0).toUpperCase();
 const inputClass = `form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input}`;

 return (
  <div className={styles.shell}>
   <div className={styles.banner}>
    <div className="container">
     <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
      <div
       className={`d-flex align-items-center justify-content-center fw-bold ${styles.avatar}`}
      >
       {inicial}
      </div>
      <div>
       <span className={`badge mb-2 ${styles.tipoBadge}`}>{user.tipo}</span>
       <h1 className={`fw-bold text-white mb-1 ${styles.bannerTitle}`}>
        Suas <span className={styles.bannerAccent}>preferências</span>
       </h1>
       <p className={`mb-0 ${styles.bannerSub}`}>
        Atualize seus dados pessoais e mantenha sua conta segura.
       </p>
      </div>
     </div>
    </div>
   </div>

   <div className={`container ${styles.cardsWrap}`}>
    <div className="row g-4">
     <div className="col-lg-7">
      <div className={`bg-white p-5 rounded-4 h-100 ${styles.card}`}>
       <div className="d-flex align-items-center gap-2 mb-4">
        <i className={`bi bi-person-vcard-fill fs-4 ${styles.cardIcon}`}></i>
        <h2 className={`fs-4 fw-bold m-0 ${styles.cardTitle}`}>
         Dados pessoais
        </h2>
       </div>

       <form onSubmit={salvarDados} noValidate>
        <div className="mb-4">
         <label className="form-label small fw-bold text-secondary mb-2">
          Nome completo
         </label>
         <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={inputClass}
         />
        </div>

        <div className="mb-4">
         <label className="form-label small fw-bold text-secondary mb-2">
          E-mail
         </label>
         <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
         />
        </div>

        <button
         type="submit"
         disabled={salvandoDados}
         className={`btn fw-bold px-4 py-2 rounded-pill ${styles.btnPrimary}`}
        >
         {salvandoDados ? "Salvando..." : "Salvar alterações"}
        </button>
       </form>
      </div>
     </div>

     <div className="col-lg-5">
      <div className={`bg-white p-5 rounded-4 h-100 ${styles.card}`}>
       <div className="d-flex align-items-center gap-2 mb-4">
        <i className={`bi bi-shield-lock-fill fs-4 ${styles.cardIcon}`}></i>
        <h2 className={`fs-4 fw-bold m-0 ${styles.cardTitle}`}>Segurança</h2>
       </div>

       <form onSubmit={salvarSenha} noValidate>
        <div className="mb-3">
         <label className="form-label small fw-bold text-secondary mb-2">
          Senha atual
         </label>
         <input
          type="password"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          className={inputClass}
         />
        </div>

        <div className="mb-3">
         <label className="form-label small fw-bold text-secondary mb-2">
          Nova senha
         </label>
         <input
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className={inputClass}
         />
         <small className="text-muted">Mínimo 6 caracteres</small>
        </div>

        <div className="mb-4">
         <label className="form-label small fw-bold text-secondary mb-2">
          Confirmar nova senha
         </label>
         <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className={inputClass}
         />
        </div>

        <button
         type="submit"
         disabled={salvandoSenha}
         className={`btn fw-bold px-4 py-2 rounded-pill w-100 ${styles.btnInverted}`}
        >
         {salvandoSenha ? "Alterando..." : "Alterar senha"}
        </button>
       </form>
      </div>
     </div>

     <div className="col-12">
      <div
       className={`d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 p-4 rounded-4 ${styles.dangerCard}`}
      >
       <div>
        <h3 className={`fs-5 fw-bold mb-1 ${styles.dangerTitle}`}>
         Encerrar sessão
        </h3>
        <p className="small text-secondary m-0">
         Você precisará entrar novamente para acessar sua conta neste
         dispositivo.
        </p>
       </div>
       <button
        type="button"
        onClick={() => logout()}
        className={`btn fw-bold px-4 py-2 rounded-pill ${styles.btnDanger}`}
       >
        <i className="bi bi-box-arrow-right me-2"></i>
        Sair da conta
       </button>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
