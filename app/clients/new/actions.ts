"use server"

import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

export async function createClient(formData: FormData) {
  try {
    console.log("A1")

    const session = await auth()
    const userEmail = session?.user?.email ?? "test@test.com"
    console.log("A2", userEmail)

    const user = await prisma.user.upsert({
      where: { email: userEmail },
      update: {},
      create: {
        email: userEmail,
        name: "Test",
      },
    })
    console.log("A3", user.id)

    const name = formData.get("name")?.toString().trim() || ""
    const clientEmail = formData.get("email")?.toString().trim() || ""
    const phone = formData.get("phone")?.toString().trim() || ""
    console.log("A4", { name, clientEmail, phone })

    if (!name) {
      throw new Error("El nombre es obligatorio")
    }

    const client = await prisma.client.create({
      data: {
        name,
        email: clientEmail || null,
        phone: phone || null,
        userId: user.id,
      },
    })
    console.log("A5", client.id)

    revalidatePath("/clients")
    redirect("/dashboard")
  } catch (error) {
    console.error("CREATE_CLIENT_ERROR", error)
    throw error
  }
}