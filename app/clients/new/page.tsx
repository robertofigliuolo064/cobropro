export const dynamic = "force-dynamic"
export const revalidate = 0

import { createClient } from "./actions"

export default function NewClientPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Nuevo cliente</h1>
        <p>Prueba mínima.</p>
      </div>

      <form action={createClient} className="space-y-4 max-w-md">
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