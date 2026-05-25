"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import styles from "./page.module.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CEP_REGEX = /^\d{5}-?\d{3}$/;
const PHONE_REGEX = /^[\d\s()+\-]{8,20}$/;

const TIPO_IMOVEL = {
 RESIDENCIAL: "RESIDENCIAL",
 COMERCIAL: "COMERCIAL",
};

const DEFAULT_VALUES = {
 nome: "",
 email: "",
 telefone: "",
 cep: "",
 consumoMedio: "",
 tipoImovel: "",
 mensagem: "",
};

export default function QuoteForm() {
 const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
 } = useForm({ defaultValues: DEFAULT_VALUES });

 // TODO: trocar por POST real quando backend tiver endpoint /quotes
 const onSubmit = async (_data) => {
  const promise = new Promise((resolve) => setTimeout(resolve, 1000));
  toast.promise(promise, {
   loading: "Enviando sua solicitação...",
   success: "Recebemos seu pedido! Nossa equipe entrará em contato em breve.",
   error: "Falha ao enviar. Tente novamente.",
  });
  await promise;
  reset(DEFAULT_VALUES);
 };

 const fieldClass = (hasError) =>
  `form-control border-0 border-bottom rounded-0 px-0 shadow-none ${styles.input} ${
   hasError ? "is-invalid" : ""
  }`;

 const selectClass = (hasError) =>
  `form-select border-0 border-bottom rounded-0 px-0 shadow-none ${styles.select} ${
   hasError ? "is-invalid" : ""
  }`;

 return (
  <form onSubmit={handleSubmit(onSubmit)} noValidate>
   <div className="row g-4">
    <div className="col-md-6">
     <label className="form-label small fw-bold text-secondary mb-2">
      Nome completo
     </label>
     <input
      type="text"
      {...register("nome", {
       required: "Informe seu nome",
       minLength: { value: 2, message: "Nome muito curto" },
      })}
      className={fieldClass(errors.nome)}
     />
     {errors.nome && (
      <div className="invalid-feedback d-block">{errors.nome.message}</div>
     )}
    </div>

    <div className="col-md-6">
     <label className="form-label small fw-bold text-secondary mb-2">
      E-mail
     </label>
     <input
      type="email"
      {...register("email", {
       required: "Informe seu e-mail",
       pattern: { value: EMAIL_REGEX, message: "Formato de e-mail inválido" },
      })}
      className={fieldClass(errors.email)}
     />
     {errors.email && (
      <div className="invalid-feedback d-block">{errors.email.message}</div>
     )}
    </div>

    <div className="col-md-6">
     <label className="form-label small fw-bold text-secondary mb-2">
      Telefone
     </label>
     <input
      type="tel"
      placeholder="(11) 99999-9999"
      {...register("telefone", {
       required: "Informe seu telefone",
       pattern: { value: PHONE_REGEX, message: "Telefone inválido" },
      })}
      className={fieldClass(errors.telefone)}
     />
     {errors.telefone && (
      <div className="invalid-feedback d-block">{errors.telefone.message}</div>
     )}
    </div>

    <div className="col-md-6">
     <label className="form-label small fw-bold text-secondary mb-2">CEP</label>
     <input
      type="text"
      placeholder="00000-000"
      {...register("cep", {
       required: "Informe seu CEP",
       pattern: { value: CEP_REGEX, message: "CEP no formato 00000-000" },
      })}
      className={fieldClass(errors.cep)}
     />
     {errors.cep && (
      <div className="invalid-feedback d-block">{errors.cep.message}</div>
     )}
    </div>

    <div className="col-md-6">
     <label className="form-label small fw-bold text-secondary mb-2">
      Consumo médio (kWh/mês)
     </label>
     <input
      type="number"
      min="1"
      step="1"
      placeholder="ex: 350"
      {...register("consumoMedio", {
       required: "Informe o consumo médio",
       valueAsNumber: true,
       min: { value: 1, message: "Consumo deve ser positivo" },
       max: { value: 100000, message: "Consumo muito alto" },
       validate: (v) => !Number.isNaN(v) || "Consumo deve ser número",
      })}
      className={fieldClass(errors.consumoMedio)}
     />
     {errors.consumoMedio && (
      <div className="invalid-feedback d-block">
       {errors.consumoMedio.message}
      </div>
     )}
    </div>

    <div className="col-md-6">
     <label className="form-label small fw-bold text-secondary mb-2">
      Tipo de imóvel
     </label>
     <select
      {...register("tipoImovel", {
       required: "Selecione o tipo de imóvel",
      })}
      className={selectClass(errors.tipoImovel)}
      defaultValue=""
     >
      <option value="" disabled>
       Selecione…
      </option>
      <option value={TIPO_IMOVEL.RESIDENCIAL}>Residencial</option>
      <option value={TIPO_IMOVEL.COMERCIAL}>Comercial</option>
     </select>
     {errors.tipoImovel && (
      <div className="invalid-feedback d-block">{errors.tipoImovel.message}</div>
     )}
    </div>

    <div className="col-12">
     <label className="form-label small fw-bold text-secondary mb-2">
      Mensagem (opcional)
     </label>
     <textarea
      rows="4"
      {...register("mensagem", {
       maxLength: { value: 2000, message: "Mensagem muito longa" },
      })}
      className={fieldClass(errors.mensagem)}
     ></textarea>
     {errors.mensagem && (
      <div className="invalid-feedback d-block">{errors.mensagem.message}</div>
     )}
    </div>

    <div className="col-12">
     <button
      type="submit"
      disabled={isSubmitting}
      className={`btn w-100 py-3 rounded-pill ${styles.submit}`}
     >
      {isSubmitting ? "Enviando…" : "Solicitar orçamento"}
     </button>
    </div>
   </div>
  </form>
 );
}
