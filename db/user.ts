import bcryptjs from "bcryptjs";
import prisma from "@/lib/prisma";

interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const getUser = async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

const createUser = async (user: ICreateUser) => {
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
