import Link from "next/link"

export default function HomePage() {
  return (
    <main className="space-y-16 py-10">
      <section className="rounded-3xl bg-white border shadow-sm px-8 py-14 md:px-12">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-gray-600">
            Gestión simple de cobros
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Cobrá mejor.
            <br />
            Ordená mejor.
            <br />
            Crecé más.
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl">
            Centraliza clientes, cobros y seguimiento en una sola app. Menos
            desorden, más control y mejor imagen frente a tus clientes.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/clients"
              className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Empezar ahora
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl border bg-white px-6 py-3 text-sm font-medium text-gray-900"
            >
              Ver dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-medium text-gray-500">CLIENTES</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Tu cartera, ordenada
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Guarda nombre, email y teléfono de cada cliente en un solo lugar.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-medium text-gray-500">COBROS</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Registra cada pago
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Crea cobros, asigna fechas y controla qué está pendiente o pagado.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-3 text-sm font-medium text-gray-500">CONTROL</div>
          <h2 className="text-xl font-semibold text-gray-900">
            Decide con claridad
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Ve vencidos, pendientes y cobrados sin perder tiempo buscando.
          </p>
        </div>
      </section>
    </main>
  )
}