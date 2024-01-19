import { TaskFormValues, taskFormSchema } from "@/lib/form-schemas";
import DbConnector from "./DbConnector";

class TaskController extends DbConnector {
  constructor() {
    super();
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
          due_date: task.due_date,
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
}

const taskController = new TaskController();
export default taskController;
