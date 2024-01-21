"use client";

import { ITask } from "@/lib/interfaces";
import { isFuture, isPast, isToday } from "date-fns";
import dynamic from "next/dynamic";
import TaskSearchForm from "../forms/TaskSearchForm";
import { useSearchParams } from "next/navigation";

const CompletedTasksStatus = dynamic(
  () => import("./components/status/CompletedTasksStatus")
);
const NotFoundTasksStatus = dynamic(
  () => import("./components/status/NotFoundTasksStatus")
);
const ListOfTasks = dynamic(() => import("./components/ListOfTasks"));

interface Props {
  tasks: ITask[];
}

const TasksLists = ({ tasks }: Props) => {
  const searchParams = useSearchParams();

  if (!tasks.length) return <NotFoundTasksStatus />;

  const searchValue = searchParams.get("search")?.toLowerCase();

  const filteredTasks = searchValue
    ? tasks.filter((task) => task.name.toLowerCase().includes(searchValue))
    : tasks;

  const pastDueTasks = filteredTasks.filter(
    (e) => !e.completed && isPast(e.due_date) && !isToday(e.due_date)
  );

  const importantTasks = filteredTasks.filter(
    (e) =>
      e.important &&
      !e.completed &&
      (isToday(e.due_date) || isFuture(e.due_date))
  );

  const activeTasks = filteredTasks.filter(
    (e) =>
      !e.important &&
      !e.completed &&
      (isToday(e.due_date) || isFuture(e.due_date))
  );

  const completedTasks = filteredTasks.filter((e) => e.completed);

  return (
    <>
      <div className="flex items-center justify-between gap-6 mb-8">
        <TaskSearchForm />
      </div>

      <div className="grid gap-6">
        {!filteredTasks.length ? (
          <NotFoundTasksStatus />
        ) : (
          <>
            {!pastDueTasks.length &&
              !importantTasks.length &&
              !activeTasks.length &&
              completedTasks.length &&
              !searchValue && <CompletedTasksStatus />}

            <ListOfTasks listTitle="Past Due Tasks" tasks={pastDueTasks} />
            <ListOfTasks listTitle="Important Tasks" tasks={importantTasks} />
            <ListOfTasks listTitle="Active Tasks" tasks={activeTasks} />
            <ListOfTasks
              open={!!searchValue}
              listTitle="Completed Tasks"
              tasks={completedTasks}
            />
          </>
        )}
      </div>
    </>
  );
};
export default TasksLists;
