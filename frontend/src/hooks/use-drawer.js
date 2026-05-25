"use client";

import { useCallback, useEffect, useState } from "react";

export function useDrawer() {
 const [open, setOpen] = useState(false);

 const openDrawer = useCallback(() => setOpen(true), []);
 const closeDrawer = useCallback(() => setOpen(false), []);

 useEffect(() => {
  if (!open) return;
  const original = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  const onKey = (e) => e.key === "Escape" && setOpen(false);
  document.addEventListener("keydown", onKey);
  return () => {
   document.body.style.overflow = original;
   document.removeEventListener("keydown", onKey);
  };
 }, [open]);

 return { open, openDrawer, closeDrawer };
}
