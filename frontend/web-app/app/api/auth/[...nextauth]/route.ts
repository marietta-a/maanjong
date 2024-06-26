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
  callbacks: {
    async jwt({token, profile, account}){
      console.log('--> testing token')
        if(profile){
          token.username = profile.username;
        }
        if(account){
          token.access_token = account.access_token;
        }
        console.log({token})
        return token;
    },
    async session({session, token}){
      console.log('--> testing session')
       if (token){
          session.user.username = token.username
       }
       console.log({session})
       return session;
    }
  }
}

// export default NextAuth(authOptions)
const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}