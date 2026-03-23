"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function createClient(formData: FormData) {
  const session = await auth()
  const userEmail = session?.user?.email ?? "test@test.com"

  const user = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      email: userEmail,
      name: "Test",
    },
  })

  const name = formData.get("name")?.toString().trim() || ""
  const clientEmail = formData.get("email")?.toString().trim() || ""
  const phone = formData.get("phone")?.toString().trim() || ""

  if (!name) {
    throw new Error("El nombre es obligatorio")
  }

  await prisma.client.create({
    data: {
      name,
      email: clientEmail || null,
      phone: phone || null,
      userId: user.id,
    },
  })

  revalidatePath("/clients")
  redirect("/clients")
}