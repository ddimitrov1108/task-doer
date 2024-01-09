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
      return !!(await this.prisma.user.findUnique({
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

  public async create(user: INewUser): Promise<UserReturnType> {
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

export default UserController;
