import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { emailRegex, nameRegex, passwordRegex } from "./regex";
import bcryptjs from "bcryptjs";
import { userController } from "@/db";
import { IUserSession, IUserData } from "./interfaces";

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
          user.hash_password
        );

        if (!comparePasswords)
          throw new Error("Email or Password is incorrect");

        return {
          id: user.id.toString(),
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        } as User;
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

        const { first_name, last_name, email, password, confirmPassword } =
          credentials;

        if (
          !first_name ||
          !last_name ||
          !email ||
          !password ||
          !confirmPassword
        )
          throw new Error("Invalid credentials");

        if (
          !nameRegex.test(`${first_name} ${last_name}`) ||
          !emailRegex.test(email) ||
          !passwordRegex.test(password) ||
          !passwordRegex.test(confirmPassword)
        )
          throw new Error("Invalid credentials");

        const isEmailTaken = await userController.exists(email);

        if (isEmailTaken)
          throw new Error("User with this email already exists");

        const user = await userController.create({
          first_name,
          last_name,
          email,
          password,
        });

        if (!user) throw new Error("Something went wrong. Please try again");

        return {
          id: user.id.toString(),
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
        } as User;
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

export const getUserFromServerSession = async (): Promise<IUserData | null> => {
  const session: IUserSession | null = await getServerSession(authConfig);

  return !session ||
    !session.user ||
    !session.user.id ||
    !session.user.name ||
    !session.user.email
    ? null
    : {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      };
};
