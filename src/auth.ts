import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateFreshCartUser } from "./app/_components/Login/login.api";
import { loginSchema } from "./app/_components/Login/login.logic";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 30 },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        rememberMe: { label: "Remember me", type: "text" },
      },
      async authorize(credentials) {
        const values = {
          email: credentials?.email,
          password: credentials?.password,
          rememberMe: credentials?.rememberMe === "true",
        };
        const validation = loginSchema.safeParse(values);
        if (!validation.success) return null;

        try {
          return await authenticateFreshCartUser(validation.data.email, validation.data.password);
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const freshCartUser = user as typeof user & { backendToken: string; userId: string };
        token.backendToken = freshCartUser.backendToken;
        token.userId = freshCartUser.userId;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.userId ?? token.sub ?? "";
      return session;
    },
  },
});
