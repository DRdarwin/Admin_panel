"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";

export function ClientHeader() {
  const pathname = usePathname();
  return pathname !== "/login" ? <SiteHeader /> : null;
}
