import Label from "@/components/forms/formik/FormLabel";
import { ITask } from "@/lib/interfaces";
import { formatDate, getDueDateText } from "@/lib/utils";
import { isPast } from "date-fns";

interface Props {
  task: ITask;
}

const TaskDetails = ({ task }: Props) => {
  const dueDate = getDueDateText(task.dueDate);

  return (
    <div className="grid gap-6">
      <div>
        <Label className="mb-1 text-main" htmlFor="task-name" label="Task Name:" />
        <h1 id="task-name" className="font-medium text-light">
          {task.name}
        </h1>
      </div>

      <div>
        <Label
          className="mb-1 text-main"
          htmlFor="task-description"
          label="Task Description:"
        />
        <p id="task-description" className="font-medium text-light">
          {task.description}
        </p>
      </div>

      <div>
        <Label className="mb-1 text-main" htmlFor="task-due-date" label="Due Date:" />
        <h1 id="task-due-date" className="font-medium text-light">
          <>
            {dueDate === "Today" || dueDate === "Tomorrow"
              ? dueDate
              : formatDate(task.dueDate)}
          </>
        </h1>
      </div>

      <div>
        <Label className="mb-2 text-main" htmlFor="task-status" label="Task Status:" />
        <div id="task-status" className="flex items-center gap-2 flex-wrap font-medium">
          {isPast(task.dueDate) ? (
            <span className="rounded-full py-1.5 px-4 text-sm border-error-main bg-error-main/20 text-error-main">
              Past Due
            </span>
          ) : null}

          {task.important ? (
            <span className="rounded-full py-1.5 px-4 text-sm border-warning-main bg-warning-main/20 text-warning-main">
              Important
            </span>
          ) : null}

          {task.completed ? (
            <span className="rounded-full py-1.5 px-4 text-sm border-success-main bg-success-main/20 text-success-main">
              Completed
            </span>
          ) : (
            <span className="rounded-full py-1.5 px-4 text-sm border-primary-main bg-primary-main/20 text-primary-main">
              Active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
export default TaskDetails;
