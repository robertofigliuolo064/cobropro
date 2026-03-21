import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { createCharge } from "./actions"

type NewChargePageProps = {
  searchParams: Promise<{ clientId?: string }>
}

export default async function NewChargePage({
  searchParams,
}: NewChargePageProps) {
  const { clientId } = await searchParams

  const client = clientId
    ? await prisma.client.findUnique({
        where: { id: clientId },
      })
    : null

  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
  })

  if (clients.length === 0) {
    return (
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Nuevo cobro</h1>

        <p className="text-sm text-gray-600">
          Primero necesitas crear un cliente.
        </p>

        <Link
          href="/clients/new"
          className="inline-block bg-black text-white px-4 py-2 rounded"
        >
          Crear cliente
        </Link>
      </div>
    )
  }

  const defaultDueDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Nuevo cobro</h1>

        {client && (
          <div className="text-sm text-gray-600">
            Cliente: <span className="font-medium">{client.name}</span>
          </div>
        )}

        <p className="text-sm text-gray-600">Completá los datos del cobro.</p>
      </div>

      <form action={createCharge} className="space-y-4 max-w-md">
        {clientId ? (
          <input type="hidden" name="clientId" value={clientId} />
        ) : (
          <div>
            <label
              htmlFor="clientId"
              className="block mb-1 text-sm font-medium"
            >
              Cliente
            </label>

            <select
              id="clientId"
              name="clientId"
              required
              className="w-full border px-3 py-2"
              defaultValue=""
            >
              <option value="">Seleccionar cliente</option>

              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="concept" className="block mb-1 text-sm font-medium">
            Concepto
          </label>

          <input
            id="concept"
            name="concept"
            type="text"
            required
            autoFocus
            className="w-full border px-3 py-2"
            placeholder="Ej: Cuota Marzo"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block mb-1 text-sm font-medium">
            Monto
          </label>

          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            required
            className="w-full border px-3 py-2"
            placeholder="Ej: 20000"
          />
        </div>

        <div>
          <label htmlFor="dueDate" className="block mb-1 text-sm font-medium">
            Fecha de vencimiento
          </label>

          <input
            id="dueDate"
            name="dueDate"
            type="date"
            defaultValue={defaultDueDate}
            className="w-full border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Guardar cobro
        </button>
      </form>
    </div>
  )
}