"use client";

import { useContext, useId } from "react";
import { TaskContext } from "../context/TaskContext";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
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
      name: "Edit",
      icon: <Pencil size={20} />,
      onClick: () => {
        taskContext?.setTask(task);
        taskContext?.setTaskModal({ open: true, editMode: true });
      },
      className: "text-light hover:text-white",
      iconClassName: "text-primary-main",
    },
    {
      id: useId(),
      name: "Delete",
      icon: <Trash2 size={20} />,
      onClick: () => {
        taskContext?.setTask(task);
        taskContext?.setOpenDeleteModal(true);
      },
      className: "text-error-main",
      iconClassName: "text-error-main",
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
      {taskInteractions.map(
        ({ id, className, iconClassName, onClick, ...item }) => (
          <DropdownListItem
            key={id}
            as="button"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onClick();
            }}
            item={item}
            className={className}
            iconClassName={iconClassName}
          />
        )
      )}
    </Dropdown>
  );
};
export default TaskInteractiveButtons;
