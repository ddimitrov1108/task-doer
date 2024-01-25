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
          hashPassword: true,
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
          hashPassword,
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
          hashPassword,
          resetPasswordToken: null,
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

  public async getByToken(resetPasswordToken: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { resetPasswordToken},
        select: {
          id: true,
          resetPasswordToken: true,
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
    resetPasswordToken: string,
    resetPasswordTokenExpiry: Date
  ) {
    try {
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          resetPasswordToken: resetPasswordToken,
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
