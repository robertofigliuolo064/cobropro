import Link from "next/link"
import { auth, signIn } from "@/auth"

export default async function HomePage() {
  const session = await auth()

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="space-y-6">
        <div className="inline-block rounded-full border px-3 py-1 text-sm">
          CobroPro
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          Cobrá mejor. Ordená mejor. Crecé más.
        </h1>

        <p className="max-w-2xl text-lg text-gray-600">
          Una app simple para organizar cobros, clientes y seguimiento en un solo lugar.
        </p>

        <div className="flex gap-3 relative z-10">
 
          {session?.user ? (
            <Link
              href="/dashboard"
              className="rounded-md bg-black px-4 py-2 text-white"
            >
              Ir al dashboard
            </Link>
          ) : (
            <form
              action={async () => {
                "use server"
                await signIn("google", { redirectTo: "/dashboard" })
              }}
            >
              <button className="rounded-md bg-black px-4 py-2 text-white">
                Entrar con Google
              </button>
            </form>
          )}

          
        </div>
      </div>
    </main>
  )
}