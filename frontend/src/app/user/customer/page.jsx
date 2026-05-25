"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CustomerHub() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/user/customer/orders");
  }, [router]);

  return null;
}
