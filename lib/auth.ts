import { NextAuthOptions, User as UserAuth } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { emailRegex, nameRegex, passwordRegex } from "./regex";
import bcryptjs from "bcryptjs";
import { userController } from "@/db";

export const authConfig: NextAuthOptions = {
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

        const { email, password } = credentials;

        if (!email || !password) throw new Error("Invalid credentials");

        if (!emailRegex.test(email) || !passwordRegex.test(password))
          throw new Error("Invalid credentials");

        const user = await userController.get(email);

        if (!user) throw new Error("User with this email does not exist");

        const comparePasswords = await bcryptjs.compare(
          password,
          user.hashPassword
        );

        if (!comparePasswords)
          throw new Error("Email or Password is incorrect");

        return {
          id: user.id.toString(),
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

        const { firstName, lastName, email, password, confirmPassword } =
          credentials;

        if (!firstName || !lastName || !email || !password || !confirmPassword)
          throw new Error("Invalid credentials");

        if (
          !nameRegex.test(`${firstName} ${lastName}`) ||
          !emailRegex.test(email) ||
          !passwordRegex.test(password) ||
          !passwordRegex.test(confirmPassword)
        )
          throw new Error("Invalid credentials");

        const comparePasswords = password.localeCompare(
          confirmPassword,
          undefined,
          { sensitivity: "base" }
        );

        if (comparePasswords !== 0) throw new Error("Invalid credentials");

        const searchUser = await userController.exists(email);

        if (searchUser) throw new Error("User with this email already exists");

        const newUser = await userController.create({
          firstName,
          lastName,
          email,
          password,
        });

        if (!newUser) throw new Error("Something went wrong. Please try again");

        return {
          id: newUser.id.toString(),
          name: `${newUser.firstName} ${newUser.lastName}`,
          email: newUser.email,
        } as UserAuth;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
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
