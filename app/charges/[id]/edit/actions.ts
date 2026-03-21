"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function updateCharge(formData: FormData) {
  const id = formData.get("id")?.toString() || ""
  const concept = formData.get("concept")?.toString().trim() || ""
  const amountValue = formData.get("amount")?.toString().trim() || ""
  const dueDateValue = formData.get("dueDate")?.toString().trim() || ""

  if (!id) {
    throw new Error("Cobro no encontrado")
  }

  if (!concept) {
    throw new Error("El concepto es obligatorio")
  }

  if (!amountValue) {
    throw new Error("El monto es obligatorio")
  }

  const amount = Number(amountValue)

  if (Number.isNaN(amount)) {
    throw new Error("El monto no es válido")
  }

  const dueDate = dueDateValue
    ? new Date(`${dueDateValue}T00:00:00`)
    : null

  const charge = await prisma.charge.update({
    where: { id },
    data: {
      concept,
      amount,
      dueDate,
    },
  })

  redirect(`/clients/${charge.clientId}`)
}