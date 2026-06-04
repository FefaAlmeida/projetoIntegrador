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

// SOLICITAR REDEFINIÇÃO DE SENHA
export async function solicitarRedefinicaoSenha(email) {
  const res = await fetch(`${BASE_URL}/auth/solicitar-redefinicao-senha`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  return res.json();
}

// REDEFINIR SENHA
export async function redefinirSenha(token, senha) {
  const res = await fetch(`${BASE_URL}/auth/redefinir-senha`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, senha }),
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

// DASHBOARD CLIENTE
export async function getDashboardResumo() {
  const res = await fetch(`${BASE_URL}/dashboard/resumo`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}

export async function getDashboardGrafico() {
  const res = await fetch(`${BASE_URL}/dashboard/grafico-monitoramento`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}

export async function getDashboardAlertas() {
  const res = await fetch(`${BASE_URL}/dashboard/alertas`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}

export async function getDashboardFinanceiro() {
  const res = await fetch(`${BASE_URL}/dashboard/financeiro`, {
    method: "GET",
    credentials: "include",
  });

  return res.json();
}

export async function pagarParcela(idPagamento) {
  const res = await fetch(`${BASE_URL}/pagamentos/${idPagamento}/pagar`, {
    method: "PATCH",
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

// BUSCAR TODAS AS MENSAGENS (ADMIN)
export async function getFaleConosco(pagina = 1, limite = 10) {
  const res = await fetch(`${BASE_URL}/faleConosco?pagina=${pagina}&limite=${limite}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Importante para o authMiddleware
  });
  return res.json();
}

// RESPONDER MENSAGEM (ADMIN)
export async function responderFaleConosco(id, resposta) {
  const res = await fetch(`${BASE_URL}/faleConosco/${id}/responder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ resposta }),
  });
  return res.json();
}