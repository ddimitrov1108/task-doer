import { INewProject, IProject } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { validateProjectValues } from "@/lib/utils";

const getProjects = async (userId: number): Promise<IProject[]> => {
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
    return [] as IProject[];
  }
};

const createProject = async (
  userId: number,
  project: INewProject
): Promise<IProject | null> => {
  try {
    if (!validateProjectValues(project)) throw new Error("Invalid fields.");

    return await prisma.project.create({
      data: {
        name: project.name,
        color: project.color,
        uid: userId,
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

export { getProjects, createProject };
