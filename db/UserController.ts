import DbConnector from "./DbConnector";
import { SignInFormValues, SignUpFormValues } from "@/lib/interfaces";
import { emailRegex, nameRegex, passwordRegex } from "@/lib/regex";
import bcryptjs from "bcryptjs";
import { z } from "zod";

type NewUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

class UserController extends DbConnector {
  constructor() {
    super();
  }

  public validateSignIn(values: SignInFormValues) {
    return z
      .object({
        email: z.string().regex(emailRegex),
        password: z.string().regex(passwordRegex),
      })
      .safeParse(values).success;
  }

  public validateSignUp(values: SignUpFormValues) {
    return (
      values?.password === values?.confirmPassword &&
      z
        .object({
          first_name: z.string().regex(nameRegex),
          last_name: z.string().regex(nameRegex),
          email: z.string().regex(emailRegex),
          password: z.string().regex(passwordRegex),
          confirmPassword: z.string().regex(passwordRegex),
        })
        .safeParse(values).success
    );
  }

  public async exists(email: string) {
    try {
      return !!(await this.prisma.user.findUnique({
        where: { email },
        select: { email: true },
      }));
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async get(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async create(user: NewUser) {
    try {
      const hash_password = await bcryptjs.hash(
        user.password,
        Number(process.env.HASH_SALT)
      );

      return await this.prisma.user.create({
        data: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          hash_password,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

const userController = new UserController();
export default userController;
