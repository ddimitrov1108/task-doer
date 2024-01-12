import {
  ILabel,
  ILabelDetails,
  ILabelFormValues,
  IValidateLabelValues,
} from "@/lib/interfaces";
import DbConnector from "./DbConnector";
import { sectionNameRegex } from "@/lib/regex";
import { z } from "zod";

class LabelController extends DbConnector {
  constructor() {
    super();
  }

  private formatName(labelName: string): string {
    return labelName.toLowerCase().replace(/\s+/g, "-");
  }

  public validate(label: IValidateLabelValues): boolean {
    const schema = z
      .object({
        name: z.string().regex(sectionNameRegex),
      })
      .safeParse(label);

    return schema.success;
  }

  public async exists(user_id: string, labelName: string): Promise<boolean> {
    const formattedName: string = this.formatName(labelName);

    try {
      return !!(await this.prisma.label.count({
        where: {
          user_id: user_id,
          name: formattedName,
        },
      }));
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async getList(user_id: string): Promise<ILabel[]> {
    try {
      return await this.prisma.label.findMany({
        where: {
          user_id: user_id,
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
    user_id: string,
    label_id: string
  ): Promise<ILabelDetails | null> {
    try {
      const label = await this.prisma.label.findFirst({
        where: {
          id: label_id,
          user_id: user_id,
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
                  repeat: true,
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
    user_id: string,
    newLabel: ILabelFormValues
  ): Promise<ILabel | null> {
    try {
      return await this.prisma.label.create({
        data: {
          ...newLabel,
          user_id: user_id,
          name: this.formatName(newLabel.name),
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async update(user_id: string, label: ILabel): Promise<ILabel | null> {
    try {
      return await this.prisma.label.update({
        where: {
          id: label.id,
          user_id: user_id,
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

  public async delete(
    user_id: string,
    label_id: string
  ): Promise<ILabel | null> {
    try {
      const labelToDelete = await this.prisma.label.findFirst({
        where: {
          id: label_id,
          user_id: user_id,
        },
        include: {
          tasks: true,
        },
      });

      if (!labelToDelete) return null;

      await this.prisma.taskWithLabel.deleteMany({
        where: {
          label_id: labelToDelete.id,
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
