import { ITask } from "@/lib/interfaces";
import { Task, TasksListCompletedStatus, TasksListEmptyStatus } from ".";
import { isFuture, isPast, isToday } from "date-fns";
import { DisclousureContainer } from "../ui";

interface Props {
  tasks: ITask[];
}

const sortByDate = (arr: ITask[]) =>
  arr.sort((a, b) => a.due_date.getTime() - b.due_date.getTime());

const TasksList = ({ tasks }: Props) => {
  if (!tasks || tasks.length === 0) return <TasksListEmptyStatus />;

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
      {!pastDueTasks.length && !importantTasks.length && !activeTasks.length ? (
        <TasksListCompletedStatus />
      ) : (
        <>
          {!!pastDueTasks.length && (
            <DisclousureContainer
              title="Past Due"
              btnClassName="py-2 text-main"
              open
            >
              {pastDueTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </DisclousureContainer>
          )}

          {!!importantTasks.length && (
            <div className="grid gap-3">
              <h1 className="font-medium text-main">Important Tasks</h1>

              <div>
                {importantTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {!!activeTasks.length && (
            <div className="grid gap-3">
              <h1 className="font-medium text-main">Tasks</h1>

              <div>
                {activeTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!!completedTasks.length && (
        <DisclousureContainer
          title="Completed"
          btnClassName="py-2 text-main"
          open={false}
        >
          {completedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </DisclousureContainer>
      )}
    </div>
  );
};
export default TasksList;
