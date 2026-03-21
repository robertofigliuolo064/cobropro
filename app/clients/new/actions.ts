"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"

export async function createClient(formData: FormData) {
  const user = await prisma.user.findFirst()

  if (!user) {
    throw new Error("No hay usuario en la base")
  }

  const name = formData.get("name")?.toString().trim() || ""
  const email = formData.get("email")?.toString().trim() || ""
  const phone = formData.get("phone")?.toString().trim() || ""

  if (!name) {
    throw new Error("El nombre es obligatorio")
  }

  const client = await prisma.client.create({
    data: {
      name,
      email: email || null,
      phone: phone || null,
      userId: user.id,
    },
  })

  redirect(`/clients/${client.id}`)
}