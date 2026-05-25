"use client";

import { useIsActive } from "@/hooks/use-is-active";

export default function NavList({
 items,
 variant = "desktop",
 ariaLabel = "Navegação principal",
 extras,
}) {
 const isActive = useIsActive();

 if (variant === "drawer") {
  return (
   <nav className="lh-drawer__nav" aria-label={ariaLabel}>
    {items.map((item) => (
     <a
      key={item.href}
      href={item.href}
      className={`lh-drawer__link ${isActive(item.href) ? "is-active" : ""}`}
     >
      {item.label}
     </a>
    ))}
    {extras}
   </nav>
  );
 }

 return (
  <nav className="lh__nav" aria-label={ariaLabel}>
   <ul>
    {items.map((item) => (
     <li key={item.href}>
      <a
       href={item.href}
       className={`lh__link ${isActive(item.href) ? "is-active" : ""}`}
      >
       {item.label}
      </a>
     </li>
    ))}
    {extras}
   </ul>
  </nav>
 );
}
