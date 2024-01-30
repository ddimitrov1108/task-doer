"use client";

import { ITask } from "@/lib/interfaces";
import { compareAsc, compareDesc, isFuture, isPast, isToday } from "date-fns";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const CompletedTasksStatus = dynamic(
  () => import("./components/status/CompletedTasksStatus")
);
const NotFoundTasksStatus = dynamic(
  () => import("./components/status/NotFoundTasksStatus")
);
const ListOfTasks = dynamic(() => import("./components/ListOfTasks"));
const SortTasksListbox = dynamic(() => import("./components/SortTasksListbox"));
const TaskSearchForm = dynamic(() => import("../forms/TaskSearchForm"));

interface Props {
  tasks: ITask[];
  openCompletedTab?: boolean;
  showCompleteStatus?: boolean;
}

const sortBy = (arr: ITask[], by: string | undefined) => {
  if (!arr || !arr.length) return [];

  switch (by) {
    case "asc":
      return arr.sort((a, b) => a.name.localeCompare(b.name));
    case "desc":
      return arr.sort((a, b) => b.name.localeCompare(a.name));
    case "oldest":
      return arr.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
    case "newest":
    default:
      return arr.sort((a, b) => compareDesc(a.dueDate, b.dueDate));
  }
};

const TasksLists = ({
  tasks,
  openCompletedTab = false,
  showCompleteStatus = true,
}: Props) => {
  const searchParams = useSearchParams();

  if (!tasks.length) return <NotFoundTasksStatus />;

  const searchParam = searchParams.get("search")?.toLowerCase();
  const sortParam = searchParams.get("sort")?.toLowerCase();

  const filteredTasks = sortBy(
    searchParam
      ? tasks.filter((task) => task.name.toLowerCase().includes(searchParam))
      : tasks,
    sortParam
  );

  const pastDueTasks = filteredTasks.filter(
    (e) => !e.completed && isPast(e.dueDate) && !isToday(e.dueDate)
  );

  const importantTasks = filteredTasks.filter(
    (e) =>
      e.important && !e.completed && (isToday(e.dueDate) || isFuture(e.dueDate))
  );

  const activeTasks = filteredTasks.filter(
    (e) =>
      !e.important &&
      !e.completed &&
      (isToday(e.dueDate) || isFuture(e.dueDate))
  );

  const completedTasks = filteredTasks.filter((e) => e.completed);

  return (
    <>
      <div className="flex items-center justify-between gap-4 mb-8">
        <TaskSearchForm />
        <SortTasksListbox />
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
            showCompleteStatus &&
            !searchParam ? (
              <CompletedTasksStatus />
            ) : null}

            <ListOfTasks listTitle="Past Due Tasks" tasks={pastDueTasks} />
            <ListOfTasks listTitle="Important Tasks" tasks={importantTasks} />
            <ListOfTasks listTitle="Active Tasks" tasks={activeTasks} />
            <ListOfTasks
              open={openCompletedTab ? true : !!searchParam}
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
