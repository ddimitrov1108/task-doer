import {
  ILabel,
  ILabelDetails,
  ILabelFormValues,
  IValidateLabelValues,
} from "@/lib/interfaces";
import DbConnector from "./DbConnector";
import { sectionNameRegex } from "@/lib/regex";

class LabelController extends DbConnector {
  constructor() {
    super();
  }

  private formatName(labelName: string): string {
    return labelName.toLowerCase().replace(/\s+/g, "-");
  }

  public validate(label: IValidateLabelValues): boolean {
    try {
      if (!label.name) return false;

      return sectionNameRegex.test(label.name);
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public async exists(userId: number, labelName: string): Promise<boolean> {
    const formattedName: string = this.formatName(labelName);

    try {
      return !!(await this.prisma.label.count({
        where: {
          uid: userId,
          name: formattedName,
        },
      }));
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async getList(userId: number): Promise<ILabel[]> {
    try {
      return await this.prisma.label.findMany({
        where: {
          uid: userId,
        },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async get(
    userId: number,
    labelId: number
  ): Promise<ILabelDetails | null> {
    try {
      const label = await this.prisma.label.findFirst({
        where: {
          id: labelId,
          uid: userId,
        },
        select: {
          id: true,
          name: true,
          tasks: {
            select: {
              task: {
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
          },
        },
      });

      if (!label) return null;

      return {
        ...label,
        tasks: label.tasks.map(({ task, ...restTask }) => ({
          ...restTask,
          ...task,
          labels: task.labels.map(({ label }) => ({ ...label })),
        })),
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async create(
    userId: number,
    newLabel: ILabelFormValues
  ): Promise<ILabel | null> {
    try {
      return await this.prisma.label.create({
        data: {
          ...newLabel,
          uid: userId,
          name: this.formatName(newLabel.name),
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async update(userId: number, label: ILabel): Promise<ILabel | null> {
    try {
      return await this.prisma.label.update({
        where: {
          id: label.id,
          uid: userId,
        },
        data: {
          name: this.formatName(label.name),
        },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async delete(userId: number, labelId: number): Promise<ILabel | null> {
    try {
      const labelToDelete = await this.prisma.label.findFirst({
        where: {
          id: labelId,
          uid: userId,
        },
        include: {
          tasks: true,
        },
      });

      if (!labelToDelete) return null;

      await this.prisma.taskWithLabel.deleteMany({
        where: {
          labelId: labelToDelete.id,
        },
      });

      return this.prisma.label.delete({
        where: {
          id: labelToDelete.id,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export default LabelController;
