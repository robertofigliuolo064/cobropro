"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppNav() {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    `px-2 py-1 rounded ${
      pathname === href ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
    }`

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
        <Link prefetch href="/" className="text-xl font-bold">
          CobroPro
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link prefetch href="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>
          <Link prefetch href="/clients" className={linkClass("/clients")}>
            Clientes
          </Link>
          <Link prefetch href="/charges" className={linkClass("/charges")}>
            Cobros
          </Link>
        </nav>
      </div>
    </header>
  )
}