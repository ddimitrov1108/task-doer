"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Button from "../ui/Button";

interface Props {
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const AddTaskButton = ({ className, ...restProps }: Props) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      className={cn("px-2 flex items-center gap-1 justify-center", className)}
      onClick={() => alert("add new task")}
      {...restProps}
    >
      <Plus size={20} /> New Task
    </Button>
  );
};
export default AddTaskButton;
// onClick={() => taskContext.setOpenNewTaskModal(true)}
