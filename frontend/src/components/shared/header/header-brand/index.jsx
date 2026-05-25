import Image from "next/image";
import { ROUTES } from "@/constants/web-routes";

export default function HeaderBrand({
 href = ROUTES.HOME.href,
 ariaLabel = "Luminar — início",
 badge,
}) {
 return (
  <a href={href} className="lh__logo" aria-label={ariaLabel}>
   <span className="lh__logo-orb">
    <Image src="/logo-semEscrita.png" alt="" width={38} height={38} priority />
   </span>
   <span className="lh__logo-word">
    Lumi<span className="lh__logo-accent">nar</span>
    {badge ? <span className="lh__logo-badge">{badge}</span> : null}
   </span>
  </a>
 );
}
