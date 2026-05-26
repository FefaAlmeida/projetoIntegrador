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

const NAV = [ROUTES.CUSTOMER.DASHBOARD, ROUTES.CUSTOMER.MY_ORDERS];

export default function CustomerHeader() {
 return (
  <HeaderShell
   logo={<Brand />}
   nav={<Nav items={NAV} ariaLabel="Navegação do cliente" />}
   actions={<UserMenu />}
   drawer={{
    ariaLabel: "Menu de navegação",
    brand: <DrawerBrand />,
    userInfo: <DrawerUserInfo />,
    body: (
     <Nav
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
