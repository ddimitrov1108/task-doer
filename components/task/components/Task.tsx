"use client";

import { cn } from "@/lib/utils";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { enUS } from "date-fns/locale";
import { AtSign, Check, Star, ReceiptText } from "lucide-react";
import { MouseEvent, useContext } from "react";
import { ITask } from "@/lib/interfaces";
import Link from "next/link";
import Chip from "../../ui/Chip";
import TaskInteractiveButtons from "../../interactive-buttons/TaskInteractiveButtons";
import ButtonIcon from "../../ui/ButtonIcon";
import { TaskContext } from "../../context/TaskContext";

interface Props {
  task: ITask;
}

const getDueDateText = (due_date: Date): string => {
  if (isToday(due_date)) return "Today";
  if (isTomorrow(due_date)) return "Tomorrow";
  return format(due_date, "EEE, d MMM, yy", { locale: enUS });
};

const Task = ({ task }: Props) => {
  const taskContext = useContext(TaskContext);

  const isPastDue = isPast(task.due_date);
  const dueDate = getDueDateText(task.due_date);

  const onClickHandler = (e: React.MouseEvent) => {
    alert(1);
  };

  const onCompletedHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    taskContext?.setCompleted(task.id, !task.completed);
  };

  const onImportantHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    taskContext?.setImportant(task.id, !task.important);
  };

  return (
    <div
      onClick={onClickHandler}
      className="p-2.5 transition-all cursor-pointer group flex gap-4 items-start bg-black-main border border-transparent border-b-black-light/20 last:border-b-transparent first:rounded-t-md last:rounded-b-md"
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
              {dueDate}
            </div>
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
