const BASE_URL = "http://localhost:3002/api";

// REGISTRO
export async function criarUsuario(data) {
  const res = await fetch(`${BASE_URL}/auth/criarUsuario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// LOGIN
export async function loginUsuario(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res.json();
}

// LOGOUT
export async function logoutUsuario() {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  return res.json();
}

// PERFIL
export async function getPerfil() {
  const res = await fetch(`${BASE_URL}/auth/perfil`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}

// ORÇAMENTO
export async function criarOrcamento(data) {
  const res = await fetch(`${BASE_URL}/orcamentos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

// ACEITAR ORÇAMENTO 
export async function aceitarOrcamento(id_solicitacao) {
  const res = await fetch(`${BASE_URL}/orcamentos/${id_solicitacao}/aceitar`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export async function recusarOrcamento(id_solicitacao) {
  const res = await fetch(`${BASE_URL}/orcamentos/${id_solicitacao}/recusar`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json();
}

export async function criarFaleConosco(data) {
  const res = await fetch(`${BASE_URL}/faleConosco`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json(); 
}