import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize() {
        return {
          id: "test-user",
          email: "test@test.com",
          name: "Test User",
        }
      },
    }),
  ],
  trustHost: true,
})