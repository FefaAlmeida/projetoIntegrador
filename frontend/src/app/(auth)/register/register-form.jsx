"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";
import styles from "./page.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterForm() {
 const { register: registerUser } = useAuth();

 const {
  register,
  handleSubmit,
  watch,
  formState: { errors, isSubmitting },
 } = useForm({
  defaultValues: { nome: "", email: "", senha: "", confirmarSenha: "" },
 });

 const onSubmit = async ({ nome, email, senha }) => {
  await registerUser({ nome, email, senha });
 };

 const inputClassName = (hasError) =>
  `form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input} ${
   hasError ? "is-invalid" : ""
  }`;

 const senhaValue = watch("senha");

 return (
  <form onSubmit={handleSubmit(onSubmit)} noValidate>
   <div className="mb-4">
    <label className="form-label small fw-bold text-secondary mb-2">
     Nome Completo
    </label>
    <input
     type="text"
     {...register("nome", {
      required: "Informe seu nome",
      minLength: { value: 2, message: "Nome muito curto" },
     })}
     className={inputClassName(errors.nome)}
    />
    {errors.nome && (
     <div className="invalid-feedback d-block">{errors.nome.message}</div>
    )}
   </div>

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
     className={inputClassName(errors.email)}
    />
    {errors.email && (
     <div className="invalid-feedback d-block">{errors.email.message}</div>
    )}
   </div>

   <div className="mb-4">
    <label className="form-label small fw-bold text-secondary mb-2">
     Senha
    </label>
    <input
     type="password"
     {...register("senha", {
      required: "Informe sua senha",
      minLength: { value: 6, message: "A senha deve ter pelo menos 6 caracteres" },
     })}
     className={inputClassName(errors.senha)}
    />
    {errors.senha && (
     <div className="invalid-feedback d-block">{errors.senha.message}</div>
    )}
   </div>

   <div className="mb-5">
    <label className="form-label small fw-bold text-secondary mb-2">
     Confirmar Senha
    </label>
    <input
     type="password"
     {...register("confirmarSenha", {
      required: "Confirme sua senha",
      validate: (value) => value === senhaValue || "As senhas não conferem",
     })}
     className={inputClassName(errors.confirmarSenha)}
    />
    {errors.confirmarSenha && (
     <div className="invalid-feedback d-block">
      {errors.confirmarSenha.message}
     </div>
    )}
   </div>

   <button
    type="submit"
    disabled={isSubmitting}
    className={`btn w-100 py-3 rounded-pill fw-bold shadow-sm mb-4 ${styles.submit}`}
   >
    {isSubmitting ? "Criando conta..." : "Cadastrar agora"}
   </button>

   <div className="text-center">
    <span className="small text-muted">Já tem uma conta? </span>
    <a
     href={ROUTES.LOGIN.href}
     className={`text-decoration-none small ${styles.linkLogin}`}
    >
     Faça login
    </a>
   </div>
  </form>
 );
}
