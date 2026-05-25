import { apiFetch } from "./api";

export function login({ email, senha }) {
  return apiFetch("/auth/login", {
    method: "POST",
    auth: false,
    body: { email, senha },
  });
}

export function register({ nome, email, senha, tipo = "CLIENTE" }) {
  return apiFetch("/auth/registrar", {
    method: "POST",
    auth: false,
    body: { nome, email, senha, tipo },
  });
}

export function getProfile() {
  return apiFetch("/auth/perfil", { method: "GET" });
}

export function updateProfile({ nome, email }) {
  return apiFetch("/auth/perfil", {
    method: "PUT",
    body: { nome, email },
  });
}

export function updatePassword({ senhaAtual, novaSenha }) {
  return apiFetch("/auth/perfil", {
    method: "PUT",
    body: { senhaAtual, novaSenha },
  });
}
