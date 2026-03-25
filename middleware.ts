export { auth as middleware } from "@/auth"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/clients/:path*",
    "/charges/:path*",
    "/account/:path*",
  ],
}