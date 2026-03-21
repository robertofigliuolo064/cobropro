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
        if (!confirm("¿Eliminar este cobro?")) {
          e.preventDefault()
        }
      }}
      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
    >
      {label}
    </button>
  )
}