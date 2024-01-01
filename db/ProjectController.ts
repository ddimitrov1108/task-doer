import { hexColorRegex, sectionNameRegex } from "@/lib/regex";
import DbConnector from "./DbConnector";

interface ICreateProject {
  name: string;
  color: string;
  uid: number;
}

interface IUpdateProject extends ICreateProject {
  id: number;
}

interface IValidateProject {
  name: string | null | undefined;
  color: string | null | undefined;
}

interface IProject {
  id: number;
  name: string;
  color: string;
}

class ProjectController extends DbConnector {
  constructor() {
    super();
  }

  public validate(project: IValidateProject): boolean {
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

  public async getAll(userId: number): Promise<IProject[]> {
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
  ): Promise<IProject | null> {
    return null;
  }

  public async create(newProject: ICreateProject): Promise<IProject | null> {
    try {
      return await this.prisma.project.create({
        data: newProject,
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async update(project: IUpdateProject): Promise<IProject | null> {
    try {
      return await this.prisma.project.update({
        where: {
          id: project.id,
          uid: project.uid,
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
