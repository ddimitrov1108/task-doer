import { hexColorRegex, sectionNameRegex } from "@/lib/regex";
import DbConnector from "./DbConnector";
import {
  IProject,
  IProjectDetails,
  IProjectFormValues,
  IValidateProjectValues,
} from "@/lib/interfaces";

class ProjectController extends DbConnector {
  constructor() {
    super();
  }

  public validate(project: IValidateProjectValues): boolean {
    try {
      if (!project.name || !project.color) return false;

      return (
        sectionNameRegex.test(project.name) && hexColorRegex.test(project.color)
      );
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async getList(userId: number): Promise<IProject[]> {
    try {
      return await this.prisma.project.findMany({
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
  }

  public async get(
    userId: number,
    projectId: number
  ): Promise<IProjectDetails | null> {
    try {
      const project = await this.prisma.project.findFirst({
        where: {
          id: projectId,
          uid: userId,
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
          },
        },
      });

      if (!project) return null;

      return {
        ...project,
        tasks: project.tasks.map(({ labels, ...restTask }) => ({
          ...restTask,
          labels: labels.map((label) => ({
            id: label.label.id,
            name: label.label.name,
          })),
        })),
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async create(
    userId: number,
    newProject: IProjectFormValues
  ): Promise<IProject | null> {
    try {
      return await this.prisma.project.create({
        data: {
          ...newProject,
          uid: userId,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async update(
    userId: number,
    project: IProject
  ): Promise<IProject | null> {
    try {
      return await this.prisma.project.update({
        where: {
          id: project.id,
          uid: userId,
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
    userId: number,
    projectId: number
  ): Promise<IProject | null> {
    try {
      const projectToDelete = await this.prisma.project.findUnique({
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
            pid: projectToDelete.id,
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

export default ProjectController;
