import Link from "next/link"
import { DeleteChargeButton } from "@/components/delete-charge-button"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

async function markChargeAsPaid(formData: FormData) {
  "use server"

  const chargeId = formData.get("chargeId") as string

  await prisma.charge.update({
    where: { id: chargeId },
    data: { paid: true },
  })

  redirect("/charges")
}

async function deleteCharge(formData: FormData) {
  "use server"

  const chargeId = formData.get("chargeId") as string

  await prisma.charge.delete({
    where: { id: chargeId },
  })

  redirect("/charges")
}

export default async function ChargesPage() {
  const charges = await prisma.charge.findMany({
    include: {
      client: true,
    },
    orderBy: [{ paid: "asc" }, { dueDate: "asc" }],
  })

  const pending = charges.filter((c) => !c.paid)
  const paid = charges.filter((c) => c.paid)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Cobros</h1>

        <Link
          href="/charges/new"
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          + Nuevo cobro
        </Link>
      </div>

      {charges.length === 0 && <p>No hay cobros todavía.</p>}

     {/* Pendientes */}
<div>
  <h3 className="text-sm font-semibold mt-4">Pendientes</h3>

  {pending.length === 0 ? (
    <p className="text-sm text-gray-600">No hay cobros pendientes.</p>
  ) : (
    <ul className="space-y-2 mt-2">
      {pending.map((charge) => (
        <li key={charge.id} className="border p-4 rounded-lg shadow-sm">
          <div className="font-medium">{charge.concept}</div>
          <div>Monto: ${charge.amount}</div>
          <div className="text-yellow-600 font-medium">Pendiente</div>
          <div>Cliente: {charge.client.name}</div>

          <div className="mt-2 flex gap-2">
            <Link
              href={`/charges/${charge.id}/edit`}
              className="bg-gray-200 text-black px-3 py-1 rounded text-sm"
            >
              Editar
            </Link>

            <form action={markChargeAsPaid}>
              <input type="hidden" name="chargeId" value={charge.id} />
              <button
                type="submit"
                className="bg-gray-200 text-gray-900 px-3 py-1 rounded text-sm"
              >
                Marcar como pagado
              </button>
            </form>

            <form action={deleteCharge}>
              <input type="hidden" name="chargeId" value={charge.id} />
              <DeleteChargeButton />
            </form>
          </div>

          {charge.dueDate && (
            <div className="mt-2 text-right">
              <span
                className={
                  new Date(charge.dueDate) < new Date() && !charge.paid
                   ? "text-red-600 text-sm font-semibold ml-2"
                    : "text-sm text-gray-600"
                }
              >
                {new Date(charge.dueDate) < new Date() && !charge.paid
                  ? "!!! VENCIDO: "
                  : "Vence: "}
                {new Date(charge.dueDate).toLocaleDateString()}
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  )}
</div>
      <div>
        <h3 className="text-sm font-semibold mt-6">Pagados</h3>

        {paid.length === 0 ? (
          <p className="text-sm text-gray-600">No hay cobros pagados.</p>
        ) : (
          <ul className="space-y-2 mt-2">
            {paid.map((charge) => (
              <li key={charge.id} className="border p-4 rounded-lg shadow-sm">
                <div className="font-medium">{charge.concept}</div>
                <div>Monto: ${charge.amount}</div>
                <div className="text-green-600 font-medium">Pagado</div>
                <div>Cliente: {charge.client.name}</div>

                {charge.dueDate && (
                  <div className="text-sm text-gray-600">
                    Vence: {new Date(charge.dueDate).toLocaleDateString()}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}