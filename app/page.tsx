import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AccountPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/")
  }

  return (
    <main>
      <h1>Cuenta</h1>
      <p>Nombre: {String(session.user.name)}</p>
      <p>Email: {String(session.user.email)}</p>
    </main>
  )
}