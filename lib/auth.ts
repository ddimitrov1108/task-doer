import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserSession } from "./interfaces";
import bcryptjs from "bcryptjs";
import userController from "@/db/UserController";

const authConfig: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  providers: [
    CredentialsProvider({
      id: "sign-in",
      name: "Sign in",
      type: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (!userController.validateSignIn(credentials))
          throw new Error("Invalid credentials");

        const user = await userController.get(credentials.email);

        if (!user) throw new Error("User with this email does not exist");

        const comparePasswords = await bcryptjs.compare(
          credentials.password,
          user.hash_password
        );

        if (!comparePasswords)
          throw new Error("Email or Password is incorrect");

        return {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        };
      },
    }),
    CredentialsProvider({
      id: "sign-up",
      name: "Sign up",
      type: "credentials",
      credentials: {
        first_name: { type: "text" },
        last_name: { type: "text" },
        email: { type: "email" },
        password: { type: "password" },
        confirmPassword: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (!userController.validateSignUp(credentials))
          throw new Error("Invalid credentials");

        const isEmailTaken = await userController.exists(credentials.email);

        if (isEmailTaken)
          throw new Error("User with this email already exists");

        const user = await userController.create({
          first_name: credentials.first_name,
          last_name: credentials.last_name,
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) throw new Error("Something went wrong. Please try again");

        return {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!session || !token) throw new Error("Session expired");

      const doesUserExist =
        token.email && (await userController.exists(token.email));

      if (!doesUserExist) throw new Error("User doesnt exist");

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};

export default authConfig;

export const getUserFromServerSession = async () => {
  const session = await getServerSession<NextAuthOptions, UserSession>(
    authConfig
  );

  return session && session.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      }
    : null;
};
