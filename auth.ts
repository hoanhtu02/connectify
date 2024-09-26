import NextAuth, { NextAuthConfig, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from '@prisma/client'
import { Provider } from "next-auth/providers"
import bcrypt from "bcryptjs"
import { randomUUID } from "crypto"
import { encode } from "next-auth/jwt"

const prisma = new PrismaClient()
const providers: Provider[] = [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
            password: { label: "Password", type: "password", placeholder: "password" },
        },
        async authorize({ email, password }) {
            if (!email || !password) return null
            const user = await prisma.user.findUnique({
                where: { email: email as string },
                include: { accounts: true }
            })
            if (user && bcrypt.compareSync(password as string, user.password!)) {

                if (user.accounts[0].provider !== "credentials") {
                    throw new Error(
                        `Please sign in with ${user.accounts[0].provider}`
                    );
                }
                return user
            } else throw new Error("Invalid email or password")
            return null
        },
    }),
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
    })
]
const adapter = PrismaAdapter(prisma)
export const config: NextAuthConfig = {
    adapter: PrismaAdapter(prisma),
    providers,
    secret: process.env.AUTH_SECRET,
    session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/signin",
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        async encode(arg) {
            return (arg.token?.sessionId as string) ?? encode(arg);
        },
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account?.provider === "credentials") {
                const expires = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000); // 30 days
                const sessionToken = randomUUID();

                const session = await adapter.createSession!({
                    userId: user.id!,
                    sessionToken,
                    expires,
                });
                token.sessionId = session.sessionToken;
            }

            return token;
        },

        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                },
            }
        }
    }, events: {
        async signOut(message) {
            if ("session" in message && message.session?.sessionToken) {
                await prisma.session.deleteMany({
                    where: {
                        sessionToken: message.session?.sessionToken,
                    },
                });
            }
        },
    }
}
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(config)

export const providerMap = providers
    .map((provider) => {
        if (typeof provider === "function") {
            const providerData = provider()
            return { id: providerData.id, name: providerData.name }
        } else {
            return { id: provider.id, name: provider.name }
        }
    })
    .filter((provider) => provider.id !== "credentials")