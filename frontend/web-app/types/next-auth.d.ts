import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      username: string
    } & DefaultSession['user']
  }

  interface Profile {
    username: string
  }

  interface User {
    username: string
  }
}

declare module 'next-auth/jwt' {
    interface JWT {
        username: string
        access_token?: string
    }
}