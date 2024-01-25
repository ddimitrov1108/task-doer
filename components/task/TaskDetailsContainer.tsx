"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import ButtonIcon from "../ui/ButtonIcon";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskDetails from "./components/TaskDetails";

const TaskInteractiveButtons = dynamic(
  () => import("../interactive-buttons/TaskInteractiveButtons")
);

interface Props {
  open: boolean;
  setOpen: () => void;
}

const TaskDetailsContainer = ({ open, setOpen }: Props) => {
  const taskContext = useContext(TaskContext);

  return taskContext?.task ? (
    <div
      className={cn(
        "hidden xl:block fixed top-0 right-0 bottom-0 transition-all bg-black-main h-full overflow-auto styled-overflow",
        open ? "w-80" : "w-0"
      )}
    >
      <div className="p-6">
        <div className="flex items-center w-full justify-between mb-10">
          <h1 className="font-medium text-light">Task Details</h1>

          <div className="flex items-center gap-2">
            <TaskInteractiveButtons task={taskContext?.task} />

            <ButtonIcon
              tabIndex={0}
              aria-label="Close Menu"
              onClick={setOpen}
              className="text-xl"
            >
              <X size={20} />
            </ButtonIcon>
          </div>
        </div>

        <TaskDetails task={taskContext?.task} />
      </div>
    </div>
  ) : null;
};
export default TaskDetailsContainer;
