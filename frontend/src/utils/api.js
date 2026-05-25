const BASE_URL =
 process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

function emitAuthExpired() {
 if (typeof window === "undefined") return;
 window.dispatchEvent(new Event("auth-expired"));
}

export async function apiFetch(path, options = {}) {
 const { headers = {}, body, ...rest } = options;

 const finalHeaders = {
  "Content-Type": "application/json",
  ...headers,
 };

 const url = `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;

 let response;
 try {
  response = await fetch(url, {
   ...rest,
   credentials: "include",
   headers: finalHeaders,
   body: body && typeof body !== "string" ? JSON.stringify(body) : body,
  });
 } catch {
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

 if (response.status === 401) emitAuthExpired();

 return {
  ok: response.ok,
  status: response.status,
  data,
  error: response.ok
   ? null
   : data?.mensagem || data?.error || "Erro na requisição",
 };
}
