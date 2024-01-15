"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useContext, useId } from "react";
import { ProjectContext } from "../providers/ProjectProvider";
import AddTaskButton from "../task/AddTaskButton";
import dynamic from "next/dynamic";
import ButtonIcon from "../ui/ButtonIcon";

const Dropdown = dynamic(() => import("../ui/Dropdown"))
const DropdownListItem = dynamic(() => import("../ui/DropdownListItem"))

const ProjectInteractiveButtons = () => {
  const projectContext = useContext(ProjectContext);

  const projectInteractions = [
    {
      id: useId(),
      name: "Edit",
      icon: <Pencil size={20} />,
      onClick: () => {
        projectContext?.setOpenProjectModal(true);
      },
      className: "text-light hover:text-white",
      iconClassName: "text-primary-main",
    },
    {
      id: useId(),
      name: "Delete",
      icon: <Trash2 size={20} />,
      onClick: () => {
        projectContext?.setOpenDeleteModal(true);
      },
      className: "text-error-main",
      iconClassName: "text-error-main",
    },
  ];

  return (
    <div className="min-w-full md:min-w-fit flex items-center justify-between gap-2">
      <AddTaskButton />

      <Dropdown
        showChevron={false}
        buttonClassName="p-0"
        buttonContent={
          <ButtonIcon className="p-2 transition-all bg-black-main text-main">
            <MoreHorizontal size={20} />
          </ButtonIcon>
        }
      >
        {projectInteractions.map(
          ({ id, className, iconClassName, onClick, ...item }) => (
            <DropdownListItem
              key={id}
              as="button"
              onClick={onClick}
              item={item}
              className={className}
              iconClassName={iconClassName}
            />
          )
        )}
      </Dropdown>
    </div>
  );
};
export default ProjectInteractiveButtons;
