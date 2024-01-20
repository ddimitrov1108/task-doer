import {
  SignInFormValues,
  SignUpFormValues,
  signInFormSchema,
  signUpFormSchema,
} from "@/lib/form-schemas";
import DbConnector from "./DbConnector";
import bcryptjs from "bcryptjs";

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
    return signInFormSchema.safeParse(values).success;
  }

  public validateSignUp(values: SignUpFormValues) {
    return signUpFormSchema.safeParse(values).success;
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
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          hash_password: true,
        },
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

  public async resetPasswordByToken(user_id: string, password: string) {
    try {
      const hash_password = await bcryptjs.hash(
        password,
        Number(process.env.HASH_SALT)
      );

      await this.prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          hash_password,
          reset_password_token: null,
          reset_password_token_expiry: null,
        },
        select: {
          id: true,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async getByToken(reset_password_token: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { reset_password_token },
        select: {
          id: true,
          reset_password_token: true,
          reset_password_token_expiry: true,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async resetPasswordToken(
    user_id: string,
    reset_password_token: string,
    reset_password_token_expiry: Date
  ) {
    try {
      await this.prisma.user.update({
        where: {
          id: user_id,
        },
        data: {
          reset_password_token: reset_password_token,
          reset_password_token_expiry: reset_password_token_expiry,
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
