"use client";

import { useAuth } from "@/hooks/use-auth";

export function DrawerFooter({ label }) {
 return (
  <>
   <span>{label}</span>
   <span className="lh-drawer__dot" />
   <span>luminar</span>
  </>
 );
}

export function DrawerUserInfo() {
 const { user } = useAuth();
 const primeiroNome = user?.nome?.split(" ")[0] || "Conta";
 const inicial = (user?.nome || user?.email || "?").charAt(0).toUpperCase();
 return (
  <>
   <span className="lh__avatar-circle">{inicial}</span>
   <div className="lh-drawer__userinfo-text">
    <span className="lh-drawer__userinfo-name">Olá, {primeiroNome}</span>
    <span className="lh-drawer__userinfo-email">{user?.email}</span>
   </div>
  </>
 );
}

export function DrawerLogoutButton() {
 const { logout } = useAuth();
 return (
  <button
   type="button"
   className="lh-drawer__link"
   onClick={() => logout()}
   style={{ color: "#ff7b7b" }}
  >
   Sair
  </button>
 );
}

export function DrawerBrand({ badge }) {
 return (
  <>
   Lumi<span className="lh__logo-accent">nar</span>
   {badge ? <span className="lh__logo-badge">{badge}</span> : null}
  </>
 );
}
