"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useScrolled } from "@/hooks/use-scrolled";
import { useDrawer } from "@/hooks/use-drawer";
import MobileDrawer from "./mobile-drawer";

export default function HeaderShell({
 logo,
 nav,
 actions,
 drawer,
}) {
 const scrolled = useScrolled();
 const { open, openDrawer, closeDrawer } = useDrawer();
 const pathname = usePathname();

 useEffect(() => {
  closeDrawer();
 }, [pathname, closeDrawer]);

 return (
  <>
   <header className={`lh ${scrolled ? "lh--scrolled" : ""}`}>
    <div className="lh__shell">
     {logo}
     {nav}
     <div className="lh__actions">
      {actions}
      <button
       type="button"
       className="lh__burger"
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
    <div className="lh__rail" aria-hidden="true" />
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
