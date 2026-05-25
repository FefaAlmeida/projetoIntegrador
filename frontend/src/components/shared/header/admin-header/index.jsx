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

const NAV = [ROUTES.ADMIN.USERS, ROUTES.ADMIN.ORDERS];

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

export default function AdminHeader() {
 return (
  <HeaderShell
   logo={
    <HeaderBrand
     href={ROUTES.ADMIN.USERS.href}
     ariaLabel="Luminar — painel admin"
     badge="Admin"
    />
   }
   nav={<NavList items={NAV} ariaLabel="Navegação admin" />}
   actions={<UserMenu />}
   drawer={{
    ariaLabel: "Menu admin",
    brand: <DrawerBrand badge="Admin" />,
    userInfo: <DrawerUserInfo />,
    body: (
     <NavList
      items={NAV}
      variant="drawer"
      ariaLabel="Navegação admin"
      extras={
       <>
        <DrawerPreferencesLink />
        <DrawerLogoutButton />
       </>
      }
     />
    ),
    footer: <DrawerFooter label="painel administrativo" />,
   }}
  />
 );
}
