"use client";

import { cn } from "@/lib/utils";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { enUS } from "date-fns/locale";
import { AtSign, Check, MoreVertical, Star, StickyNote } from "lucide-react";
import { MouseEvent, useState } from "react";
import { ITask } from "@/lib/interfaces";
import Link from "next/link";
import { Chip } from "../ui";

interface Props {
  task: ITask;
}

const Task = ({ task }: Props) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [important, setImportant] = useState<boolean>(false);
  const isPastDue = isPast(task.due_date);

  const getDueDateText = () => {
    if (isToday(task.due_date)) return "Today";
    if (isTomorrow(task.due_date)) return "Tomorrow";
    return format(task.due_date, "EEE, d MMM, yy", { locale: enUS });
  };

  const onClickHandler = (e: MouseEvent) => {
    alert(1);
  };

  const onCompletedHandler = (e: MouseEvent) => {
    e.stopPropagation();
    setCompleted(!completed);
  };

  const onImportantHandler = (e: MouseEvent) => {
    e.stopPropagation();
    setImportant(!important);
  };

  return (
    <div
      onClick={onClickHandler}
      className="p-2 transition-all cursor-pointer group flex gap-4 items-start bg-black-main border border-transparent border-b-black-light/20 last:border-b-transparent first:rounded-t-md last:rounded-b-md"
    >
      <button
        onClick={onCompletedHandler}
        className={cn(
          "transition-all min-w-fit min-h-fit p-1 border border-black-light/40 rounded-full",
          completed
            ? "border-success-main bg-success-main/20 text-success-main"
            : "text-black-main hover:text-success-main hover:border-black-light"
        )}
      >
        <Check size={16} />
      </button>

      <div className="w-full grid gap-1">
        <div className="grid">
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
                <StickyNote size={14} className="text-sm text-main" />
              </>
            )}
          </div>
        </div>

        {task.labels && !!task.labels.length && (
          <div className="flex w-full items-center gap-1 py-1 overflow-auto styled-overflow-horizontal">
            {task.labels.map((label) => (
              <Link key={label.id} href={`/todo/label/${label.id}`}>
                <Chip
                  title={label.name}
                  prepEndIcon={<AtSign size={16} />}
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                />
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-start gap-1">
        <button
          onClick={onImportantHandler}
          className={cn(
            "transition-all min-w-fit min-h-fit p-0.5",
            important ? "text-warning-main" : "text-main hover:text-light"
          )}
        >
          <Star size={20} />
        </button>

        <button
          onClick={onImportantHandler}
          className={cn(
            "transition-all min-w-fit min-h-fit p-0.5 text-main hover:text-light"
          )}
        >
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};
export default Task;
