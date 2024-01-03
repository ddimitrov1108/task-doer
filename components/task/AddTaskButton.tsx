"use client";

import { MouseEventHandler } from "react";
import { Button } from "../ui";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface Props {
  className?: string;
  title?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}
const AddTaskButton = ({ className, ...restProps }: Props) => {
  return (
    <Button
      variant="secondary"
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
