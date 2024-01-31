import DbConnector from "./DbConnector";
import { IProject } from "@/lib/interfaces";
import { projectFormSchema } from "@/lib/interfaces/form-schemas";
import { ProjectFormValues } from "@/lib/interfaces/form-values";

class ProjectController extends DbConnector {
  constructor() {
    super();
  }

  public validate(project: ProjectFormValues) {
    return projectFormSchema.safeParse(project).success;
  }

  public async getList(userId: string): Promise<IProject[]> {
    try {
      return await this.prisma.project.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          name: true,
          color: true,
        },
        orderBy: [{ name: "asc" }],
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async get(
    userId: string,
    projectId: string
  ): Promise<{
    tasks: {
      labels: {
        id: string;
        name: string;
      }[];
      id: string;
      name: string;
      important: boolean;
      description: string;
      dueDate: Date;
      completed: boolean;
    }[];
    id: string;
    color: string;
    name: string;
  } | null> {
    try {
      const project = await this.prisma.project.findUnique({
        where: {
          id: projectId,
          userId: userId,
        },
        select: {
          id: true,
          name: true,
          color: true,
          tasks: {
            select: {
              id: true,
              name: true,
              description: true,
              important: true,
              completed: true,
              dueDate: true,
              labels: {
                select: {
                  label: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
            orderBy: [{ dueDate: "asc" }],
          },
        },
      });

      if (!project) return null;

      return {
        ...project,
        tasks: project.tasks.map(({ labels, ...restTask }) => ({
          ...restTask,
          labels: labels.map(({ label }) => ({ ...label })),
        })),
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async create(
    userId: string,
    newProject: ProjectFormValues
  ): Promise<IProject | null> {
    try {
      return await this.prisma.project.create({
        data: {
          ...newProject,
          userId: userId,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async update(
    userId: string,
    project: IProject
  ): Promise<IProject | null> {
    try {
      return await this.prisma.project.update({
        where: {
          id: project.id,
          userId: userId,
        },
        data: {
          name: project.name,
          color: project.color,
        },
        select: {
          id: true,
          name: true,
          color: true,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async delete(
    userId: string,
    projectId: string
  ): Promise<IProject | null> {
    try {
      const projectToDelete = await this.prisma.project.findUnique({
        where: {
          id: projectId,
          userId: userId,
        },
        include: {
          tasks: {
            include: {
              labels: true,
            },
          },
        },
      });

      if (!projectToDelete) throw new Error("Project not found");

      const labelsToDelete = projectToDelete.tasks.flatMap(
        (task) => task.labels
      );

      await this.prisma.$transaction([
        ...labelsToDelete.map((label) =>
          this.prisma.taskWithLabel.deleteMany({
            where: {
              id: label.id,
            },
          })
        ),
        this.prisma.task.deleteMany({
          where: {
            projectId: projectToDelete.id,
          },
        }),
      ]);

      return await this.prisma.project.delete({
        where: {
          id: projectToDelete.id,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

const projectController = new ProjectController();
export default projectController;
