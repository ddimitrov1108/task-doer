"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useId } from "react";
import ButtonIcon from "../ui/ButtonIcon";
import { ProjectContext } from "../context/ProjectContext";
import { IProject } from "@/lib/interfaces";
import Dropdown from "../ui/Dropdown";
import DropdownListItem from "../ui/DropdownListItem";
import AddTaskButton from "../task/AddTaskButton";

interface Props {
  project: IProject;
}

const ProjectInteractiveButtons = ({ project }: Props) => {
  const projectContext = useContext(ProjectContext);

  const projectInteractions = [
    {
      id: useId(),
      name: "Edit",
      icon: <Pencil className="text-primary-main" size={20} />,
      onClick: () => {
        projectContext?.setOpenEditModal(true);
      },
    },
    {
      id: useId(),
      name: "Delete",
      icon: <Trash2 className="text-error-main" size={20} />,
      onClick: () => {
        projectContext?.setOpenDeleteModal(true);
      },
      className: "text-error-main hover:text-error-main",
    },
  ];

  useEffect(() => {
    projectContext?.setProject(project);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project]);

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
        {projectInteractions.map(({ id, className, onClick, ...item }) => (
          <DropdownListItem
            key={id}
            as="button"
            onClick={onClick}
            item={item}
            className={className}
          />
        ))}
      </Dropdown>
    </div>
  );
};
export default ProjectInteractiveButtons;
