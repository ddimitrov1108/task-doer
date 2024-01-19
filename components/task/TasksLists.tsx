import { ITask } from "@/lib/interfaces";
import { isFuture, isPast, isToday } from "date-fns";
import { sortByDate } from "@/lib/utils";
import ListOfTasks from "./ListOfTasks";
import dynamic from "next/dynamic";

const CompletedTasksStatus = dynamic(
  () => import("./status/CompletedTasksStatus")
);
const EmptyTasksStatus = dynamic(() => import("./status/EmptyTasksStatus"));

interface Props {
  tasks: ITask[];
}

const TasksLists = ({ tasks }: Props) => {
  const pastDueTasks = sortByDate(
    tasks.filter(
      (e) => !e.completed && isPast(e.due_date) && !isToday(e.due_date)
    )
  );

  const importantTasks = sortByDate(
    tasks.filter(
      (e) =>
        e.important &&
        !e.completed &&
        (isToday(e.due_date) || isFuture(e.due_date))
    )
  );

  const activeTasks = sortByDate(
    tasks.filter(
      (e) =>
        !e.important &&
        !e.completed &&
        (isToday(e.due_date) || isFuture(e.due_date))
    )
  );

  const completedTasks = sortByDate(tasks.filter((e) => e.completed));

  return (
    <div className="grid gap-6">
      {!tasks.length ? (
        <EmptyTasksStatus />
      ) : !pastDueTasks.length &&
        !importantTasks.length &&
        !activeTasks.length && completedTasks.length ? (
        <>
          <CompletedTasksStatus />
          <ListOfTasks listTitle="Completed Tasks" tasks={completedTasks} />
        </>
      ) : (
        <>
          <ListOfTasks listTitle="Past Due Tasks" tasks={pastDueTasks} />
          <ListOfTasks listTitle="Important Tasks" tasks={importantTasks} />
          <ListOfTasks listTitle="Active Tasks" tasks={activeTasks} />
          <ListOfTasks listTitle="Completed Tasks" tasks={completedTasks} />
        </>
      )}
    </div>
  );
};
export default TasksLists;
