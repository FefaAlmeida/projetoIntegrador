"use client";

import { useCallback, useRef, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useClickOutside } from "@/hooks/use-click-outside";
import { ROUTES } from "@/constants/web-routes";
import DropdownItem from "./dropdown-item";

export default function UserMenu() {
 const { user, logout } = useAuth();
 const [open, setOpen] = useState(false);
 const ref = useRef(null);

 const close = useCallback(() => setOpen(false), []);
 useClickOutside(ref, close, open);

 const primeiroNome = user?.nome?.split(" ")[0] || "Conta";
 const inicial = (user?.nome || user?.email || "?").charAt(0).toUpperCase();

 return (
  <div className="lh__dd" ref={ref}>
   <button
    type="button"
    className={`lh__avatar ${open ? "is-open" : ""}`}
    aria-expanded={open}
    aria-haspopup="menu"
    onClick={() => setOpen((v) => !v)}
   >
    <span className="lh__avatar-circle">{inicial}</span>
    <span className="lh__avatar-name">Olá, {primeiroNome}</span>
    <i
     className="bi bi-chevron-down lh__caret"
     style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
    />
   </button>

   <div
    className={`lh__panel lh__panel--right ${open ? "is-open" : ""}`}
    role="menu"
   >
    <div className="lh__panel-glow" aria-hidden="true" />
    <div className="lh__user-head">
     <span className="lh__user-head-label">Logado como</span>
     <span className="lh__user-head-email">{user?.email}</span>
    </div>
    <ul className="lh-di__list">
     <DropdownItem
      href={ROUTES.PREFERENCES.href}
      label={ROUTES.PREFERENCES.label}
      icon="bi-gear-fill"
     />
     <DropdownItem
      as="button"
      label="Sair"
      icon="bi-box-arrow-right"
      danger
      onClick={() => logout()}
     />
    </ul>
   </div>
  </div>
 );
}
