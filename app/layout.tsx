import "./globals.css"
import { AppNav } from "@/components_old/app-nav"

export const metadata = {
  title: "CobroPro",
  description: "MVP",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
      {/* Server Component */}
        <AppNav />
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          {children}
        </div>
      </body>
    </html>
  )
}