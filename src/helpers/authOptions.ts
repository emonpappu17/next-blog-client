/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            name?: string | null,
            email?: string | null,
            image?: string | null
        }
    }

    interface User {
        id: string,
        name?: string | null,
        email?: string | null,
        image?: string | null
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                if (!credentials?.email || !credentials.password) {
                    console.log("email or password is missing");
                    return null
                }

                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password
                        })
                    });

                    // console.log('res from backend:', res);

                    if (!res?.ok) {
                        console.log("Login failed", await res.text());
                        return null
                    }

                    const user = await res.json();

                    if (user.id) {
                        return {
                            id: user?.id,
                            name: user?.name,
                            email: user?.email,
                            image: user?.picture,
                            role: user?.role
                        }
                    } else {
                        return null
                    }
                } catch (error) {
                    console.log(error);
                    return null
                }

            }
        })
    ],
    callbacks: {
        // async signIn({ user, account, profile, email, credentials }) {
        //     if (account?.provider === "google") {
        //         try {
        //             const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google`, {
        //                 method: "POST",
        //                 headers: {
        //                     "Content-Type": "application/json"
        //                 },
        //                 body: JSON.stringify({
        //                     googleId: user?.id,
        //                     email: user.email,
        //                     name: user?.name,
        //                     picture: user.image
        //                 })
        //             });
        //             const dbUser = await res.json();
        //             console.log('res from google db store:', dbUser);
        //             // return dbUser
        //             (user as any).role = dbUser.role;
        //             return
        //         } catch (error) {
        //             console.log('error inside signIn==>', error);
        //         }
        //     }

        //     // console.log('inside signin user==>', user);
        //     // console.log('inside signin account==>', account);
        //     // console.log('inside signin profile==>', profile);
        //     // console.log('inside signin email==>', email);
        //     // console.log('inside signin credentials==>', credentials);
        //     return true;
        // },

        async signIn({ user, account }) {
            if (account?.provider === "google") {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/google`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            googleId: user.id,
                            email: user.email,
                            name: user.name,
                            picture: user.image,
                        }),
                    });

                    const dbUser = await res.json();

                    // attach role so jwt can pick it up
                    (user as any).role = dbUser.role;

                    return true;
                } catch (err) {
                    console.error("Error storing Google user:", err);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user }) {
            console.log('jwt token==>', token);
            // console.log('jwt user==>', user);
            if (user) {
                token.id = user?.id;
                token.role = (user as any)?.role
            }
            return token
        },
        async session({ session, token }) {
            // console.log('session==>', session);
            console.log('token==>', token);
            if (session?.user) {
                session.user.id = token?.id as string;
                (session.user as any).role = token.role;
            }
            return session
        },

        // async redirect({ url, baseUrl }) {
        //     console.log('url==>', url);
        //     console.log('baseurl==>', baseUrl);
        //     // // Allows relative callback URLs
        //     // if (url.startsWith("/")) return `${baseUrl}${url}`
        //     // // Allows callback URLs on the same origin
        //     // else if (new URL(url).origin === baseUrl) return url
        //     return `${baseUrl}/blogs`
        // }
    },
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login"
    }
}