import prisma from "@/lib/prisma";

export interface IProject {
  id: number;
  name: string;
  color: string | null;
}

const getProjects = async (userId: number) => {
  try {
    return await prisma.project.findMany({
      where: {
        uid: userId,
      },
      select: {
        id: true,
        name: true,
        color: true,
      },
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

export { getProjects };
