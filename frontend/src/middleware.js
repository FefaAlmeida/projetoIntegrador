import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const AUTH_COOKIE = "auth-token";

export async function middleware(request) {
 const token = request.cookies.get(AUTH_COOKIE)?.value;
 if (!token) return redirectToLogin(request);

 try {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  await jwtVerify(token, secret);
  return NextResponse.next();
 } catch {
  return redirectToLogin(request);
 }
}

function redirectToLogin(request) {
 const url = request.nextUrl.clone();
 url.pathname = "/login";
 url.search = `?returnTo=${encodeURIComponent(request.nextUrl.pathname)}`;
 return NextResponse.redirect(url);
}

export const config = {
 matcher: ["/system/:path*"],
};
