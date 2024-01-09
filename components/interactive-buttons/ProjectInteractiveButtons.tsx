"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useContext, useId } from "react";
import { AddTaskButton } from "../task";
import { Dropdown, DropdownListItem, IconButton } from "../ui";
import { ProjectContext } from "../providers/ProjectProvider";

const ProjectInteractiveButtons = () => {
  const projectContext = useContext(ProjectContext);

  const projectInteractions = [
    {
      id: useId(),
      name: "Edit",
      icon: <Pencil size={20} />,
      onClick: () => {
        projectContext?.setEditMode(true);
        projectContext?.setIsOpenProjectModal(true);
      },
      className: "text-light hover:text-white",
      iconClassName: "text-primary-main",
    },
    {
      id: useId(),
      name: "Delete",
      icon: <Trash2 size={20} />,
      onClick: () => {
        projectContext?.setIsOpenDeleteConfirmationModal(true);
      },
      className: "text-error-main",
      iconClassName: "text-error-main",
    },
  ];

  return (
    <>
      <div className="min-w-full md:min-w-fit flex items-center justify-between gap-2">
        <AddTaskButton />

        <Dropdown
          btn={
            <IconButton className="transition-all text-2xl bg-black-main">
              <MoreHorizontal size={20} />
            </IconButton>
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
    </>
  );
};
export default ProjectInteractiveButtons;
