import prisma from "@/lib/prisma";

export interface IProject {
  id: number;
  name: string;
  color: string;
}

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
    return [];
  }
};

const editProject = async (projectToUpdate: IProject) => {
  try {
    return await prisma.project.update({
      where: {
        id: projectToUpdate.id,
      },
      data: {
        name: projectToUpdate.name,
        color: projectToUpdate.color,
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

export { getProjects };
