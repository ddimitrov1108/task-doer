import { TaskFormValues } from "@/lib/interfaces/form-values";
import DbConnector from "./DbConnector";
import { ITask } from "@/lib/interfaces";
import { taskFormSchema } from "@/lib/interfaces/form-schemas";

class TaskController extends DbConnector {
  constructor() {
    super();
  }

  public async exists(userId: string, taskId: string): Promise<boolean> {
    try {
      return !!(await this.prisma.task.count({
        where: {
          id: taskId,
          userId,
        },
      }));
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public validate(task: TaskFormValues) {
    return taskFormSchema.safeParse(task).success;
  }

  public async getList(
    userId: string = "",
    projectId = null,
    options: {
      today?: boolean;
      planned?: boolean;
      all?: boolean;
      completed?: boolean;
      important?: boolean;
    } | null = null
  ) {
    if (!userId) return [];

    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const tomorrowDate = new Date(todayDate);
    tomorrowDate.setDate(todayDate.getDate() + 1);

    let compiledOptions =
      !options || options?.all
        ? {}
        : options?.today
        ? { dueDate: { gte: todayDate, lt: tomorrowDate } }
        : options?.planned
        ? { dueDate: { gte: tomorrowDate } }
        : {
            projectId: projectId ? projectId : undefined,
            completed: options?.completed,
            important: options?.important,
          };

    try {
      const tasks = await this.prisma.task.findMany({
        where: {
          userId,
          ...compiledOptions,
        },
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
      });

      return tasks.map(({ labels, ...restTask }) => ({
        labels: labels.map(({ label }) => ({ ...label })),
        ...restTask,
      }));
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  public async get(userId: string, taskId: string) {
    try {
      const task = await this.prisma.task.findFirst({
        where: {
          id: taskId,
          userId,
        },
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
      });

      if (!task) return null;

      return {
        ...task,
        labels: task.labels.map(({ label }) => ({ ...label })),
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async create(
    userId: string,
    projectId: string | null,
    task: TaskFormValues
  ) {
    try {
      const newTask = await this.prisma.task.create({
        data: {
          userId,
          projectId: projectId,
          name: task.name,
          description: task.description || undefined,
          completed: task.completed,
          important: task.important,
          dueDate: new Date(task.dueDate),
        },
      });

      if (task.labels.length) {
        await this.prisma.$transaction(
          task.labels.map((label) =>
            this.prisma.taskWithLabel.create({
              data: {
                taskId: newTask.id,
                labelId: label.id,
              },
            })
          )
        );
      }

      return newTask;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async setCompleted(
    userId: string,
    taskId: string,
    completed: boolean
  ) {
    try {
      return await this.prisma.task.update({
        where: {
          id: taskId,
          userId,
        },
        data: {
          completed,
        },
        select: {
          id: true,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async setImportant(
    userId: string,
    taskId: string,
    important: boolean
  ) {
    try {
      return await this.prisma.task.update({
        where: {
          id: taskId,
          userId,
        },
        data: {
          important,
        },
        select: {
          id: true,
        },
      });
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async update(userId: string, task: ITask) {
    try {
      if (!this.exists(userId, task.id)) throw new Error("Task not found");

      const updatedTask = await this.prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          name: task.name,
          description: task.description || undefined,
          dueDate: new Date(task.dueDate),
          important: task.important,
          completed: task.completed,
        },
        select: {
          id: true,
          labels: true,
        },
      });

      if (!updatedTask) throw new Error("Task failed to update");

      if (task.labels.length) {
        const incomingLabelIDs = task.labels.map((l) => l.id);
        const existingLabelIDs = updatedTask.labels.map((l) => l.labelId);

        if (
          incomingLabelIDs.length !== existingLabelIDs.length ||
          !incomingLabelIDs.every((lid) => existingLabelIDs.includes(lid))
        ) {
          await this.prisma.taskWithLabel.deleteMany({
            where: {
              taskId: updatedTask.id,
              NOT: {
                labelId: {
                  in: incomingLabelIDs,
                },
              },
            },
          });
        }

        const labelsToAdd = task.labels.filter(
          (l) => !existingLabelIDs.includes(l.id)
        );

        for (const label of labelsToAdd) {
          try {
            await this.prisma.taskWithLabel.create({
              data: {
                taskId: updatedTask.id,
                labelId: label.id,
              },
            });
          } catch (e) {}
        }
      } else {
        await this.prisma.taskWithLabel.deleteMany({
          where: {
            taskId: updatedTask.id,
          },
        });
      }

      return updatedTask;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async delete(userId: string, taskId: string) {
    try {
      await this.prisma.taskWithLabel.deleteMany({
        where: {
          taskId,
        },
      });

      return await this.prisma.task.delete({
        where: {
          id: taskId,
          userId,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}

const taskController = new TaskController();
export default taskController;
