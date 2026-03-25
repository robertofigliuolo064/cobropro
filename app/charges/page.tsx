export const revalidate = 60
import Link from "next/link"
import { prisma } from "@/lib/prisma"

export default async function ChargesPage() {
  const charges = await prisma.charge.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      client: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cobros</h1>

        <Link
          href="/clients"
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          + Nuevo cobro
        </Link>
      </div>

      {charges.length === 0 && (
        <div className="border rounded-lg p-4 text-sm text-gray-600">
          Todavía no hay cobros.
        </div>
      )}

      <ul className="space-y-2">
        {charges.map((charge) => (
          <li key={charge.id} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{charge.concept}</div>
                <div className="text-sm text-gray-600">{charge.client.name}</div>
              </div>

              <div className="text-right">
                <div className="font-medium">${charge.amount}</div>
                <div className="text-sm text-gray-500">
                  {charge.paid ? "Pagado" : "Pendiente"}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}