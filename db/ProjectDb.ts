import { INewProject, IProject } from "@/lib/interfaces";
import prisma from "@/lib/prisma";

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

const deleteProject = async (
  userId: number,
  projectId: number
): Promise<boolean> => {
  try {
    const projectToDelete = await prisma.project.findUnique({
      where: {
        id: projectId,
        uid: userId,
      },
      include: {
        tasks: {
          include: {
            labels: true,
          },
        },
      },
    });

    if (!projectToDelete) throw new Error("project not found");

    const labelsToDelete = projectToDelete.tasks.flatMap((task) => task.labels);

    await prisma.$transaction([
      ...labelsToDelete.map((label) =>
        prisma.taskWithLabel.deleteMany({
          where: {
            id: label.id,
          },
        })
      ),
      prisma.task.deleteMany({
        where: {
          pid: projectToDelete.id,
        },
      }),
      prisma.project.delete({
        where: {
          id: projectId,
        },
      }),
    ]);

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export { getProjects, deleteProject };
