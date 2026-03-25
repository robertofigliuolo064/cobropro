export const revalidate = 60

import Link from "next/link"
import { prisma } from "@/lib/prisma"

function getChargeStatus(charge: {
  paid: boolean
  dueDate: Date | null
}) {
  if (charge.paid) return "paid"
  if (charge.dueDate && new Date(charge.dueDate) < new Date()) return "overdue"
  return "pending"
}

export default async function ChargesPage() {
  const charges = await prisma.charge.findMany({
    orderBy: [{ paid: "asc" }, { dueDate: "asc" }, { createdAt: "desc" }],
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
        <div className="border rounded-lg p-4 text-sm text-gray-600 bg-white">
          Todavía no hay cobros.
        </div>
      )}

      <ul className="space-y-3">
        {charges.map((charge) => {
          const status = getChargeStatus(charge)

          return (
            <li key={charge.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-medium">{charge.concept}</div>
                  <div className="text-sm text-gray-600">{charge.client.name}</div>

                  {charge.dueDate && (
                    <div className="text-sm text-gray-500">
                      Vence: {new Date(charge.dueDate).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="text-right space-y-2">
                  <div className="font-semibold text-lg">${charge.amount}</div>

                  {status === "paid" && (
                    <span className="inline-block rounded-full px-2.5 py-1 text-xs font-medium bg-green-100 text-green-700">
                      Pagado
                    </span>
                  )}

                  {status === "pending" && (
                    <span className="inline-block rounded-full px-2.5 py-1 text-xs font-medium bg-yellow-100 text-yellow-700">
                      Pendiente
                    </span>
                  )}

                  {status === "overdue" && (
                    <span className="inline-block rounded-full px-2.5 py-1 text-xs font-medium bg-red-100 text-red-700">
                      Pendiente / Vencido
                    </span>
                  )}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}