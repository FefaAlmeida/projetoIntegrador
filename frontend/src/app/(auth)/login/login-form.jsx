"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";
import styles from "./page.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
 const searchParams = useSearchParams();
 const { login } = useAuth();

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
 } = useForm({
  defaultValues: { email: "", senha: "" },
 });

 const onSubmit = async ({ email, senha }) => {
  const returnTo = searchParams.get("returnTo");
  await login({
   email,
   senha,
   redirectTo: returnTo && returnTo.startsWith("/") ? returnTo : undefined,
  });
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)} noValidate>
   <div className="mb-4">
    <label className="form-label small fw-bold text-secondary mb-2">
     E-mail
    </label>
    <input
     type="email"
     {...register("email", {
      required: "Informe seu e-mail",
      pattern: { value: EMAIL_REGEX, message: "Formato de e-mail inválido" },
     })}
     className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input} ${
      errors.email ? "is-invalid" : ""
     }`}
    />
    {errors.email && (
     <div className="invalid-feedback d-block">{errors.email.message}</div>
    )}
   </div>

   <div className="mb-3">
    <label className="form-label small fw-bold text-secondary mb-2">
     Senha
    </label>
    <input
     type="password"
     {...register("senha", {
      required: "Informe sua senha",
      minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
     })}
     className={`form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input} ${
      errors.senha ? "is-invalid" : ""
     }`}
    />
    {errors.senha && (
     <div className="invalid-feedback d-block">{errors.senha.message}</div>
    )}
   </div>

   <button
    type="submit"
    disabled={isSubmitting}
    className={`btn w-100 py-3 rounded-pill fw-bold shadow-sm mb-3 ${styles.submit}`}
   >
    {isSubmitting ? "Verificando dados..." : "Entrar"}
   </button>

   <div className="text-center mb-2">
    <a href="#forgot" className={`text-decoration-none small ${styles.link}`}>
     Esqueceu a senha?
    </a>
   </div>

    <div className="text-center">
    <a
        href={ROUTES.REGISTER.href}
        className="text-decoration-none small"
    >
        <span style={{ color: "#000", fontWeight: "normal" }}>
        Não tem uma conta?{" "}
        </span>

        <span className={styles.linkBig}>Crie uma!</span>
    </a>
    </div>
  </form>
 );
}
