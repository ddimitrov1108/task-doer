import Image from "next/image";
import { AddTaskButton } from ".";

const TasksListEmptyStatus = () => {
  return (
    <div className="py-24 lg:py-32 grid justify-center items-center gap-4">
      <div>
        <Image
          src="/tasks-notfound.svg"
          width={128}
          height={128}
          alt="tasks-notfound.svg"
          className="w-24 h-24 lg:w-32 lg:h-32 mx-auto"
        />

        <p className="text-center text-main">
          🔍 No tasks have been added in this section.
        </p>
      </div>

      <AddTaskButton className="mx-auto" />
    </div>
  );
};
export default TasksListEmptyStatus;
