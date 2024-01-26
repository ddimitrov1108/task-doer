"use client";

import { useContext, useId } from "react";
import { TaskContext } from "../context/TaskContext";
import { GanttChartSquare, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import DropdownListItem from "../ui/DropdownListItem";
import { ITask } from "@/lib/interfaces";
import ButtonIcon from "../ui/ButtonIcon";

interface Props {
  task: ITask;
}

const TaskInteractiveButtons = ({ task }: Props) => {
  const taskContext = useContext(TaskContext);

  const taskInteractions = [
    {
      id: useId(),
      name: "View",
      icon: <GanttChartSquare className="text-primary-main" size={20} />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();

        if (taskContext?.openDetails && taskContext?.task?.id === task.id)
          return;

        taskContext?.setTask(task);
        taskContext?.setOpenDetails(true);
      },
    },
    {
      id: useId(),
      name: "Edit",
      icon: <Pencil className="text-primary-main" size={20} />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        taskContext?.setTask(task);
        taskContext?.setOpenDetails(false);
        taskContext?.setTaskModal({ open: true, editMode: true });
      },
    },
    {
      id: useId(),
      name: "Delete",
      icon: <Trash2 className="text-error-main" size={20} />,
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        taskContext?.setTask(task);
        taskContext?.setOpenDeleteModal(true);
      },
      className: "text-error-main hover:text-error-main",
    },
  ];

  return (
    <Dropdown
      showChevron={false}
      buttonClassName="p-0"
      buttonContent={
        <ButtonIcon className="transition-all min-w-fit min-h-fit p-0.5 text-main hover:text-light">
          <MoreVertical size={20} />
        </ButtonIcon>
      }
    >
      {taskInteractions.map(({ id, className, onClick, ...item }) => (
        <DropdownListItem
          key={id}
          as="button"
          onClick={onClick}
          item={item}
          className={className}
        />
      ))}
    </Dropdown>
  );
};
export default TaskInteractiveButtons;
