"use client";

import { ROUTES } from "@/constants/web-routes";
import {
 AuthCtas,
 Brand,
 DrawerBrand,
 DrawerFooter,
 HeaderShell,
 Nav,
 ServicesDrawerAccordion,
 ServicesDropdown,
} from "../..";

const NAV = [ROUTES.HOME, ROUTES.QUOTE, ROUTES.CONTACT];

export default function PublicHeader() {
 return (
  <HeaderShell
   logo={<Brand />}
   nav={<Nav items={NAV} extras={<ServicesDropdown />} />}
   actions={<AuthCtas />}
   drawer={{
    ariaLabel: "Menu de navegação",
    brand: <DrawerBrand />,
    body: (
     <>
      <Nav
       items={NAV}
       variant="drawer"
       extras={<ServicesDrawerAccordion />}
      />
      <AuthCtas variant="drawer" />
     </>
    ),
    footer: <DrawerFooter label="energia que ilumina" />,
   }}
  />
 );
}
