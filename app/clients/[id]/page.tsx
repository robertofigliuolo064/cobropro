import Link from "next/link"
import { redirect } from "next/navigation"
import { DeleteChargeButton } from "@/components/delete-charge-button"
import { prisma } from "@/lib/prisma"

type ClientPageProps = {
  params: Promise<{ id: string }>
}

async function markChargeAsPaid(formData: FormData) {
  "use server"

  const chargeId = formData.get("chargeId") as string
  const clientId = formData.get("clientId") as string

  await prisma.charge.update({
    where: { id: chargeId },
    data: { paid: true },
  })

  redirect(`/clients/${clientId}`)
}
async function deleteClient(formData: FormData) {
  "use server"

  const clientId = formData.get("clientId") as string

  const clientWithCharges = await prisma.client.findUnique({
  where: { id: clientId },
  include: {
    charges: true,
  },
})

if (!clientWithCharges) {
  throw new Error("Cliente no encontrado")
}

if (clientWithCharges.charges.length > 0) {
  throw new Error("No se puede eliminar un cliente con cobros")
}

await prisma.client.delete({
  where: { id: clientId },
})

  redirect("/clients")
}
export default async function ClientPage({ params }: ClientPageProps) {
  const { id } = await params

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      charges: {
        orderBy: [{ paid: "asc" }, { dueDate: "asc" }],
      },
    },
  })

  if (!client) {
    return <div>Cliente no encontrado</div>
  }

  const pendingTotal = client.charges
    .filter((c) => !c.paid)
    .reduce((sum, c) => sum + c.amount, 0)

  const paidTotal = client.charges
    .filter((c) => c.paid)
    .reduce((sum, c) => sum + c.amount, 0)

  const totalAmount = client.charges.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="space-y-6">
     <div>
  <h1 className="text-2xl font-semibold">{client.name}</h1>
  
  
  <Link
  href={`/clients/${client.id}/edit`}
  className="inline-block mt-2 text-sm text-gray-600 underline"
>
  Editar cliente
</Link>

  {client.charges.length === 0 ? (
  <form action={deleteClient} className="mt-2">
    <input type="hidden" name="clientId" value={client.id} />
    <DeleteChargeButton label="Eliminar cliente" />
  </form>
) : (
  <p className="mt-2 text-sm text-gray-500">
    No se puede eliminar este cliente porque tiene cobros.
  </p>
)}

  <div>Email: {client.email || "Sin email"}</div>
  <div>Teléfono: {client.phone || "Sin teléfono"}</div>
</div> 

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Cobros ({client.charges.length})
          </h2>

          <Link
            href={`/charges/new?clientId=${client.id}`}
            className="bg-black text-white px-3 py-2 rounded text-sm"
          >
            + Nuevo cobro
          </Link>
        </div>

        <div className="text-sm text-gray-600 mb-3 space-y-1">
          <div>Total: ${totalAmount}</div>
          <div>Pendiente: ${pendingTotal}</div>
          <div>Cobrado: ${paidTotal}</div>
        </div>

        <h3 className="text-sm font-semibold mt-4">Pendientes</h3>

        {client.charges.filter((c) => !c.paid).length === 0 ? (
          <p className="mt-2 text-sm text-gray-600">No hay cobros pendientes.</p>
        ) : (
          <ul className="space-y-2 mt-3">
            {client.charges
              .filter((c) => !c.paid)
              .map((charge) => (
                <li
                  key={charge.id}
                  className="border p-4 rounded-lg shadow-sm bg-yellow-50 border-yellow-300"
                >
                  <div className="font-medium">{charge.concept}</div>

                  <div className="text-lg font-semibold">${charge.amount}</div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700">
                      Pendiente
                    </span>

                    {charge.dueDate ? (
                      <span
                        className={
                          new Date(charge.dueDate) < new Date()
                            ? "text-red-600"
                            : ""
                        }
                      >
                        {new Date(charge.dueDate) < new Date()
                          ? "Vencido: "
                          : "Vence: "}
                        {new Date(charge.dueDate).toLocaleDateString()}
                      </span>
                    ) : null}
                  </div>
<Link
  href={`/charges/${charge.id}/edit`}
  className="inline-block text-sm text-gray-600 underline mr-3"
>
  Editar
</Link>
                  <form action={markChargeAsPaid} className="mt-2">
                    <input type="hidden" name="chargeId" value={charge.id} />
                    <input type="hidden" name="clientId" value={client.id} />
                    <button
                      type="submit"
                      className="bg-black text-white px-3 py-1 rounded"
                    >
                      Marcar como pagado
                    </button>
                  </form>
                </li>
              ))}
          </ul>
        )}

        <h3 className="text-sm font-semibold mt-6">Pagados</h3>

        {client.charges.filter((c) => c.paid).length === 0 ? (
          <p className="mt-2 text-sm text-gray-600">No hay cobros pagados.</p>
        ) : (
          <ul className="space-y-2 mt-3">
            {client.charges
              .filter((c) => c.paid)
              .map((charge) => (
                <li key={charge.id} className="border p-4 rounded-lg shadow-sm">
                  <div className="font-medium">{charge.concept}</div>

                  <div className="text-lg font-semibold">${charge.amount}</div>

                  <div className="mt-2 flex items-center justify-between text-sm">
                    <span className="inline-block rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                      Pagado
                    </span>

                    {charge.dueDate ? (
                      <span>
                        Vence: {new Date(charge.dueDate).toLocaleDateString()}
                      </span>
                    ) : null}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  )
}