"use client";

import { TaskContext } from "@/components/context/TaskContext";
import Label from "@/components/forms/formik/Label";
import AtSign from "@/components/ui/AtSign";
import Chip from "@/components/ui/Chip";
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
    <div className="w-full grid gap-6">
      <div>
        <div className="flex items-center justify-between">
          <Label className="mb-1 text-main" htmlFor="task-name" label="Name:" />

          <TaskInteractiveButtons task={taskContext?.task} />
        </div>

        <h1 id="task-name" className="font-medium text-light">
          {taskContext.task.name}
        </h1>
      </div>

      {taskContext.task.description ? (
        <div className="w-full">
          <Label
            className="mb-1 text-main"
            htmlFor="task-description"
            label="Description:"
          />
          <div className="min-w-full overflow-hidden break-all">
            <p id="task-description" className="font-medium text-light">
              {taskContext.task.description}
            </p>
          </div>
        </div>
      ) : null}

      <div>
        <Label
          className="mb-1 text-main"
          htmlFor="task-labels"
          label="Labels:"
        />

        <div
          id="task-labels"
          className="w-full flex items-center gap-1 flex-wrap max-h-[380px] styled-overflow overflow-auto"
        >
          {taskContext?.task?.labels?.map((label) => (
            <Chip key={label.id} title={label.name} prepEndIcon={<AtSign />} />
          ))}
        </div>
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
              : formatDate(taskContext.task.dueDate)}
          </>
        </h1>
      </div>

      <div>
        <Label
          className="mb-2 text-main"
          htmlFor="task-status"
          label="Status:"
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
