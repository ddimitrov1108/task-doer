import Image from "next/image";
import AddTaskButton from "./AddTaskButton";

const TasksListCompletedStatus = () => {
  return (
    <div className="py-24 lg:py-32 grid justify-center items-center gap-4">
      <div>
        <Image
          src="/tasks-completed.svg"
          width={128}
          height={128}
          alt="tasks-completed.svg"
          className="w-24 h-24 lg:w-32 lg:h-32 mx-auto"
        />

        <p className="text-center text-main">
          🎉 All of your tasks are completed!
          <br />
          You can rest now or start a new one.
        </p>
      </div>

      <AddTaskButton className="mx-auto" />
    </div>
  );
};
export default TasksListCompletedStatus;
