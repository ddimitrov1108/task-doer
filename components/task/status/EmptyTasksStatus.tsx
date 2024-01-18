import Image from "next/image";
import AddTaskButton from "../AddTaskButton";

const EmptyTasksStatus = () => {
  return (
    <div className="py-24 lg:py-40 grid justify-center items-center gap-4">
      <div>
        <Image
          src="/tasks-notfound.svg"
          width={192}
          height={192}
          alt="tasks-notfound.svg"
          className="w-24 h-24 lg:w-48 lg:h-48 mx-auto"
        />

        <p className="text-center text-main">
          🔍 No tasks have been added in this section.
        </p>
      </div>

      <AddTaskButton className="mx-auto" />
    </div>
  );
};
export default EmptyTasksStatus;
