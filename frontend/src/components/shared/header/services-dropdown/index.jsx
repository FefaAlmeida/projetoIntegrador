"use client";

import { useCallback, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import DropdownItem from "./dropdown-item";

const SERVICES = [
 { label: "Instalação de painéis solares", href: "#" },
 { label: "Monitoramento energético", href: "#" },
 { label: "Manutenção", href: "#" },
 { label: "Investimento empresarial", href: "#" },
];

export default function ServicesDropdown() {
 const [open, setOpen] = useState(false);
 const ref = useRef(null);

 const close = useCallback(() => setOpen(false), []);
 useClickOutside(ref, close, open);

 return (
  <li className="lh__dd" ref={ref}>
   <button
    type="button"
    className={`lh__link lh__dd-trigger ${open ? "is-open" : ""}`}
    aria-expanded={open}
    aria-haspopup="menu"
    onClick={() => setOpen((v) => !v)}
   >
    Serviços
    <i className="bi bi-chevron-down lh__caret" />
   </button>

   <div className={`lh__panel ${open ? "is-open" : ""}`} role="menu">
    <div className="lh__panel-glow" aria-hidden="true" />
    <ul className="lh-di__list">
     {SERVICES.map((s) => (
      <DropdownItem key={s.label} href={s.href} label={s.label} />
     ))}
    </ul>
   </div>
  </li>
 );
}

export function ServicesDrawerAccordion() {
 const [open, setOpen] = useState(false);
 return (
  <>
   <button
    type="button"
    className={`lh-drawer__link lh-drawer__accordion ${open ? "is-open" : ""}`}
    onClick={() => setOpen((v) => !v)}
    aria-expanded={open}
   >
    Serviços
    <i className="bi bi-chevron-down lh__caret" />
   </button>
   <div className={`lh-drawer__sub ${open ? "is-open" : ""}`}>
    {SERVICES.map((s) => (
     <a key={s.label} href={s.href} className="lh-drawer__sublink">
      {s.label}
     </a>
    ))}
   </div>
  </>
 );
}
