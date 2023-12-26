import { IProject } from "@/lib/interfaces";
import prisma from "@/lib/prisma";
import { validateProjectValues } from "@/lib/utils";



const getProjects = async (userId: number): Promise<IProject[]> => {
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
};

const createProject = async (
  userId: number,
  project: { name: string; color: string }
): Promise<IProject | null> => {
  try {
    if (!validateProjectValues(project))
      throw new Error("Invalid fields. Failed to pass regex.");

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

const updateProject = async (
  userId: number,
  projectId: number,
  project: { name: string; color: string }
): Promise<IProject | null> => {
  try {
    if (!validateProjectValues(project))
      throw new Error("Invalid fields. Failed to pass regex.");

    return await prisma.project.update({
      where: {
        id: projectId,
        uid: userId,
      },
      data: {
        name: project.name,
        color: project.color,
      },
    });
  } catch (e) {
    console.error(e);
    return null;
  }
};

const deleteProject = async (projectToDelete: IProject) => {
  try {
  } catch (e) {
    console.error(e);
    return null;
  }
};

export { getProjects, createProject, updateProject, deleteProject };
