"use client";

import { ROUTES } from "@/constants/web-routes";
import HeaderShell from "./header-shell";
import HeaderBrand from "./header-brand";
import NavList from "./nav-list";
import AuthCtas from "./auth-ctas";
import ServicesDropdown, {
 ServicesDrawerAccordion,
} from "./services-dropdown";
import { DrawerBrand, DrawerFooter } from "./drawer-pieces";

const NAV = [ROUTES.HOME, ROUTES.QUOTE, ROUTES.CONTACT];

export default function PublicHeader() {
 return (
  <HeaderShell
   logo={<HeaderBrand />}
   nav={<NavList items={NAV} extras={<ServicesDropdown />} />}
   actions={<AuthCtas />}
   drawer={{
    ariaLabel: "Menu de navegação",
    brand: <DrawerBrand />,
    body: (
     <>
      <NavList
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
