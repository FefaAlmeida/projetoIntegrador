"use client";

import { ROUTES } from "@/constants/web-routes";
import HeaderShell from "./header-shell";
import HeaderBrand from "./header-brand";
import NavList from "./nav-list";
import UserMenu from "./user-menu";
import {
 DrawerBrand,
 DrawerFooter,
 DrawerLogoutButton,
 DrawerUserInfo,
} from "./drawer-pieces";
import { useIsActive } from "@/hooks/use-is-active";

const NAV = [ROUTES.HOME, ROUTES.CUSTOMER.MY_ORDERS];

function DrawerPreferencesLink() {
 const isActive = useIsActive();
 return (
  <a
   href={ROUTES.PREFERENCES.href}
   className={`lh-drawer__link ${
    isActive(ROUTES.PREFERENCES.href) ? "is-active" : ""
   }`}
  >
   {ROUTES.PREFERENCES.label}
  </a>
 );
}

export default function CustomerHeader() {
 return (
  <HeaderShell
   logo={<HeaderBrand />}
   nav={<NavList items={NAV} ariaLabel="Navegação do cliente" />}
   actions={<UserMenu />}
   drawer={{
    ariaLabel: "Menu de navegação",
    brand: <DrawerBrand />,
    userInfo: <DrawerUserInfo />,
    body: (
     <NavList
      items={NAV}
      variant="drawer"
      ariaLabel="Navegação do cliente"
      extras={
       <>
        <DrawerPreferencesLink />
        <DrawerLogoutButton />
       </>
      }
     />
    ),
    footer: <DrawerFooter label="energia que ilumina" />,
   }}
  />
 );
}
