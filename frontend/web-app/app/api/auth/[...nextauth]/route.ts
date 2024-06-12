import NextAuth, { NextAuthOptions } from "next-auth"
import DuendeIDS6Provider from "next-auth/providers/duende-identity-server6"


export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  // Configure one or more authentication providers
  providers: [
    DuendeIDS6Provider({
        id: "id-server",
        clientId: "nextApp",
        clientSecret: "secret",
        issuer: "http://localhost:5000",
        authorization: {params: {
            scope: 'openid profile auctionApp',
        }},
        idToken: true
      })    
  ],
}

// export default NextAuth(authOptions)
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}