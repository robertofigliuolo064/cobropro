import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
export default async function DashboardPage() {
  
const charges = await prisma.charge.findMany()

const recentCharges = await prisma.charge.findMany({
  orderBy: { dueDate: "desc" },
  take: 5,
  include: {
    client: true,
  },
})
const pendingTotal = charges
  .filter((c) => !c.paid)
  .reduce((sum, c) => sum + c.amount, 0)

const paidTotal = charges
  .filter((c) => c.paid)
  .reduce((sum, c) => sum + c.amount, 0)

const overdueCount = charges.filter(
  (c) => !c.paid && c.dueDate && new Date(c.dueDate) < new Date()
).length
const pendingCount = charges.filter((c) => !c.paid).length

const paidCount = charges.filter((c) => c.paid).length

  return (
    <main className="space-y-6">
  <div>
    <h1 className="text-2xl font-semibold">Dashboard</h1>
   <p className="text-gray-600">Resumen general de cobros</p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="border rounded-lg p-4 shadow-sm">
  <div className="text-sm text-gray-500">Total pendiente</div>
  <div className="text-2xl font-bold text-yellow-600">
    ${pendingTotal}
  </div>
  <div className="text-sm text-gray-500 mt-1">
    {pendingCount} cobros
  </div>
</div>

    <div className="border rounded-lg p-4 shadow-sm">
  <div className="text-sm text-gray-500">Total cobrado</div>
  <div className="text-2xl font-bold text-green-600">
    ${paidTotal}
  </div>
  <div className="text-sm text-gray-500 mt-1">
    {paidCount} cobros
  </div>
</div>

   <div className="border rounded-lg p-4 shadow-sm">
  <div className="text-sm text-gray-500">Cobros vencidos</div>
  <div className="text-2xl font-bold text-red-600">
    {overdueCount}
  </div>
  <div className="text-sm text-gray-500 mt-1">
    sin pagar
  </div>
</div>
  </div>
  <div>
  <h2 className="text-lg font-semibold">Últimos cobros</h2>

  <ul className="space-y-2 mt-3">
   {recentCharges.map((charge) => (
      <Link
  key={charge.id}
  href={`/clients/${charge.client.id}`}
  className="block border p-3 rounded hover:bg-gray-50"
>
        <div className="font-medium">{charge.concept}</div>

        <div className="text-sm text-gray-600">
          {charge.client.name}
        </div>

        <div className="text-sm">
  ${charge.amount}
</div>

<div
  className={
    charge.paid
      ? "text-green-600 text-sm"
      : charge.dueDate && new Date(charge.dueDate) < new Date()
      ? "text-red-600 text-sm"
      : "text-yellow-600 text-sm"
  }
>
  {charge.paid
    ? "Pagado"
    : charge.dueDate && new Date(charge.dueDate) < new Date()
    ? "Vencido"
    : "Pendiente"}
</div>
      </Link>
    ))}
  </ul>
</div>
</main>
  )
}