"use client"

type DeleteChargeButtonProps = {
  label?: string
}

export function DeleteChargeButton({
  label = "Eliminar",
}: DeleteChargeButtonProps) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("¿Seguro que querés eliminar?")) {
          e.preventDefault()
        }
      }}
      className="px-3 py-1 rounded border border-red-200 text-red-500 text-sm"
    >
      {label}
    </button>
  )
}