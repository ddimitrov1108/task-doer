import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { IUserSession } from "./interfaces";
import bcryptjs from "bcryptjs";

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

        const userController = (await import("@/db/UserController")).default;

        if (!userController.validateSignIn(credentials))
          throw new Error("Invalid credentials");

        const user = await userController.get(credentials.email);

        if (!user) throw new Error("User with this email does not exist");

        const comparePasswords = await bcryptjs.compare(
          credentials.password,
          user.hashPassword
        );

        if (!comparePasswords)
          throw new Error("Email or Password is incorrect");

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        };
      },
    }),
    CredentialsProvider({
      id: "sign-up",
      name: "Sign up",
      type: "credentials",
      credentials: {
        firstName: { type: "text" },
        lastName: { type: "text" },
        email: { type: "email" },
        password: { type: "password" },
        confirmPassword: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const userController = (await import("@/db/UserController")).default;

        if (!userController.validateSignUp(credentials))
          throw new Error("Invalid credentials");

        const isEmailTaken = await userController.exists(credentials.email);

        if (isEmailTaken)
          throw new Error("User with this email already exists");

        const user = await userController.create({
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          email: credentials.email,
          password: credentials.password,
        });

        if (!user) throw new Error("Something went wrong. Please try again");

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (!session || !token) throw new Error("Session expired");

      const userController = (await import("@/db/UserController")).default;

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
  const session = await getServerSession<NextAuthOptions, IUserSession>(
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
