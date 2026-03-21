import Link from "next/link"

export function AppNav() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center">
        <Link href="/" className="font-semibold">
          CobroPro
        </Link>

        <nav className="flex flex-wrap gap-3 text-sm">
        <Link href="/dashboard" className="px-2 py-1 rounded hover:bg-gray-100">
  Dashboard
</Link>

<Link href="/clients" className="px-2 py-1 rounded hover:bg-gray-100">
  Clientes
</Link>

<Link href="/charges" className="px-2 py-1 rounded hover:bg-gray-100">
  Cobros
</Link>

<Link href="/account" className="px-2 py-1 rounded hover:bg-gray-100">
  Cuenta
</Link>  
        </nav>
      </div>
    </header>
  )
}