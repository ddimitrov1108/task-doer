import AddTaskButton from "@/components/task/AddTaskButton";
import PageTitle from "@/components/ui/PageTitle";
import taskController from "@/db/TaskController";
import { getUserFromServerSession } from "@/lib/auth";
import dynamic from "next/dynamic";

const TasksLists = dynamic(() => import("@/components/task/TasksLists"));

const AllTasksPage = async () => {
  const user = await getUserFromServerSession();

  const tasks = await taskController.getList(user?.id, null, {
    all: true,
  });

  return (
    <>
      <div className="mb-8 grid gap-4 md:flex md:items-end md:justify-between">
        <PageTitle label="tasks">All</PageTitle>
        <AddTaskButton className="min-w-fit" />
      </div>

      <TasksLists tasks={tasks} />
    </>
  );
};
export default AllTasksPage;
