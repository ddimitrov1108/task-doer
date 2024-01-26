"use client";

import { TaskContext } from "@/components/context/TaskContext";
import Label from "@/components/forms/formik/FormLabel";
import { ITask } from "@/lib/interfaces";
import { formatDate, getDueDateText } from "@/lib/utils";
import { isPast } from "date-fns";
import dynamic from "next/dynamic";
import { useContext } from "react";

const TaskInteractiveButtons = dynamic(
  () => import("../../interactive-buttons/TaskInteractiveButtons")
);

const TaskDetails = () => {
  const taskContext = useContext(TaskContext);
  const dueDate = taskContext?.task
    ? getDueDateText(taskContext?.task.dueDate)
    : null;

  return taskContext?.task ? (
    <div className="grid gap-6">
      <div>
        <div className="flex items-center justify-between">
          <Label
            className="mb-1 text-main"
            htmlFor="task-name"
            label="Task Name:"
          />

          <TaskInteractiveButtons task={taskContext?.task} />
        </div>

        <h1 id="task-name" className="font-medium text-light">
          {taskContext?.task.name}
        </h1>
      </div>

      <div>
        <Label
          className="mb-1 text-main"
          htmlFor="task-description"
          label="Task Description:"
        />
        <p id="task-description" className="font-medium text-light">
          {taskContext?.task.description}
        </p>
      </div>

      <div>
        <Label
          className="mb-1 text-main"
          htmlFor="task-due-date"
          label="Due Date:"
        />
        <h1 id="task-due-date" className="font-medium text-light">
          <>
            {dueDate === "Today" || dueDate === "Tomorrow"
              ? dueDate
              : formatDate(taskContext?.task.dueDate)}
          </>
        </h1>
      </div>

      <div>
        <Label
          className="mb-2 text-main"
          htmlFor="task-status"
          label="Task Status:"
        />
        <div
          id="task-status"
          className="flex items-center gap-2 flex-wrap font-medium"
        >
          {isPast(taskContext?.task.dueDate) ? (
            <span className="rounded-full py-1 px-2 text-sm border-error-main bg-error-main/20 text-error-main">
              Past Due
            </span>
          ) : null}

          {taskContext?.task.important ? (
            <span className="rounded-full py-1 px-2 text-sm border-warning-main bg-warning-main/20 text-warning-main">
              Important
            </span>
          ) : null}

          {taskContext?.task.completed ? (
            <span className="rounded-full py-1 px-2 text-sm border-success-main bg-success-main/20 text-success-main">
              Completed
            </span>
          ) : (
            <span className="rounded-full py-1 px-2 text-sm border-primary-main bg-primary-main/20 text-primary-main">
              Active
            </span>
          )}
        </div>
      </div>
    </div>
  ) : null;
};
export default TaskDetails;
