"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function createCharge(formData: FormData) {
  const clientId = formData.get("clientId")?.toString()

if (!clientId) {
  return
}

const client = await prisma.client.findUnique({
  where: { id: clientId },
})

if (!client) {
  throw new Error("Cliente no encontrado")
}

  if (!client) {
  return
}

  const concept = formData.get("concept")?.toString().trim() || ""
  const amountValue = formData.get("amount")?.toString().trim() || ""
  const dueDateValue = formData.get("dueDate")?.toString().trim() || ""
const dueDate = dueDateValue
  ? new Date(`${dueDateValue}T00:00:00`)
  : null
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

  await prisma.charge.create({
    data: {
      concept,
      amount,
      dueDate,
      clientId: client.id,
      updatedAt: new Date(),
    },
  })

  redirect(`/clients/${client.id}`)
}