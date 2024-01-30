import { ILabel } from "@/lib/interfaces";
import DbConnector from "./DbConnector";
import { LabelFormValues } from "@/lib/interfaces/form-values";
import { labelFormSchema } from "@/lib/interfaces/form-schemas";

class LabelController extends DbConnector {
  constructor() {
    super();
  }

  private formatName(labelName: string) {
    return labelName.toLowerCase().replace(/\s+/g, "-");
  }

  public validate(label: LabelFormValues) {
    return labelFormSchema.safeParse(label).success;
  }

  public async exists(userId: string, labelName: string) {
    const formattedName: string = this.formatName(labelName);

    try {
      return !!(await this.prisma.label.count({
        where: {
          userId: userId,
          name: formattedName,
        },
      }));
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async getList(userId: string) {
    try {
      return await this.prisma.label.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          name: true,
        },
        orderBy: [{ name: "asc" }],
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async get(userId: string, labelId: string) {
    try {
      const label = await this.prisma.label.findFirst({
        where: {
          id: labelId,
          userId: userId,
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

  public async create(userId: string, newLabel: LabelFormValues) {
    try {
      return await this.prisma.label.create({
        data: {
          ...newLabel,
          userId: userId,
          name: this.formatName(newLabel.name),
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async update(userId: string, label: ILabel) {
    try {
      return await this.prisma.label.update({
        where: {
          id: label.id,
          userId: userId,
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

  public async delete(userId: string, labelId: string) {
    try {
      const labelToDelete = await this.prisma.label.findFirst({
        where: {
          id: labelId,
          userId: userId,
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

const labelController = new LabelController();
export default labelController;
