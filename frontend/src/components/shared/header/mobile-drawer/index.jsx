"use client";

export default function MobileDrawer({
 open,
 onClose,
 ariaLabel = "Menu de navegação",
 brand,
 userInfo,
 children,
 footer,
}) {
 return (
  <div className={`lh-drawer ${open ? "is-open" : ""}`}>
   <div className="lh-drawer__overlay" onClick={onClose} />
   <aside className="lh-drawer__panel" role="dialog" aria-label={ariaLabel}>
    <div className="lh-drawer__top">
     <span className="lh-drawer__brand">{brand}</span>
     <button
      type="button"
      className="lh-drawer__close"
      aria-label="Fechar menu"
      onClick={onClose}
     >
      <i className="bi bi-x-lg" />
     </button>
    </div>

    {userInfo ? <div className="lh-drawer__userinfo">{userInfo}</div> : null}

    {children}

    {footer ? <div className="lh-drawer__foot">{footer}</div> : null}
   </aside>
  </div>
 );
}
