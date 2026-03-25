import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

const allowedEmails = ["gregfirit@gmail.com"]

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false

      return allowedEmails.includes(user.email)
    },
  },

  trustHost: true,
})