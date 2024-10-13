import { SvelteKitAuth } from "@auth/sveltekit"
import google from "@auth/sveltekit/providers/google"

import { config } from "dotenv"
config()

export const { handle, signIn, signOut } = SvelteKitAuth(async (event) => {
  const authOptions = {
    providers: [
      google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET
      })
    ],
    secret: process.env.AUTH_SECRET,
    trustHost: true
  }
  return authOptions
})