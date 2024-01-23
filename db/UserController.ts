import {
  SignInFormValues,
  SignUpFormValues,
  signInFormSchema,
  signUpFormSchema,
} from "@/lib/form-schemas";
import DbConnector from "./DbConnector";
import bcryptjs from "bcryptjs";

type NewUser = {
  firstName: string;
  lastName: string;
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
          firstName: true,
          lastName: true,
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
      const hashPassword= await bcryptjs.hash(
        user.password,
        Number(process.env.HASH_SALT)
      );

      return await this.prisma.user.create({
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          hash_password,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async resetPasswordByToken(userId: string, password: string) {
    try {
      const hashPassword= await bcryptjs.hash(
        password,
        Number(process.env.HASH_SALT)
      );

      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          hash_password,
          reset_password_token: null,
          resetPasswordTokenExpiry: null,
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
        where: { resetPasswordToken},
        select: {
          id: true,
          reset_password_token: true,
          resetPasswordTokenExpiry: true,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async resetPasswordToken(
    userId: string,
    reset_password_token: string,
    resetPasswordTokenExpiry: Date
  ) {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          reset_password_token: reset_password_token,
          resetPasswordTokenExpiry: resetPasswordTokenExpiry,
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
