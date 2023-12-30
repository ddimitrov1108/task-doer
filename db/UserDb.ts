import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hashPassword: string;
  updated_at: Date;
  created_at: Date;
}

interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const getUser = async (email: string): Promise<IUser | null> => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

const createUser = async (user: ICreateUser): Promise<IUser | null> => {
  try {
    const hashPassword = await bcryptjs.hash(
      user.password,
      Number(process.env.HASH_SALT)
    );

    return await prisma.user.create({
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
};

export { getUser, createUser };
