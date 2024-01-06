import bcryptjs from "bcryptjs";
import DbConnector from "./DbConnector";
import { INewUser, IUser } from "@/lib/interfaces";

type UserReturnType = IUser | null;

class UserController extends DbConnector {
  constructor() {
    super();
  }

  public async exists(email: string): Promise<boolean> {
    try {
      return !!(await this.prisma.user.count({
        where: { email },
      }));
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async get(email: string): Promise<UserReturnType> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async create(newUser: INewUser): Promise<UserReturnType> {
    try {
      const hashPassword = await bcryptjs.hash(
        newUser.password,
        Number(process.env.HASH_SALT)
      );

      return await this.prisma.user.create({
        data: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          hashPassword,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export default UserController;
