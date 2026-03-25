export const dynamic = "force-dynamic"
export const revalidate = 0

import { createClient } from "./actions"

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Nuevo cliente</h1>
        <p>Completá los datos del cliente.</p>
      </div>

      <form action={createClient} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border px-3 py-2"
            placeholder="Ej: Juan Pérez"
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border px-3 py-2"
            placeholder="juan@email.com"
          />
        </div>

        <div>
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="text"
            className="w-full border px-3 py-2"
            placeholder="Ej: 11 5555 5555"
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Guardar cliente
        </button>
      </form>
    </div>
  )
}