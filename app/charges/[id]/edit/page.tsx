import { prisma } from "@/lib/prisma"
import { updateCharge } from "./actions"

type EditChargePageProps = {
  params: Promise<{ id: string }>
}

export default async function EditChargePage({
  params,
}: EditChargePageProps) {
  const { id } = await params

  const charge = await prisma.charge.findUnique({
    where: { id },
    include: {
      client: true,
    },
  })

  if (!charge) {
    return <div>Cobro no encontrado</div>
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Editar cobro</h1>

        <p className="text-sm text-gray-600">
          Cliente: <span className="font-medium">{charge.client.name}</span>
        </p>
      </div>

      <form action={updateCharge} className="space-y-4 max-w-md">
        <input type="hidden" name="id" value={charge.id} />

        <div>
          <label className="block mb-1 text-sm font-medium">
            Concepto
          </label>

         <input
  name="concept"
  defaultValue={charge.concept}
  required
  autoFocus
  className="w-full border px-3 py-2"
/>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Monto
          </label>

         <input
  name="amount"
  type="number"
  min="0.01"
  step="0.01"
  defaultValue={charge.amount}
  required
  className="w-full border px-3 py-2"
/>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">
            Fecha de vencimiento
          </label>

          <input
            name="dueDate"
            type="date"
            defaultValue={
              charge.dueDate
                ? new Date(charge.dueDate).toISOString().split("T")[0]
                : ""
            }
            className="w-full border px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Guardar cambios
        </button>
        <a
  href={`/clients/${charge.clientId}`}
  className="inline-block ml-2 text-sm text-gray-600 underline"
>
  Cancelar
</a>
      </form>
    </div>
  )
}