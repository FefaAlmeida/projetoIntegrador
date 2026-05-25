"use client";

import { useEffect } from "react";

export function useClickOutside(ref, onOutside, enabled = true) {
 useEffect(() => {
  if (!enabled) return;
  const onClick = (e) => {
   if (ref.current && !ref.current.contains(e.target)) {
    onOutside(e);
   }
  };
  const onKey = (e) => e.key === "Escape" && onOutside(e);
  document.addEventListener("mousedown", onClick);
  document.addEventListener("keydown", onKey);
  return () => {
   document.removeEventListener("mousedown", onClick);
   document.removeEventListener("keydown", onKey);
  };
 }, [ref, onOutside, enabled]);
}
