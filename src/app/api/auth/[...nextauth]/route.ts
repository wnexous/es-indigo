import rolesConfig from "@/config/rolesConfig"
import { UserSessionI } from "@/interfaces/User.interface"
import { UserProfileI } from "@/interfaces/UserProfile.interface"
import { UserI } from "@/interfaces/schemas.interface"
import apiBackend from "@/vendors/api-backend"
import NextAuth, { Session } from "next-auth"
import { AdapterUser } from "next-auth/adapters"
import { JWT } from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    // Configure one or more authentication providers
    pages: {
        signIn: "/signin",
        signOut: "/signout"
    },


    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID ?? "",
        //     clientSecret: process.env.GITHUB_SECRET ?? "",
        // }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        })
        // ...add more providers here
    ],
    callbacks: {
        async jwt({ token, account, profile }) {
            // Adiciona a role ao token JWT na primeira vez que o usuário faz login
            // Exemplo de lógica para atribuir roles

            if (profile && account && profile.email) {
                const { email, name = "" } = profile
                try {
                    // obtem dados do banco para injetar no jwt
                    const userProfile = await apiBackend.database.getUserByEmail({ email, include: { roles: true } })
                    // esse parse serve pra remover dados do banco como id e ancoragens
                    const parsedProfile = apiBackend.data.parseUserProfile(userProfile)
                    token.roles = parsedProfile.roles
                } catch (error) {
                    const user = await apiBackend.database.createEmpityUser({ email, name, phone: "", })
                    const parsedProfile = apiBackend.data.parseUserProfile(user)
                    token.roles = parsedProfile.roles
                }
            }
            return token;
        },
        async session({ session, token, user }: { session: Session, token: JWT, user: AdapterUser }): Promise<Session & { user?: UserSessionI }> {
            const roles = (token.roles as string[])
            // aqui faz a injecao de dados vindos do banco no jwt
            let sessionWithProfile: UserSessionI = { ...session.user, roles }
            return { ...sessionWithProfile, expires: session.expires };
        },
    }
})

export { handler as GET, handler as POST }
