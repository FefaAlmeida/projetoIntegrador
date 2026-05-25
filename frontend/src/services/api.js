const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const TOKEN_KEY = "@luminar:token";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

function emitAuthExpired() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event("auth-expired"));
}

export async function apiFetch(path, options = {}) {
  const { headers = {}, auth = true, body, ...rest } = options;

  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (auth) {
    const token = getToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

  let response;
  try {
    response = await fetch(url, {
      ...rest,
      headers: finalHeaders,
      body: body && typeof body !== "string" ? JSON.stringify(body) : body,
    });
  } catch (err) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: "Não foi possível conectar ao servidor.",
    };
  }

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : null;

  if (response.status === 401 && auth) {
    emitAuthExpired();
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    error: response.ok ? null : data?.mensagem || "Erro na requisição",
  };
}
