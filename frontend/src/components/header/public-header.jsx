"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function DropdownItem({ href, label, onClick }) {
  return (
    <li className="lh-di">
      <a href={href} role="menuitem" className="lh-di__link" onClick={onClick}>
        <span className="lh-di__label">{label}</span>
        <i className="bi bi-arrow-up-right lh-di__arrow" aria-hidden="true" />
      </a>
    </li>
  );
}

const ROTAS_SEM_BOTAO_AUTH = ["/login", "/cadastro"];

const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Orçamento", href: "/orcamento" },
  { label: "Fale conosco", href: "/faleConosco" },
];

const SERVICES = [
  { label: "Instalação de painéis solares", href: "#" },
  { label: "Monitoramento energético", href: "#" },
  { label: "Manutenção", href: "#" },
  { label: "Investimento empresarial", href: "#" },
];

export default function PublicHeader() {
  const pathname = usePathname();
  const esconderBotaoAuth = ROTAS_SEM_BOTAO_AUTH.includes(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerServices, setDrawerServices] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;
    const onClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setServicesOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (drawerOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
      document.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = original;
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [drawerOpen]);

  useEffect(() => {
    setDrawerOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header className={`lh ${scrolled ? "lh--scrolled" : ""}`}>
        <div className="lh__shell">
          {/* LOGO */}
          <a href="/" className="lh__logo" aria-label="Luminar — início">
            <span className="lh__logo-orb">
              <img
                src="/logo-semEscrita.png"
                alt=""
                width="38"
                height="38"
              />
            </span>
            <span className="lh__logo-word">
              Lumi<span className="lh__logo-accent">nar</span>
            </span>
          </a>

          {/* NAV DESKTOP */}
          <nav className="lh__nav" aria-label="Navegação principal">
            <ul>
              <li>
                <a
                  href="/"
                  className={`lh__link ${isActive("/") ? "is-active" : ""}`}
                >
                  Início
                </a>
              </li>

              {/* DROPDOWN SERVIÇOS */}
              <li className="lh__dd" ref={servicesRef}>
                <button
                  type="button"
                  className={`lh__link lh__dd-trigger ${
                    servicesOpen ? "is-open" : ""
                  }`}
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Serviços
                  <i className="bi bi-chevron-down lh__caret" />
                </button>

                <div
                  className={`lh__panel ${servicesOpen ? "is-open" : ""}`}
                  role="menu"
                >
                  <div className="lh__panel-glow" aria-hidden="true" />
                  <ul className="lh-di__list">
                    {SERVICES.map((s) => (
                      <DropdownItem
                        key={s.label}
                        href={s.href}
                        label={s.label}
                      />
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <a
                  href="/orcamento"
                  className={`lh__link ${
                    isActive("/orcamento") ? "is-active" : ""
                  }`}
                >
                  Orçamento
                </a>
              </li>

              <li>
                <a
                  href="/faleConosco"
                  className={`lh__link ${
                    isActive("/faleConosco") ? "is-active" : ""
                  }`}
                >
                  Fale conosco
                </a>
              </li>
            </ul>
          </nav>

          {/* CTAs DESKTOP */}
          <div className="lh__actions">
            {!esconderBotaoAuth && (
              <>
                <a href="/login" className="lh__cta lh__cta--ghost">
                  Entrar
                </a>
                <a href="/cadastro" className="lh__cta lh__cta--solid">
                  Criar conta
                  <i className="bi bi-arrow-right" />
                </a>
              </>
            )}

            {/* HAMBURGER */}
            <button
              type="button"
              className="lh__burger"
              aria-label="Abrir menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* TRILHO INFERIOR */}
        <div className="lh__rail" aria-hidden="true" />
      </header>

      {/* DRAWER MOBILE */}
      <div className={`lh-drawer ${drawerOpen ? "is-open" : ""}`}>
        <div
          className="lh-drawer__overlay"
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className="lh-drawer__panel"
          role="dialog"
          aria-label="Menu de navegação"
        >
          <div className="lh-drawer__top">
            <span className="lh-drawer__brand">
              Lumi<span className="lh__logo-accent">nar</span>
            </span>
            <button
              type="button"
              className="lh-drawer__close"
              aria-label="Fechar menu"
              onClick={() => setDrawerOpen(false)}
            >
              <i className="bi bi-x-lg" />
            </button>
          </div>

          <nav className="lh-drawer__nav">
            <a
              href="/"
              className={`lh-drawer__link ${
                isActive("/") ? "is-active" : ""
              }`}
            >
              Início
            </a>

            <button
              type="button"
              className={`lh-drawer__link lh-drawer__accordion ${
                drawerServices ? "is-open" : ""
              }`}
              onClick={() => setDrawerServices((v) => !v)}
              aria-expanded={drawerServices}
            >
              Serviços
              <i className="bi bi-chevron-down lh__caret" />
            </button>
            <div
              className={`lh-drawer__sub ${
                drawerServices ? "is-open" : ""
              }`}
            >
              {SERVICES.map((s) => (
                <a key={s.label} href={s.href} className="lh-drawer__sublink">
                  <i className={`bi ${s.icon}`} />
                  {s.label}
                </a>
              ))}
            </div>

            <a
              href="/orcamento"
              className={`lh-drawer__link ${
                isActive("/orcamento") ? "is-active" : ""
              }`}
            >
              Orçamento
            </a>
            <a
              href="/faleConosco"
              className={`lh-drawer__link ${
                isActive("/faleConosco") ? "is-active" : ""
              }`}
            >
              Fale conosco
            </a>
          </nav>

          {!esconderBotaoAuth && (
            <div className="lh-drawer__ctas">
              <a href="/login" className="lh__cta lh__cta--ghost">
                Entrar
              </a>
              <a href="/cadastro" className="lh__cta lh__cta--solid">
                Criar conta
                <i className="bi bi-arrow-right" />
              </a>
            </div>
          )}

          <div className="lh-drawer__foot">
            <span>energia que ilumina</span>
            <span className="lh-drawer__dot" />
            <span>luminar</span>
          </div>
        </aside>
      </div>

      <style jsx>{`
        :global(:root) {
          --lh-dark: #221f20;
          --lh-dark-2: #2c2829;
          --lh-yellow: #febd17;
          --lh-yellow-soft: rgba(254, 189, 23, 0.14);
          --lh-line: rgba(255, 255, 255, 0.08);
          --lh-mut: rgba(255, 255, 255, 0.62);
        }

        .lh {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background: var(--lh-dark);
          color: #fff;
          font-family: var(--font-geist-sans), "Poppins", system-ui, sans-serif;
          transition: background 280ms ease, box-shadow 280ms ease,
            backdrop-filter 280ms ease, border-color 280ms ease;
          border-bottom: 1px solid transparent;
          animation: lh-in 520ms cubic-bezier(0.2, 0.7, 0.2, 1) both;
        }

        .lh--scrolled {
          background: rgba(34, 31, 32, 0.78);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          box-shadow: 0 18px 40px -24px rgba(0, 0, 0, 0.6);
          border-bottom-color: var(--lh-line);
        }

        .lh__shell {
          max-width: 1320px;
          margin: 0 auto;
          padding: 18px 32px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 32px;
        }

        /* LOGO */
        .lh__logo {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: #fff;
        }
        .lh__logo-orb {
          width: 44px;
          height: 44px;
          border-radius: 14px;
          background: radial-gradient(
              circle at 30% 25%,
              rgba(254, 189, 23, 0.35),
              transparent 60%
            ),
            #1a1718;
          border: 1px solid var(--lh-line);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 0 1px rgba(254, 189, 23, 0.12),
            0 8px 18px -10px rgba(254, 189, 23, 0.35);
        }
        .lh__logo-orb img {
          object-fit: contain;
        }
        .lh__logo-word {
          font-weight: 700;
          font-size: 1.32rem;
          letter-spacing: -0.01em;
        }
        .lh__logo-accent {
          color: var(--lh-yellow);
        }

        /* NAV */
        .lh__nav {
          justify-self: center;
        }
        .lh__nav ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .lh__nav li {
          position: relative;
        }
        .lh__link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: transparent;
          border: 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.3px;
          text-decoration: none;
          cursor: pointer;
          border-radius: 999px;
          transition: color 200ms ease, transform 200ms ease,
            background 200ms ease;
        }
        .lh__link::after {
          content: "";
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 4px;
          height: 2px;
          background: var(--lh-yellow);
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 320ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .lh__link:hover {
          color: #fff;
          transform: translateY(-1px);
        }
        .lh__link:hover::after {
          transform: scaleX(0.45);
        }
        .lh__link.is-active {
          color: #fff;
        }
        .lh__link.is-active::after {
          transform: scaleX(1);
        }

        /* DROPDOWN */
        .lh__dd {
          position: relative;
        }
        .lh__caret {
          font-size: 0.7rem;
          margin-top: 1px;
          transition: transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .lh__dd-trigger.is-open .lh__caret,
        .lh-drawer__accordion.is-open .lh__caret {
          transform: rotate(180deg);
        }
        .lh__dd-trigger.is-open {
          color: var(--lh-yellow);
        }

        .lh__panel {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          width: 280px;
          transform: translate(-50%, -8px);
          background: #1a1718;
          border: 1px solid var(--lh-line);
          border-radius: 14px;
          padding: 6px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 220ms ease, transform 260ms ease;
          box-shadow: 0 32px 60px -20px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
          overflow: hidden;
        }
        .lh__panel.is-open {
          opacity: 1;
          transform: translate(-50%, 0);
          pointer-events: auto;
        }
        .lh__panel::before {
          content: "";
          position: absolute;
          top: -7px;
          left: 50%;
          width: 14px;
          height: 14px;
          background: #1a1718;
          border-left: 1px solid var(--lh-line);
          border-top: 1px solid var(--lh-line);
          transform: translateX(-50%) rotate(45deg);
        }
        .lh__panel-glow {
          position: absolute;
          inset: -1px;
          background: radial-gradient(
            500px 200px at 20% -20%,
            rgba(254, 189, 23, 0.18),
            transparent 60%
          );
          pointer-events: none;
        }
        :global(.lh-di__list),
        :global(.lh-di) {
          list-style: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        :global(.lh-di__list) {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 0;
          width: 100%;
        }
        :global(.lh-di) {
          display: block;
          width: 100%;
          box-sizing: border-box;
        }
        :global(.lh-di__link) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          text-decoration: none;
          color: rgba(255, 255, 255, 0.82);
          transition: background 200ms ease, color 200ms ease;
        }
        :global(.lh-di__link:hover) {
          background: rgba(254, 189, 23, 0.14);
          color: #fff;
        }
        :global(.lh-di__label) {
          flex: 1;
          min-width: 0;
          font-weight: 500;
          font-size: 0.88rem;
          letter-spacing: 0.1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        :global(.lh-di__arrow) {
          color: #febd17;
          font-size: 0.72rem;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 200ms ease, transform 200ms ease;
          flex-shrink: 0;
        }
        :global(.lh-di__link:hover .lh-di__arrow) {
          opacity: 1;
          transform: translateX(0);
        }

        /* CTAs */
        .lh__actions {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .lh__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 18px;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.2px;
          text-decoration: none;
          border-radius: 999px;
          border: 1px solid transparent;
          transition: transform 220ms ease, background 220ms ease,
            color 220ms ease, box-shadow 280ms ease, border-color 220ms ease;
          cursor: pointer;
        }
        .lh__cta--ghost {
          background: transparent;
          color: #fff;
          border-color: rgba(255, 255, 255, 0.22);
        }
        .lh__cta--ghost:hover {
          border-color: var(--lh-yellow);
          color: var(--lh-yellow);
          transform: translateY(-1px);
        }
        .lh__cta--solid {
          background: var(--lh-yellow);
          color: var(--lh-dark);
          box-shadow: 0 14px 28px -12px rgba(254, 189, 23, 0.55),
            inset 0 -2px 0 rgba(0, 0, 0, 0.08);
        }
        .lh__cta--solid:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 38px -14px rgba(254, 189, 23, 0.75),
            inset 0 -2px 0 rgba(0, 0, 0, 0.08);
        }
        .lh__cta--solid i {
          transition: transform 220ms ease;
        }
        .lh__cta--solid:hover i {
          transform: translateX(3px);
        }

        /* HAMBURGER */
        .lh__burger {
          display: none;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid var(--lh-line);
          background: rgba(255, 255, 255, 0.03);
          color: #fff;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          transition: background 200ms ease, border-color 200ms ease;
        }
        .lh__burger:hover {
          background: var(--lh-yellow-soft);
          border-color: var(--lh-yellow);
        }
        .lh__burger span {
          width: 18px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
        }

        /* TRILHO INFERIOR */
        .lh__rail {
          height: 1px;
          width: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(254, 189, 23, 0.35),
            transparent
          );
          opacity: 0;
          transition: opacity 320ms ease;
        }
        .lh--scrolled .lh__rail {
          opacity: 1;
        }

        /* ENTRADA */
        @keyframes lh-in {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* DRAWER */
        :global(.lh-drawer) {
          position: fixed;
          inset: 0;
          z-index: 200;
          pointer-events: none;
        }
        :global(.lh-drawer.is-open) {
          pointer-events: auto;
        }
        :global(.lh-drawer__overlay) {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 280ms ease;
        }
        :global(.lh-drawer.is-open .lh-drawer__overlay) {
          opacity: 1;
        }
        :global(.lh-drawer__panel) {
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: min(380px, 88vw);
          background: #1a1718;
          border-left: 1px solid rgba(255, 255, 255, 0.08);
          color: #fff;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 380ms cubic-bezier(0.2, 0.8, 0.2, 1);
          font-family: var(--font-geist-sans), "Poppins", system-ui, sans-serif;
        }
        :global(.lh-drawer.is-open .lh-drawer__panel) {
          transform: translateX(0);
        }
        :global(.lh-drawer__top) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        :global(.lh-drawer__brand) {
          font-weight: 700;
          font-size: 1.2rem;
          letter-spacing: -0.01em;
        }
        :global(.lh-drawer__close) {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: transparent;
          color: #fff;
          cursor: pointer;
          transition: background 200ms ease, border-color 200ms ease;
        }
        :global(.lh-drawer__close:hover) {
          background: rgba(254, 189, 23, 0.14);
          border-color: #febd17;
        }
        :global(.lh-drawer__nav) {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        :global(.lh-drawer__link) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 14px;
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.86);
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          letter-spacing: 0.2px;
          background: transparent;
          border: 0;
          width: 100%;
          text-align: left;
          cursor: pointer;
          transition: background 200ms ease, color 200ms ease;
        }
        :global(.lh-drawer__link:hover),
        :global(.lh-drawer__link.is-active) {
          background: rgba(254, 189, 23, 0.1);
          color: #febd17;
        }
        :global(.lh-drawer__sub) {
          max-height: 0;
          overflow: hidden;
          transition: max-height 320ms ease;
          padding-left: 8px;
        }
        :global(.lh-drawer__sub.is-open) {
          max-height: 320px;
        }
        :global(.lh-drawer__sublink) {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          border-radius: 10px;
          transition: color 200ms ease, background 200ms ease;
        }
        :global(.lh-drawer__sublink:hover) {
          color: #febd17;
          background: rgba(254, 189, 23, 0.06);
        }
        :global(.lh-drawer__sublink i) {
          color: #febd17;
          font-size: 0.95rem;
        }
        :global(.lh-drawer__ctas) {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 28px;
        }
        :global(.lh-drawer__ctas .lh__cta) {
          justify-content: center;
        }
        :global(.lh-drawer__foot) {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
          padding-top: 22px;
        }
        :global(.lh-drawer__dot) {
          width: 4px;
          height: 4px;
          background: #febd17;
          border-radius: 50%;
        }

        /* RESPONSIVO */
        @media (max-width: 980px) {
          .lh__shell {
            grid-template-columns: auto 1fr auto;
            padding: 14px 20px;
            gap: 16px;
          }
          .lh__nav,
          .lh__actions .lh__cta {
            display: none;
          }
          .lh__burger {
            display: inline-flex;
          }
        }
      `}</style>
    </>
  );
}
