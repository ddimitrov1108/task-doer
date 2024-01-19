import { TaskFormValues, taskFormSchema } from "@/lib/form-schemas";
import DbConnector from "./DbConnector";
import { ITask } from "@/lib/interfaces";
import TasksLists from "@/components/task/TasksLists";

class TaskController extends DbConnector {
  constructor() {
    super();
  }

  public async exists(user_id: string, task_id: string): Promise<boolean> {
    try {
      return !!(await this.prisma.task.count({
        where: {
          id: task_id,
          user_id,
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

  public async get(user_id: string, task_id: string) {
    try {
      const task = await this.prisma.task.findFirst({
        where: {
          id: task_id,
          user_id,
        },
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
    user_id: string,
    project_id: string | null,
    task: TaskFormValues
  ) {
    try {
      const newTask = await this.prisma.task.create({
        data: {
          user_id,
          project_id: project_id,
          name: task.name,
          description: task.description || undefined,
          completed: task.completed,
          important: task.important,
          due_date: new Date(task.due_date),
        },
      });

      if (task.labels.length) {
        await this.prisma.$transaction(
          task.labels.map((label) =>
            this.prisma.taskWithLabel.create({
              data: {
                task_id: newTask.id,
                label_id: label.id,
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
    user_id: string,
    task_id: string,
    completed: boolean
  ) {
    try {
      return await this.prisma.task.update({
        where: {
          id: task_id,
          user_id,
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
    user_id: string,
    task_id: string,
    important: boolean
  ) {
    try {
      return await this.prisma.task.update({
        where: {
          id: task_id,
          user_id,
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

  public async update(user_id: string, task: ITask) {
    try {
      if (!this.exists(user_id, task.id)) throw new Error("Task not found");

      const updatedTask = await this.prisma.task.update({
        where: {
          id: task.id,
        },
        data: {
          name: task.name,
          description: task.description || undefined,
          due_date: new Date(task.due_date),
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
        const existingLabelIDs = updatedTask.labels.map((l) => l.label_id);

        console.log("incoming labels");
        console.log(incomingLabelIDs);
        console.log("existing in db labels");
        console.log(existingLabelIDs);

        if (
          incomingLabelIDs.length !== existingLabelIDs.length ||
          !incomingLabelIDs.every((lid) => existingLabelIDs.includes(lid))
        ) {
          await this.prisma.taskWithLabel.deleteMany({
            where: {
              task_id: updatedTask.id,
              NOT: {
                label_id: {
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
                task_id: updatedTask.id,
                label_id: label.id,
              },
            });
          } catch (e) {}
        }
      } else {
        await this.prisma.taskWithLabel.deleteMany({
          where: {
            task_id: updatedTask.id,
          },
        });
      }

      return updatedTask;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async delete(user_id: string, task_id: string) {
    try {
      const deletedTask = await this.prisma.task.delete({
        where: {
          id: task_id,
          user_id,
        },
        select: {
          id: true,
        },
      });

      if (!deletedTask) throw new Error("Task failed to delete");

      await this.prisma.taskWithLabel.deleteMany({
        where: {
          task_id: deletedTask.id,
        },
      });

      return deletedTask;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

const taskController = new TaskController();
export default taskController;
