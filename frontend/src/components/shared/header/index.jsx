"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constants/web-routes";
import { useAuth } from "@/hooks/use-auth";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useDrawer } from "@/hooks/use-drawer";
import { useIsActive } from "@/hooks/use-is-active";
import { useScrolled } from "@/hooks/use-scrolled";
import styles from "./header.module.css";

const cx = (...keys) =>
 keys
  .filter(Boolean)
  .map((k) => styles[k] || "")
  .join(" ");

const SERVICES = [
 { label: "Instalação de painéis solares", href: "#" },
 { label: "Monitoramento energético", href: "#" },
 { label: "Manutenção", href: "#" },
 { label: "Investimento empresarial", href: "#" },
];

export function Brand({
 href = ROUTES.HOME.href,
 ariaLabel = "Luminar — início",
 badge,
}) {
 return (
  <a href={href} className={cx("lh__logo")} aria-label={ariaLabel}>
   <span className={cx("lh__logo-orb")}>
    <Image src="/logo-semEscrita.png" alt="" width={38} height={38} priority />
   </span>
   <span className={cx("lh__logo-word")}>
    Lumi<span className={cx("lh__logo-accent")}>nar</span>
    {badge ? <span className={cx("lh__logo-badge")}>{badge}</span> : null}
   </span>
  </a>
 );
}

export function Nav({
 items,
 variant = "desktop",
 ariaLabel = "Navegação principal",
 extras,
}) {
 const isActive = useIsActive();

 if (variant === "drawer") {
  return (
   <nav className={cx("lh-drawer__nav")} aria-label={ariaLabel}>
    {items.map((item) => (
     <a
      key={item.href}
      href={item.href}
      className={cx("lh-drawer__link", isActive(item.href) && "is-active")}
     >
      {item.label}
     </a>
    ))}
    {extras}
   </nav>
  );
 }

 return (
  <nav className={cx("lh__nav")} aria-label={ariaLabel}>
   <ul>
    {items.map((item) => (
     <li key={item.href}>
      <a
       href={item.href}
       className={cx("lh__link", isActive(item.href) && "is-active")}
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

export function DropdownItem({
 href,
 label,
 icon,
 onClick,
 as = "a",
 danger = false,
}) {
 const Tag = as;
 return (
  <li className={cx("lh-di")}>
   <Tag
    {...(as === "a" ? { href } : { type: "button" })}
    role="menuitem"
    className={cx("lh-di__link", danger && "is-danger")}
    onClick={onClick}
   >
    {icon && (
     <i className={`bi ${icon} ${cx("lh-di__icon")}`} aria-hidden="true" />
    )}
    <span className={cx("lh-di__label")}>{label}</span>
    <i
     className={`bi bi-arrow-up-right ${cx("lh-di__arrow")}`}
     aria-hidden="true"
    />
   </Tag>
  </li>
 );
}

export function AuthCtas({ variant = "desktop" }) {
 const links = (
  <>
   <a href={ROUTES.LOGIN.href} className={cx("lh__cta", "lh__cta--ghost")}>
    {ROUTES.LOGIN.label}
   </a>
   <a href={ROUTES.REGISTER.href} className={cx("lh__cta", "lh__cta--solid")}>
    {ROUTES.REGISTER.label}
    <i className="bi bi-arrow-right" />
   </a>
  </>
 );

 if (variant === "drawer") {
  return <div className={cx("lh-drawer__ctas")}>{links}</div>;
 }
 return links;
}

export function ServicesDropdown() {
 const [open, setOpen] = useState(false);
 const ref = useRef(null);
 const close = useCallback(() => setOpen(false), []);
 useClickOutside(ref, close, open);

 return (
  <li className={cx("lh__dd")} ref={ref}>
   <button
    type="button"
    className={cx("lh__link", "lh__dd-trigger", open && "is-open")}
    aria-expanded={open}
    aria-haspopup="menu"
    onClick={() => setOpen((v) => !v)}
   >
    Serviços
    <i className={`bi bi-chevron-down ${cx("lh__caret")}`} />
   </button>
   <div className={cx("lh__panel", open && "is-open")} role="menu">
    <div className={cx("lh__panel-glow")} aria-hidden="true" />
    <ul className={cx("lh-di__list")}>
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
    className={cx("lh-drawer__link", "lh-drawer__accordion", open && "is-open")}
    onClick={() => setOpen((v) => !v)}
    aria-expanded={open}
   >
    Serviços
    <i className={`bi bi-chevron-down ${cx("lh__caret")}`} />
   </button>
   <div className={cx("lh-drawer__sub", open && "is-open")}>
    {SERVICES.map((s) => (
     <a key={s.label} href={s.href} className={cx("lh-drawer__sublink")}>
      {s.label}
     </a>
    ))}
   </div>
  </>
 );
}

export function UserMenu() {
 const { user, logout } = useAuth();
 const [open, setOpen] = useState(false);
 const ref = useRef(null);
 const close = useCallback(() => setOpen(false), []);
 useClickOutside(ref, close, open);

 const primeiroNome = user?.nome?.split(" ")[0] || "Conta";
 const inicial = (user?.nome || user?.email || "?").charAt(0).toUpperCase();

 return (
  <div className={cx("lh__dd")} ref={ref}>
   <button
    type="button"
    className={cx("lh__avatar", open && "is-open")}
    aria-expanded={open}
    aria-haspopup="menu"
    onClick={() => setOpen((v) => !v)}
   >
    <span className={cx("lh__avatar-circle")}>{inicial}</span>
    <span className={cx("lh__avatar-name")}>Olá, {primeiroNome}</span>
    <i
     className={`bi bi-chevron-down ${cx("lh__caret")}`}
     style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
    />
   </button>

   <div
    className={cx("lh__panel", "lh__panel--right", open && "is-open")}
    role="menu"
   >
    <div className={cx("lh__panel-glow")} aria-hidden="true" />
    <div className={cx("lh__user-head")}>
     <span className={cx("lh__user-head-label")}>Logado como</span>
     <span className={cx("lh__user-head-email")}>{user?.email}</span>
    </div>
    <ul className={cx("lh-di__list")}>
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

export function DrawerBrand({ badge }) {
 return (
  <>
   Lumi<span className={cx("lh__logo-accent")}>nar</span>
   {badge ? <span className={cx("lh__logo-badge")}>{badge}</span> : null}
  </>
 );
}

export function DrawerFooter({ label }) {
 return (
  <>
   <span>{label}</span>
   <span className={cx("lh-drawer__dot")} />
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
   <span className={cx("lh__avatar-circle")}>{inicial}</span>
   <div className={cx("lh-drawer__userinfo-text")}>
    <span className={cx("lh-drawer__userinfo-name")}>Olá, {primeiroNome}</span>
    <span className={cx("lh-drawer__userinfo-email")}>{user?.email}</span>
   </div>
  </>
 );
}

export function DrawerLogoutButton() {
 const { logout } = useAuth();
 return (
  <button
   type="button"
   className={cx("lh-drawer__link")}
   onClick={() => logout()}
   style={{ color: "#ff7b7b" }}
  >
   Sair
  </button>
 );
}

export function DrawerPreferencesLink() {
 const isActive = useIsActive();
 return (
  <a
   href={ROUTES.PREFERENCES.href}
   className={cx(
    "lh-drawer__link",
    isActive(ROUTES.PREFERENCES.href) && "is-active"
   )}
  >
   {ROUTES.PREFERENCES.label}
  </a>
 );
}

function MobileDrawer({
 open,
 onClose,
 ariaLabel = "Menu de navegação",
 brand,
 userInfo,
 children,
 footer,
}) {
 return (
  <div className={cx("lh-drawer", open && "is-open")}>
   <div className={cx("lh-drawer__overlay")} onClick={onClose} />
   <aside
    className={cx("lh-drawer__panel")}
    role="dialog"
    aria-label={ariaLabel}
   >
    <div className={cx("lh-drawer__top")}>
     <span className={cx("lh-drawer__brand")}>{brand}</span>
     <button
      type="button"
      className={cx("lh-drawer__close")}
      aria-label="Fechar menu"
      onClick={onClose}
     >
      <i className="bi bi-x-lg" />
     </button>
    </div>

    {userInfo ? (
     <div className={cx("lh-drawer__userinfo")}>{userInfo}</div>
    ) : null}

    {children}

    {footer ? <div className={cx("lh-drawer__foot")}>{footer}</div> : null}
   </aside>
  </div>
 );
}

export function HeaderShell({ logo, nav, actions, drawer }) {
 const scrolled = useScrolled();
 const { open, openDrawer, closeDrawer } = useDrawer();
 const pathname = usePathname();

 useEffect(() => {
  closeDrawer();
 }, [pathname, closeDrawer]);

 return (
  <>
   <header className={cx("lh", scrolled && "lh--scrolled")}>
    <div className={cx("lh__shell")}>
     {logo}
     {nav}
     <div className={cx("lh__actions")}>
      {actions}
      <button
       type="button"
       className={cx("lh__burger")}
       aria-label="Abrir menu"
       aria-expanded={open}
       onClick={openDrawer}
      >
       <span />
       <span />
       <span />
      </button>
     </div>
    </div>
    <div className={cx("lh__rail")} aria-hidden="true" />
   </header>

   <MobileDrawer
    open={open}
    onClose={closeDrawer}
    ariaLabel={drawer?.ariaLabel}
    brand={drawer?.brand}
    userInfo={drawer?.userInfo}
    footer={drawer?.footer}
   >
    {drawer?.body}
   </MobileDrawer>
  </>
 );
}
