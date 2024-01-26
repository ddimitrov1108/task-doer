"use client";

import { cn, getDueDateText } from "@/lib/utils";
import { isPast } from "date-fns";
import { AtSign, Check, Star, ReceiptText } from "lucide-react";
import { useContext, useEffect } from "react";
import { ITask } from "@/lib/interfaces";
import Link from "next/link";
import Chip from "../../ui/Chip";
import ButtonIcon from "../../ui/ButtonIcon";
import { TaskContext } from "../../context/TaskContext";
import dynamic from "next/dynamic";

const TaskInteractiveButtons = dynamic(
  () => import("../../interactive-buttons/TaskInteractiveButtons")
);

interface Props {
  task: ITask;
}

const Task = ({ task }: Props) => {
  const taskContext = useContext(TaskContext);

  const isPastDue = isPast(task.dueDate);
  const dueDate = getDueDateText(task.dueDate);

  const onClickHandler = () => {
    if (taskContext?.openDetails && taskContext?.task?.id === task.id) return;

    taskContext?.setTask(task);
    taskContext?.setOpenDetails(true);
  };

  const onCompletedHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (taskContext?.openDetails) taskContext?.setOpenDetails(false);
    await taskContext?.setCompleted(task.id, !task.completed);
  };

  const onImportantHandler = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await taskContext?.setImportant(task.id, !task.important);
  };

  useEffect(() => {
    if (taskContext?.openDetails && taskContext?.task?.id === task.id)
      taskContext?.setTask(task);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task, taskContext?.openDetails]);

  return (
    <div
      onClick={onClickHandler}
      className="group p-2.5 cursor-pointer flex gap-4 items-start bg-black-main hover:bg-primary-light/[0.08] border border-transparent border-b-black-light/20 last:border-b-transparent first:rounded-t-md last:rounded-b-md"
    >
      <ButtonIcon
        onClick={onCompletedHandler}
        className={cn(
          "p-1 min-w-fit min-h-fit border border-black-light/40 rounded-full",
          task.completed
            ? "border-success-main bg-success-main/20 text-success-main"
            : "text-black-main hover:text-success-main hover:border-black-light"
        )}
      >
        <Check size={16} />
      </ButtonIcon>

      <div className="w-full grid gap-1">
        <div>
          <h1
            className={cn(
              "transition-all font-[500] w-full max-w-[400px] truncate ...",
              task.completed ? "line-through text-main" : "text-light"
            )}
          >
            {task.name}
          </h1>

          <div className="flex items-center gap-1">
            <span
              className={cn(
                "max-w-fit max-h-fit text-xs xxs:text-sm",
                isPastDue ? "text-error-main" : "text-primary-main"
              )}
            >
              {dueDate}
            </span>

            {task.description && (
              <>
                <span className="text-main">&#8226;</span>
                <ReceiptText size={16} className="text-main" />
              </>
            )}
          </div>
        </div>

        {task.labels && !!task.labels.length && (
          <div className="flex w-full items-center gap-1 py-1 overflow-auto styled-overflow-horizontal">
            {task.labels.map((label) => (
              <Link key={label.id} href={`/todo/label/${label.id}`}>
                <Chip title={label.name} prepEndIcon={<AtSign size={16} />} />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-start gap-1">
        <ButtonIcon
          onClick={onImportantHandler}
          className={cn(
            "transition-all min-w-fit min-h-fit p-0.5",
            task.important ? "text-warning-main" : "text-main hover:text-light"
          )}
        >
          <Star size={20} />
        </ButtonIcon>

        <div
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
        >
          <TaskInteractiveButtons task={task} />
        </div>
      </div>
    </div>
  );
};
export default Task;
