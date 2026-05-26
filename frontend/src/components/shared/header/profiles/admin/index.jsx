"use client";

import { ROUTES } from "@/constants/web-routes";
import {
 Brand,
 DrawerBrand,
 DrawerFooter,
 DrawerLogoutButton,
 DrawerPreferencesLink,
 DrawerUserInfo,
 HeaderShell,
 Nav,
 UserMenu,
} from "../..";

const NAV = [ROUTES.ADMIN.USERS, ROUTES.ADMIN.ORDERS];

export default function AdminHeader() {
 return (
  <HeaderShell
   logo={
    <Brand
     href={ROUTES.ADMIN.USERS.href}
     ariaLabel="Luminar — painel admin"
     badge="Admin"
    />
   }
   nav={<Nav items={NAV} ariaLabel="Navegação admin" />}
   actions={<UserMenu />}
   drawer={{
    ariaLabel: "Menu admin",
    brand: <DrawerBrand badge="Admin" />,
    userInfo: <DrawerUserInfo />,
    body: (
     <Nav
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
