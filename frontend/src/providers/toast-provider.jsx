"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
 return (
  <Toaster
   position="top-right"
   richColors
   closeButton
   duration={4000}
   toastOptions={{
    style: {
     fontFamily: "var(--font-base)",
     borderRadius: "12px",
     padding: "14px 18px",
     fontSize: "0.95rem",
     fontWeight: 500,
     boxShadow: "0 10px 30px rgba(34, 31, 32, 0.18)",
    },
   }}
  />
 );
}
