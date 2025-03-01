"use client"

import { usePathname } from "next/navigation"

import { SiteHeader } from "@/components/site-header"

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/login"

  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Покажемо SiteHeader лише якщо не /login */}
      {!isLoginPage && <SiteHeader />}
      <div className="flex-1">{children}</div>
    </div>
  )
}
