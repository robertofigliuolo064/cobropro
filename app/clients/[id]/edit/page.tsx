import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

type EditClientPageProps = {
  params: Promise<{ id: string }>
}

async function updateClient(formData: FormData) {
  "use server"

  const id = formData.get("id") as string
  const name = formData.get("name")?.toString().trim() || ""
  const email = formData.get("email")?.toString().trim() || ""
  const phone = formData.get("phone")?.toString().trim() || ""

  if (!name) {
    throw new Error("El nombre es obligatorio")
  }

  await prisma.client.update({
    where: { id },
    data: {
      name,
      email: email || null,
      phone: phone || null,
      updatedAt: new Date(),
    },
  })

  redirect(`/clients/${id}`)
}

export default async function EditClientPage({
  params,
}: EditClientPageProps) {
  const { id } = await params

  const client = await prisma.client.findUnique({
    where: { id },
  })

  if (!client) {
    return <div>Cliente no encontrado</div>
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Editar cliente</h1>
      </div>

      <form action={updateClient} className="space-y-4 max-w-md">
        <input type="hidden" name="id" value={client.id} />

        <div>
          <label className="block mb-1 text-sm font-medium">Nombre</label>
          <input
            name="name"
            defaultValue={client.name}
            required
            autoFocus
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            defaultValue={client.email || ""}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Teléfono</label>
          <input
            name="phone"
            defaultValue={client.phone || ""}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Guardar cambios
          </button>

          <a
            href={`/clients/${client.id}`}
            className="text-sm text-gray-600 underline"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  )
}