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

  public async getList(user_id: string): Promise<IProject[]> {
    try {
      return await this.prisma.project.findMany({
        where: {
          user_id: user_id,
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
    user_id: string,
    project_id: string
  ): Promise<IProjectDetails | null> {
    try {
      const project = await this.prisma.project.findUnique({
        where: {
          id: project_id,
          user_id: user_id,
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
              due_date: true,
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
          labels: labels.map(({ label }) => ({ ...label })),
        })),
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async create(
    user_id: string,
    newProject: IProjectFormValues
  ): Promise<IProject | null> {
    try {
      return await this.prisma.project.create({
        data: {
          ...newProject,
          user_id: user_id,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async update(
    user_id: string,
    project: IProject
  ): Promise<IProject | null> {
    try {
      return await this.prisma.project.update({
        where: {
          id: project.id,
          user_id: user_id,
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
    user_id: string,
    project_id: string
  ): Promise<IProject | null> {
    try {
      const projectToDelete = await this.prisma.project.findUnique({
        where: {
          id: project_id,
          user_id: user_id,
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
            project_id: projectToDelete.id,
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
