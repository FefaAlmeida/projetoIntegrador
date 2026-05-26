"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/use-auth";
import { ROUTES } from "@/constants/web-routes";

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

 const inputClassName = (hasError) =>
  `form-control border-0 border-bottom rounded-0 px-0 shadow-none input-underline ${
   hasError ? "is-invalid" : ""
  }`;

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
     className={inputClassName(errors.email)}
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
     className={inputClassName(errors.senha)}
    />
    {errors.senha && (
     <div className="invalid-feedback d-block">{errors.senha.message}</div>
    )}
   </div>

   <button
    type="submit"
    disabled={isSubmitting}
    className="btn btn-yellow w-100 py-3 rounded-pill fw-bold shadow-sm mb-3"
   >
    {isSubmitting ? "Verificando dados..." : "Entrar"}
   </button>

   <div className="text-center mb-2">
    <a href="#forgot" className="text-decoration-none small text-yellow-soft fw-bold">
     Esqueceu a senha?
    </a>
   </div>

   <div className="text-center">
    <a
     href={ROUTES.REGISTER.href}
     className="text-decoration-none small text-yellow-soft fw-bold"
    >
     Não tem uma conta? Crie uma!
    </a>
   </div>
  </form>
 );
}
