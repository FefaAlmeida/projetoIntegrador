import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const AUTH_COOKIE = "auth-token";

// Mapeia padrão de rota → roles permitidas (undefined = qualquer autenticado)
const ROUTE_GUARDS = [
 { pattern: /^\/users(\/|$)/, roles: ["ADMIN"] },
 { pattern: /^\/orders(\/|$)/, roles: ["ADMIN"] },
 { pattern: /^\/dashboard(\/|$)/, roles: ["CLIENTE"] },
 { pattern: /^\/my-orders(\/|$)/, roles: ["CLIENTE"] },
 { pattern: /^\/preferences(\/|$)/, roles: undefined },
];

// Para onde mandar usuário com role errada
function fallbackForRole(tipo) {
 if (tipo === "ADMIN") return "/users";
 if (tipo === "CLIENTE") return "/dashboard";
 return "/";
}

function redirectToLogin(request) {
 const url = request.nextUrl.clone();
 const returnTo = `${request.nextUrl.pathname}${request.nextUrl.search}`;
 url.pathname = "/login";
 url.search = `?returnTo=${encodeURIComponent(returnTo)}`;
 return NextResponse.redirect(url);
}

export async function middleware(request) {
 const path = request.nextUrl.pathname;
 const guard = ROUTE_GUARDS.find((g) => g.pattern.test(path));
 if (!guard) return NextResponse.next();

 const token = request.cookies.get(AUTH_COOKIE)?.value;
 if (!token) return redirectToLogin(request);

 let payload;
 try {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const result = await jwtVerify(token, secret);
  payload = result.payload;
 } catch {
  return redirectToLogin(request);
 }

 if (guard.roles && !guard.roles.includes(payload.tipo)) {
  const url = request.nextUrl.clone();
  url.pathname = fallbackForRole(payload.tipo);
  url.search = "";
  return NextResponse.redirect(url);
 }

 return NextResponse.next();
}

export const config = {
 matcher: [
  "/users/:path*",
  "/orders/:path*",
  "/dashboard/:path*",
  "/my-orders/:path*",
  "/preferences/:path*",
 ],
};
