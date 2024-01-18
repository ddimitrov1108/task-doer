"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Button from "../ui/Button";
import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

interface Props {
  className?: string;
  title?: string;
}

const AddTaskButton = ({ className, ...restProps }: Props) => {
  const taskContext = useContext(TaskContext);

  return (
    <Button
      variant="secondary"
      size="sm"
      className={cn("px-2 flex items-center gap-1 justify-center", className)}
      onClick={() => taskContext?.setTaskModal({ open: true, editMode: false })}
      {...restProps}
    >
      <Plus size={20} /> New Task
    </Button>
  );
};
export default AddTaskButton;
// onClick={() => taskContext.setOpenNewTaskModal(true)}
