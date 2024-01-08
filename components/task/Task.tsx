"use client";

import { cn } from "@/lib/utils";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { enUS } from "date-fns/locale";
import { AtSign, BookText, Check, Star } from "lucide-react";
import { Chip, IconButton } from "../ui";
import Link from "next/link";
import { MouseEvent } from "react";
import { ITask } from "@/lib/interfaces";
import { TaskLabelsList } from "./components";

interface Props {
  task: ITask;
}

const Task = ({ task }: Props) => {
  const isPastDue = isPast(task.dueDate);

  const getDueDateText = () => {
    if (isToday(task.dueDate)) return "Today";
    if (isTomorrow(task.dueDate)) return "Tomorrow";
    return format(task.dueDate, "EEE, d MMM, yy", { locale: enUS });
  };

  const onTaskClickHandler = () => {
    alert(1);
  };
  const onCompletedHandler = () => alert("completed");
  const onImportantHandler = () => alert("important");

  return (
    <div
      onClick={onTaskClickHandler}
      className="transition-all cursor-pointer group flex gap-2 items-start bg-black-main hover:bg-black-main/80 p-2 border border-transparent border-b-black-light/20 last:border-b-transparent first:rounded-t-md last:rounded-b-md"
    >
      <div className="p-2">
        <button
          className={cn(
            "text-base transition-all p-0.5 w-fit h-fit min-w-fit min-h-fit rounded-full grid items-center justify-center border border-black-light/20",
            task.completed
              ? "text-black-main bg-success-main border-success-main"
              : "text-transparent hover:text-success-main"
          )}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            onCompletedHandler();
          }}
        >
          <Check size={16} />
        </button>
      </div>

      <div className="w-full grid gap-1">
        <div className="w-full flex justify-between items-center">
          <div className="grow grid">
            <h1
              className={cn(
                "transition-all font-[500] w-full max-w-[400px] truncate ...",
                task.completed ? "line-through text-main" : "text-light"
              )}
            >
              {task.name}
            </h1>

            <div className="flex items-center gap-1">
              <div
                className={cn(
                  "max-w-fit max-h-fit text-xs xxs:text-sm",
                  isPastDue ? "text-error-main" : "text-primary-main"
                )}
              >
                {getDueDateText()}
              </div>
              {task.description && (
                <>
                  <span className="text-main">&#8226;</span>
                  <BookText size={14} className="text-sm text-main" />
                </>
              )}
            </div>
          </div>

          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-fit flex items-center"
          >
            <IconButton
              className={cn(
                "p-1 transition-all text-xl",
                task.important
                  ? "text-warning-main"
                  : "text-dark hover:text-main"
              )}
              onClick={onImportantHandler}
            >
              <Star />
            </IconButton>
          </div>
        </div>

        <TaskLabelsList labels={task.labels} />
      </div>
    </div>
  );
};
export default Task;
