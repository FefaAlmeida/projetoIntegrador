"use client";

import { ROUTES } from "@/constants/web-routes";

export default function AuthCtas({ variant = "desktop" }) {
 if (variant === "drawer") {
  return (
   <div className="lh-drawer__ctas">
    <a href={ROUTES.LOGIN.href} className="lh__cta lh__cta--ghost">
     {ROUTES.LOGIN.label}
    </a>
    <a href={ROUTES.REGISTER.href} className="lh__cta lh__cta--solid">
     {ROUTES.REGISTER.label}
     <i className="bi bi-arrow-right" />
    </a>
   </div>
  );
 }

 return (
  <>
   <a href={ROUTES.LOGIN.href} className="lh__cta lh__cta--ghost">
    {ROUTES.LOGIN.label}
   </a>
   <a href={ROUTES.REGISTER.href} className="lh__cta lh__cta--solid">
    {ROUTES.REGISTER.label}
    <i className="bi bi-arrow-right" />
   </a>
  </>
 );
}
